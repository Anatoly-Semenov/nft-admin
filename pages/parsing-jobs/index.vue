<template>
	<div class="parsing-jobs-table">
		<div class="games-table__actions">
			<a-button @click="goToAddresses">
				<ui-icon iconType="ant-design" type="plus" color="#333333" />
				Addresses
			</a-button>
		</div>

		<game-list-table @start="start" @stop="stop" @view="view" />
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapActions } from "vuex"

// Components
import gameListTable from "~/components/parsing-jobs/game-list-table.vue"

export default Vue.extend({
	name: "page-parsing-jobs",
	layout: "index",
	transition: "fade-in",
	components: { gameListTable },
	async fetch() {
		await Promise.all([this.fetchGames()])
	},
	methods: {
		...mapActions({
			fetchGames: "parsing-jobs/fetchGames",
			startJob: "parsing-jobs/startJob",
			stopJob: "parsing-jobs/stopJob"
		}),
		start(id: number) {
			this.startJob(id)
		},
		stop(id: number) {
			this.stopJob(id)
		},
		view(id: number) {
			this.$router.push({
				path: "/parsing-jobs/" + id
			})
		},
		goToAddresses() {
			this.$router.push({ path: "/parsing-jobs/addresses" })
		}
	}
})
</script>
