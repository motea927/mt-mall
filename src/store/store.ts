import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
const ls = new SecureLS({ isCompression: false })

// Types
import UserType from '../types/UserType'
import ProductType from '../types/ProductType'

export interface State {
  user: UserType
  cart: ProductType[]
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
    cart: [],
  },
  mutations: {
    setUser(state, user: UserType) {
      state.user = user
    },
    setCart(state, cartLists: ProductType[]) {
      state.cart = cartLists
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
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
})

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key)
}
