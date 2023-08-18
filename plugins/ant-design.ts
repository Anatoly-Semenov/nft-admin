import Vue from "vue"
import { Plugin } from "@nuxt/types"

// Types
import type { Message } from "ant-design-vue/types/message"
import type { Notification } from "ant-design-vue/types/notification"
import type { ModalConfirm, ModalOptions } from "ant-design-vue/types/modal"

import {
	Tooltip,
	Table,
	Popover,
	Menu,
	Modal,
	Result,
	Tabs,
	notification,
	message,
	Form,
	FormModel,
	Select,
	DatePicker,
	Calendar,
	Card,
	Row,
	Divider,
	Col,
	Upload,
	Icon,
	Space,
	Pagination,
	Popconfirm,
	Button,
	List
} from "ant-design-vue"

Vue.prototype.$notification = notification
Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm

Vue.use(Tooltip)
Vue.use(Table)
Vue.use(Popover)
Vue.use(Menu)
Vue.use(Result)
Vue.use(Tabs)
Vue.use(Form)
Vue.use(FormModel)
Vue.use(Select)
Vue.use(Select.Option)
Vue.use(DatePicker)
Vue.use(Calendar)
Vue.use(Card)
Vue.use(Row)
Vue.use(Divider)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Icon)
Vue.use(Space)
Vue.use(Pagination)
Vue.use(Popconfirm)
Vue.use(Button)
Vue.use(Modal)
Vue.use(List)

const messagePlugin: Plugin = (_, inject) => {
	inject("notification", notification)
	inject("message", message)
	inject("confirm", Modal.confirm)
}

declare module "vue/types/vue" {
	// this.$copy inside Vue components
	interface Vue {
		$notification: Notification
		$message: Message
		$confirm: (modalOptions: ModalOptions) => ModalConfirm
	}
}

declare module "@nuxt/types" {
	// nuxtContext.app.$copy inside asyncData, fetch, plugins, middleware, nuxtServerInit
	interface NuxtAppOptions {
		$notification: Notification
		$message: Message
		$confirm: (modalOptions: ModalOptions) => ModalConfirm
	}
	// nuxtContext.$copy
	interface Context {
		$notification: Notification
		$message: Message
		$confirm: (modalOptions: ModalOptions) => ModalConfirm
	}
}

declare module "vuex/types/index" {
	// this.$copy inside Vuex stores
	interface Store<S> {
		$notification: Notification
		$message: Message
		$confirm: (modalOptions: ModalOptions) => ModalConfirm
	}
}

export default messagePlugin
