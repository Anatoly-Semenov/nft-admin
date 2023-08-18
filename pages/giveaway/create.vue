<template>
	<giveaway-form
		:mode="mode"
		:title="title"
		:description="description"
		:prize_description="prize_description"
		:link_to_join="link_to_join"
		:link_to_project="link_to_project"
		:image="image || noImage"
		:startDate="startDate"
		:endDate="endDate"
		:handleImage="handleImage"
		:handleOkDates="handleOkDates"
		:handleDates="handleDates"
	/>
</template>

<script lang="ts">
import moment from "ant-design-vue/node_modules/moment"
import { Moment } from "moment"
import Vue from "vue"
import { mapActions } from "vuex"

// Components
import giveawayForm from "~/components/giveaway/giveaway-form.vue"

// Types
import { GiveawayFormMode } from "~/types"

export default Vue.extend({
	name: "page-giveaway-create",
	layout: "index",
	transition: "fade-in",
	components: { giveawayForm },
	data() {
		return {
			mode: GiveawayFormMode.CREATE,
			startDate: "",
			endDate: "",
			image: "",
			title: "",
			description: "",
			prize_description: "",
			link_to_project: "",
			link_to_join: "",
			noImage: require("~/assets/img/no-image.jpeg")
		}
	},
	methods: {
		...mapActions({
			createGiveaway: "giveaway/createGiveaway"
		}),
		createBase64Image(fileObject: Blob) {
			const reader = new FileReader()
			reader.onload = (e) => {
				this.image = e.target?.result as string
			}
			reader.readAsDataURL(fileObject)
		},
		handleImage(info: any) {
			if (info.file.status !== "uploading") {
				this.createBase64Image(info.file.originFileObj)
			}
			if (info.file.status === "done") {
				this.$message.success(`${info.file.name} file uploaded successfully`)
			} else if (info.file.status === "error") {
				this.$message.error(`${info.file.name} file upload failed.`)
			}
		},
		handleOkDates(value: Moment[]) {
			const [startDate, endDate] = value
			this.startDate = moment(startDate).toISOString()
			this.endDate = moment(endDate).toISOString()
		},
		handleDates(_: any, dateString: Moment[]) {
			const [startDate, endDate] = dateString
			this.startDate = moment(startDate).toISOString()
			this.endDate = moment(endDate).toISOString()
		}
	}
})
</script>
