<template>
	<div class="rewards-table">
		<div class="rewards-table__actions">
			<ui-button @click="modalVisible = true">
				<ui-icon iconType="ant-design" type="plus" />
				Add reward
			</ui-button>

			<ui-button @click="balanceModalVisible = true">
				<ui-icon iconType="ant-design" type="plus" />
				Add balance to user
			</ui-button>
		</div>

		<rewards-form
			:visible="modalVisible"
			@cancel="cancelModal"
			@submit="handleSubmit"
		/>

		<user-balance-form
			:visible="balanceModalVisible"
			@cancel="cancelModal"
			@submit="addUserBalance"
		/>

		<rewards-table @edit="edit" @delete="remove" />
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapActions, mapGetters, mapMutations } from "vuex"

// Components
import rewardsTable from "~/components/rewards/rewards-table.vue"
import rewardsForm from "~/components/rewards/rewards-form.vue"
import userBalanceForm from "~/components/rewards/user-balance-form.vue"

// Types
import { RewardsService } from "@nft-types"

export default Vue.extend({
	name: "page-rewards",
	layout: "index",
	transition: "fade-in",
	components: { rewardsTable, rewardsForm, userBalanceForm },
	async fetch() {
		await this.fetchRewards()
	},
	mounted() {},
	data() {
		return {
			modalVisible: false as boolean,
			balanceModalVisible: false as boolean
		}
	},
	computed: {
		...mapGetters({
			getRewards: "rewards/getList",
			editable: "rewards/getEditableReward"
		})
	},
	methods: {
		...mapMutations({
			setEditableReward: "rewards/setEditableReward"
		}),
		...mapActions({
			fetchRewards: "rewards/fetchRewards",
			create: "rewards/create",
			update: "rewards/update",
			delete: "rewards/delete"
		}),
		cancelModal() {
			this.modalVisible = false
			this.balanceModalVisible = false
			this.setEditableReward(null)
		},
		edit(id: number) {
			this.setEditableReward(id)
			this.modalVisible = true
		},
		async handleSubmit(values: RewardsService.Reward) {
			try {
				if (this.editable?.id) {
					await this.update({ id: this.editable?.id, body: values })
				} else {
					await this.create(values)
				}

				if (this.editable?.id) {
					await this.fetchRewards()
				}

				this.cancelModal()
			} catch (error) {
				if (error instanceof Error) {
					this.$message.error(error.message)
				}
			}
		},
		async remove(id: number) {
			try {
				await this.delete(id)
				await this.fetchRewards()
			} catch (error) {
				if (error instanceof Error) {
					this.$message.error(error.message)
				}
			}
		},
		async addUserBalance(values: { userId: string; amount: number }) {
			await this.$userApi.addBalance(values.userId, {
				amount: Number(values.amount)
			})

			this.cancelModal()
		}
	}
})
</script>
