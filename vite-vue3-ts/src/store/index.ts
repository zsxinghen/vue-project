import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import module, { ModuleState } from './modules'
import createPersistedState from 'vuex-persistedstate'

export interface State {
  rootCount: number
}

export interface InjectionState extends State {
  module: ModuleState
}

// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<InjectionState>> = Symbol()

const store = createStore<InjectionState>({
  // 防止刷新页面时,项目重新加载,vuex重置
  plugins: [createPersistedState()],
  modules: {
    module
  }
})

export default store
