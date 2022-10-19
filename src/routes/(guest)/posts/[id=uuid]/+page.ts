import type { PageLoad } from ".svelte-kit/types/src/routes/(guest)/posts/[id=uuid]/$types";

export const handle: PageLoad = ({ params }: { params: { id: string } }) => {
    const { id } = params;

    // check if post exist

    if (id) {
        return {
            // return content
            post: {
                id,
                title: "Hello, World!",
                description: "Sample post content."
            }
        };
    }
}