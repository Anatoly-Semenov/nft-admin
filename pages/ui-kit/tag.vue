<template>
	<div class="docs__detail">
		<p class="docs__detail-title">Ui-tag</p>
		<div class="docs__detail-component _dark">
			<ui-tag :color="color" :closable="closable" :isVisible="isVisible">
				{{ slot }}
			</ui-tag>
		</div>

		<docs-code
			name="ui-tag"
			:componentProperties="{
				color,
				closable,
				isVisible
			}"
			:componentSlot="slot"
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

				<a-switch v-if="record.property === 'closable'" v-model="closable" />
				<a-switch v-if="record.property === 'isVisible'" v-model="isVisible" />
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
	name: "ui-tag-page",
	layout: "index",
	components: {
		docsCode
	},
	data() {
		return {
			color: "#4007ff",
			slot: "Ui-tag",
			closable: false,
			isVisible: true,
			data: [
				{
					key: "0",
					property: "slot",
					type: "string",
					default: "-"
				},
				{
					key: "1",
					property: "color",
					type: "string",
					default: "-"
				},
				{
					key: "2",
					property: "closable",
					type: "boolean",
					default: "false"
				},
				{
					key: "3",
					property: "isVisible",
					type: "boolean",
					default: "true"
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
