import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = (param) => {
    return /^[0-9a-zA-Z]{15}$/g.test(param);
}