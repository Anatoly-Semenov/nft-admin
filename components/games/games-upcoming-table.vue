<template>
	<a-table
		:columns="columns"
		:dataSource="data"
		:pagination="false && pagination"
		:rowKey="({ id }) => id"
		:loading="isLoading"
		key="table-upcoming-games"
		:scroll="{ x: '100%', y: 1000 }"
	>
		<!--	 title		-->
		<div class="games-table__title" slot="game_title">Upcoming games</div>

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

		<div slot="release_date" slot-scope="release_date">
			<p>{{ release_date || "N/A" }}</p>
		</div>

		<div slot="marketplace" slot-scope="text, { marketplace }">
			<a
				v-if="marketplace"
				class="games-table__marketplace"
				:href="marketplace"
				target="_blank"
			>
				<ui-icon iconType="ant-design" type="link" />
				{{ marketplace }}
			</a>
			<p v-else>N/A</p>
		</div>

		<div slot="ino_date" slot-scope="ino_date">
			<p>{{ ino_date || "N/A" }}</p>
		</div>

		<div slot="token" slot-scope="token">
			<p>{{ token || "N/A" }}</p>
		</div>

		<div slot="ido_date" slot-scope="ido_date">
			<p>{{ ido_date || "N/A" }}</p>
		</div>

		<template
			v-for="social in socials"
			:slot="social"
			slot-scope="text, { communities }"
		>
			<ui-statistic
				v-if="communities[social]"
				:data="communities[social].members_count"
				:deltaValue="communities[social].members_growth_percentage"
				deltaValueType="percents"
				:key="social"
			/>
			<p v-else :key="social">-</p>
		</template>

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

interface UpcomingGameTableRow {
	id: number
	ino_date: null | string
	ido_date: null | string
	is_upcoming: true
	logo: string
	marketplace: null | string
	release_date: string
	site: string
	title: string
	token: string
}

export default Vue.extend({
	name: "games-upcoming-table",
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
			socials: ["twitter", "discord", "telegram"] as string[],
			pagination: {
				total: 100,
				pageSize: 10,
				current: 1
			}
		}
	},
	computed: {
		...mapGetters({
			getUpcomingGames: "games/getUpcomingGames",
			isLoading: "games/getLoading"
		}),
		columnWidth(): number | false {
			return this.screenWidth >= 1024 ? 160 : 200
		},
		data(): UpcomingGameTableRow[] | GameService.UpcomingGame[] {
			return this.isLoading ? this.loadingList : this.getUpcomingGames
		},
		columns(): UiTableColumn[] {
			return [
				{
					dataIndex: "game",
					key: "game",
					slots: { title: "game_title" },
					scopedSlots: { customRender: "game" },
					align: "left",
					fixed: "left",
					width: 180
				},
				{
					title: "Marketplace",
					dataIndex: "marketplace",
					key: "marketplace",
					scopedSlots: { customRender: "marketplace" },
					align: "center"
				},
				{
					title: "INO",
					dataIndex: "ino_date",
					key: "ino_date",
					scopedSlots: { customRender: "ino_date" },
					align: "center"
				},
				{
					title: "Game release",
					dataIndex: "release_date",
					key: "release_date",
					scopedSlots: { customRender: "release_date" },
					align: "center"
				},
				{
					title: "IDO",
					dataIndex: "ido_date",
					key: "ido_date",
					scopedSlots: { customRender: "ido_date" },
					align: "center"
				},
				{
					title: "Token",
					dataIndex: "token",
					key: "token",
					scopedSlots: { customRender: "token" },
					align: "center"
				},
				{
					title: "Twitter",
					dataIndex: "twitter",
					key: "twitter",
					scopedSlots: { customRender: "twitter" },
					align: "center"
				},
				{
					title: "Discord",
					dataIndex: "discord",
					key: "discord",
					scopedSlots: { customRender: "discord" },
					align: "center"
				},
				{
					title: "Telegram",
					dataIndex: "telegram",
					key: "telegram",
					scopedSlots: { customRender: "telegram" },
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
		loadingList(): UpcomingGameTableRow[] {
			return [0, 1, 2, 3].map((id) => {
				return {
					id: id,
					ino_date: "Loading",
					ido_date: "Loading",
					is_upcoming: true,
					logo: "Loading",
					marketplace: "Loading",
					release_date: "Loading",
					site: "Loading",
					title: "Loading",
					token: "Loading",
					communities: {
						twitter: null,
						discord: null,
						telegram: null
					}
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
