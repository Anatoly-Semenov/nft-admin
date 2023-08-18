<template>
	<div class="docs__detail">
		<p class="docs__detail-title">Ui-tooltip</p>
		<div class="docs__detail-component _dark">
			<ui-tooltip :title="title" :placement="placement" :trigger="trigger">
				<p class="text">Some text with tooltip</p>
			</ui-tooltip>
		</div>

		<docs-code
			name="ui-tooltip"
			:componentProperties="{
				title,
				placement,
				trigger
			}"
		/>

		<a-table :columns="columns" :data-source="data" :pagination="false">
			<div slot="value" slot-scope="column, record">
				<a-input
					v-if="record.property === 'title'"
					v-model="title"
					style="width: 200px"
				/>

				<a-select
					v-if="record.property === 'placement'"
					v-model="placement"
					style="width: 200px"
				>
					<a-select-option
						v-for="item in placementValues"
						:key="item"
						:value="item"
					>
						{{ item }}
					</a-select-option>
				</a-select>
				<a-select
					v-if="record.property === 'trigger'"
					v-model="trigger"
					style="width: 200px"
				>
					<a-select-option
						v-for="item in triggerValues"
						:key="item"
						:value="item"
					>
						{{ item }}
					</a-select-option>
				</a-select>
			</div>

			<div slot="type" slot-scope="column, record">
				<template v-if="record.type">
					<a-tag color="var(--color-highlight)" v-if="record.type">
						{{ record.type }}
					</a-tag>
					<p v-else>-</p>
				</template>
			</div>
		</a-table>
	</div>
</template>

<script lang="ts">
import Vue from "vue"

// Types
import { Docs, UiTooltip } from "~/types"

// Components
import docsCode from "~/components/docs/docs-code.vue"

export default Vue.extend({
	name: "ui-tooltip-page",
	layout: "index",
	components: {
		docsCode
	},
	data() {
		return {
			title: "This is tooltip title",
			placement: "right" as UiTooltip.Placement,
			placementValues: [
				"top",
				"left",
				"right",
				"bottom",
				"topLeft",
				"topRight",
				"bottomLeft",
				"bottomRight",
				"leftTop",
				"leftBottom",
				"rightTop",
				"rightBottom"
			] as UiTooltip.Placement[],
			trigger: "hover" as UiTooltip.Trigger,
			triggerValues: [
				"hover",
				"focus",
				"click",
				"contextmenu"
			] as UiTooltip.Trigger[],
			data: [
				{
					key: "1",
					property: "title",
					type: "string",
					default: "-"
				},
				{
					key: "2",
					property: "placement",
					type: `"top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"`,
					default: "right"
				},
				{
					key: "3",
					property: "trigger",
					type: `"hover" | "focus" | "click" | "contextmenu"`,
					default: "hover"
				}
			] as Docs.Data,
			columns: [
				{
					title: "Property",
					dataIndex: "property",
					key: "property",
					scopedSlots: { customRender: "property" }
				},
				{
					title: "Value",
					dataIndex: "value",
					key: "value",
					scopedSlots: { customRender: "value" }
				},
				{
					title: "Type",
					dataIndex: "type",
					key: "type",
					scopedSlots: { customRender: "type" }
				},
				{
					title: "Default",
					key: "default",
					dataIndex: "default",
					scopedSlots: { customRender: "default" }
				}
			]
		}
	}
})
</script>

<style lang="stylus">
.text
	width fit-content
	color #ffffff
	margin 0
</style>
