import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        loading: false,
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        savedJobs: [],
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setSavedJobs: (state, action) => {
            state.savedJobs = action.payload;
        },
        saveJob: (state, action) => {
            state.savedJobs.push(action.payload);
        },
        unsaveJob: (state, action) => {
            state.savedJobs = state.savedJobs.filter(
                (job) => job._id !== action.payload
            );
        },
        setLoading: (state, action) => {
  state.loading = action.payload;
},
    },
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    setSavedJobs,
    saveJob,
    unsaveJob,
    setLoading,
} = jobSlice.actions;

export default jobSlice.reducer;