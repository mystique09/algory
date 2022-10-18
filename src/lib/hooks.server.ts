import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async({event, resolve}) => {
  const cookies = event.cookies.get("session_token") || "";
  event.locals.session = JSON.parse(cookies);
  
  const response = await resolve(event);
  return response;
}