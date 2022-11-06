import { error, invalid, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals, params }) => {
    const { id: user } = params;
    const { id: follower } = locals.session!;

    try {
        const data = {
            hash: user + follower,
            user,
            follower
        };

        const newFollower = await locals.pb.collection('followers').create(data);
        return json({ success: true, message: 'User added to following!', newFollower });
    } catch (e: any) {
        if (e.status === 400 || e.status === 404) {
            return invalid(e.status, { failed: true, message: 'Failed to follow user.' });
        }
        return error(e.status, 'Something went wrong!');
    }
}

export const DELETE: RequestHandler = async ({ locals, url }) => {
    const recordId = url.searchParams.get('id');

    try {
        await locals.pb.collection('followers').delete(recordId!);
        return json({ success: true, message: 'You stopped following this user.' });
    } catch (e: any) {
        if (e.status === 400 || e.status === 404) {
            return invalid(e.status, { failed: true, message: 'Failed to unfollow user!' });
        }
        return error(e.status, 'Something went wrong!');
    }
}