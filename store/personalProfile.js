export const PERSONAL_PROFILE_MUTATION = {
  SET_PROFILE: "SET_PROFILE",
  PATCH_PROFILE: "PATCH_PROFILE",
  REQUESTING: "REQUESTING",
};
export const state = () => ({
  profile: null,
  test: false,
  loading: false,
});

export const mutations = {
  [PERSONAL_PROFILE_MUTATION.SET_PROFILE](state, value = null) {
    state.profile = value;
  },
  [PERSONAL_PROFILE_MUTATION.PATCH_PROFILE](state, value) {
   
    //state.profile = Object.assign({}, state.profile, profile)
    state.profile = value;
  },

  [PERSONAL_PROFILE_MUTATION.REQUESTING](state, value) {
  
    state.loading = value;
  },
};

export const actions = {
  async setProfile({ commit }) {
    commit(PERSONAL_PROFILE_MUTATION.REQUESTING, true);
    try {
      const response = await this.$axios.get("/api/v1/rest-auth/user/");
      if (response.status < 400) {
        commit(PERSONAL_PROFILE_MUTATION.SET_PROFILE, response.data);
        commit(PERSONAL_PROFILE_MUTATION.REQUESTING, false);

        return response;
      } else {
        commit(PERSONAL_PROFILE_MUTATION.REQUESTING, false);
        throw response;
      }
    } catch (error) {
      commit(PERSONAL_PROFILE_MUTATION.REQUESTING, false);
      throw error;
    }
  },
  async patchProfile({ commit }, data) {
   
    commit(PERSONAL_PROFILE_MUTATION.REQUESTING, true);
    try {
      const response = await this.$axios.patch("/api/v1/rest-auth/user/", data);
      
      if (response.status < 400) {
        commit(PERSONAL_PROFILE_MUTATION.REQUESTING, false);

        return response;
      } else {
        commit(PERSONAL_PROFILE_MUTATION.REQUESTING, false);
        throw response;
      }
    } catch (error) {
      commit(PERSONAL_PROFILE_MUTATION.REQUESTING, false);
      throw error;
    }
  },
};

export const getters = {
  getProfile: (state) => {
   
    return state.profile;
  },
  getLoading: (state) => {
    
    return state.loading;
  },
  getTest: (state) => {
    return state.test;
  },
};
