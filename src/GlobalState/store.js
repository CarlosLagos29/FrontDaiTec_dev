import { createStore } from "vuex";
import axios from "axios";

const BASE_URL = 'http://localhost:3001/products/'

const store = createStore({
  state:{
    allProducts: []
  },
  mutations: {
    setAllProducts(state, payload){
      state.allProducts = payload
    }
  },
  actions: {
    async getAllProducts({commit}){
      try {
        const response = await axios.get('http://localhost:3001/products/');
        console.log(response.data)
        commit('setAllProducts', response.data)
    } catch (error) {
        console.error(error);
    }
    }
  },
  getters: {
  }
});

export default store;