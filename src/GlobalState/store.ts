import { createStore } from "vuex";
import axios from "axios";
import { BASE_URL } from "@/api/config";
import type { Paginated, Product, Profecional, Promo } from "@/types";

// Entidad que se está editando en el panel admin ({} = no se está editando nada)
type Editable = Product | Profecional | Record<string, never>;

export interface State {
    currentDashboard: string;
    allProducts: Product[];
    profecionals: Profecional[];
    adminView: Product[];
    edit: Editable;
    promos: Promo[];
}

const store = createStore<State>({
    state: {
        currentDashboard: "Promos",
        allProducts: [],
        profecionals: [],
        adminView: [],
        edit: {},
        promos: [],
    },
    mutations: {
        setAllProducts(state, payload: Product[]) {
            state.allProducts = payload;
        },
        setProduct(state, payload: Product[]) {
            state.allProducts = payload;
        },
        setProfecionals(state, payload: Profecional[]) {
            state.profecionals = payload;
        },
        setDashboard(state, payload: string) {
            state.currentDashboard = payload;
        },
        setAdminView(state, payload: Product[]) {
            state.adminView = payload;
        },
        setEdit(state, payload: Editable) {
            state.edit = payload;
        },
        resetEdit(state) {
            state.edit = {};
        },
        getName(state, payload: Product[]) {
            state.allProducts = payload;
        },
        setPromos(state, payload: Promo[]) {
            state.promos = payload;
        },
    },
    actions: {
        async getAllProducts({ commit }) {
            try {
                const { data } = await axios.get<Paginated<Product>>(`${BASE_URL}products`);
                commit("setAllProducts", data.docs);
            } catch (error) {
                console.error(error);
            }
        },
        async getProduct({ commit }, source: string) {
            try {
                const { data } = await axios.get<Paginated<Product>>(
                    `${BASE_URL}products?source=${source}`,
                );
                commit("setProduct", data.docs);
            } catch (error) {
                console.error(error);
            }
        },
        async getProfecionals({ commit }) {
            try {
                const { data } = await axios.get<Profecional[]>(`${BASE_URL}users/profecionals/`);
                commit("setProfecionals", data);
            } catch (error) {
                console.error(error);
            }
        },
        async getAdminview({ commit }, source: string) {
            try {
                const { data } = await axios.get<Paginated<Product>>(
                    `${BASE_URL}products?source=${source}`,
                );
                commit("setAdminView", data.docs);
            } catch (error) {
                console.error(error);
            }
        },
        async getEdit({ commit }, { id, type }: { id: string; type: string }) {
            try {
                const { data } = await axios.get<Product | Profecional>(`${BASE_URL}${type}/${id}`);
                commit("setEdit", data);
            } catch (error) {
                console.error(error);
            }
        },
        async getName({ commit }, name: string) {
            try {
                const { data } = await axios.get<Paginated<Product>>(
                    `${BASE_URL}products?name=${name}`,
                );
                commit("getName", data.docs);
            } catch (error) {
                console.error(error);
            }
        },
        async getPromos({ commit }) {
            try {
                const { data } = await axios.get<Promo[]>(`${BASE_URL}promos/`);
                commit("setPromos", data);
            } catch (error) {
                console.error(error);
            }
        },
        setResetEdit({ commit }) {
            commit("resetEdit");
        },
    },
    getters: {},
});

export default store;
