<template>
	<div class="docs__detail">
		<p class="docs__detail-title">Ui-icon</p>
		<div class="docs__detail-component _dark">
			<ui-icon
				:type="type"
				:iconType="iconType"
				:color="color"
				:theme="theme"
			/>
		</div>

		<docs-code
			name="ui-icon"
			:componentProperties="{
				type,
				iconType,
				color,
				theme
			}"
		/>

		<a-table :columns="columns" :data-source="data" :pagination="false">
			<div slot="value" slot-scope="column, record">
				<a-input
					v-if="record.property === 'color'"
					v-model="color"
					type="color"
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
					v-if="record.property === 'iconType'"
					v-model="iconType"
					style="width: 200px"
				>
					<a-select-option
						v-for="item in iconTypeValues"
						:key="item"
						:value="item"
					>
						{{ item }}
					</a-select-option>
				</a-select>
				<a-select
					v-if="record.property === 'theme'"
					v-model="theme"
					style="width: 200px"
				>
					<a-select-option
						v-for="item in themeValues"
						:key="item"
						:value="item"
					>
						{{ item }}
					</a-select-option>
				</a-select>
			</div>

			<div slot="type" slot-scope="column, record">
				<template v-if="record.type">
					<a-icon color="var(--color-highlight)" v-if="record.type">
						{{ record.type }}
					</a-icon>
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
	name: "ui-icon-page",
	layout: "index",
	components: {
		docsCode
	},
	data() {
		return {
			type: "user",
			typeValues: ["user", "close", "caret-up", "left", "link", "plus"],
			iconType: "ant-design",
			iconTypeValues: ["ui", "ant-design"],
			color: "#FFFFFF",
			theme: "outlined",
			themeValues: ["filled", "outlined", "twoTone"],
			data: [
				{
					key: "1",
					property: "type",
					type: "string",
					default: "alert"
				},
				{
					key: "2",
					property: "iconType",
					type: `"ui" | "ant-design"`,
					default: "ui"
				},
				{
					key: "3",
					property: "color",
					type: "string",
					default: "#FFFFFF"
				},
				{
					key: "4",
					property: "theme",
					type: `'filled' | 'outlined' | 'twoTone'`,
					default: "outlined"
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
