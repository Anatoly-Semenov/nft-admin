<template>
	<div>
		<div class="giveaway-space-vertical">
			<nuxt-link to="/giveaway/create">
				<a-button type="primary">Create</a-button>
			</nuxt-link>
		</div>
		<div class="giveaway__container">
			<giveaway-card
				class="giveaway__container-item"
				v-for="(item, index) in giveawayList"
				:key="index"
				:id="item.id"
				:title="item.title"
				:description="item.description"
			/>
		</div>
		<div class="giveaway__pagination">
			<a-pagination
				v-model="page"
				:defaultPageSize="limit"
				:total="giveawayListCount"
				@change="onChangePage"
				show-less-items
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapActions, mapGetters } from "vuex"
import GiveawayCard from "~/components/giveaway/giveaway-card.vue"

export default Vue.extend({
	components: { GiveawayCard },
	name: "page-giveaway",
	layout: "index",
	transition: "fade-in",
	data() {
		return {
			page: 1 as number,
			offset: 0 as number,
			limit: 4 as number
		}
	},
	methods: {
		...mapActions({
			fetchGiveawayListAll: "giveaway/fetchGiveawayListAll"
		}),
		async onChangePage(page: number): Promise<void> {
			this.offset = (page - 1) * this.limit

			await this.fetchGiveawayListAll({
				limit: this.limit,
				offset: this.offset
			})
		}
	},
	computed: {
		...mapGetters({
			loading: "giveaway/getLoading",
			giveawayList: "giveaway/getList",
			giveawayListCount: "giveaway/getListCount"
		})
	},
	async mounted() {
		await this.fetchGiveawayListAll({
			limit: this.limit,
			offset: this.offset
		})
	}
})
</script>
