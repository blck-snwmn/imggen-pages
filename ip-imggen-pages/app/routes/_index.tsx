import type { ActionFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Create Image" },
		{
			name: "description",
			content: "Create Image",
		},
	];
};

const FormInput = ({ label, name }: { label: string; name: string }) => {
	return (
		<div className="mb-4">
			<label htmlFor={name} className="block text-gray-700 font-bold mb-2">
				{label}
			</label>
			<input
				type="text"
				id={name}
				name={name}
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
	);
};

const FormPage = () => {
	const formInputs = [
		{ label: "アイコン", name: "icon" },
		{ label: "名前", name: "name" },
		{ label: "趣味", name: "hobby" },
		{ label: "好きな食べ物", name: "favoriteFood" },
		{ label: "好きな映画", name: "favoriteMovie" },
		{ label: "お気に入りの場所", name: "favoritePlace" },
	];

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6">フォーム</h2>
				<Form method="POST" action="/download" reloadDocument>
					{formInputs.map((input, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<FormInput key={index} label={input.label} name={input.name} />
					))}
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-4 w-full"
					>
						送信
					</button>
				</Form>
			</div>
		</div>
	);
};

export default FormPage;
