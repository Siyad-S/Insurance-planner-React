import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getInsurePolicies = createAsyncThunk(
  "getInsurePolicies", async () => {
    try {
      const response = await axios.get("http://localhost:4000/policy");
      console.log(response.data);
      return response.data;
    } catch(error) {
      console.log(error.message);
      throw error;
    }
  }
);

export const postUserInsure = createAsyncThunk(
  "postUserInsure", async ({userData}) => {
    try {
      const response = await axios.post(`http://localhost:4000/user`, userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

export const insuranceSlice = createSlice({
  name: 'insurance',
  initialState: {
    insureForm: {
      salutation: "",
      name: "",
      email: "",
      gender: "",
      dob: "",
      age: 0,
      address: "",
      qualifications: [],
      profession: "",
      nominee: "",
      relationshipWithNominee: "",
      insuranceDetails: [],
    },
    policies: [],
    isError: false,
  },
  reducers: {
    setUserInsurance: (state, action) => {
        state.insureForm = { ...action.payload }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInsurePolicies.fulfilled, (state, action) => {
        state.policies = {...action.payload};
        state.isError = false;
      })
      .addCase(postUserInsure.fulfilled, (state, action) => {
        state.insureForm = action.payload;
        state.isError = false;
      })
      .addCase(getInsurePolicies.rejected, (state, action) => {
        state.isError = true;
        console.log("Error occurred on getInsurePolicies method");
      })
      .addCase(postUserInsure.rejected, (state, action) => {
        state.isError = true;
        console.log("Error occurred on postUserInsure method");
      });
  },
});

export const {setUserInsurance} = insuranceSlice.actions

export default insuranceSlice.reducer;
