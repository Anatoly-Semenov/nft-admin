<template>
	<div>
		<div v-if="isEditMode" class="giveaway__detail-container">
			<giveaway-form
				:mode="mode"
				:id="giveaway.id"
				:title="giveaway.title"
				:description="giveaway.description"
				:prize_description="giveaway.prize_description"
				:link_to_join="giveaway.link_to_join"
				:link_to_project="giveaway.link_to_project"
				:image="image"
				:startDate="datesToMoment[0]"
				:endDate="datesToMoment[1]"
				@handleImage="handleImage"
				@handleOkDates="handleOkDates"
				@handleDates="handleDates"
				@changeMode="changeMode"
			/>
		</div>
		<div v-else>
			<div class="giveaway__detail">
				<img class="giveaway__detail-image" :src="image" />
				<div class="giveaway__detail-content">
					<div class="giveaway__detail-title">
						<div class="giveaway__detail-content-text">
							<span>Title:</span>
							<p>{{ giveaway.title }}</p>
						</div>
					</div>

					<div class="giveaway__detail-description">
						<div class="giveaway__detail-content-text">
							<span>Description:</span>
							<p>{{ giveaway.description }}</p>
						</div>
					</div>

					<div class="giveaway__detail-description">
						<div class="giveaway__detail-content-text">
							<span>Prize description:</span>
							<p>{{ giveaway.prize_description }}</p>
						</div>
					</div>

					<div class="giveaway__detail-column">
						<div class="giveaway__detail-column-row">
							<div class="giveaway__detail-content-text">
								<span>Start date:</span>
								<p>{{ datesForShow[0] }}</p>
							</div>
						</div>
						<div class="giveaway__detail-column-row">
							<div class="giveaway__detail-content-text">
								<span>End date:</span>
								<p>{{ datesForShow[1] }}</p>
							</div>
						</div>
					</div>

					<div class="giveaway__detail-column">
						<div class="giveaway__detail-column-row">
							<div class="giveaway__detail-content-text">
								<span>Link to project:</span>
								<p>{{ giveaway.link_to_project }}</p>
							</div>
						</div>
						<div class="giveaway__detail-column-row">
							<div class="giveaway__detail-content-text">
								<span>Link to join:</span>
								<p>{{ giveaway.link_to_join }}</p>
							</div>
						</div>
					</div>
				</div>

				<div class="giveaway__detail-button">
					<a-button type="primary" @click="changeMode">Edit</a-button>
					<a-button type="danger" @click="showConfirm">Delete</a-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapActions, mapGetters } from "vuex"
import moment, { Moment } from "moment"

// Components
import giveawayForm from "~/components/giveaway/giveaway-form.vue"

// Types
import { GiveawayFormMode } from "~/types"

export default Vue.extend({
	name: "page-giveaway-detail",
	layout: "index",
	transition: "fade-in",
	components: { giveawayForm },
	data() {
		return {
			id: this.$route.params.id,
			form: this.$form.createForm(this, {
				name: "coordinated"
			}),
			isEditMode: false,
			image: "",
			startDate: "" as string,
			endDate: "" as string
		}
	},
	methods: {
		...mapActions({
			fetchGiveaway: "giveaway/fetchGiveaway",
			updateGiveaway: "giveaway/updateGiveaway",
			deleteGiveaway: "giveaway/deleteGiveaway"
		}),
		showConfirm() {
			this.$confirm({
				title: "Do you want to delete this item?",
				content: "When clicked the OK button, this item will be deleted.",
				onOk: async () =>
					this.deleteGiveaway(this.id).then(
						() => {
							this.$message.success("Item was deleted.")

							this.$nextTick(() => {
								this.$router.replace({ path: "/giveaway" })
							})
						},
						() => {
							this.$message.error("Something went wrong.")
						}
					),
				onCancel() {}
			})
		},
		handleDates(_: any, dateString: Moment[]) {
			const [startDate, endDate] = dateString
			this.startDate = moment(startDate).toISOString()
			this.endDate = moment(endDate).toISOString()
		},
		handleOkDates(value: Moment[]) {
			const [startDate, endDate] = value
			this.startDate = moment(startDate).toISOString()
			this.endDate = moment(endDate).toISOString()
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
		createBase64Image(fileObject: Blob) {
			const reader = new FileReader()
			reader.onload = (e) => {
				this.image = e.target?.result as string
			}
			reader.readAsDataURL(fileObject)
		},
		changeMode() {
			this.isEditMode = !this.isEditMode
		}
	},
	computed: {
		...mapGetters({
			giveaway: "giveaway/getView"
		}),
		datesToMoment(): Array<string> {
			return [
				moment(this.startDate || new Date()).toISOString(),
				moment(this.endDate || new Date()).toISOString()
			]
		},
		datesForShow(): Array<string> {
			return [
				moment(this.startDate).format("LLL"),
				moment(this.endDate).format("LLL")
			]
		},
		mode(): GiveawayFormMode {
			return this.isEditMode ? GiveawayFormMode.EDIT : GiveawayFormMode.CREATE
		}
	},
	async mounted() {
		await this.fetchGiveaway(this.id)

		this.image = this.giveaway.image
		this.startDate = this.giveaway.start_date
		this.endDate = this.giveaway.end_date
	}
})
</script>
