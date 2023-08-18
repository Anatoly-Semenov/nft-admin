<template>
	<div class="parsing-jobs-table">
		<job-list-table />
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapActions } from "vuex"
import JobListTable from "~/components/parsing-jobs/job-list-table.vue"

export default Vue.extend({
	name: "page-parsing-jobs-detail",
	components: { JobListTable },
	layout: "index",
	transition: "fade-in",
	data() {
		return {
			id: this.$route.params.id
		}
	},
	methods: {
		...mapActions({
			fetchJobs: "parsing-jobs/fetchJobs"
		})
	},
	async mounted() {
		await this.fetchJobs(this.id)
	}
})
</script>
