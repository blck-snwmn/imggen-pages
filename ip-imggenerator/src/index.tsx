import { RpcTarget, WorkerEntrypoint } from "cloudflare:workers";
import { zValidator } from "@hono/zod-validator";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import { Parser, jaModel } from "budoux";
import { Hono } from "hono";
// biome-ignore lint/style/useImportType: use satroi
import React from "react";
import satori from "satori";
import { z } from "zod";
//@ts-ignore
import resvgWasm from "./vendor/resvg.wasm";

// initialize budoux parser
const parser = new Parser(jaModel);

// initialize resvg
await initWasm(resvgWasm);

// initialize zod schema
const schema = z.object({
	icon: z.string().url(),
	name: z.string().min(1).max(20),
	hobby: z.string().min(1).max(20),
	favoriteFood: z.string().min(1).max(20),
	favoriteMovie: z.string().min(1).max(20),
	favoritePlace: z.string().min(1).max(20),
});

type Profile = z.infer<typeof schema>;

async function generate(profile: Profile) {
	const { icon, name, hobby, favoriteFood, favoriteMovie, favoritePlace } =
		profile;
	const fontData = await getGoogleFont();
	const svg = await satori(
		<ProfileCard
			name={name}
			hobby={hobby}
			favoriteFood={favoriteFood}
			favoriteMovie={favoriteMovie}
			iconUrl={icon}
			favoritePlace={favoritePlace}
		/>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Roboto",
					data: fontData,
					weight: 400,
					style: "normal",
				},
			],
		},
	);

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: "original",
		},
	});

	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();
	return pngBuffer;
}

const app = new Hono();

app.post("/", zValidator("json", schema), async (c) => {
	const prfile = c.req.valid("json");
	const pngBuffer = await generate(prfile);
	return new Response(pngBuffer, {
		headers: {
			"Content-Type": "image/png",
		},
	});
});

export default app;

async function getGoogleFont() {
	const familyResp = await fetch(
		"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700",
	);
	if (!familyResp.ok) {
		throw new Error("Failed to load font data");
	}
	const css = await familyResp.text();
	const resource = css.match(
		/src: url\((.+)\) format\('(opentype|truetype)'\)/,
	);
	if (!resource) {
		throw new Error("Failed to parse font data");
	}

	const fontDataResp = await fetch(resource[1]);
	return await fontDataResp.arrayBuffer();
}

interface InfoItemProps {
	label: string;
	value: string;
}

const InfoItem = ({ label, value }: InfoItemProps) => {
	return (
		<div style={styles.infoItem as React.CSSProperties}>
			<span style={styles.infoLabel}>{label}</span>
			<span style={styles.infoValue}>{value}</span>
		</div>
	);
};

interface ProfileCardProps {
	iconUrl: string;
	name: string;
	hobby: string;
	favoriteFood: string;
	favoriteMovie: string;
	favoritePlace: string;
}

const ProfileCard = ({
	iconUrl,
	name,
	hobby,
	favoriteFood,
	favoriteMovie,
	favoritePlace,
}: ProfileCardProps) => {
	const infoItems: InfoItemProps[] = [
		{ label: "名前", value: name },
		{ label: "趣味", value: hobby },
		{ label: "好きな食べ物", value: favoriteFood },
		{ label: "好きな映画", value: favoriteMovie },
		{ label: "お気に入りの場所", value: favoritePlace },
	];

	return (
		<div style={styles.card as React.CSSProperties}>
			<div style={styles.iconContainer as React.CSSProperties}>
				<img
					src={iconUrl}
					alt="Profile Icon"
					style={styles.icon as React.CSSProperties}
				/>
				<h2 style={styles.name as React.CSSProperties}>{name}</h2>
			</div>
			<div style={styles.infoContainer as React.CSSProperties}>
				{infoItems.map((item, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<InfoItem key={index} label={item.label} value={item.value} />
				))}
			</div>
		</div>
	);
};

const styles = {
	card: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "350px",
		padding: "20px",
		borderRadius: "10px",
		boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
		backgroundColor: "#e6f2ff",
	},
	iconContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginBottom: "20px",
	},
	icon: {
		width: "120px",
		height: "120px",
		borderRadius: "50%",
		objectFit: "cover",
		border: "3px solid #8c9db5",
	},
	name: {
		fontSize: "24px",
		fontWeight: "bold",
		marginTop: "10px",
		textAlign: "center",
	},
	infoContainer: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
	},
	infoItem: {
		display: "flex",
		flexDirection: "column",
		marginBottom: "25px",
		height: "50px",
	},
	infoLabel: {
		fontSize: "12px",
		fontWeight: "bold",
		color: "#8c9db5",
	},
	infoValue: {
		fontSize: "18px",
		display: "flex",
		alignItems: "center",
	},
};
