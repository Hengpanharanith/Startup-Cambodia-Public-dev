export const initialState = {
  access_token: null, // JWT access token
  refresh_token: null, // JWT refresh token
  authenticated: false,
  isLoading: false,
  activeMenu: "",
};

export const state = () => ({
  ...initialState,
});

export const mutations = {
  setActiveMenu(state, menu = null) {
    state.activeMenu = menu;
  },
  SET_AUTH(state, payload) {
    state.auth = { ...payload };
  },
};

export const getters = {
  getActiveMenu: (state) => {
    return state.activeMenu;
  },
};

export const actions = {
  // https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action
  // automatically refresh the access token on the initial request to the server, if possible
  async nuxtServerInit({ commit, dispatch }, { req }) {
    await dispatch("resource-page/get");
  },
};
