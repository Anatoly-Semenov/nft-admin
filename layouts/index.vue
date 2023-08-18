<template>
	<a-layout class="layout">
		<a-layout-sider v-model="isCollapsed" :trigger="null" collapsible>
			<div class="layout__logo">
				<img src="~/assets/img/skillabs-logo.png" />
			</div>
			<a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
				<a-menu-item
					v-for="({ text, route, iconType }, index) in menu"
					:key="index"
					@click="$router.push(route)"
				>
					<ui-icon iconType="ant-design" v-if="iconType" :type="iconType" />
					<span>{{ text }}</span>
				</a-menu-item>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-header class="layout__header">
				<div class="layout__header-intro">
					<button @click="isCollapsed = !isCollapsed">
						<a-icon
							class="layout__trigger"
							:type="isCollapsed ? 'menu-unfold' : 'menu-fold'"
						/>
					</button>
					<p class="layout__header-title">
						{{ title }}
					</p>
				</div>
				<ui-connect v-if="!isAuth" />
				<ui-dropdown
					v-else
					v-model="isDropProfile"
					@change="isDropProfile = !isDropProfile"
					placement="bottomRight"
				>
					<button slot="element">
						<ui-connect title="Add wallet" />
					</button>
					<ui-menu class="layout__header-dropdown" slot="drop">
						<ui-menu-item>
							<nuxt-link to="/profile">
								<ui-icon iconType="ant-design" type="user" />
								Profile
							</nuxt-link>
						</ui-menu-item>
						<ui-menu-item>
							<button @click="$logout">
								<ui-icon iconType="ant-design" type="logout" />
								Logout
							</button>
						</ui-menu-item>
					</ui-menu>
				</ui-dropdown>
			</a-layout-header>
			<a-layout-content class="layout__content">
				<Nuxt />
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"

// Components
import { Layout } from "ant-design-vue"
Vue.use(Layout)

// Interfaces
interface MenuItem {
	text: string
	route: string
	iconType?: string
}

export default Vue.extend({
	name: "index-layout",
	data() {
		return {
			isCollapsed: false as boolean,
			isDropProfile: false as boolean,
			screenWidth: 0 as number,
			headerLogo: require("~/assets/img/header-logo.png"),
			footerLogo: require("~/assets/img/logo.png")
		}
	},
	mounted(): void {
		window.addEventListener("resize", this.setWidth)
		this.setWidth()

		const errorMessage = this.$cookies.get("error-message")

		if (errorMessage) {
			this.$cookies.remove("error-message")
			this.$notification.error({
				message: "Connect error",
				description: errorMessage.toString()
			})
		}
	},
	destroyed(): void {
		window.removeEventListener("resize", this.setWidth)
	},
	computed: {
		...mapGetters({
			isAuth: "auth/getIsAuth"
		}),
		menu(): MenuItem[] {
			return [
				{
					text: "Home",
					route: "/",
					iconType: "home"
				},
				{
					text: "Games",
					route: "/games",
					iconType: "crown"
				},
				{
					text: "Giveaway",
					route: "/giveaway",
					iconType: "gift"
				},
				{
					text: "Parsing jobs",
					route: "/parsing-jobs",
					iconType: "radar-chart"
				},
				{
					text: "Rewards",
					route: "/rewards",
					iconType: "gift"
				},
				{
					text: "Ui-kit",
					route: "/ui-kit",
					iconType: "build"
				},
				{
					text: "Auth",
					route: "/login",
					iconType: "login"
				}
			]
		},
		title(): string {
			const route: string | null | undefined = this.$route?.name

			if (route === "index") {
				return "Home"
			}

			if (route) {
				const firstLetter: string = route[0].toUpperCase()

				return firstLetter + route.slice(1, route.length)
			}

			return ""
		}
	},
	methods: {
		setWidth(): void {
			this.screenWidth = window.innerWidth
		},
		toLink(link: string): void {
			window.open(link, "_blank")!.focus()
		}
	}
})
</script>
