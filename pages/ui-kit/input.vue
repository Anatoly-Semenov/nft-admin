<template>
	<div class="docs__detail">
		<p class="docs__detail-title">Ui-input</p>
		<div class="docs__detail-component _dark">
			<ui-input
				:value="value"
				:placeholder="placeholder"
				:title="title"
				:type="type"
				:maxLength="Number(maxLength)"
				:displayType="displayType"
				:disabled="disabled"
			/>
		</div>

		<docs-code
			name="ui-input"
			:componentProperties="{
				value,
				placeholder,
				title,
				type,
				maxLength,
				displayType,
				disabled
			}"
		/>

		<a-table :columns="columns" :data-source="data" :pagination="false">
			<div slot="value" slot-scope="column, record">
				<a-input
					v-if="record.property === 'value'"
					v-model="value"
					style="width: 200px"
				/>
				<a-input
					v-if="record.property === 'placeholder'"
					v-model="placeholder"
					style="width: 200px"
				/>
				<a-input
					v-if="record.property === 'title'"
					v-model="title"
					style="width: 200px"
				/>
				<a-input
					v-if="record.property === 'maxLength'"
					v-model="maxLength"
					type="number"
					style="width: 200px"
				/>

				<a-select
					v-if="record.property === 'type'"
					v-model="type"
					style="width: 200px"
				>
					<a-select-option v-for="item in typeValues" :key="item" :value="item">
						{{ item }}
					</a-select-option>
				</a-select>
				<a-select
					v-if="record.property === 'displayType'"
					v-model="displayType"
					style="width: 200px"
				>
					<a-select-option
						v-for="item in displayTypeValues"
						:key="item"
						:value="item"
					>
						{{ item }}
					</a-select-option>
				</a-select>

				<a-switch v-if="record.property === 'disabled'" v-model="disabled" />
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
import { Docs } from "~/types"

// Components
import docsCode from "~/components/docs/docs-code.vue"

export default Vue.extend({
	name: "ui-input-page",
	layout: "index",
	components: {
		docsCode
	},
	data() {
		return {
			value: "",
			placeholder: "placeholder",
			title: "Title",
			type: "text",
			typeValues: ["text", "number", "audio", "video", "image"],
			maxLength: 100,
			displayType: "default",
			displayTypeValues: ["default", "thin"],
			disabled: false,
			data: [
				{
					key: "1",
					property: "value",
					type: "string",
					default: "-"
				},
				{
					key: "2",
					property: "placeholder",
					type: "string",
					default: "'Placeholder'"
				},
				{
					key: "3",
					property: "title",
					type: "string",
					default: "-"
				},
				{
					key: "4",
					property: "type",
					type: "string",
					default: "text"
				},
				{
					key: "5",
					property: "maxLength",
					type: "number",
					default: "-"
				},
				{
					key: "6",
					property: "displayType",
					type: "default | thin",
					default: "default"
				},
				{
					key: "7",
					property: "disabled",
					type: "boolean",
					default: "false"
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
