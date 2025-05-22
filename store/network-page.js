import VuexAction from "../util/vuex-utils/actions";
const path = "/public/api/v1/network-page"
let vuexAction = new VuexAction(path,true);
const { setLoading } = vuexAction;

export const state = ()=>({
  ...vuexAction.getInitialState(),
  networkList:[]
})



export const mutations = {
  ...vuexAction.getCommonMutations(),
  SET_NETWORK_PAGE(state, value) {
    state.networkList = value
  }
}


export const actions = {
  ...vuexAction.getActions(),
  async getNetworkPage({commit},fundingCurrency){
      
    setLoading(commit, true, "isFetching");
    try{
     let uri = path   
     
     const response =  await this.$axios.$get(uri,{params:{funding_currency:fundingCurrency}})
     commit("SET_NETWORK_PAGE", response);
     setLoading(commit, false, "isFetching");
     return response
    }catch(error){
        setLoading(commit, false, "isFetching");
    }
  }
}


