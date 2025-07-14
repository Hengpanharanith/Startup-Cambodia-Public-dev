export default {
  namespaced: true,
  state: () => ({
    programCategories: [],
    loadingProgramCategories: false,
  }),
  mutations: {
    SET_PROGRAM_CATEGORIES(state, categories) {
      state.programCategories = categories;
    },
    SET_LOADING_PROGRAM_CATEGORIES(state, isLoading) {
      state.loadingProgramCategories = isLoading;
    },
  },
  actions: {
    async fetchCategories({ commit, state }) {
      if (state.programCategories.length > 0) return;

      commit("SET_LOADING_PROGRAM_CATEGORIES", true);
      try {
        const res = await this.$axios.get(
          "public/api/v1/startup-program-category/"
        );
        const formatted = res.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        commit("SET_PROGRAM_CATEGORIES", formatted);
      } catch (error) {
        console.error("Failed to fetch program categories:", error);
      } finally {
        commit("SET_LOADING_PROGRAM_CATEGORIES", false);
      }
    },
  },
};
