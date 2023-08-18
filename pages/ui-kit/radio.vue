<template>
	<div class="docs__detail">
		<p class="docs__detail-title">Ui-radio</p>
		<div class="docs__detail-component _dark">
			<ui-radio
				:list="list"
				:size="size"
				:activeValue="activeValue"
				:buttonStyle="buttonStyle"
				:isHighlight="isHighlight"
				:isLoading="isLoading"
				:isLoadingData="isLoadingData"
				@change="activeValue = $event"
			/>
		</div>

		<docs-code
			name="ui-radio"
			:componentProperties="{
				activeValue,
				list,
				isLoadingData,
				isHighlight,
				isLoading
			}"
		/>

		<a-table :columns="columns" :data-source="data" :pagination="false">
			<div slot="value" slot-scope="column, record">
				<a-input
					v-if="record.property === 'slot'"
					v-model="slot"
					style="width: 200px"
				/>
				<a-input
					v-if="record.property === 'color'"
					v-model="color"
					type="color"
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
					v-if="record.property === 'buttonStyle'"
					v-model="buttonStyle"
					style="width: 200px"
				>
					<a-select-option
						v-for="item in buttonStyleValues"
						:key="item"
						:value="item"
					>
						{{ item }}
					</a-select-option>
				</a-select>

				<a-switch
					v-if="record.property === 'isHighlight'"
					v-model="isHighlight"
				/>
				<a-switch v-if="record.property === 'isLoading'" v-model="isLoading" />
				<a-switch
					v-if="record.property === 'isLoadingData'"
					v-model="isLoadingData"
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
import { Docs, UiRadio } from "~/types"

// Components
import docsCode from "~/components/docs/docs-code.vue"

export default Vue.extend({
	name: "ui-radio-page",
	layout: "index",
	components: {
		docsCode
	},
	data() {
		return {
			list: ["radio_1", "radio_2", "radio_3"],
			size: "small" as UiRadio.Size,
			activeValue: "radio_1",
			sizeValues: ["large", "default", "small"] as UiRadio.Size[],
			buttonStyle: "solid" as UiRadio.ButtonStyle,
			buttonStyleValues: ["outline", "solid"] as UiRadio.ButtonStyle[],
			isHighlight: false,
			isLoading: false,
			isLoadingData: false,
			data: [
				{
					key: "2",
					property: "size",
					type: `"large" | "default" | "small"`,
					default: "small"
				},
				{
					key: "3",
					property: "buttonStyle",
					type: `"outline" | "solid"`,
					default: "solid"
				},
				{
					key: "4",
					property: "isHighlight",
					type: "boolean",
					default: "false"
				},
				{
					key: "5",
					property: "isLoading",
					type: "boolean",
					default: "false"
				},
				{
					key: "6",
					property: "isLoadingData",
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
