import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { useActionData } from "@remix-run/react";

export const action = async ({ context, request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const icon = formData.get("icon");
	const name = formData.get("name");
	const hobby = formData.get("hobby");
	const favoriteFood = formData.get("favoriteFood");
	const favoriteMovie = formData.get("favoriteMovie");
	const favoritePlace = formData.get("favoritePlace");

	if (!icon) {
		console.error("Bad Request: icon is required");
		return new Response("Bad Request", { status: 400 });
	}
	if (!name) {
		console.error("Bad Request: name is required");
		return new Response("Bad Request", { status: 400 });
	}
	if (!hobby) {
		console.error("Bad Request: hobby is required");
		return new Response("Bad Request", { status: 400 });
	}
	if (!favoriteFood) {
		console.error("Bad Request: favoriteFood is required");
		return new Response("Bad Request", { status: 400 });
	}
	if (!favoriteMovie) {
		console.error("Bad Request: favoriteMovie is required");
		return new Response("Bad Request", { status: 400 });
	}
	if (!favoritePlace) {
		console.error("Bad Request: favoritePlace is required");
		return new Response("Bad Request", { status: 400 });
	}

	const { env } = context.cloudflare;
	const resp = await env.GENERATOR.fetch("http://localhost:8787", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			icon,
			name,
			hobby,
			favoriteFood,
			favoriteMovie,
			favoritePlace,
		}),
	});
	if (!resp.ok) {
		throw new Error(`Failed to fetch: ${await resp.text()}`);
	}
	return new Response(resp.body, {
		headers: {
			"Content-Type": "image/png",
			"Content-Disposition": "attachment; filename=generated-image.png",
			// "Content-Disposition": "inline",
		},
	});
};
