import { redirect } from '@sveltejs/kit';

export function handleError({ error, request }) {
    if (error.status === 404) {
        return redirect(302, '/');
    }
    return { message: error.message, stack: error.stack };
}
