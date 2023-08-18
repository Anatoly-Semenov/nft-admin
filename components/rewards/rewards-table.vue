<template>
	<a-table
		:columns="columns"
		:dataSource="data"
		:pagination="false && pagination"
		:rowKey="({ id }) => id"
		:loading="isLoading"
		key="rewards-table"
		:scroll="{ x: '100%', y: 1000 }"
	>
		<!--	 title		-->
		<div class="rewards-table__title" slot="reward_title">Title</div>

		<!--	 Row		-->
		<div
			slot="reward"
			slot-scope="text, { name, image }"
			class="rewards-table__item"
		>
			<ui-avatar :src="image" />

			<div class="rewards-table__info">
				<p class="rewards-table__name">{{ name }}</p>
			</div>
		</div>

		<div slot="amount" slot-scope="text, { amount, currency }">
			<p>{{ amount || "N/A" }} {{ currency }}</p>
		</div>

		<div slot="description" slot-scope="description">
			<p>{{ description || "N/A" }}</p>
		</div>

		<div slot="link" slot-scope="link">
			<p>
				<a v-if="link" :href="link" target="_blank">Link</a>
				<span v-else>N/A</span>
			</p>
		</div>

		<div slot="startedAt" slot-scope="startedAt">
			<p>{{ new Date(startedAt).toLocaleDateString() || "N/A" }}</p>
		</div>

		<div slot="endedAt" slot-scope="endedAt">
			<p>{{ new Date(endedAt).toLocaleDateString() || "N/A" }}</p>
		</div>

		<div slot="actions" slot-scope="text, record">
			<a @click="edit(record.id)">Edit</a>

			<a-divider type="vertical" />

			<a-popconfirm title="Sure to delete?" @confirm="() => remove(record.id)">
				<a type="link">Delete</a>
			</a-popconfirm>
		</div>
	</a-table>
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"

// Types
import type { RewardsService } from "@nft-types"
import type { UiTableColumn } from "~/types/ui-kit/ui-table"

export default Vue.extend({
	name: "rewards-table",
	mounted(): void {
		window.addEventListener("resize", this.setWidth)
		this.setWidth()
	},
	destroyed(): void {
		window.removeEventListener("resize", this.setWidth)
	},
	data() {
		return {
			screenWidth: 0 as number,
			pagination: {
				total: 1000,
				pageSize: 10,
				current: 1
			}
		}
	},
	computed: {
		...mapGetters({
			getList: "rewards/getList",
			isLoading: "rewards/getLoading"
		}),
		columnWidth(): number | false {
			return this.screenWidth >= 1024 ? 160 : 200
		},
		data(): RewardsService.Reward[] {
			return this.isLoading ? this.loadingList : this.getList
		},
		columns(): UiTableColumn[] {
			return [
				{
					dataIndex: "reward",
					key: "reward",
					slots: { title: "reward_title" },
					scopedSlots: { customRender: "reward" },
					align: "left",
					fixed: "left",
					width: 180
				},
				{
					dataIndex: "amount",
					key: "amount",
					title: "Amount",
					slots: { title: "reward_amount" },
					scopedSlots: { customRender: "amount" },
					align: "center"
				},
				{
					title: "Description",
					dataIndex: "description",
					key: "description",
					scopedSlots: { customRender: "description" },
					align: "center"
				},
				{
					title: "Link",
					dataIndex: "link",
					key: "link",
					scopedSlots: { customRender: "link" },
					align: "center"
				},
				{
					title: "From",
					dataIndex: "startedAt",
					key: "startedAt",
					scopedSlots: { customRender: "startedAt" },
					align: "center"
				},
				{
					title: "To",
					dataIndex: "endedAt",
					key: "endedAt",
					scopedSlots: { customRender: "endedAt" },
					align: "center"
				},
				{
					title: "Actions",
					dataIndex: "actions",
					key: "actions",
					scopedSlots: { customRender: "actions" },
					align: "center"
				}
			]
		},
		loadingList(): RewardsService.Reward[] {
			return [0, 1, 2, 3].map((id) => {
				return {
					id,
					name: "Loading",
					amount: 0,
					currency: "Loading",
					description: "Loading",
					startedAt: "Loading",
					endedAt: "Loading",
					createdAt: "Loading"
				}
			})
		}
	},
	methods: {
		setWidth(): void {
			this.screenWidth = window.innerWidth
		},
		edit(id: number) {
			this.$emit("edit", id)
		},
		remove(id: number) {
			this.$emit("delete", id)
		}
	}
})
</script>
