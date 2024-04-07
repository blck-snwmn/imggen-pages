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
	const png = await env.GENERATOR.generate({
		icon,
		name,
		hobby,
		favoriteFood,
		favoriteMovie,
		favoritePlace,
	});
	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Content-Disposition": "attachment; filename=generated-image.png",
			// "Content-Disposition": "inline",
		},
	});
};
