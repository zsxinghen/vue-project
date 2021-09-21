import { Module } from 'vuex'
import { InjectionState } from '../index'

export interface ModuleState {
  count: number
}
export default {
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count += 1
    }
  },
  getters: {
    getCount(state, getters, rootState) {
      return `${state.count}`
    }
  },
  actions: {}
} as Module<ModuleState, InjectionState>
