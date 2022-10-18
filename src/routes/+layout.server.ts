import type { LayoutData } from ".svelte-kit/types/src/routes/$types";

export const load: LayoutData = async ({parent}) => {
  const {session} = await parent();
  
  return {
    session
  };
}