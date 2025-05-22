import { setInteractionMode } from "vee-validate";

export const state = () => ({
  startupProfile: null,
  startupPage: {
   
  },
  product: null,
  requesting: false,
  team: [],
  startupArea: [],
  amountOptions: [],
  fundingStage: [],
  fundingTypes:[],
  positions:[],
  selectedStartupPage:{
    product:{},
    team_members:[],
    funding:{}
  },
});

export const mutations = {
  SET_SELECTED_STARTUPPAGE(state,value){
    state.selectedStartupPage = value
  },


  SET_STARTUP_PROFILE(state, value) {
    state.startupProfile = value;
  },
  CREATE_STARTUP_PROFILE(state, value) {
    state.startupProfile = value;
  },
  SET_STARTUP_PAGE(state, value) {
    state.startupPage = value;
  },
  SET_PRODUCT(state, value) {
    state.product = value;
  },
  REQUESTING(state, value) {
    state.requesting = value;
  },
  CREATE_PRODUCT(state, value) {
    state.product = value;
  },
  CREATE_TEAM(state, value) {
    state.team = value;
  },
  SET_STARTUP_AREA(state, value) {
    state.startupArea = value;
  },
  SET_AMOUNT_OPTION(state, value) {
    state.amountOptions = value;
  },
  CREATE_FUNDING_STAGE(state, value) {
    state.fundingStage = value;
  },
  SET_FUNDING_STAGE(state, value) {
    state.fundingStage = value;
  },
  SET_FUNDING_TYPE(state,value){
    state.fundingTypes = value
  },
  SET_TEAM(state,value){
    state.team = value
  },
  SET_POSITION(state,value){
    state.positions = value
  }
};

export const actions = {

  async setSelectedStartupPage({commit},payload){
      
      commit("SET_SELECTED_STARTUPPAGE",payload)
  },

  // create startup profile
  async createStartupProfile({ commit }, userId) {
    
    const payload = {
      "user": userId
    }

    
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.post("/api/v1/startup/profile/", payload);
      if (response.status < 400) {
        commit("REQUESTING", false);
        commit("SET_STARTUP_PROFILE", response.data);
        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },
  // get startup profile
  async setStartupProfile({ commit }) {
    commit("REQUESTING", true);

    try {
      const response = await this.$axios.get("/api/v1/startup/profile/");
      
      if (response.status < 400) {
        commit("SET_STARTUP_PROFILE", response.data);
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },

  async createStartupPage({ commit }, payload) {
    
    commit("REQUESTING", true);
    
    try {
      const response = await this.$axios.post("/api/v1/startup/", payload);
      if (response.status < 400) {
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },

  async deleteStartupPageById({ commit }, id) {
    
    commit("REQUESTING", true);
    
    try {
      const response = await this.$axios.delete(`/api/v1/startup/${id}`);
      if (response.status < 400) {
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },
  async setStartupPage({ commit }) {
    commit("REQUESTING", true);

    try {
      const response = await this.$axios.get("/api/v1/startup/");
      if (response.status < 400) {
        
        commit("REQUESTING", false);
        commit("SET_STARTUP_PAGE", response.data);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },
  // update startup page
  async updateStartupPage({ commit }, payload) {
    commit("REQUESTING", true);
    try {
      var response = null;
      switch (payload.type) {
        case "product":
          response = await this.$axios.patch(
            `/api/v1/startup/${payload.startupPageId}/`,
            {"product": payload.product}
          );

          break;
       
        case "startupArea":
          
          response = await this.$axios.patch(`/api/v1/startup/${payload.id}/`, {
            startup_areas: payload.startup_areas,
          });
      
          break;
        case "team":
          
          response = await this.$axios.patch(`/api/v1/startup/${payload.id}/`, {
            team_members: payload.team_members,
          });
       
          break;
        case "funding":
          
          
          response = await this.$axios.patch(`/api/v1/startup/${payload.id}/`, {
            funding_stage: payload.funding,
          });
         
          break;
        default:
          break;
      }

      
      if (response.status < 400) {
        
        commit("REQUESTING", false);
        
        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },

  // create product
  async createProduct({ commit }, data) {
    
    commit("REQUESTING", true);
    
    try {
      const response = await this.$axios.post("/api/v1/product/", data);
      if (response.status < 400) {
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      
      commit("REQUESTING", false);
      throw error.response;
    }
  },

  // update product
  async updateProduct({ commit }, data) {
    commit("REQUESTING", true);
    
    try {
      const response = await this.$axios.patch(
        `/api/v1/product/${data.id}/`,
        data.payload
      );
      if (response.status < 400) {
        commit("REQUESTING", false);
        commit("SET_PRODUCT", response.data);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },

  // get product
  async setProduct({ commit }, productId) {
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.get(`/api/v1/product/${productId}/`);
      if (response.status < 400) {
        commit("SET_PRODUCT", response.data);
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },

  // create team
  async createTeam({ commit }, data) {
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.post("/api/v1/team/", data);
      if (response.status < 400) {
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },

  async setTeam({commit}){
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.get("/api/v1/team/");
      if (response.status < 400) {
        commit("SET_TEAM", response.data);
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },

  async updateTeam({commit}, payload){

    
    // return
    ///team/{id}/
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.patch(`/api/v1/team/${payload.id}/`, payload.data);
      if (response.status < 400) {
        commit("SET_TEAM",response.data)
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },
  async deleteTeam({commit}, payload){
    ///team/{id}/
    
    // return
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.delete(`/api/v1/team/${payload.id}/`);
      if (response.status < 400) {
        
        commit("REQUESTING", false);
        
        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      
      commit("REQUESTING", false);
      throw error;
    }
  },
  // area of interest

  async setStartupArea({ commit }) {
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.get("/api/v1/interests/");
      if (response.status < 400) {
        commit("SET_STARTUP_AREA", response.data);
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },

  // funding stage
  async setAmountOptions({ commit }) {
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.get("/api/v1/funding/amount/");
      if (response.status < 400) {
        commit("SET_AMOUNT_OPTION", response.data);
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },


  // create funding stage
  // create team
  async createFundingStage({ commit }, data) {
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.post("/api/v1/funding/stage/", data);
      if (response.status < 400) {
   
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },

  async setFundingStage({commit}){
    ///funding/stage/
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.get("/api/v1/funding/stage/");
      if (response.status < 400) {
        commit("SET_FUNDING_STAGE", response.data);
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },

  async setFundingType({commit}){
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.get("/api/v1/funding/type/");
      
      if (response.status < 400) {
        commit("SET_FUNDING_TYPE", response.data);
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },
  async updateFundingStage({ commit }, payload) {
    
    commit("REQUESTING", true);
    try {

      var response = null;
      switch (payload.type) {
        case "info":
          response = await this.$axios.patch(
            `/api/v1/funding/stage/${payload.fundingStageId}/`,
            payload.data
          );
          break;
        case "funding":
          response = await this.$axios.patch(
            `/api/v1/funding/stage/${payload.fundingStageId}/`,
            {funding:payload.data}
          );
        break
        default:
          break;  
      }
      
      if (response.status < 400) {
        
        commit("REQUESTING", false);
        
        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },
  
  async creatFundingRound({commit},data){
    commit("REQUESTING", true);
    
    try {
      const response = await this.$axios.post("/api/v1/funding/fund/",data);
      
      if (response.status < 400) {
       
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },
  async updateFundingRound({commit},payload){
    
    // return
    ///team/{id}/
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.patch(`/api/v1/funding/fund/${payload.id}/`, payload.data);
      if (response.status < 400) {
       
        commit("REQUESTING", false);

        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },
  async deleteFundingRound({commit},payload){
    
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.delete(`/api/v1/funding/fund/${payload.id}/`);
      if (response.status < 400) {
        // commit("REQUESTING", false);
        
        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  },
  // position
  async setPositions({commit}){
    ///position/
    commit("REQUESTING", true);
    try {
      const response = await this.$axios.get(`/api/v1/position/`);
      if (response.status < 400) {
        commit("REQUESTING", false);
        commit("SET_POSITION",response.data);
        
        return response;
      } else {
        commit("REQUESTING", false);
        throw response;
      }
    } catch (error) {
      commit("REQUESTING", false);
      throw error;
    }
  }
};

export const getters = {
  getProduct: (state) => {
    return state.product;
  },
  getLoading: (state) => {
    // 
    return state.requesting;
  },
  getStartupProfile: (state) => {
    return state.startupProfile;
  },
  getStartupPage: (state) => {
    return state.startupPage;
  },
  getStartupArea: (state) => {
    return state.startupArea;
  },
  getAmountOptions: (state) => {
    return state.amountOptions;
  },
  getFundingStage: (state) => {
    return state.fundingStage
  },
  getFundingType: (state)=>{
    return state.fundingTypes;
  },
  getTeam: (state)=>{
    return state.team
  },
  getPositions: (state)=>{
    return state.positions
  }
};
