import type { ActionFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{
			name: "description",
			content: "Welcome to Remix! Using Vite and Cloudflare!",
		},
	];
};

export default function Index() {
	return (
		<>
			<div>hello</div>
			<Form action="/download" method="post" reloadDocument>
				<input name="icon" type="text" />
				<input name="text" type="text" />
				<button type="submit">Submit</button>
			</Form>
		</>
	);
}
