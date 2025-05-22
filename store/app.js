export const state = () => ({
    visibleAuthDialog: false,
});

export const mutations = {
    DIALOG_AUTH_VISIBILITY(state, visibility) {
        state.visibleAuthDialog = visibility;
    },
};

export const actions = {
    setAuthDialogVisibility({ commit }, visibility = false) {
        commit("DIALOG_AUTH_VISIBILITY", visibility);
    },
};
