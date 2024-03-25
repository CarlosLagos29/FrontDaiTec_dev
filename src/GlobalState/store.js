import { createStore } from "vuex";
import axios from "axios";

export const BASE_URL = 'http://localhost:3001/'

const store = createStore({
  state:{
    allProducts: [],
    profecionals: [],
  },
  mutations: {
    setAllProducts(state, payload){
      state.allProducts = payload
    },
    setProfecionals(state, payload){
      state.profecionals = payload
    }
  },
  actions: {
    async getAllProducts({commit}){
      try {
        const response = await axios.get(`${BASE_URL}products/`);
        commit('setAllProducts', response.data)
    } catch (error) {
        console.error(error);
    }
    },
    async getProfecionals({commit}){
      try {
        const response = await axios.get(`${BASE_URL}users/profecionals/`);
        commit('setProfecionals', response.data)
    } catch (error) {
        console.error(error);
    }
    }
  },
  getters: {
  }
});

export default store;