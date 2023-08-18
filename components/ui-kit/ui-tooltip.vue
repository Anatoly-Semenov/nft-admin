<template>
	<a-tooltip
		class="ui-tooltip"
		:overlayClassName="overlayClassName"
		:placement="placement"
		:title="title"
		:trigger="trigger"
	>
		<template slot="title">
			<slot name="title" />
		</template>
		<slot />
	</a-tooltip>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"

// Types
import type { UiTooltip } from "~/types"

export default Vue.extend({
	name: "ui-tooltip",
	props: {
		placement: {
			type: String,
			default: "right"
		} as PropOptions<UiTooltip.Placement>,
		title: String as PropOptions<string>,
		trigger: String as PropOptions<UiTooltip.Trigger>,
		overlayClassName: String as PropOptions<string>
	}
})
</script>
