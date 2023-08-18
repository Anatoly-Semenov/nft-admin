<template>
	<code-highlight class="docs__code" language="html" :key="code">
		<div slot="default">{{ code }}</div>
	</code-highlight>
</template>

<script lang="ts">
import Vue from "vue"

// Components
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue"

// Css
import "vue-code-highlight/themes/duotone-sea.css"
import "vue-code-highlight/themes/window.css"

export default Vue.extend({
	name: "docs-code",
	components: {
		CodeHighlight
	},
	props: {
		name: {
			type: String,
			required: true
		},
		componentSlot: {
			type: String,
			required: false
		},
		componentProperties: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			code: "asd" as string
		}
	},
	watch: {
		componentProperties() {
			this.code = this.generateCode()
		}
	},
	created() {
		this.code = this.generateCode()
	},
	methods: {
		generateCode(): string {
			const properties = Object.keys(this.componentProperties)
				.reduce((result, key) => {
					const value: any = this.componentProperties[key]

					switch (typeof value) {
						case "boolean":
							return [...result, value ? key : ""]
						case "object":
							return [...result, `:${key}="Object"`]
						case "number":
							return [...result, value ? `:${key}="${value}"` : ""]
						default:
							return [...result, value ? `${key}="${value}"` : ""]
					}
				}, [] as string[])
				.filter((item) => !!item)

			let code = `<${[this.name, ...properties].join("\n  ")}`

			if (properties.length) {
				code += "\n"
			}

			if (this.componentSlot) {
				code += `>${this.componentSlot}</${this.name}>`
			} else {
				code += "/>"
			}

			return code
		}
	}
})
</script>
