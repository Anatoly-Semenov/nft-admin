// Types
import type { ActionTree, GetterTree, MutationTree } from "vuex"
import type { JobService } from "@nft-types"

type Job = JobService.Job
type JobGames = JobService.JobGames
type Contract = JobService.Contract

export const state = () => ({
	loading: false,
	gameList: [] as JobGames[],
	jobList: [] as Job[],
	contractList: [] as Contract[],
	editable: null as number | null
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
	setLoading(state, loading: boolean) {
		state.loading = loading
	},
	setGameList(state, list: JobGames[]) {
		state.gameList = list
	},
	setJobList(state, list: Job[]) {
		state.jobList = list
	},
	setContractList(state, list: Contract[]) {
		state.contractList = list
	},
	setEditableContract(state, id: number | null) {
		state.editable = id
	}
}

export const actions: ActionTree<RootState, RootState> = {
	async fetchGames({ commit }) {
		commit("setLoading", true)

		try {
			const jobs = await this.$jobsApi.getGameList()

			commit("setGameList", jobs)
		} catch (e) {
			commit("setGameList", [])
		} finally {
			commit("setLoading", false)
		}
	},
	async fetchJobs({ commit }, gameId: JobGames["gameId"]) {
		commit("setLoading", true)

		try {
			const jobs = await this.$jobsApi.getJobList(gameId)
			commit("setJobList", jobs)
		} catch (e) {
			commit("setJobList", [])
		} finally {
			commit("setLoading", false)
		}
	},
	async startJob({ commit }, gameId: JobGames["gameId"]): Promise<void> {
		commit("setLoading", true)
		await this.$jobsApi.startJob(gameId)

		const jobs = await this.$jobsApi.getGameList()
		commit("setGameList", jobs)

		commit("setLoading", false)
	},
	async stopJob({ commit }, gameId: JobGames["gameId"]): Promise<void> {
		commit("setLoading", true)
		await this.$jobsApi.stopJob(gameId)

		const jobs = await this.$jobsApi.getGameList()
		commit("setGameList", jobs)

		commit("setLoading", false)
	},
	async fetchGameContractList({ commit }) {
		commit("setLoading", true)

		try {
			const list = await this.$jobsApi.getGameContractList()

			commit("setContractList", list)
		} catch (e) {
			commit("setContractList", [])
		} finally {
			commit("setLoading", false)
		}
	},
	async saveGameContract({ commit }, body: Contract): Promise<Contract> {
		commit("setLoading", true)

		const entity = await this.$jobsApi.saveGameContract(body)

		commit("setLoading", false)

		return entity
	},
	async deleteGameContract({ commit }, id: number) {
		commit("setLoading", true)

		await this.$jobsApi.deleteGameContract(id.toString())

		commit("setLoading", false)
	},
	async fetchTokenContractList({ commit }) {
		commit("setLoading", true)

		try {
			const list = await this.$jobsApi.getTokenContractList()

			commit("setContractList", list)
		} catch (e) {
			commit("setContractList", [])
		} finally {
			commit("setLoading", false)
		}
	},
	async saveTokenContract({ commit }, body: Contract): Promise<Contract> {
		commit("setLoading", true)

		const entity = await this.$jobsApi.saveTokenContract(body)

		commit("setLoading", false)

		return entity
	},
	async deleteTokenContract({ commit }, id: number) {
		commit("setLoading", true)

		await this.$jobsApi.deleteTokenContract(id.toString())

		commit("setLoading", false)
	},
	async fetchGameWalletList({ commit }) {
		commit("setLoading", true)

		try {
			const list = await this.$jobsApi.getGameWalletList()

			commit("setContractList", list)
		} catch (e) {
			commit("setContractList", [])
		} finally {
			commit("setLoading", false)
		}
	},
	async saveGameWallet({ commit }, body: Contract): Promise<Contract> {
		commit("setLoading", true)

		const entity = await this.$jobsApi.saveGameWallet(body)

		commit("setLoading", false)

		return entity
	},
	async deleteGameWallet({ commit }, id: number) {
		commit("setLoading", true)

		await this.$jobsApi.deleteGameWallet(id.toString())

		commit("setLoading", false)
	}
}

export const getters: GetterTree<RootState, RootState> = {
	getGameList: (state) => state.gameList,
	getJobList: (state) => state.jobList,
	getContractList: (state) => state.contractList,
	getLoading: (state) => state.loading,
	getEditableContract: (state) => {
		return state.contractList.find((item) => item.id === state.editable)
	}
}
