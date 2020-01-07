import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listCards: [
      {
        default: true,
        brand: "Visa",
        img: "visa-card-logo.svg",
        lastDigits: "7015",
        expDate: "10/2023"
      }
    ],
    card: {},
    lastDigits: "",
    showModal: false,
    activeModalRemoveCard: false,
    activeModalSetDefault: false
  },
  mutations: {
    setLastDigits(state, payload) {
      state.lastDigits = "";
      state.lastDigits = payload;
    },
    setShowModal(state, payload) {
      state.showModal = payload;
    },
    setAddCard(state, payload) {
      state.listCards.push(payload);
    },
    setActiveModalRemoveCard(state, payload) {
      state.activeModalRemoveCard = payload;
    },
    setActiveModalSetDefault(state, payload) {
      state.activeModalSetDefault = payload;
    },
    removeCard(state, payload) {
      let restCards = state.listCards.filter(function(obj) {
        return obj.lastDigits !== payload;
      });

      state.listCards = restCards;
    },
    setDefault(state, payload) {
      for (let i = 0; i < state.listCards.length; i++) {
        state.listCards[i].default = false;
        if (state.listCards[i].lastDigits === payload) {
          state.listCards[i].default = true;
        }
      }
    }
  },
  actions: {},
  modules: {}
});
