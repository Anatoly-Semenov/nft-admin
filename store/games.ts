import { MutationTree, ActionTree, GetterTree } from "vuex"

import type { GameService } from "@nft-types"
import { SocialService } from "@nft-types"

export const state = () => ({
	loading: false,
	list: [] as GameService.GameDetail[],
	upcomingList: [] as GameService.UpcomingGame[],
	upcomingListCount: 0,
	editable: null as number | null
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
	setLoading(state, loading: boolean) {
		state.loading = loading
	},
	setGamesList(state, games: GameService.GameDetail[]) {
		state.list = games
	},
	setUpcomingList(state, games: GameService.UpcomingGame[]) {
		state.upcomingList = games
	},
	setUpcomingListCount(state, count: number) {
		state.upcomingListCount = count
	},
	addGameToList(state, game: GameService.GameDetail) {
		state.list = [game, ...state.list]
	},
	deleteGame(state, id: number) {
		state.list = state.list.filter((game) => game.id !== id)
	},
	setEditableGame(state, id: number | null) {
		state.editable = id
	}
}

export const actions: ActionTree<RootState, RootState> = {
	async fetchGames({ commit }) {
		commit("setLoading", true)

		try {
			const games = await this.$gameApi.getList()
			commit("setGamesList", games)
		} catch (e) {
			commit("setGamesList", [])
		} finally {
			commit("setLoading", false)
		}
	},
	async fetchUpcomingGames({ commit }) {
		commit("setLoading", true)

		try {
			const games = await this.$gameApi.getUpcomingGames()

			if (games.items) {
				commit("setUpcomingList", games.items)
				commit("setUpcomingListCount", games.count)
			}
		} catch (e) {
			commit("setUpcomingList", [])
		} finally {
			commit("setLoading", false)
		}
	},
	async create(
		{ commit },
		body: GameService.GameDetail
	): Promise<GameService.Game> {
		commit("setLoading", true)

		const game = await this.$gameApi.create(body)

		commit("addGameToList", game)
		commit("setLoading", false)

		return game
	},
	async addAdditionalInfo(
		{ commit },
		data: { id: string; body: Partial<GameService.Additional> }
	) {
		commit("setLoading", true)

		try {
			const info = await this.$gameApi.addAdditionalInfo(data.id, data.body)

			if (info) {
				const games = await this.$gameApi.getUpcomingGames()
				commit("setUpcomingList", games.items)
				commit("setUpcomingListCount", games.count)
			}
		} catch (error) {
			console.log(error)
		} finally {
			commit("setLoading", false)
		}
	},
	async addSocialChannel(
		{ commit },
		data: {
			id: string
			body: {
				channel: string
				service: SocialService.ServiceList
			}
		}
	) {
		commit("setLoading", true)

		try {
			const info = await this.$gameApi.addSocialChannel(data.id, data.body)

			if (info) {
				const games = await this.$gameApi.getUpcomingGames()
				commit("setUpcomingList", games.items)
				commit("setUpcomingListCount", games.count)
			}
		} catch (error) {
			console.log(error)
		} finally {
			commit("setLoading", false)
		}
	},
	async update(
		{ commit, state },
		data: { id: number; body: GameService.Game }
	) {
		commit("setLoading", true)

		await this.$gameApi.update(data.id.toString(), data.body)

		commit("setLoading", false)
	},
	async delete({ commit }, id: number) {
		commit("setLoading", true)

		await this.$gameApi.delete(id.toString())

		commit("deleteGame", id)
		commit("setLoading", false)
	}
}

export const getters: GetterTree<RootState, RootState> = {
	getList: (state) => state.list,
	getOptions: (state) => state.list.filter((game) => !game.is_upcoming),
	getUpcomingGames: (state) => state.upcomingList,
	getLoading: (state) => state.loading,
	getUpcomingEditableGame: (state) =>
		state.upcomingList.find((item) => item.id === state.editable),
	getEditableGame: (state) => {
		const game = state.list.find((item) => item.id === state.editable)
		const { links = [], ...additional } =
			state.upcomingList.find((item) => item.id === state.editable) || {}

		return { ...game, additional, links }
	}
}
