import type { GenerateService } from "ip-imggenerator/src/index";
import type { PlatformProxy } from "wrangler";

interface Env {
	GENERATOR: Service<GenerateService>;
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
	interface AppLoadContext {
		cloudflare: Cloudflare;
	}
}
