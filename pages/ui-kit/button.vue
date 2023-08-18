<template>
	<div class="docs__detail">
		<p class="docs__detail-title">Ui-button</p>
		<div class="docs__detail-component _dark">
			<ui-button
				:size="size"
				:type="type"
				:disabled="disabled"
				:loading="loading"
				:isHighlight="isHighlight"
				:isGradient="isGradient"
				:isUnauthorized="isUnauthorized"
			>
				{{ slot }}
			</ui-button>
		</div>

		<docs-code
			name="ui-button"
			:componentProperties="{
				slot,
				size,
				type,
				disabled,
				loading,
				isHighlight,
				isGradient,
				isUnauthorized
			}"
		/>

		<a-table :columns="columns" :data-source="data" :pagination="false">
			<div slot="value" slot-scope="column, record">
				<a-input
					v-if="record.property === 'slot'"
					v-model="slot"
					style="width: 200px"
				/>

				<a-select
					v-if="record.property === 'size'"
					v-model="size"
					style="width: 200px"
				>
					<a-select-option v-for="item in sizeValues" :key="item" :value="item">
						{{ item }}
					</a-select-option>
				</a-select>
				<a-select
					v-if="record.property === 'type'"
					v-model="type"
					style="width: 200px"
				>
					<a-select-option v-for="item in typeValues" :key="item" :value="item">
						{{ item }}
					</a-select-option>
				</a-select>

				<a-switch v-if="record.property === 'disabled'" v-model="disabled" />
				<a-switch v-if="record.property === 'loading'" v-model="loading" />
				<a-switch
					v-if="record.property === 'isHighlight'"
					v-model="isHighlight"
				/>
				<a-switch
					v-if="record.property === 'isGradient'"
					v-model="isGradient"
				/>
				<a-switch
					v-if="record.property === 'isUnauthorized'"
					v-model="isUnauthorized"
				/>
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
import { Docs, UiButton } from "~/types"

// Components
import docsCode from "~/components/docs/docs-code.vue"

export default Vue.extend({
	name: "ui-button-page",
	layout: "index",
	components: {
		docsCode
	},
	data() {
		return {
			slot: "Button",
			size: "default" as UiButton.Size,
			sizeValues: ["small", "large", "default"] as UiButton.Size[],
			type: "primary" as UiButton.Type,
			typeValues: [
				"primary",
				"ghost",
				"dashed",
				"danger",
				"link",
				"default"
			] as UiButton.Type[],
			disabled: false,
			loading: false,
			isHighlight: false,
			isGradient: false,
			isUnauthorized: false,
			data: [
				{
					key: "1",
					property: "slot",
					type: "string",
					default: "-"
				},
				{
					key: "2",
					property: "size",
					type: "string",
					default: "default"
				},
				{
					key: "3",
					property: "type",
					type: "string",
					default: "default"
				},
				{
					key: "4",
					property: "disabled",
					type: "boolean",
					default: "-"
				},
				{
					key: "5",
					property: "loading",
					type: "boolean",
					default: "-"
				},
				{
					key: "6",
					property: "isHighlight",
					type: "boolean",
					default: "-"
				},
				{
					key: "7",
					property: "isGradient",
					type: "boolean",
					default: "-"
				},
				{
					key: "8",
					property: "isUnauthorized",
					type: "boolean",
					default: "-"
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
