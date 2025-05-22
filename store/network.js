import VuexAction from "../util/vuex-utils/actions";
const path = "/public"
let vuexAction = new VuexAction(path,true);
const { setLoading } = vuexAction;

export const state = ()=>({
    ...vuexAction.getInitialState(),
    resources:[],
})

export const MUTATION = {
    SET_NETWORK_PROFILE: "SET_NETWORK_PROFILE"
}

export const mutations = {
    ...vuexAction.getCommonMutations(),

    [MUTATION.SET_NETWORK_PROFILE](state, value) {
        state.networkProfile = value
        localStorage.setItem('networkProfile', JSON.stringify(state.networkProfile));
    }
}


export const actions = {
    ...vuexAction.getActions(),
    async getNetworkByCategory({commit},{category, page}){

        setLoading(commit, true, "isFetching");
        try{
            let uri = `${path}/api/v1/startup/list`

            const response =  await this.$axios.$get(uri, {params:{page}})

            commit("SET_NETWORK", response.data);

            setLoading(commit, false, "isFetching");
            return response
        }catch(error){
            setLoading(commit, false, "isFetching");
        }
    },
    setNetworkProfile({ commit }, data) {
        commit(MUTATION.SET_NETWORK_PROFILE, data)
    }
}