<template>
	<div class="docs__detail">
		<p class="docs__detail-title">Ui-tabs</p>
		<div class="docs__detail-component _dark">
			<ui-tabs
				v-model="activeTab"
				@change="activeTab = $event"
				:type="type"
				:size="size"
			>
				<a-tab-pane
					v-for="(name, index) in tabs"
					:key="`${index + 1}`"
					:tab="name"
				>
					<a-card class="index__card" :title="name" />
				</a-tab-pane>
			</ui-tabs>
		</div>

		<docs-code
			name="ui-tabs"
			:componentProperties="{
				type,
				size
			}"
		/>

		<a-table :columns="columns" :data-source="data" :pagination="false">
			<div slot="value" slot-scope="column, record">
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
					v-if="record.property === 'size'"
					v-model="size"
					style="width: 200px"
				>
					<a-select-option v-for="item in sizeValues" :key="item" :value="item">
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
import type { Docs, UiTabs } from "~/types"

// Components
import docsCode from "~/components/docs/docs-code.vue"

export default Vue.extend({
	name: "ui-tabs-page",
	layout: "index",
	components: {
		docsCode
	},
	data() {
		return {
			tabs: ["Tab_1", "Tab_2", "Tab_3"],
			activeTab: "1",
			type: "line" as UiTabs.Type,
			typeValues: ["line", "card", "editable-card"] as UiTabs.Type[],
			size: "default" as UiTabs.Size,
			sizeValues: ["large", "default", "small"] as UiTabs.Size[],
			data: [
				{
					key: "1",
					property: "type",
					type: `"line" | "card" | "editable-card"`,
					default: "line"
				},
				{
					key: "2",
					property: "size",
					type: `"large" | "default" | "small"`,
					default: "default"
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
