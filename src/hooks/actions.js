import { api } from "./apis"
import axios from "axios";

export const Actions = {
    Login : async(data)=>{
        return await axios.post(api+"/companies/login",{...data})
    },
    Register : async(data)=>{
        return await axios.post(api+"/companies/register",{...data})
    },
    VerifyAccount : async(data)=>{
        return await axios.post(api+`/companies/verifyaccount?token=${data.token}`)
    },
    fetchUser: async () => {
        return await axios.get(api+"/companies/me");
    },
    UpdateStudent: async (data) => {
        return await axios.post(api+"/updateuser",{...data});
    },
    resetPassword: async (data) => {
        return await axios.post(api+"/companies/resetpassword?token="+data.token,{...data});
    },
    forgotPassword: async (data) => {
        return await axios.post(api+"/companies/forgotpassword",{...data});
    },
    resendVerification: async (data) => {
        return await axios.post(api+"/companies/resendverification",{...data});
    },
    reportIncident : async (data) => {
        return await axios.post(api+"/companies/reportincident",{...data});

    },
    postInternship: async (data) => {
        return await axios.post(api+"/companies/internships",{...data});
    },
    getInternships: async () => {
        return await axios.get(api+"/companies/internships");

    },
    getJobApplications: async () => {
       return await axios.get(api+"/companies/applications");
    },
    acceptApplication: async (id) => {
        return await axios.post(api+"/companies/applications/"+id,{status:"selected"});
    },
    rejectApplication: async (id) => {
        return await axios.post(api+"/companies/applications/"+id, {status:"rejected"});

    },
    nextRound: async (id) => {
            return await axios.post(api+"/companies/applications/"+id, {status:"next round"});
    

    }

}

// services/api.js


export const getApplicationStatistics = async (userId) => {
  try {
    const response = await axios.get(`${api}/statistics/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch application statistics');
  }
};
