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
  "postUserInsure", async (userData) => {
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


export const getUserDatas = createAsyncThunk(
  "getUserDatas", async (searchQuery) => {
    try {
      const response = await axios.get(`http://localhost:4000/user?search=${searchQuery}`);
      return response.data;
    } catch(error) {
      console.log(error.message);
      throw error;
    }
  }
);

export const getSingleUser = createAsyncThunk(
  "getSingleUser", async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/user/${id}`);
      return response.data
    } catch(error) {
      console.log(error.response.message)
      throw error;
    }
  }
)

export const updateUserInsureStatus = createAsyncThunk(
  "updateUserInsureStatus",
  async ({ id, data }) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/user/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.log(error.response.message);
      throw error;
    }
  }
);

export const getSinglePolicy = createAsyncThunk(
  "getSinglePolicy", async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/policy/${id}`);
      return response.data
    } catch(error) {
      console.log(error.response.message)
      throw error;
    }
  }
)

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
      relationship: "",
      insuranceData: "",
    },
    singleUser: {},
    policies: [],
    isError: false,
    userDatas: { insuranceData: [] },
    policy: ""

  },
  reducers: {
    setUserInsurance: (state, action) => {
      state.insureForm = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getInsurePolicies.fulfilled, (state, action) => {
      state.policies = action.payload;
      state.isError = false;
    })
      .addCase(postUserInsure.fulfilled, (state, action) => {
        state.insureForm = {...action.payload};
        state.isError = false;
      })
      .addCase(getUserDatas.fulfilled, (state, action) => {
        state.userDatas = action.payload;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.singleUser = { ...action.payload }
      })
      .addCase(updateUserInsureStatus.fulfilled, (state, action) => {
        state.singleUser = { ...action.payload }
      })
      .addCase(getSinglePolicy.fulfilled, (state, action) => {
        state.policy = action.payload;
      })
      .addCase(getInsurePolicies.rejected, (state, action) => {
        state.isError = true;
        console.log("Error occurred on getInsurePolicies method");
      })
      .addCase(postUserInsure.rejected, (state, action) => {
        state.isError = true;
        console.log("Error occurred on postUserInsure method:", action.error.message);
      })      
      .addCase(getUserDatas.rejected, (state, action) => {
        state.isError = true
        console.log("Error occuredon getUserData method");
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isError = true
        console.log("Error on getSingleUser method");
      })
      .addCase(updateUserInsureStatus.rejected, (state, action) => {
        state.isError = true;
        console.log("Error occurred on updateUserInsureStatus method");
      })
      .addCase(getSinglePolicy.rejected, (state, action) => {
        state.isError = true;
        console.log("Error occurred on getSinglePolicy method");
      });
  },
});

export const {setUserInsurance, setInsureStatus} = insuranceSlice.actions

export default insuranceSlice.reducer;
