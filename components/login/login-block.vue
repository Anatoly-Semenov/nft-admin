<template>
	<div class="login__block">
		<p class="login__block-title" v-if="title">{{ title }}</p>
		<p class="login__block-description" v-if="description">
			{{ description }}
		</p>
		<div class="login__block-buttons">
			<button
				class="login__block-button"
				v-for="({ logo, text, action }, index) in buttons"
				:key="index"
				@click="action"
			>
				{{ text }}
				<img :src="logo" />
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import mixins from "vue-typed-mixins"

// Mixins
import connectMixin from "~/mixins/connect"

// Lodash
import _debounce from "lodash/debounce"

// Types
import type { UiConnectType } from "~/types/ui-kit/ui-connect"
interface Button {
	logo: string
	text: string
	action: () => void
}

export default mixins(connectMixin).extend({
	name: "login-block",
	data() {
		return {
			title: "Connect to SkillLabs",
			description:
				"By connecting your wallet, you agree to our terms of Service and our Privacy Policy."
		}
	},
	computed: {
		buttons(): Button[] {
			const metamaskAuth = _debounce(() => this.metamaskAuth(), 250, {
				maxWait: 1000
			})
			const phantomAuth = _debounce(() => this.phantomAuth(), 250, {
				maxWait: 1000
			})
			const auth = (service: UiConnectType) => this.auth(service)

			const buttons: Button[] = [
				{
					logo: require("~/assets/img/auth-logo-metamask.png"),
					text: "Metamask",
					action: metamaskAuth
				},
				{
					logo: require("~/assets/img/auth-connect-phantom.png"),
					text: "Phantom",
					action: phantomAuth
				},
				{
					logo: require("~/assets/img/auth-logo-steam.png"),
					text: "Steam",
					action: () => {
						auth("steam")
					}
				},
				{
					logo: require("~/assets/img/auth-logo-epicgames.png"),
					text: "Epic Games",
					action: () => {
						auth("epicGames")
					}
				}
			]

			return buttons
		}
	}
})
</script>
