<template>
	<div class="login">
		<div class="login__background" v-if="screenWidth > 800">
			<img
				class="login__background-img"
				src="~/assets/img/login-background.jpg"
			/>
			<div class="login__background-gradient" />
		</div>
		<login-block />
	</div>
</template>

<script lang="ts">
import mixins from "vue-typed-mixins"

// Components
import loginBlock from "~/components/login/login-block.vue"

// Mixins
import widthMixin from "~/mixins/width"

export default mixins(widthMixin).extend({
	name: "page-login",
	layout: "index",
	components: {
		loginBlock
	}
})
</script>
