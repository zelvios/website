<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { spring } from 'svelte/motion';

    export let className: string = "";
    export let start: number = 0.12;
    export let end: number = 0.9;

    let containerRef: HTMLDivElement;
    let contentRef: HTMLDivElement;
    let beamWrapperRef: HTMLDivElement;
    let svgHeight = 0;

    let rawProgress = 0;
    let windowedProgress = 0;

    const y1 = spring(50, { stiffness: 0.3, damping: 0.2 });
    const y2 = spring(50, { stiffness: 0.3, damping: 0.2 });

    let ro: ResizeObserver | null = null;

    // anchor info
    let beamAnchorX = 0;   // position of .beam-anchor (right waypoint)
    let beamAnchorY = 0;   // vertical position of .beam-anchor (where we first stop)
    let featureMidY = 0;   // target vertical midpoint between Feature 2 & 4
    let midX = 0;          // horizontal midpoint between the two columns
    let hasAnchor = false;
    let anchorY = 0;
    let leftX = 20;
    let rightX = containerRef?.offsetWidth - 20;
    let pathD = '';
    let endTargetX = 0;
    let endTargetY = 0;

    // path measuring for stroke animation
    let pathEl: SVGPathElement;
    let pathLength = 0;
    const shootOffset = spring(0, { stiffness: 0.5, damping: 0.2 });

    function clamp(v:number, a:number, b:number){ return Math.max(a, Math.min(b, v)); }

    // Robust column clustering helper
    function clusterColumns(elements: HTMLElement[]) {
        if (!elements.length) return null;
        const centers = elements.map(el => {
            const r = el.getBoundingClientRect();
            return { el, cx: r.left + r.width / 2, cy: r.top + r.height / 2, rect: r };
        });

        centers.sort((a, b) => a.cx - b.cx);

        let bestSplit = 1;
        let bestGap = -Infinity;
        for (let i = 1; i < centers.length; i++) {
            const gap = centers[i].cx - centers[i - 1].cx;
            if (gap > bestGap) {
                bestGap = gap;
                bestSplit = i;
            }
        }
        const left = centers.slice(0, bestSplit);
        const right = centers.slice(bestSplit);
        const avg = arr => arr.reduce((s, x) => s + x.cx, 0) / Math.max(1, arr.length);
        return { leftCenters: left, rightCenters: right, leftAvg: avg(left), rightAvg: avg(right), items: centers };
    }

    function computeAnchor() {
        if (!contentRef || !beamWrapperRef) {
            hasAnchor = false;
            return;
        }

        const wrapperRect = (beamWrapperRef && beamWrapperRef.getBoundingClientRect && beamWrapperRef.getBoundingClientRect())
            || (containerRef && containerRef.getBoundingClientRect && containerRef.getBoundingClientRect())
            || { left: 0, top: 0, width: 0, height: 0 };

        const f3 = contentRef.querySelector('[data-feature-index="2"]') as HTMLElement | null;
        let feature3Bottom = 0;
        if (f3) {
            const r3 = f3.getBoundingClientRect();
            feature3Bottom = Math.round(r3.bottom - wrapperRect.top);
        }

        const anchorEl = contentRef.querySelector('.beam-anchor') as HTMLElement | null;

        const nodes = Array.from(contentRef.querySelectorAll('[data-feature-index]')) as HTMLElement[];

        if (nodes.length >= 2) {
            const cols = clusterColumns(nodes);
            if (cols) {
                midX = Math.round((cols.leftAvg + cols.rightAvg) / 2 - wrapperRect.left);
            } else {
                midX = Math.round((containerRef?.offsetWidth || 800) / 2);
            }
        } else {
            midX = Math.round((containerRef?.offsetWidth || 800) / 2);
        }

        // beam-anchor present = use its coordinates for the first waypoint
        if (anchorEl) {
            const aRect = anchorEl.getBoundingClientRect();
            beamAnchorX = Math.round(aRect.left + aRect.width / 2 - wrapperRect.left);
            beamAnchorY = Math.round(aRect.top + aRect.height / 2 - wrapperRect.top);
        } else {
            // fallback: place beam anchor at right column center if possible
            if (nodes.length >= 2) {
                const cols = clusterColumns(nodes);
                if (cols) {
                    beamAnchorX = Math.round(cols.rightAvg - wrapperRect.left);
                    beamAnchorY = Math.round((cols.rightCenters[0]?.cy || cols.rightAvg) - wrapperRect.top);
                } else {
                    beamAnchorX = Math.round((containerRef?.offsetWidth || 800) * 0.75);
                    beamAnchorY = Math.round((svgHeight || 120) * 0.3);
                }
            } else {
                beamAnchorX = Math.round((containerRef?.offsetWidth || 800) * 0.75);
                beamAnchorY = Math.round((svgHeight || 120) * 0.3);
            }
        }

        // compute featureMidY
        const f2 = contentRef.querySelector('[data-feature-index="1"]') as HTMLElement | null;
        const f4 = contentRef.querySelector('[data-feature-index="3"]') as HTMLElement | null;

        if (f2 && f4) {
            const r2 = f2.getBoundingClientRect();
            const r4 = f4.getBoundingClientRect();
            const c2 = r2.top + r2.height / 2;
            const c4 = r4.top + r4.height / 2;
            featureMidY = clamp(Math.round((c2 + c4) / 2 - wrapperRect.top), 24, Math.max(120, svgHeight) - 24);
        } else {
            if (nodes.length >= 2) {
                const cols = clusterColumns(nodes);
                if (cols && cols.rightCenters.length) {
                    const avgCy = cols.rightCenters.reduce((s, x) => s + x.cy, 0) / cols.rightCenters.length;
                    featureMidY = clamp(Math.round(avgCy - wrapperRect.top), 24, Math.max(120, svgHeight) - 24);
                } else {
                    featureMidY = clamp(beamAnchorY + 80, 24, Math.max(120, svgHeight) - 24);
                }
            } else {
                featureMidY = clamp(beamAnchorY + 80, 24, Math.max(120, svgHeight) - 24);
            }
        }

        const cta = contentRef.querySelector('.beam-target') as HTMLElement | null;

        if (cta) {
            const cRect = cta.getBoundingClientRect();
            endTargetX = Math.round(cRect.left + cRect.width / 2 - wrapperRect.left);
            endTargetY = Math.round(cRect.top + cRect.height / 2 - wrapperRect.top);
            endTargetY = clamp(endTargetY, 24, Math.max(120, svgHeight) - 24);
        } else {
            endTargetX = Math.round((containerRef?.offsetWidth || 800) / 2);
            endTargetY = Math.round(svgHeight * 0.5);
        }

        if (!isFinite(beamAnchorX)) beamAnchorX = Math.round((containerRef?.offsetWidth || 800) * 0.75);
        if (!isFinite(beamAnchorY)) beamAnchorY = Math.round((svgHeight || 120) * 0.3);
        if (!isFinite(featureMidY)) featureMidY = clamp(beamAnchorY + 80, 24, Math.max(120, svgHeight) - 24);
        if (!isFinite(endTargetX)) endTargetX = Math.round((containerRef?.offsetWidth || 800) / 2);
        if (!isFinite(endTargetY)) endTargetY = Math.round(svgHeight * 0.5);

        hasAnchor = true;
    }


    function buildPath() {
        // keep rightX up-to-date
        rightX = (containerRef?.offsetWidth || 800) - 20;

        if (!hasAnchor) {
            const zig = `M ${leftX} 0`;
            return `${zig} V ${Math.max(24, svgHeight * 0.8)} l -18 24 V ${svgHeight}`;
        }

        // === Key waypoints ===
        const startX = leftX;
        const firstStopYOffset = 40; // tweak this value to clear text
        const firstStopY = Math.max(12, beamAnchorY - 6) + firstStopYOffset;
        const rightEdgeX = rightX;
        const targetY = featureMidY;
        const downAfterY = Math.min(svgHeight - 24, targetY + 200);
        const middleX = midX || Math.round((leftX + rightX) / 2);
        const finishLeftX = leftX;

        const base = Math.max(8, Math.min(32, (containerRef?.offsetWidth || 800) * 0.025));

        // Helper to clamp notch by available room on both axes
        const notch = (dx: number, dy: number) => Math.max(0, Math.min(base, Math.abs(dx), Math.abs(dy)));

        // Build the path step-by-step, keeping track of (x, y)
        let x = startX, y = 0;
        const P: string[] = [];
        P.push(`M ${x} ${y}`);

        // Corner 1: going DOWN to firstStopY, then RIGHT to rightEdgeX
        {
            const d = notch(rightEdgeX - x, firstStopY - y);
            P.push(`V ${firstStopY - d}`);                   y = firstStopY - d;
            P.push(`L ${x + d} ${firstStopY}`);              x = x + d; y = firstStopY;
            // Corner 2 preparation: we’re about to go RIGHT then DOWN → stop short to bevel
            const d2 = notch((rightEdgeX - x), (targetY - y));
            P.push(`H ${rightEdgeX - d2}`);                  x = rightEdgeX - d2;
            P.push(`L ${rightEdgeX} ${y + d2}`);             x = rightEdgeX; y = y + d2;
        }

        // Corner 3: now going DOWN to targetY, then LEFT to middleX
        {
            const d = notch(x - middleX, targetY - y);
            P.push(`V ${targetY - d}`);                      y = targetY - d;
            P.push(`L ${x - d} ${targetY}`);                 x = x - d; y = targetY;
            // Corner 4 preparation: LEFT then DOWN → stop short to bevel
            const d2 = notch((x - middleX), (downAfterY - y));
            P.push(`H ${middleX + d2}`);                     x = middleX + d2;
            P.push(`L ${middleX} ${y + d2}`);                x = middleX; y = y + d2;
        }

        // Corner 5: going DOWN to downAfterY, then LEFT to finishLeftX
        {
            const d = notch(x - finishLeftX, downAfterY - y);
            P.push(`V ${downAfterY - d}`);           y = downAfterY - d;
            P.push(`L ${x - d} ${downAfterY}`);      x = x - d; y = downAfterY;

            // bevel to finish reaching the left edge
            const dEdge = notch((x - finishLeftX), (svgHeight - y));
            P.push(`H ${finishLeftX + dEdge}`);      x = finishLeftX + dEdge;
            P.push(`L ${finishLeftX} ${y + dEdge}`); x = finishLeftX; y = y + dEdge;

            // Descend part: move down to approximately endTargetY (but clamp to svg)
            const targetY = clamp(endTargetY || Math.round(svgHeight * 0.5), 24, svgHeight);

            if (targetY > y + 2) {
                const vNotch = notch(Math.abs(finishLeftX - endTargetX), targetY - y);
                P.push(`V ${targetY - vNotch}`);       y = targetY - vNotch;

                const horizTowards = endTargetX > x ? vNotch : -vNotch;
                P.push(`L ${x + horizTowards} ${targetY}`); x = x + horizTowards; y = targetY;
            }

            const hDx = Math.abs(endTargetX - x);
            const hNotch = notch(hDx, Math.max(8, Math.round(svgHeight * 0.05)));

            const stopX = endTargetX > x ? (endTargetX - hNotch) : (endTargetX + hNotch);
            P.push(`H ${stopX}`);
            P.push(`L ${endTargetX} ${y + hNotch}`);
            x = endTargetX; y = y + hNotch;
        }
        return P.join('\n');
    }

    function updateSprings() {
        if (!hasAnchor) {
            y1.set(50 + (svgHeight - 50) * Math.min(windowedProgress / 0.8, 1));
            y2.set(50 + (svgHeight - 200 - 50) * windowedProgress);
            return;
        }
        const startY = Math.max(0, anchorY * 0.2);
        const midY = anchorY;
        const endY = svgHeight;
        const g1 = startY + (midY - startY) * Math.min(windowedProgress, 2);
        const g2 = midY + (endY - midY) * Math.min(windowedProgress, 2);
        y1.set(g1);
        y2.set(g2);
    }

    function updateScroll() {
        if (!containerRef) return;
        const rect = containerRef.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalScroll = rect.height + viewportHeight;
        const scrolled = Math.min(Math.max(0, viewportHeight - rect.top), totalScroll);
        rawProgress = totalScroll === 0 ? 0 : scrolled / totalScroll;

        const denom = Math.max(0.0001, end - start);
        windowedProgress = clamp((rawProgress - start) / denom, 0, 2);

        if (contentRef) svgHeight = Math.max(120, contentRef.offsetHeight);

        computeAnchor();
        pathD = buildPath();

        if (pathEl) {
            pathLength = pathEl.getTotalLength();
            shootOffset.set(pathLength * (1 - windowedProgress));
        }

        updateSprings();
    }

    onMount(() => {
        svgHeight = Math.max(120, contentRef.offsetHeight + 80);

        if (contentRef && typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver((entries) => {
                const h = Math.max(120, Math.round(entries[0].contentRect.height));
                svgHeight = h;
                computeAnchor();
                pathD = buildPath();
                updateSprings();
                if (pathEl) {
                    pathLength = pathEl.getTotalLength();
                }
            });
            ro.observe(contentRef);
        }

        setTimeout(updateScroll, 0);

        window.addEventListener('scroll', updateScroll, { passive: true });
        window.addEventListener('resize', updateScroll);

        return () => {
            if (ro && contentRef) ro.unobserve(contentRef);
            window.removeEventListener('scroll', updateScroll);
            window.removeEventListener('resize', updateScroll);
        };
    });

    onDestroy(() => {
        if (ro && contentRef) ro.unobserve(contentRef);
    });
</script>

<div bind:this={containerRef} class="relative mx-auto h-full w-full max-w-4xl {className}">
    <div bind:this={beamWrapperRef}
         class="absolute inset-0 z-0 pointer-events-none"
         style="overflow: visible;">
        <div class="absolute" style="left:{leftX - 8}px; top:-6px;">
            <div class="border-neutral-200 flex h-4 w-4 items-center justify-center rounded-full border shadow-sm"
                 style="box-shadow: {windowedProgress > 0 ? 'none' : 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}">
                <div class="h-2 w-2 rounded-full border border-neutral-300"
                     style="background-color: {windowedProgress > 0 ? 'white' : '#cba6f7'};border-color: {windowedProgress > 0 ? 'white' : '#cba6f7'};">
                </div>
            </div>
        </div>

        <svg
                viewBox={`0 0 ${containerRef?.offsetWidth || 800} ${svgHeight}`}
                width="100%"
                height={svgHeight}
                class="block absolute top-0 left-0"
                style="overflow:visible; z-index:0"
                preserveAspectRatio="none"
                aria-hidden="true">
            <path d={pathD} fill="none" stroke="#9091A0" stroke-opacity="0.16" stroke-linecap="round"/>
            <path
                    bind:this={pathEl}
                    d={pathD}
                    fill="none"
                    stroke="url(#gradient)"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-dasharray={pathLength}
                    stroke-dashoffset={$shootOffset}
                    opacity={windowedProgress > 0 ? 1 : 0}
            />
            <defs>
                <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={$y1} y2={$y2}>
                    <stop stop-color="white" stop-opacity="0" />
                    <stop offset="0.2" stop-color="white" stop-opacity="1" />
                    <stop offset="0.5" stop-color="#cba6f7" stop-opacity="1" />
                    <stop offset="1" stop-color="#701EFC" stop-opacity="0" />
                </linearGradient>
            </defs>
        </svg>
    </div>

    <div bind:this={contentRef}>
        <slot />
    </div>
</div>
