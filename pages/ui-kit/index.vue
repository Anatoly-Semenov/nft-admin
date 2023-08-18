<template>
	<div class="docs">
		<p class="docs__title">Ui-компоненты</p>

		<a-input-search
			class="docs__search"
			v-model="componentName"
			placeholder="Поиск"
			enter-button
			@search="onSearch"
		/>

		<a-list
			:grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4, xxxl: 5 }"
			:data-source="renderList"
			size="small"
		>
			<a-list-item slot="renderItem" slot-scope="{ route, title, img }">
				<nuxt-link :to="route">
					<a-card class="docs__card" :title="title">
						<img :src="img" />
					</a-card>
				</nuxt-link>
			</a-list-item>
		</a-list>
	</div>
</template>

<script lang="ts">
import Vue from "vue"

// Types
interface DataItem {
	title: string
	img: string
	route: string
}

// Lodash
import { cloneDeep } from "lodash"

export default Vue.extend({
	name: "ui-kit",
	layout: "index",
	data() {
		return {
			componentName: "",
			renderList: [] as DataItem[]
		}
	},
	created() {
		this.renderList = cloneDeep(this.list)
	},
	watch: {
		componentName(value): void {
			this.onSearch(value)
		}
	},
	computed: {
		list(): DataItem[] {
			const componentsNames: string[] = [
				"button",
				"avatar",
				"icon",
				"tag",
				"radio",
				"input",
				"tooltip",
				"tabs",
				"connect",
				"faq"
			]

			return componentsNames.map((name) => {
				return {
					title: `Ui-${name}`,
					img: require(`~/assets/img/ui-components/ui-${name}.png`),
					route: `/ui-kit/${name}`
				}
			})
		}
	},
	methods: {
		onSearch(value: string): void {
			this.renderList = cloneDeep(this.list).filter(({ title }: any) => {
				return title.toLowerCase().includes(value)
			})
		}
	}
})
</script>
