export default {
  namespaced: true,
  state: () => ({
    programTypes: [],
    loadingProgramTypes: false,
  }),
  mutations: {
    SET_PROGRAM_TYPES(state, types) {
      state.programTypes = types;
    },
    SET_LOADING_PROGRAM_TYPES(state, isLoading) {
      state.loadingProgramTypes = isLoading;
    },
  },
  actions: {
    async fetchTypes({ commit, state }) {
      if (state.programTypes.length > 0) return;

      commit("SET_LOADING_PROGRAM_TYPES", true);
      try {
        const res = await this.$axios.get(
          "public/api/v1/startup-program-type/"
        );
        const formatted = res.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        commit("SET_PROGRAM_TYPES", formatted);
      } catch (error) {
        console.error("Failed to fetch program types:", error);
      } finally {
        commit("SET_LOADING_PROGRAM_TYPES", false);
      }
    },
  },
};
