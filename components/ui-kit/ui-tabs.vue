<template>
	<a-tabs
		:defaultActiveKey="defaultKey"
		v-model="model"
		:size="size"
		:type="type"
		class="ui-tabs"
		@tabClick="tabClick"
	>
		<slot />
	</a-tabs>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"

// Types
import type { UiTabs } from "~/types"

export default Vue.extend({
	props: {
		value: String as PropOptions<string>,
		defaultKey: {
			type: String,
			default: "1"
		} as PropOptions<string>,
		type: {
			type: String,
			default: "line"
		} as PropOptions<UiTabs.Type>,
		size: {
			type: String,
			default: "default"
		} as PropOptions<UiTabs.Size>
	},
	computed: {
		model: {
			get(): string {
				return this.value
			},
			set(val: string): void {
				this.$emit("change", val)
			}
		}
	},
	methods: {
		tabClick(val: string) {
			this.$emit("tabClick", val)
		}
	}
})
</script>
