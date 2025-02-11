// src/plugins/vuetify.ts
import 'vuetify/styles' // 确保引入 Vuetify 样式
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'


// 手动导入所有组件
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

export default vuetify
