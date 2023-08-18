<template>
	<div class="docs__detail">
		<p class="docs__detail-title">Ui-connect</p>
		<div class="docs__detail-component _dark">
			<ui-connect
				:title="title"
				:type="type"
				:isHighlight="isHighlight"
				:isConnectOnly="isConnectOnly"
			/>
		</div>

		<docs-code
			name="ui-connect"
			:componentProperties="{
				title,
				type,
				isHighlight,
				isConnectOnly
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
					v-if="record.property === 'type'"
					v-model="type"
					style="width: 200px"
				>
					<a-select-option v-for="item in typeValues" :key="item" :value="item">
						{{ item }}
					</a-select-option>
				</a-select>

				<a-switch
					v-if="record.property === 'isHighlight'"
					v-model="isHighlight"
				/>
				<a-switch
					v-if="record.property === 'isConnectOnly'"
					v-model="isConnectOnly"
				/>
			</div>

			<div slot="type" slot-scope="column, record">
				<template v-if="record.type">
					<a-connect color="var(--color-highlight)" v-if="record.type">
						{{ record.type }}
					</a-connect>
					<p v-else>-</p>
				</template>
			</div>
		</a-table>
	</div>
</template>

<script lang="ts">
import Vue from "vue"

// Types
import type { Docs, UiConnectType } from "~/types"

// Components
import docsCode from "~/components/docs/docs-code.vue"

export default Vue.extend({
	name: "ui-connect-page",
	layout: "index",
	components: {
		docsCode
	},
	data() {
		return {
			title: "Title",
			type: "wallet" as UiConnectType,
			typeValues: [
				"wallet",
				"solana",
				"discord",
				"twitter",
				"epicGames",
				"steam"
			] as UiConnectType[],
			isHighlight: false,
			isConnectOnly: false,
			data: [
				{
					key: "1",
					property: "title",
					type: "string",
					default: "-"
				},
				{
					key: "2",
					property: "type",
					type: `"wallet" | "solana" | "discord" | "twitter" | "epicGames" | "steam"`,
					default: "wallet"
				},
				{
					key: "3",
					property: "isHighlight",
					type: "boolean",
					default: "false"
				},
				{
					key: "4",
					property: "isConnectOnly",
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
