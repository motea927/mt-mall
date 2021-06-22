import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// Types
import UserType from '../types/UserType'

export interface State {
  user: UserType
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    user: {
      name: '',
      accessToken: '',
      id: '',
      email: '',
    },
  },
  mutations: {
    setUser(state, user: UserType) {
      state.user = user
    },
  },
  actions: {
    clearUser(context) {
      context.commit('setUser', {
        name: '',
        accessToken: '',
        id: '',
        email: '',
      })
    },
  },
})

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key)
}
