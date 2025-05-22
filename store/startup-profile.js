import VuexAction from "../util/vuex-utils/actions";
const path = "/api/v1/startup/profile";
let vuexAction = new VuexAction(path, true);

const { setLoading } = vuexAction;
export const state = () => ({
  ...vuexAction.getInitialState(),
  startupProfile: [],
});

export const mutations = {
  ...vuexAction.getCommonMutations(),
  SET_STARTUP_PROFILE(state, payload) {
    state.startupProfile = Object.assign({}, payload);
  },
};

export const actions = {
  ...vuexAction.getActions(),
  async getStartupProfile({ commit }, options) {
    setLoading(commit, true);
    try {
      const response = await this.$axios.$get(
        "/api/v1/startup/",
        options
      );
      commit("SET_STARTUP_PROFILE", response.data);
      setLoading(commit, false);
      return response;
    } catch (error) {
      setLoading(commit, false);
      throw error;
    }
  },

  async matchingProfile({ commit }, payload) {
    setLoading(commit, true)
    try {
      let uri = '/api/v1/startup/matching/'
      const response = await this.$axios.$post(
        uri,
        payload
      )
      setLoading(commit, false)
      return response
    } catch (error) {
      setLoading(commit, false)
      throw error.response
    }
  },


  async updateProfile({ commit }, formData) {
    
    setLoading(commit, true)
    try {
      let uri = `/api/v1/startup/${formData.get("id")}/`
      const response = await this.$axios.$patch(
        uri, formData
      )
      setLoading(commit, false)
      return response
    } catch (error) {
      setLoading(commit, false)
      throw error.response
    }
  },

  async createProfile({ commit }, payload) {
    
    setLoading(commit, true)
    try {
      let uri = '/api/v1/startup/'
      const response = await this.$axios.$post(
          uri,
          payload
      )
      setLoading(commit, false)
      return response
    } catch (error) {
      setLoading(commit, false)
      throw error.response
    }
  }


};
