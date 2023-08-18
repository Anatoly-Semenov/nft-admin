<template>
	<a-button
		:class="getSelector"
		:type="type"
		@click="$emit('click')"
		:disabled="disabled"
		:loading="loading"
	>
		<slot name="left-icon" />
		<slot name="comment-icon" />
		<slot></slot>
	</a-button>
</template>

<script lang="ts">
import Vue, { PropType } from "vue"

// Use Ant-design component
import { Button } from "ant-design-vue"
Vue.use(Button)

// Types
import { UiButton } from "~/types"

export default Vue.extend({
	name: "ui-button",
	props: {
		size: {
			type: String as PropType<UiButton.Size>,
			default: "default"
		},
		type: {
			type: String as PropType<UiButton.Type>,
			default: "primary"
		},
		disabled: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		isHighlight: {
			type: Boolean,
			default: false
		},
		isGradient: {
			type: Boolean,
			default: false
		},
		isUnauthorized: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		getSelector(): string {
			let selector: string = "ui-button"

			const addProp = (prop: string): void => {
				if (prop) {
					selector += ` _${prop}`
				}
			}

			addProp(this.size)

			if (this.isHighlight) {
				addProp("highlight")
			}

			if (this.isGradient) {
				addProp("gradient")
			}

			if (this.isUnauthorized) {
				addProp("unauthorized")
			}

			return selector
		}
	}
})
</script>
