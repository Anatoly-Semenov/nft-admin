<template>
	<a-table
		:columns="columns"
		:dataSource="data"
		:pagination="false"
		:rowKey="(item, key) => key"
		:loading="isLoading"
		key="table-jobs"
	>
		<!--	 title		-->
		<div class="jobs-table__title" slot="jobs_title">Jobs</div>

		<!--	 Row		-->
		<div slot="actions" slot-scope="text, record">
			<a @click="start(record.gameId)">Start</a>

			<a-divider type="vertical" />

			<a-popconfirm title="Sure to stop?" @confirm="() => stop(record.gameId)">
				<a type="link">Stop</a>
			</a-popconfirm>

			<a-divider type="vertical" />

			<a @click="view(record.gameId)">View</a>
		</div>
	</a-table>
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"

// Types
import { UiTableColumn } from "~/types/ui-kit/ui-table"

interface JobsTableRow {
	id: number
	title: string
}

export default Vue.extend({
	name: "game-list-table",
	mounted(): void {
		window.addEventListener("resize", this.setWidth)
		this.setWidth()
	},
	destroyed(): void {
		window.removeEventListener("resize", this.setWidth)
	},
	data() {
		return {
			screenWidth: 0 as number
		}
	},
	computed: {
		...mapGetters({
			getGameList: "parsing-jobs/getGameList",
			isLoading: "parsing-jobs/getLoading"
		}),
		columnWidth(): number | false {
			return this.screenWidth >= 1024 ? 200 : 240
		},
		data(): JobsTableRow[] {
			return this.isLoading ? this.loadingList : this.getGameList
		},
		columns(): UiTableColumn[] {
			return [
				{
					title: "ID",
					dataIndex: "gameId",
					key: "gameId"
				},
				{
					title: "Game Title",
					dataIndex: "gameTitle",
					key: "gameTitle"
				},
				{
					title: "Status",
					dataIndex: "progressStatus",
					key: "progressStatus"
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
		setWidth(): void {
			this.screenWidth = window.innerWidth
		},
		start(id: number) {
			this.$emit("start", id)
		},
		stop(id: number) {
			this.$emit("stop", id)
		},
		view(id: number) {
			this.$emit("view", id)
		}
	}
})
</script>
