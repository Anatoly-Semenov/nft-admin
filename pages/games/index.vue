<template>
	<div class="games-table">
		<div class="games-table__actions">
			<a-button @click="modalVisible = true">
				<ui-icon iconType="ant-design" type="plus" color="#333333" />
				Add game
			</a-button>

			<a-upload
				name="file"
				:action="uploadEndpoint"
				:showUploadList="false"
				@change="handleUpload"
			>
				<a-button>
					<ui-icon iconType="ant-design" type="upload" color="#333333" />
					Import csv
				</a-button>
			</a-upload>
		</div>

		<game-form
			:visible="modalVisible"
			@cancel="cancelModal"
			@submit="handleSubmit"
		/>

		<ui-tabs v-model="activeTab" @change="activeTab = $event">
			<a-tab-pane
				v-for="({ name, component }, index) in tabs"
				:key="`${index + 1}`"
				:tab="name"
			>
				<transition name="fade-in">
					<component
						:is="component"
						v-if="activeTab === `${index + 1}`"
						@edit="edit"
						@delete="remove"
					/>
				</transition>
			</a-tab-pane>
		</ui-tabs>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapActions, mapGetters, mapMutations } from "vuex"

// Types
import type { GameService, SocialService } from "@nft-types"

// Components
import gameForm from "~/components/games/game-form.vue"
import gamesListTable from "~/components/games/games-list-table.vue"
import gamesUpcomingTable from "~/components/games/games-upcoming-table.vue"

export default Vue.extend({
	name: "page-games",
	layout: "index",
	transition: "fade-in",
	components: { gameForm, gamesListTable, gamesUpcomingTable },
	async fetch() {
		await Promise.all([this.fetchGames(), this.fetchUpcomingGames()])
	},
	data() {
		return {
			modalVisible: false as boolean,
			activeTab: "1" as string,
			tabs: [
				{
					name: "All",
					component: "games-list-table"
				},
				{
					name: "Upcoming",
					component: "games-upcoming-table"
				}
			]
		}
	},
	computed: {
		...mapGetters({
			getGames: "games/getList",
			editable: "games/getEditableGame"
		}),
		uploadEndpoint() {
			return `${process.env.BASE_API_URL}games/import`
		}
	},
	methods: {
		...mapMutations({
			setEditableGame: "games/setEditableGame"
		}),
		...mapActions({
			fetchGames: "games/fetchGames",
			fetchUpcomingGames: "games/fetchUpcomingGames",
			create: "games/create",
			update: "games/update",
			addAdditionalInfo: "games/addAdditionalInfo",
			addSocialChannel: "games/addSocialChannel",
			delete: "games/delete"
		}),
		cancelModal() {
			this.modalVisible = false
			this.setEditableGame(null)
		},
		edit(id: number) {
			this.setEditableGame(id)
			this.modalVisible = true
		},
		async remove(id: number) {
			try {
				await this.delete(id)
			} catch (error) {
				if (error instanceof Error) {
					this.$message.error(error.message)
				}
			}
		},
		async handleSubmit(
			values: GameService.Game & {
				additional: GameService.Additional
			} & { links: SocialService.ChannelBody[] }
		) {
			try {
				let game: GameService.Game | null = null
				const { additional, links = [], ...data } = values

				if (this.editable?.id) {
					await this.update({ id: this.editable.id, body: values })
				} else {
					game = await this.create(data)
				}

				if (game?.id || this.editable.id) {
					const id = game?.id || this.editable.id
					const socialQueries = links.map((link: SocialService.ChannelBody) =>
						this.addSocialChannel({ id, body: link })
					)

					await Promise.all([
						this.addAdditionalInfo({ id, body: additional }),
						...socialQueries
					])
				}

				if (this.editable?.id) {
					await Promise.all([this.fetchGames(), this.fetchUpcomingGames()])
				}

				this.cancelModal()
			} catch (error) {
				if (error instanceof Error) {
					this.$message.error(error.message)
				}
			}
		},
		async handleUpload(info: any) {
			if (info.file.status === "done") {
				this.$message.success(`${info.file.name} file uploaded successfully`)
				await Promise.all([this.fetchGames(), this.fetchUpcomingGames()])
			} else if (info.file.status === "error") {
				this.$message.error(`${info.file.name} file upload failed.`)
			}
		}
	}
})
</script>
