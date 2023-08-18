<template>
	<a-card :title="title" :bordered="true">
		<span>{{ description }}</span>
		<template #actions>
			<nuxt-link :to="openLink">
				<span>Open</span>
			</nuxt-link>
		</template>
	</a-card>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
	name: "giveaway-card",
	props: {
		id: {
			type: Number,
			default: -1
		},
		title: {
			type: String,
			default: ""
		},
		description: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			openLink: `/giveaway/${this.id}`
		}
	}
})
</script>
