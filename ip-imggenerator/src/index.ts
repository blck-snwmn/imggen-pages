//biome-ignore lint/complexity/noBannedTypes: noBannedTypes
export type Env = {};

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		return new Response("Hello World!");
	},
};
