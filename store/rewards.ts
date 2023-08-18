import { MutationTree, ActionTree, GetterTree } from "vuex"

// Types
import { RewardsService } from "@nft-types"

export const state = () => ({
	loading: false,
	list: [] as RewardsService.Reward[],
	editable: null as number | null
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
	setLoading(state, loading: boolean) {
		state.loading = loading
	},
	setRewardsList(state, rewards: RewardsService.Reward[]) {
		state.list = rewards
	},
	addToList(state, reward: RewardsService.Reward) {
		state.list = [reward, ...state.list]
	},
	deleteReward(state, id: number) {
		state.list = state.list.filter((reward) => reward.id !== id)
	},
	setEditableReward(state, id: number | null) {
		state.editable = id
	}
}

export const actions: ActionTree<RootState, RootState> = {
	async fetchRewards({ commit }) {
		commit("setLoading", true)

		try {
			const rewards = await this.$rewardsApi.getList()
			// @ts-ignore
			commit("setRewardsList", rewards.list)
		} catch (e) {
			commit("setRewardsList", [])
		} finally {
			commit("setLoading", false)
		}
	},
	async create(
		{ commit },
		body: RewardsService.CreateBody
	): Promise<RewardsService.Reward> {
		commit("setLoading", true)

		const reward = await this.$rewardsApi.create(body)

		commit("addToList", reward)
		commit("setLoading", false)

		return reward
	},

	async update(
		{ commit },
		data: { id: number; body: Partial<RewardsService.CreateBody> }
	) {
		commit("setLoading", true)

		await this.$rewardsApi.update(data.id, data.body)

		commit("setLoading", false)
	},
	async delete({ commit }, id: number) {
		commit("setLoading", true)

		await this.$rewardsApi.remove(id)

		commit("deleteGame", id)
		commit("setLoading", false)
	}
}

export const getters: GetterTree<RootState, RootState> = {
	getList: (state) => state.list,
	getLoading: (state) => state.loading,
	getEditableReward: (state) =>
		state.list.find((item) => item.id === state.editable) || {}
}
