const env = import.meta.env;

export const environment = {
	production: env.PROD || false,
	baseUrl: "http://192.248.152.35",
	isTrueProd: env.VITE_APP_ENVIRONMENT === "production",
};
