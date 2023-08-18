<template>
	<div class="docs__detail">
		<p class="docs__detail-title">Ui-faq</p>
		<div class="docs__detail-component _dark">
			<ui-faq :title="title" />
		</div>

		<docs-code
			name="ui-faq"
			:componentProperties="{
				title
			}"
		/>

		<a-table :columns="columns" :data-source="data" :pagination="false">
			<div slot="value" slot-scope="column, record">
				<a-input
					v-if="record.property === 'title'"
					v-model="title"
					style="width: 200px"
				/>
			</div>

			<div slot="type" slot-scope="column, record">
				<template v-if="record.type">
					<a-faq color="var(--color-highlight)" v-if="record.type">
						{{ record.type }}
					</a-faq>
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
	name: "ui-faq-page",
	layout: "index",
	components: {
		docsCode
	},
	data() {
		return {
			title: "FAQ",
			data: [
				{
					key: "1",
					property: "title",
					type: "string",
					default: "FAQ"
				},
				{
					key: "2",
					property: "data",
					type: "Array<{ title: string; description: string }>",
					default: "[]"
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
