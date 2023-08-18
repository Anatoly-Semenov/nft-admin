<template>
	<div>
		<a-button @click="modalVisible = true">
			<ui-icon iconType="ant-design" type="plus" color="#333333" />
			Add contract
		</a-button>

		<contract-form
			:visible="modalVisible"
			:isToken="false"
			@cancel="cancelModal"
			@submit="handleSubmit"
		/>

		<a-table
			:columns="columns"
			:dataSource="data"
			:rowKey="(item, key) => key"
			:loading="isLoading"
			:pagination="false"
			key="table-game-wallet"
		>
			<!--	 title		-->
			<div class="game-wallet-table__title" slot="game-wallet_title">
				Game Wallets
			</div>

			<!--	 Row		-->
			<div slot="gameId" slot-scope="text, { gameId }">
				<p>{{ getGameNameById(gameId) }}</p>
			</div>

			<div slot="actions" slot-scope="text, record">
				<a @click="edit(record.id)">Edit</a>

				<a-divider type="vertical" />

				<a-popconfirm
					title="Sure to delete?"
					@confirm="() => remove(record.id)"
				>
					<a type="link">Delete</a>
				</a-popconfirm>
			</div>
		</a-table>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapActions, mapGetters, mapMutations } from "vuex"

// Types
import contractForm from "~/components/parsing-jobs/contract-form.vue"

// Types
import { UiTableColumn } from "~/types/ui-kit/ui-table"
import type { JobService } from "@nft-types"

interface JobsTableRow {
	id: number
	title: string
}

export default Vue.extend({
	name: "game-wallet-table",
	components: { contractForm },
	mounted(): void {
		window.addEventListener("resize", this.setWidth)
		this.setWidth()
	},
	destroyed(): void {
		window.removeEventListener("resize", this.setWidth)
	},
	async fetch() {
		await Promise.all([this.fetchList(), this.fetchGameList()])
	},
	data() {
		return {
			screenWidth: 0 as number,
			modalVisible: false as boolean
		}
	},
	computed: {
		...mapGetters({
			list: "parsing-jobs/getContractList",
			isLoading: "parsing-jobs/getLoading",
			gameList: "games/getList"
		}),
		columnWidth(): number | false {
			return this.screenWidth >= 1024 ? 200 : 240
		},
		data(): JobsTableRow[] {
			return this.isLoading ? this.loadingList : this.list
		},
		columns(): UiTableColumn[] {
			return [
				{
					title: "ID",
					dataIndex: "id",
					key: "id"
				},
				{
					title: "Game ID",
					dataIndex: "gameId",
					key: "gameId",
					scopedSlots: { customRender: "gameId" }
				},
				{
					title: "Address",
					dataIndex: "address",
					key: "address"
				},
				{
					title: "Title",
					dataIndex: "title",
					key: "title"
				},
				{
					title: "Actions",
					dataIndex: "actions",
					key: "actions",
					scopedSlots: { customRender: "actions" },
					width: this.columnWidth,
					align: "center"
				}
			]
		},
		loadingList(): JobsTableRow[] {
			return [0, 1, 2, 3].map((id) => ({
				id,
				title: "Loading"
			}))
		}
	},
	methods: {
		...mapMutations({
			setEditableGame: "parsing-jobs/setEditableContract"
		}),
		...mapActions({
			fetchList: "parsing-jobs/fetchGameWalletList",
			fetchGameList: "games/fetchGames",
			saveContract: "parsing-jobs/saveGameWallet",
			deleteContract: "parsing-jobs/deleteGameWallet"
		}),
		setWidth(): void {
			this.screenWidth = window.innerWidth
		},
		edit(id: number) {
			this.setEditableGame(id)
			this.modalVisible = true
		},
		async remove(id: number) {
			await this.deleteContract(id)
			this.fetchList()
		},
		cancelModal() {
			this.modalVisible = false
			this.setEditableGame(null)
		},
		async handleSubmit(values: JobService.Contract) {
			try {
				await this.saveContract(values)
				this.cancelModal()
				this.fetchList()
			} catch (error) {
				if (error instanceof Error) {
					this.$message.error(error.message)
				}
			}
		},
		getGameNameById(id: number) {
			if (this.isLoading) return "Loading"

			if (!id) return "-= No Game =-"

			const game = this.gameList.find((item: any) => item.id === id)
			return game?.title || id
		}
	}
})
</script>
