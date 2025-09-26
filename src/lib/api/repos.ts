export type Repo = {
    name: string; html_url: string; description: string | null; created_at: string;
};

export type EnrichedRepo = Repo & {
    topLanguages: string[] | null; langError?: boolean; updated?: number;
};

const IGNORED_REPOS = ["Zelvios"];
const OWNER = 'zelvios';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day
const CACHE_KEY = `${OWNER}_repos_map`;

function authHeaders(token?: string): HeadersInit | undefined {
    if (!token) return undefined;
    return {
        Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json'
    };
}

async function fetchJson<T>(url: string, token?: string): Promise<T> {
    const res = await fetch(url, {headers: authHeaders(token)});
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        const err = new Error(`HTTP ${res.status}: ${res.statusText} ${text}`);
        (err as any).status = res.status;
        throw err;
    }
    return (await res.json()) as T;
}

function nowMs() {
    return Date.now();
}

function readCacheMap(): Record<string, EnrichedRepo> {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return {};
        return JSON.parse(raw) as Record<string, EnrichedRepo>;
    } catch (e) {
        console.warn('Failed to parse repo cache map, resetting', e);
        return {};
    }
}

function writeCacheMap(map: Record<string, EnrichedRepo>) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(map));
}

function isFresh(updated?: number) {
    if (!updated) return false;
    return nowMs() - updated < CACHE_DURATION;
}

async function fetchRepoLanguages(name: string, token?: string) {
    const langs = await fetchJson<Record<string, number>>(`https://api.github.com/repos/${OWNER}/${name}/languages`, token);
    return Object.entries(langs)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([lang]) => lang);
}

export async function fetchAllRepos(token?: string): Promise<EnrichedRepo[]> {
    try {
        const cacheMap = readCacheMap();

        const listUrl = `https://api.github.com/users/${OWNER}/repos?per_page=100`;
        const data = await fetchJson<any[]>(listUrl, token);

        const filtered = data
            .filter((r) => r.name && !IGNORED_REPOS.includes(r.name))
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        const enrichedPromises = filtered.map(async (r): Promise<EnrichedRepo> => {
            const cached = cacheMap[r.name];

            if (cached && isFresh(cached.updated)) {
                return {...cached, created_at: r.created_at} as EnrichedRepo;
            }

            let topLanguages: string[] | null = null;
            let langError = false;
            try {
                topLanguages = await fetchRepoLanguages(r.name, token);
            } catch (e) {
                console.error(`Failed to fetch languages for ${r.name}:`, e);
                langError = true;
            }

            const enriched: EnrichedRepo = {
                name: r.name,
                html_url: r.html_url,
                description: r.description,
                created_at: r.created_at,
                topLanguages,
                langError,
                updated: nowMs()
            };

            cacheMap[r.name] = enriched;
            return enriched;
        });

        const enriched = await Promise.all(enrichedPromises);

        writeCacheMap(cacheMap);

        return enriched;
    } catch (err) {
        console.error('fetchAllRepos error:', err);
        throw err;
    }
}

export async function fetchReposByNames(names: string[], token?: string): Promise<EnrichedRepo[]> {
    if (!names || !names.length) return [];

    const cacheMap = readCacheMap();

    const results = await Promise.all(names.map(async (name): Promise<EnrichedRepo | null> => {
        const cached = cacheMap[name];
        if (cached && isFresh(cached.updated)) {
            return cached;
        }

        try {
            const repoData = await fetchJson<any>(`https://api.github.com/repos/${OWNER}/${name}`, token);

            let topLanguages: string[] | null = null;
            let langError = false;
            try {
                topLanguages = await fetchRepoLanguages(name, token);
            } catch (e) {
                console.error(`Failed to fetch languages for ${name}:`, e);
                langError = true;
            }

            const enriched: EnrichedRepo = {
                name: repoData.name,
                html_url: repoData.html_url,
                description: repoData.description,
                created_at: repoData.created_at,
                topLanguages,
                langError,
                updated: nowMs()
            };

            cacheMap[name] = enriched;
            return enriched;
        } catch (err: any) {
            if (err?.status === 404) {
                console.warn(`Repo not found: ${OWNER}/${name} (skipping)`);
                return null;
            }
            console.error(`Error fetching repo ${OWNER}/${name}:`, err);
            return null;
        }
    }));

    writeCacheMap(cacheMap);

    return results.filter(Boolean) as EnrichedRepo[];
}

export const techLabelToLang: Record<string, string> = {
    CSharp: 'C#'
};

export const normalize = (s: unknown) => (s || '')
    .toString()
    .toLowerCase()
    .replace('#', 'sharp')
    .replace(/\s+/g, '');

export function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
}