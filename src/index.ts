import { createStore } from "vuex"

export const store = createStore({
    state: {
        Tickers: [],
    },

    mutations:{
        mutDelTicker(state, idx){
            state.Tickers.splice(idx,1)
        },
    },

    actions:{
        actDelTicker({commit}, idx){
            commit('mutDelTicker', idx)
        },
    },

    getters:{
        getTickers(state){
            return state.Tickers
        },
    }
})