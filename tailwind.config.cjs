const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	daisyui: {
		themes: [
			{
				algoryTheme: {
					primary: "#2b66db",
					secondary: "#bad7f4",
					accent: "#a5ef94",
					neutral: "#1B141F",
					"base-100": "#E4E5EC",
					info: "#A0B8E9",
					success: "#32CD78",
					warning: "#F8C754",
					error: "#E15137",
				},
			},
		],
	},
	plugins: [/*require("@tailwindcss/typography"), */ require("daisyui")],
};

module.exports = config;
