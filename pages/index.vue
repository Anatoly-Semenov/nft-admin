<template>
	<div class="index">
		<a-list :grid="{ gutter: 16, column: 4 }" :data-source="data">
			<a-list-item slot="renderItem" slot-scope="{ title, route, img }">
				<a-card class="index__card" @click="$router.push(route)" :title="title">
					<img :src="img" />
				</a-card>
			</a-list-item>
		</a-list>
	</div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
	name: "page-index",
	layout: "index",
	transition: "fade-in",
	data() {
		return {
			data: [
				{
					img: require("~/assets/img/preview/preview-games.png"),
					title: "Games",
					route: "/games"
				},
				{
					img: require("~/assets/img/preview/preview-giveaway.png"),
					title: "Giveaway",
					route: "/giveaway"
				},
				{
					img: require("~/assets/img/preview/preview-parsing-jobs.png"),
					title: "Parsing jobs",
					route: "/parsing-jobs"
				}
			]
		}
	},
	methods: {}
})
</script>
