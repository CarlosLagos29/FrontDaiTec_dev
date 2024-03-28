import { createStore } from "vuex";
import axios from "axios";

export const BASE_URL = 'http://localhost:3001/'

const store = createStore({
  state:{
    currentDashboard: 'Productos Gennerales',
    allProducts: [],
    profecionals: [],
    adminView:[],
    isEditing: false,
    edit: {},

  },
  mutations: {
    setAllProducts(state, payload){
      state.allProducts = payload
    },
    setProfecionals(state, payload){
      state.profecionals = payload
    },
    setDashboard(state,payload){
      state.currentDashboard = payload
    },
    setAdminView(state,payload){
      state.adminView = payload
    },
    setIsEditing(state, payload){
      state.isEditing = payload
    },
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
    },
    async getAdminview({commit},path){
      try {
        const {data} = await axios.get(path)
        commit('setAdminView',data)
      } catch (error) {
        console.error(error);
      }
    },
    changeIsediting ({commit, state}){
      commit('setIsEditing', !state.isEditing);
    },
  },
  getters: {
  }
});

export default store;