import VuexAction from "../util/vuex-utils/actions";
const path = "/api/v1/eso";
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
  async invitedMember({ commit }, payload = { to_user, stakeholder_id }) {
    setLoading(commit, true);
    try {
      const _URI = "/base-api/eso/invite-team/";
      const response = await this.$axios.$post(_URI, payload);
      setLoading(commit, false);
      return response;
    } catch (error) {
      setLoading(commit, false);
      throw error;
    }
  },
  async matchingProfile({ commit }, payload) {
    setLoading(commit, true);
    try {
      let uri = "/base-api/startup/matching/";
      const response = await this.$axios.$post(uri, payload);
      setLoading(commit, false);
      return response;
    } catch (error) {
      setLoading(commit, false);
      throw error.response;
    }
  },
  async addStartupFunding({ commit }, { id, payload }) {
    setLoading(commit, true);
    try {
      let uri = `/base-api/eso/${id}/funding-round-raise/`;
      const response = await this.$axios.$post(uri, payload);
      setLoading(commit, false);
      return response;
    } catch (error) {
      setLoading(commit, false);
      throw error.response;
    }
  },
  async updateStartupFunding({ commit }, { id, funding_id, payload }) {
    setLoading(commit, true);
    try {
      let uri = `/base-api/eso/${id}/funding-round-raise/${funding_id}/`;
      const response = await this.$axios.$patch(uri, payload);
      setLoading(commit, false);
      return response;
    } catch (error) {
      setLoading(commit, false);
      throw error.response;
    }
  },
  async deleteStartupFunding({ commit }, { id, funding_id }) {
    setLoading(commit, true);
    try {
      let uri = `/base-api/eso/${id}/funding-round-raise/${funding_id}/`;
      const response = await this.$axios.$delete(uri);
      setLoading(commit, false);
      return response;
    } catch (error) {
      setLoading(commit, false);
      throw error.response;
    }
  },

  async updateStartupMember({commit}, {id, memberId,payload}){
    console.log("updateStartupMember=====",payload);
    setLoading(commit,true);
    try{
      let uri = `/base-api/eso/${id}/team/${memberId}/`;
      const response = await this.$axios.$patch(uri,payload);
      setLoading(commit,false);
      return response;
    }catch(error){
      console.group("updateStartupMemberCatch",error);
      setLoading(commit,false);
      throw error.response;
    }
  }
};
