// Types
import type { MutationTree, ActionTree, GetterTree } from "vuex"
import type { GiveawayService, ResponseList } from "@nft-types"

type Giveaway = GiveawayService.Giveaway

export const state = () => ({
	loading: false,
	view: {} as Giveaway,
	list: [] as Giveaway[],
	listCount: 0 as number
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
	setLoading(state, loading: boolean) {
		state.loading = loading
	},
	setView(state, item: Giveaway) {
		state.view = item
	},
	setList(state, list: Giveaway[]) {
		state.list = list
	},
	setListCount(state, count: ResponseList<Giveaway>["count"]) {
		state.listCount = count
	}
}

export const actions: ActionTree<RootState, RootState> = {
	async fetchGiveaway({ commit }, giveawayId: Giveaway["id"]): Promise<void> {
		const giveaway = await this.$giveawayApi.getGiveaway(giveawayId)

		commit("setView", giveaway)
	},
	async fetchGiveawayList({ commit }): Promise<void> {
		const giveawayList = await this.$giveawayApi.getGiveawayList()

		commit("setList", giveawayList)
	},
	async fetchGiveawayListAll(
		{ commit },
		payload?: Partial<GiveawayService.Params>
	): Promise<void> {
		const { limit = 10, offset = 0 } = payload || {}

		const { items, count } = await this.$giveawayApi.getGiveawayListAll({
			limit,
			offset
		})

		commit("setList", items)
		commit("setListCount", count)
	},
	async updateGiveaway(
		{ commit },
		{ id, ...payload }: Giveaway
	): Promise<void> {
		const giveaway = await this.$giveawayApi.updateGiveaway(id, payload)

		commit("setView", giveaway)
	},
	async createGiveaway(
		{ commit },
		payload: Omit<Giveaway, "id">
	): Promise<void> {
		const giveaway = await this.$giveawayApi.createGiveaway(payload)

		commit("setView", giveaway)
	},
	async deleteGiveaway({ commit }, giveawayId: Giveaway["id"]): Promise<void> {
		await this.$giveawayApi.deleteGiveaway(giveawayId)
	}
}

export const getters: GetterTree<RootState, RootState> = {
	getLoading: (state) => state.loading,
	getView: (state) => state.view,
	getList: (state) => state.list,
	getListCount: (state) => state.listCount
}
