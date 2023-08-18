<template>
	<span
		class="ui-delta"
		:class="{ _negative: isNegativeDeltaValue }"
		v-if="value"
	>
		<ui-icon iconType="ant-design" type="caret-up" />
		{{ convertedValue }} {{ deltaValueSymbol }}
	</span>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"

// Types
import { AnalyticsService } from "@nft-types"

export default Vue.extend({
	name: "ui-delta",
	props: {
		value: [String, Number],
		type: {
			type: String,
			default: "text"
		} as PropOptions<AnalyticsService.ScholarType>,
		units: String
	},
	computed: {
		convertedValue(): number | string {
			let value = this.value

			if (typeof value === "number") {
				if (this.type === "percents") {
					return (Number(this.value) * 100).toFixed(2)
				}

				value = value.toFixed(2)
			}

			return this.value
		},
		isNegativeDeltaValue(): boolean {
			return this.value < 0
		},
		deltaValueSymbol(): string {
			switch (this.type) {
				case "percents":
					return "%"
				case "coin":
					return this.units || "$"
				default:
					return ""
			}
		}
	}
})
</script>
