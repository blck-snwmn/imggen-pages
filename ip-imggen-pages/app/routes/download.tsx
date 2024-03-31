import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { useActionData } from "@remix-run/react";

export const action = async ({ context, request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const icon = formData.get("icon");
	const text = formData.get("text");

	const { env } = context.cloudflare;
	const resp = await env.GENERATOR.fetch("http://localhost:8787", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ icon, text }),
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
