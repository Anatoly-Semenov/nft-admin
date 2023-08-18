<template>
	<div class="giveaway__form">
		<a-form :form="form" @submit="handleSubmit">
			<div class="giveaway__form-container">
				<div class="giveaway__form-image">
					<img :src="image" alt="" />
				</div>

				<div class="giveaway__form-image-upload">
					<a-upload name="file" :showUploadList="false" @change="handleImage">
						<a-button>
							<a-icon type="upload" />
							Click to Upload
						</a-button>
					</a-upload>
				</div>
			</div>

			<div class="giveaway__form-title">
				<div class="giveaway__form-content-text">
					<a-form-item label="Title">
						<a-input v-decorator="['title', { initialValue: title }]" />
					</a-form-item>
				</div>
			</div>

			<div class="giveaway__form-description">
				<div class="giveaway__form-content-text">
					<a-form-item label="Description">
						<a-textarea
							v-decorator="['description', { initialValue: description }]"
						/>
					</a-form-item>
				</div>
			</div>

			<div class="giveaway__form-description">
				<div class="giveaway__form-content-text">
					<a-form-item label="Prize description">
						<a-textarea
							v-decorator="[
								'prize_description',
								{ initialValue: prize_description }
							]"
						/>
					</a-form-item>
				</div>
			</div>

			<div class="giveaway__form-column">
				<div class="giveaway__form-column-row">
					<div class="giveaway__form-content-text">
						<a-form-item label="Link to project">
							<a-input
								v-decorator="[
									'link_to_project',
									{ initialValue: link_to_project }
								]"
							/>
						</a-form-item>
					</div>
				</div>
				<div class="giveaway__form-column-row">
					<div class="giveaway__form-content-text">
						<a-form-item label="Link to join">
							<a-input
								v-decorator="['link_to_join', { initialValue: link_to_join }]"
							/>
						</a-form-item>
					</div>
				</div>
			</div>

			<div v-if="hasShowDatePicker" class="giveaway__form-datepicker">
				<div class="giveaway__form-content-text">
					<a-form-item label="Set start an end dates">
						<a-range-picker
							format="YYYY-MM-DD HH:mm"
							:show-time="{ format: 'HH:mm' }"
							:placeholder="['Start Time', 'End Time']"
							:defaultValue="[datePickerValues[0], datePickerValues[1]]"
							@change="handleDates"
							@ok="handleOkDates"
						/>
					</a-form-item>
				</div>
			</div>

			<a-divider />
			<a-form-item :wrapper-col="{ offset: 10 }">
				<a-space>
					<a-button type="primary" html-type="submit">Submit</a-button>
					<a-button v-if="!isCreateMode" type="primary" @click="changeMode">
						Cancel
					</a-button>
				</a-space>
			</a-form-item>
		</a-form>
	</div>
</template>

<script lang="ts">
import moment, { Moment } from "moment"
import Vue, { PropOptions } from "vue"
import { mapActions, mapGetters } from "vuex"

// Types
import { GiveawayFormFields, GiveawayFormMode } from "~/types"

export default Vue.extend({
	name: "giveaway-form",
	props: {
		id: Number as PropOptions<number>,
		mode: {
			type: String,
			default: GiveawayFormMode.CREATE
		} as PropOptions<GiveawayFormMode>,
		title: String as PropOptions<string>,
		description: String as PropOptions<string>,
		prize_description: String as PropOptions<string>,
		link_to_project: String as PropOptions<string>,
		link_to_join: String as PropOptions<string>,
		image: String as PropOptions<string>,
		startDate: String as PropOptions<string>,
		endDate: String as PropOptions<string>
	},
	data() {
		return {
			form: this.$form.createForm(this, {
				name: "coordinated"
			})
		}
	},
	methods: {
		...mapActions({
			createGiveaway: "giveaway/createGiveaway",
			updateGiveaway: "giveaway/updateGiveaway"
		}),
		handleDates(_: any, dateString: Moment[]) {
			this.$emit("handleDates", _, dateString)
		},
		changeMode() {
			this.$emit("changeMode")
		},
		handleOkDates(value: Moment[]) {
			this.$emit("handleOkDates", value)
		},
		handleImage(info: any) {
			this.$emit("handleImage", info)
		},
		handleSubmit(e: any) {
			e.preventDefault()
			this.form.validateFields(async (err, values: GiveawayFormFields) => {
				if (err) {
					console.error(err)
					return err
				}

				const image = values.image || this.image
				const start_date = this.startDate || values.start_date
				const end_date = this.endDate || values.end_date

				if (this.isCreateMode) {
					await this.createGiveaway({
						...values,
						image,
						start_date,
						end_date
					}).catch(() => {
						this.$message.error("Something went wrong.")
					})

					this.$message.success("Giveaway created.")

					this.$nextTick(() => {
						this.$router.replace({ path: "/giveaway/" + this.giveaway.id })
					})
				} else {
					await this.updateGiveaway({
						...values,
						image,
						start_date,
						end_date,
						id: this.id
					}).catch(() => {
						this.$message.error("Something went wrong.")
					})

					this.$message.success("Giveaway updated.")
				}
			})
		}
	},
	computed: {
		...mapGetters({
			giveaway: "giveaway/getView"
		}),
		isCreateMode(): boolean {
			return this.mode === GiveawayFormMode.CREATE
		},
		hasShowDatePicker(): boolean {
			return this.mode === GiveawayFormMode.EDIT
				? !!(this.startDate && this.endDate)
				: true
		},
		datePickerValues(): Array<Moment | string> {
			return [
				this.startDate ? moment(this.startDate) : "",
				this.endDate ? moment(this.endDate) : ""
			]
		}
	}
})
</script>
