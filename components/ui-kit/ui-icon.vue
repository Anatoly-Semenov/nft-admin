<template>
	<a-icon
		class="ui-icon"
		v-if="iconType === 'ant-design'"
		:type="type"
		:theme="theme"
		:style="{ color: color }"
	/>
	<component class="ui-icon" v-else :is="dynamicIcon" />
</template>

<script lang="ts">
import Vue, { PropType } from "vue"

// Use ui-component
import { Icon } from "ant-design-vue"
Vue.use(Icon)

// Types
import type { UiIcon } from "~/types"

export default Vue.extend({
	name: "ui-icon",
	props: {
		type: {
			type: String as PropType<UiIcon.Name | string>,
			default: "alert"
		},
		iconType: {
			type: String as PropType<"ui" | "ant-design">,
			default: "ui"
		},
		color: {
			type: String,
			default: "#FFFFFF"
		},
		theme: {
			type: String as PropType<UiIcon.Theme>,
			default: "outlined"
		}
	},
	data() {
		return {
			dynamicIcon: null as any
		}
	},
	created() {
		this.setIcon()
	},
	watch: {
		type() {
			this.setIcon()
		},
		iconType() {
			this.setIcon()
		}
	},
	methods: {
		setIcon(): void {
			if (this.iconType === "ui") {
				const path: string = `../../assets/img/icons/icon-${this.type}.svg`

				this.dynamicIcon = () => import(path)
			}
		}
	}
})
</script>
