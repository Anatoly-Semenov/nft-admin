<template>
	<a-table
		:columns="columns"
		:dataSource="data"
		:pagination="false && pagination"
		:rowKey="({ id }) => id"
		:loading="isLoading"
		key="table-upcoming-games"
	>
		<!--	 title		-->
		<div class="games-table__title" slot="game_title">Games</div>

		<!--	 Row		-->
		<div
			slot="game"
			slot-scope="text, { title, logo }"
			class="games-table__item"
		>
			<ui-avatar :src="logo" />
			<div class="games-table__info">
				<p class="games-table__name">{{ title }}</p>
			</div>
		</div>

		<div slot="description" slot-scope="description">
			<p>{{ description }}</p>
		</div>

		<div slot="site" slot-scope="site">
			<p>
				<a :href="site" target="_blank">{{ site }}</a>
			</p>
		</div>

		<div slot="genre" slot-scope="genre">
			<p>
				{{ genre }}
			</p>
		</div>

		<div slot="is_upcoming" slot-scope="is_upcoming">
			<p>{{ is_upcoming }}</p>
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
import type { GameService } from "@nft-types"
import type { UiTableColumn } from "~/types/ui-kit/ui-table"

interface GameTableRow {
	id: number
	title: string
	description: string
	genre: string
	logo?: string
	site: string
	min_investment_token: number
	token_title: string
	release_date: string
	chain_title: string
	in_use: boolean
	is_upcoming?: boolean
	code?: GameService.GameCode
}

export default Vue.extend({
	name: "games-list-table",
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
				total: 100,
				pageSize: 10,
				current: 1
			}
		}
	},
	computed: {
		...mapGetters({
			getGames: "games/getList",
			isLoading: "games/getLoading"
		}),
		columnWidth(): number | false {
			return this.screenWidth >= 1024 ? 160 : 200
		},
		data(): GameTableRow[] | GameService.UpcomingGame[] {
			return this.isLoading ? this.loadingList : this.getGames
		},
		columns(): UiTableColumn[] {
			return [
				{
					dataIndex: "game",
					key: "game",
					slots: { title: "game_title" },
					scopedSlots: { customRender: "game" },
					align: "left"
				},
				{
					title: "Description",
					dataIndex: "description",
					key: "description",
					scopedSlots: { customRender: "description" },
					align: "left"
				},
				{
					title: "Site",
					dataIndex: "site",
					key: "site",
					scopedSlots: { customRender: "site" },
					align: "center",
					width: 130
				},
				{
					title: "Genre",
					dataIndex: "genre",
					key: "genre",
					scopedSlots: { customRender: "genre" },
					align: "center"
				},
				{
					title: "Is upcoming",
					dataIndex: "is_upcoming",
					key: "is_upcoming",
					scopedSlots: { customRender: "is_upcoming" },
					align: "center"
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
		loadingList(): GameTableRow[] {
			return [0, 1, 2, 3].map((id) => ({
				id,
				title: "Loading",
				description: "Loading",
				genre: "Loading",
				logo: "Loading",
				site: "Loading",
				min_investment_token: 0,
				token_title: "Loading",
				release_date: "Loading",
				chain_title: "Loading",
				in_use: false,
				is_upcoming: false
			}))
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
