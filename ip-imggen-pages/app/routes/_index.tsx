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
const FormPage = () => {
	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6">フォーム</h2>
				<form>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-gray-700 font-bold mb-2"
						>
							名前
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-700 font-bold mb-2"
						>
							メールアドレス
						</label>
						<input
							type="text"
							id="email"
							name="email"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="phone"
							className="block text-gray-700 font-bold mb-2"
						>
							電話番号
						</label>
						<input
							type="text"
							id="phone"
							name="phone"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="address"
							className="block text-gray-700 font-bold mb-2"
						>
							住所
						</label>
						<input
							type="text"
							id="address"
							name="address"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="message"
							className="block text-gray-700 font-bold mb-2"
						>
							メッセージ
						</label>
						<input
							type="text"
							id="message"
							name="message"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
					>
						送信
					</button>
				</form>
			</div>
		</div>
	);
};

export default FormPage;
