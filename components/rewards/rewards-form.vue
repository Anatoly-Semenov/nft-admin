<template>
	<a-modal
		class="rewards-modal"
		title="Add reward"
		:visible="visible"
		:okText="`${editable.id ? 'Update' : 'Create'} reward`"
		@ok="check"
		@cancel="() => $emit(`cancel`)"
	>
		<a-form :form="form" class="rewards-modal__form">
			<a-form-item
				label="Title"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						'name',
						{
							initialValue: editable && editable.name,
							rules: [
								{
									required: true,
									message: 'Please enter a reward title'
								}
							]
						}
					]"
					placeholder="Enter reward title"
				/>
			</a-form-item>

			<a-form-item
				label="Amount"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						'amount',
						{
							initialValue: editable && editable.amount,
							rules: [
								{
									required: true,
									message: 'Please enter a reward amount'
								}
							]
						}
					]"
					placeholder="Enter reward amount"
				/>
			</a-form-item>

			<a-form-item
				label="Currency"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						'currency',
						{
							initialValue: editable && editable.currency
						}
					]"
					placeholder="Enter reward currency"
				/>
			</a-form-item>

			<a-form-item
				label="Image"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						'image',
						{
							initialValue: editable && editable.logo,
							rules: [{ type: 'url', message: 'Image should be a url string' }]
						}
					]"
					placeholder="Enter image link"
				/>
			</a-form-item>

			<a-form-item
				label="Link"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						'link',
						{
							initialValue: editable && editable.link,
							rules: [{ type: 'url', message: 'Link should be a url string' }]
						}
					]"
					placeholder="Enter link url"
				/>
			</a-form-item>

			<a-form-item
				label="Description"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-textarea
					:rows="6"
					v-decorator="[
						'description',
						{
							initialValue: editable && editable.description
						}
					]"
					placeholder="Enter description"
				/>
			</a-form-item>

			<a-form-item
				label="Started at"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-date-picker
					v-decorator="[
						'startedAt',
						{
							initialValue: editable && setCorrectDate(editable.startedAt),
							rules: [{ required: true, message: 'Please choose a start date' }]
						}
					]"
					placeholder="Choose a start date"
				/>
			</a-form-item>

			<a-form-item
				label="Ended at"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-date-picker
					v-decorator="[
						'endedAt',
						{
							initialValue: editable && setCorrectDate(editable.endedAt)
						}
					]"
					placeholder="Choose an end date"
				/>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script lang="ts">
import moment from "moment"
import Vue, { PropOptions } from "vue"
import { mapGetters } from "vuex"

export default Vue.extend({
	name: "rewards-form",
	props: {
		visible: {
			type: Boolean,
			default: false
		} as PropOptions<boolean>
	},
	data() {
		return {
			form: this.$form.createForm(this, { name: "reward-form" })
		}
	},
	computed: {
		...mapGetters({
			editable: "rewards/getEditableReward"
		})
	},
	methods: {
		check() {
			this.form.validateFields((err, values) => {
				if (!err) {
					this.$emit("submit", { ...values, amount: Number(values.amount) })
				}
			})
		},
		setCorrectDate(date: string) {
			if (!date) return null

			return moment(date)
		}
	}
})
</script>
