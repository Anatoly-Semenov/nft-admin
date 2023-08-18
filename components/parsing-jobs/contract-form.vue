<template>
	<a-modal
		class="contract-modal"
		title="Add Contract"
		:visible="visible"
		@cancel="() => $emit('cancel')"
		@ok="() => this.check()"
	>
		<a-form :form="form" class="contract-modal__form">
			<a-form-item
				v-show="false"
				label="Id"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						'id',
						{
							initialValue: editable && editable.id
						}
					]"
				/>
			</a-form-item>

			<a-form-item
				label="Game"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-select
					v-decorator="[
						'gameId',
						{
							initialValue: getInitialGame(editable),
							rules: [
								{
									required: true,
									message: 'Please choose a game'
								}
							]
						}
					]"
					placeholder="Select Game"
					:showSearch="true"
				>
					<a-select-option
						v-for="game in games"
						:key="game.id"
						:value="game.id + '_' + game.title"
					>
						{{ game.title }}
					</a-select-option>
				</a-select>
			</a-form-item>

			<a-form-item
				label="Title"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						'title',
						{
							initialValue: editable && editable.title,
							rules: [
								{
									required: true,
									message: 'Please enter a contract title'
								}
							]
						}
					]"
					placeholder="Enter contract title"
				/>
			</a-form-item>

			<a-form-item
				label="Address"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						'address',
						{
							initialValue: editable && editable.address,
							rules: [
								{
									required: true,
									message: 'Please enter an address'
								}
							]
						}
					]"
					placeholder="Enter an address"
				/>
			</a-form-item>

			<a-form-item
				v-if="isToken"
				label="Is Coin?"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-checkbox
					v-decorator="['isCoin', { valuePropName: 'isCoin' }]"
					v-model="isCoin"
				/>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"
import { mapGetters } from "vuex"

// Types
import type { JobService } from "@nft-types"

const NO_GAME_TITLE = "-= No Game =-"

export default Vue.extend({
	name: "contract-form",
	props: {
		visible: {
			type: Boolean,
			default: false
		} as PropOptions<boolean>,
		isToken: {
			type: Boolean,
			default: false
		} as PropOptions<boolean>
	},
	data() {
		return {
			form: this.$form.createForm(this, { name: "add-contract-form" }),
			isCoin: false
		}
	},
	computed: {
		...mapGetters({
			editable: "parsing-jobs/getEditableContract",
			gameList: "games/getList",
			isLoading: "games/getLoading"
		}),
		games(): any[] {
			return [
				{ id: "", title: NO_GAME_TITLE },
				...this.gameList.map((item: any) => ({
					id: item.id,
					title: item.title
				}))
			]
		}
	},
	watch: {
		visible: function (newVal) {
			if (!newVal) {
				this.form.resetFields()
			} else {
				this.isCoin = this.editable ? this.editable.isCoin : false
			}
		}
	},
	methods: {
		check() {
			this.form.validateFields((err, values) => {
				const gameId = parseInt(values.gameId)
				values.gameId = isNaN(gameId) ? null : gameId
				values.isCoin = this.isCoin

				!err && this.$emit("submit", values)
			})
		},
		getInitialGame(editable: JobService.Contract) {
			const gameId = editable ? editable.gameId.toString() : ""

			const game = this.games.find((item) => item.id.toString() === gameId)

			return game ? game.id + "_" + game.title : ""
		}
	}
})
</script>
