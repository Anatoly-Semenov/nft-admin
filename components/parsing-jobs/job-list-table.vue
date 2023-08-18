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
		<div slot="progressLeftMs" slot-scope="text, { progressLeftMs }">
			<p>{{ parseInt(progressLeftMs / 1000 / 60) }} min</p>
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
	name: "job-list-table",
	computed: {
		...mapGetters({
			getJobList: "parsing-jobs/getJobList",
			isLoading: "parsing-jobs/getLoading"
		}),
		data(): JobsTableRow[] {
			return this.isLoading ? this.loadingList : this.getJobList
		},
		columns(): UiTableColumn[] {
			return [
				{
					title: "ID",
					dataIndex: "progressId",
					key: "progressId"
				},
				{
					title: "Status",
					dataIndex: "progressStatus",
					key: "progressStatus"
				},
				{
					title: "Reason",
					dataIndex: "progressReason",
					key: "progressReason"
				},
				{
					title: "Start",
					dataIndex: "progressStart",
					key: "progressStart"
				},
				{
					title: "End",
					dataIndex: "progressEnd",
					key: "progressEnd"
				},
				{
					title: "Current",
					dataIndex: "progressCurrent",
					key: "progressCurrent"
				},
				{
					title: "Left",
					dataIndex: "progressLeftMs",
					key: "progressLeftMs",
					scopedSlots: { customRender: "progressLeftMs" }
				},
				{
					title: "Type",
					dataIndex: "progressType",
					key: "progressType"
				}
			]
		},
		loadingList(): JobsTableRow[] {
			return [0, 1, 2, 3].map((id) => ({
				id,
				title: "Loading"
			}))
		}
	}
})
</script>
