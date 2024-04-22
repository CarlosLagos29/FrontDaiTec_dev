import { createStore } from "vuex";
import axios from "axios";

export const BASE_URL = 'http://localhost:3001/'

const store = createStore({
  state: {
    currentDashboard: 'Productos Gennerales',
    allProducts: [],
    profecionals: [],
    adminView: [],
    edit: {},

  },
  mutations: {
    setAllProducts(state, payload) {
      state.allProducts = payload
    },
    setProduct(state, payload) {
      state.allProducts = payload
    },
    setProfecionals(state, payload) {
      state.profecionals = payload
    },
    setDashboard(state, payload) {
      state.currentDashboard = payload
    },
    setAdminView(state, payload) {
      state.adminView = payload
    },
    setEdit(state, payload) {
      state.edit = payload
    },
    resetEdit(state) {
      state.edit = {};
    },
    getName(state, payload) {
      state.allProducts = payload
    }
  },
  actions: {
    async getAllProducts({ commit }) {
      try {
        const { data}  = await axios.get(`${BASE_URL}products/`);
        commit('setAllProducts', data)
      } catch (error) {
        console.error(error);
      }
    },
    async getProduct({ commit }, path) {
      try {
        const { data } = await axios.get(path);
        commit('setProduct', data.docs);
      } catch (error) {
        console.error(error)
      }
    },
    async getProfecionals({ commit }) {
      try {
        const { data } = await axios.get(`${BASE_URL}users/profecionals/`);
        commit('setProfecionals', data)
      } catch (error) {
        console.error(error);
      }
    },
    async getAdminview({ commit }, path) {
      try {
        const { data } = await axios.get(path);
        commit('setAdminView', data.docs);
      } catch (error) {
        console.error(error);
      }
    },
    async getEdit({ commit }, path) {
      try {
        const { data } = await axios.get(path);
        commit('setEdit', data)
      } catch (error) {
        console.error(error)
      }
    },
    async getName({ commit }, name) {
      try {
        const { data } = await axios.get(`${BASE_URL}products/search?name=${name}`);
        commit('getName', data)
      } catch (error) {
        console.error(error)
      }
    },
    setResetEdit({ commit }) {
      commit('resetEdit')
    },

  },
  getters: {
  }
});

export default store;