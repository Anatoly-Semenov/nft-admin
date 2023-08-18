<template>
	<a-modal
		class="games-modal"
		title="Add game"
		:visible="visible"
		:okText="`${editable.id ? 'Update' : 'Create'} game`"
		@ok="check"
		@cancel="() => $emit('cancel')"
	>
		<a-form :form="form" class="games-modal__form">
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
									message: 'Please enter a game title'
								}
							]
						}
					]"
					placeholder="Enter game title"
				/>
			</a-form-item>

			<a-form-item
				label="Logo"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						'logo',
						{
							initialValue: editable && editable.logo,
							rules: [
								{ type: 'url', message: 'Logo should be a url string' },
								{
									required: true,
									message: 'Please enter a game logo'
								}
							]
						}
					]"
					placeholder="Enter logo link"
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
							rules: [
								{ type: 'url', message: 'Image should be a url string' },
								{
									required: true,
									message: 'Please enter a game image'
								}
							]
						}
					]"
					placeholder="Enter image link"
				/>
			</a-form-item>

			<a-form-item
				label="Genre"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						'genre',
						{
							initialValue: editable && editable.genre,
							rules: [
								{
									required: true,
									message: 'Please enter a game genre'
								}
							]
						}
					]"
					placeholder="Enter game genre"
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
							initialValue: editable && editable.description,
							rules: [
								{
									required: true,
									message: 'Please enter a game description'
								}
							]
						}
					]"
					placeholder="Enter description"
				/>
			</a-form-item>

			<a-form-item
				label="Website"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						'site',
						{
							initialValue: editable && editable.site,
							rules: [
								{ type: 'url', message: 'Website should be a url string' },
								{
									required: true,
									message: 'Please enter a game site'
								}
							]
						}
					]"
					placeholder="Enter website link"
				/>
			</a-form-item>

			<a-form-item
				label="Is upcoming"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 12 }"
			>
				<a-checkbox
					v-decorator="[
						'is_upcoming',
						{
							valuePropName: 'checked',
							initialValue: editable ? editable.is_upcoming : false
						}
					]"
				/>
			</a-form-item>

			<template
				v-if="editable.is_upcoming || form.getFieldValue('is_upcoming')"
			>
				<a-divider />

				<a-form-item
					label="Release date"
					:label-col="{ span: 6 }"
					:wrapper-col="{ span: 18 }"
				>
					<a-row :gutter="24">
						<a-col :span="12">
							<a-date-picker
								v-decorator="[
									'release_date',
									{
										initialValue:
											editable &&
											setCorrectDate(editable.additional.release_date)
									}
								]"
								placeholder="Select release date"
								style="width: 100%"
							/>
						</a-col>

						<a-col :span="12">
							<a-select
								v-decorator="[
									`release_date_estimation`,
									{
										initialValue:
											editable && editable.additional.release_date_estimation
									}
								]"
								placeholder="Select date estimation type"
							>
								<a-select-option
									v-for="type in types"
									:key="type"
									:value="type"
								>
									{{ type }}
								</a-select-option>
							</a-select>
						</a-col>
					</a-row>
				</a-form-item>

				<a-form-item
					label="Marketplace"
					:label-col="{ span: 6 }"
					:wrapper-col="{ span: 18 }"
				>
					<a-input
						v-decorator="[
							'additional.marketplace',
							{
								initialValue: editable && editable.additional.marketplace,
								rules: [
									{
										type: 'url',
										message: 'Marketplace should be a url string'
									}
								]
							}
						]"
						placeholder="Enter marketplace link"
					/>
				</a-form-item>

				<a-form-item
					label="INO"
					:label-col="{ span: 6 }"
					:wrapper-col="{ span: 18 }"
				>
					<a-row :gutter="24">
						<a-col :span="12">
							<a-date-picker
								v-decorator="[
									'additional.ino_date',
									{
										initialValue:
											editable && setCorrectDate(editable.additional.ino_date)
									}
								]"
								placeholder="Select INO date"
								style="width: 100%"
							/>
						</a-col>

						<a-col :span="12">
							<a-select
								v-decorator="[
									`additional.ino_date_estimation`,
									{
										initialValue:
											editable && editable.additional.ino_date_estimation
									}
								]"
								placeholder="Select date estimation type"
							>
								<a-select-option
									v-for="type in types"
									:key="type"
									:value="type"
								>
									{{ type }}
								</a-select-option>
							</a-select>
						</a-col>
					</a-row>
				</a-form-item>

				<a-form-item
					label="Token"
					:label-col="{ span: 6 }"
					:wrapper-col="{ span: 18 }"
				>
					<a-input
						v-decorator="[
							'additional.token',
							{
								initialValue: editable && editable.additional.token
							}
						]"
						placeholder="Enter token"
					/>
				</a-form-item>

				<a-form-item
					label="IDO"
					:label-col="{ span: 6 }"
					:wrapper-col="{ span: 18 }"
				>
					<a-row :gutter="24">
						<a-col :span="12">
							<a-date-picker
								v-decorator="[
									'additional.ido_date',
									{
										initialValue:
											editable && setCorrectDate(editable.additional.ido_date)
									}
								]"
								placeholder="Select IDO date"
								style="width: 100%"
							/>
						</a-col>

						<a-col :span="12">
							<a-select
								v-decorator="[
									`additional.ido_date_estimation`,
									{
										initialValue:
											editable && editable.additional.ido_date_estimation
									}
								]"
								placeholder="Select date estimation type"
							>
								<a-select-option
									v-for="type in types"
									:key="type"
									:value="type"
								>
									{{ type }}
								</a-select-option>
							</a-select>
						</a-col>
					</a-row>
				</a-form-item>
			</template>

			<a-divider />

			<a-form-item
				v-for="(social, index) in socials"
				:label="social.toLowerCase()"
				:key="social"
				:required="false"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					v-decorator="[
						`links[${index}].channel`,
						{
							initialValue: getSocialValue(social),
							validateTrigger: ['change', 'blur'],
							rules: [
								{
									type: 'url',
									message: 'Social channel should be a url string'
								}
							]
						}
					]"
					:placeholder="`Enter ${social.toLowerCase()} link`"
				/>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script lang="ts">
import moment from "moment"
import Vue, { PropOptions } from "vue"
import { mapGetters } from "vuex"

// Types
import type { SocialService } from "@nft-types"

export default Vue.extend({
	name: "game-form",
	props: {
		visible: {
			type: Boolean,
			default: false
		} as PropOptions<boolean>
	},
	data() {
		return {
			form: this.$form.createForm(this, { name: "add-game-form" }),
			types: ["DAY", "MONTH", "QUARTER", "YEAR"],
			socials: ["TWITTER", "DISCORD", "TELEGRAM", "TELEGRAM_CHAT", "MEDIUM"]
		}
	},
	computed: {
		...mapGetters({
			editable: "games/getEditableGame"
		})
	},
	methods: {
		check() {
			this.form.validateFields((err, values) => {
				if (!err) {
					const links = values.links
						.filter((link: SocialService.ChannelBody) => !!link.channel)
						.map((link: SocialService.ChannelBody, index: number) => ({
							...link,
							service: this.socials[index]
						}))

					this.$emit("submit", { ...values, links })
				}
			})
		},
		getSocialValue(social: string) {
			if (!this.editable) return null

			const link = this.editable.links.find(
				(link: SocialService.Channel) => link.service === social
			)

			return link?.channel || null
		},
		setCorrectDate(date: string) {
			if (!date) return null

			return moment(date)
		}
	}
})
</script>
