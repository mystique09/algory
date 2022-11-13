export const parseNonPOJO = (obj: any) => {
	return JSON.parse(JSON.stringify(obj));
};
