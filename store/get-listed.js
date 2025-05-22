/**
 * /request-get-list/startup/
 */

import VuexAction from "../util/vuex-utils/actions";
const path = "/public/api/v1/request-get-list";
let vuexAction = new VuexAction(path, true);
const { setLoading } = vuexAction;

export const state = () => ({
    ...vuexAction.getInitialState(),
});

export const mutations = {
    ...vuexAction.getCommonMutations()

}

export const actions = {
    ...vuexAction.getActions(),
    async requestGetListed({ commit }, { stakeHolderType, data }) {
       
        const headers = { "Content-Type": "multipart/form-data" };
        const options = { headers }
        setLoading(commit, true, 'isFetching');
        try {
            let uri = `${path}/${stakeHolderType}/`;
            const response = await this.$axios.$post(uri, data, options);
            setLoading(commit, false, "isFetching");
            return response;
        } catch (error) {
            setLoading(commit, false, "isFetching");

            throw error;
        }

    }



}