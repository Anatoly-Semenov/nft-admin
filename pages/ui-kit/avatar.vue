<template>
	<div class="docs__detail">
		<p class="docs__detail-title">Ui-avatar</p>
		<div class="docs__detail-component _dark">
			<ui-avatar :src="src" :shape="shape" :size="size" />
		</div>

		<docs-code
			name="ui-avatar"
			:componentProperties="{
				src,
				shape,
				size
			}"
		/>

		<a-table :columns="columns" :data-source="data" :pagination="false">
			<div slot="value" slot-scope="column, record">
				<a-input
					v-if="record.property === 'src'"
					v-model="src"
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
					v-if="record.property === 'shape'"
					v-model="shape"
					style="width: 200px"
				>
					<a-select-option
						v-for="item in shapeValues"
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
import { Docs, UiAvatar } from "~/types"

// Components
import docsCode from "~/components/docs/docs-code.vue"

export default Vue.extend({
	name: "ui-avatar-page",
	layout: "index",
	components: {
		docsCode
	},
	data() {
		return {
			src: "https://i.ibb.co/607n10q/256.png" as string,
			shape: "circle" as UiAvatar.Shape,
			shapeValues: ["circle", "square"] as UiAvatar.Shape[],
			size: "default" as UiAvatar.Size,
			sizeValues: ["default", "large", "small", 30, 40, 50] as UiAvatar.Size[],
			data: [
				{
					key: "1",
					property: "src",
					type: "string",
					default: "-"
				},
				{
					key: "2",
					property: "shape",
					type: `circle | square`,
					default: "circle"
				},
				{
					key: "3",
					property: "size",
					type: `small | large | default | <number>`,
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
