<template>
	<div class="addresses-table">
		<ui-tabs v-model="activeTab" @change="activeTab = $event">
			<a-tab-pane
				v-for="({ name, component }, index) in tabs"
				:key="`${index + 1}`"
				:tab="name"
			>
				<transition name="fade-in">
					<component :is="component" v-if="activeTab === `${index + 1}`" />
				</transition>
			</a-tab-pane>
		</ui-tabs>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapActions } from "vuex"

// Components
import gameContractTable from "~/components/parsing-jobs/game-contract-table.vue"
import gameWalletTable from "~/components/parsing-jobs/game-wallet-table.vue"
import tokenContractTable from "~/components/parsing-jobs/token-contract-table.vue"

export default Vue.extend({
	name: "page-addresses",
	layout: "index",
	transition: "fade-in",
	data() {
		return {
			activeTab: "1" as string,
			tabs: [
				{
					name: "Game Contracts",
					component: gameContractTable
				},
				{
					name: "Token Contracts",
					component: tokenContractTable
				},
				{
					name: "Game Wallets",
					component: gameWalletTable
				}
			]
		}
	},
	methods: {
		...mapActions({
			fetchGames: "parsing-jobs/fetchGames",
			startJob: "parsing-jobs/startJob",
			stopJob: "parsing-jobs/stopJob"
		})
	}
})
</script>
