<template>
	<div class="profile">
		<div class="profile__info">
			<ui-avatar :src="logo" />
			<p class="profile__info-name">{{ user.walletAddress }}</p>
		</div>
		<div class="profile__social">
			<ui-connect title="Discord" type="discord" />
			<ui-connect title="Twitter" type="twitter" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "page-profile",
	layout: "index",
	middleware: "auth",
	transition: "fade-in",
	data() {
		return {
			logo: require("~/assets/img/metamask-avatar.png")
		}
	},
	computed: {
		...mapGetters({
			user: "auth/getUser"
		})
	}
}
</script>
