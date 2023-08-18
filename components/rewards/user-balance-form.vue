<template>
	<a-modal
		class="rewards-modal"
		title="Transfer SKG tokens"
		okText="Send"
		:visible="visible"
		@ok="check"
		@cancel="() => $emit(`cancel`)"
	>
		<a-form :form="form" class="rewards-modal__form">
			<a-form-item
				label="User ID"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						'userId',
						{
							rules: [
								{
									required: true,
									message: 'Please enter user id'
								}
							]
						}
					]"
					placeholder="Enter user id"
				/>
			</a-form-item>

			<a-form-item
				label="Amount"
				help="Add '-' to a number to subtract the amount from the balance"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						'amount',
						{
							rules: [
								{
									required: true,
									message: 'Please enter an amount'
								}
							]
						}
					]"
					placeholder="Enter amount"
				/>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"

export default Vue.extend({
	name: "user-balance-form",
	props: {
		visible: {
			type: Boolean,
			default: false
		} as PropOptions<boolean>
	},
	data() {
		return {
			form: this.$form.createForm(this, { name: "user-balance-form" })
		}
	},
	methods: {
		check() {
			this.form.validateFields((err, values) => {
				if (!err) {
					this.$emit("submit", { ...values, amount: Number(values.amount) })
				}
			})
		}
	}
})
</script>
