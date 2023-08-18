// Services
import {
	AuthService,
	UserService,
	NftService,
	GiveawayService,
	GameService,
	JobsService,
	RewardsService
} from "@nft-requests"

// Types
import type { Plugin } from "@nuxt/types"
import type { NuxtCookies } from "cookie-universal-nuxt"

declare module "vue/types/vue" {
	interface Vue {
		$authApi: AuthService
		$userApi: UserService
		$nftApi: NftService
		$giveawayApi: GiveawayService
		$gameApi: GameService
		$jobsApi: JobsService
		$rewardsApi: RewardsService
	}
}

declare module "@nuxt/types" {
	interface NuxtAppOptions {
		$authApi: AuthService
		$userApi: UserService
		$nftApi: NftService
		$gameApi: GameService
		$cookies: NuxtCookies
		$giveawayApi: GiveawayService
		$jobsApi: JobsService
		$rewardsApi: RewardsService
	}

	interface Context {
		$authApi: AuthService
		$userApi: UserService
		$nftApi: NftService
		$giveawayApi: GiveawayService
		$gameApi: GameService
		$jobsApi: JobsService
		$rewardsApi: RewardsService
	}
}

declare module "vuex/types/index" {
	interface Store<S> {
		$authApi: AuthService
		$userApi: UserService
		$nftApi: NftService
		$giveawayApi: GiveawayService
		$gameApi: GameService
		$jobsApi: JobsService
		$rewardsApi: RewardsService
	}
}

const apiPlugin: Plugin = (ctx, inject) => {
	const userService = new UserService(ctx)
	const authService = new AuthService(ctx)
	const nftService = new NftService(ctx)
	const gameService = new GameService(ctx)
	const giveawayApi = new GiveawayService(ctx)
	const jobsService = new JobsService(ctx)
	const rewardsService = new RewardsService(ctx)

	inject("userApi", userService)
	inject("authApi", authService)
	inject("nftApi", nftService)
	inject("giveawayApi", giveawayApi)
	inject("gameApi", gameService)
	inject("jobsApi", jobsService)
	inject("rewardsApi", rewardsService)
}

export default apiPlugin
