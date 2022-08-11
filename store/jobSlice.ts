import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { getJobs } from '../apis/jobApi';

export interface IState {
  value: any;
  totalJobs: number;
  companies: any;
  selectedCompany: string;
  jobsToShow: any;
  recentJobs: boolean;
  status: 'idle' | 'loading' | 'failed';
}

/**
 * Default state object with initial values.
 */
const initialState: IState = {
  value: [],
  totalJobs: 0,
  companies: [],
  selectedCompany: 'All',
  status: 'idle',
  recentJobs: false,
  jobsToShow: [],
} as const;

export const fetchJobs = createAsyncThunk(
  'job/fetch',
  async () => {
    const response = await getJobs();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    showRecentJobs: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.recentJobs>
    ) => {
      state.recentJobs = action.payload;
      if(state.selectedCompany !== 'All') state.jobsToShow = state.value.filter((job: any) => job.companyName === state.selectedCompany);
      if(action.payload) {
        state.jobsToShow = state.jobsToShow.filter((job:any)=>(Number(job.postedDate.split('d')[0]) < 7)?true:false)
      } else {
        if(state.selectedCompany !== 'All') state.jobsToShow = state.value.filter((job: any) => job.companyName === state.selectedCompany);
        else state.jobsToShow = state.value;
      }
    },
    selectCompany: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.selectedCompany>
    ) => {
      state.selectedCompany = action.payload;
      if(action.payload !== 'All') state.jobsToShow = state.value.filter((job: any) => job.companyName === action.payload);
      else state.jobsToShow = state.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        let _companiesArr = action.payload.jobs.map((job: any) => job.companyName);
        _companiesArr = [...new Set(_companiesArr)];
        state.status = 'idle';
        state.value = action.payload.jobs;
        state.companies = _companiesArr;
        state.totalJobs = action.payload.totalJobs;
        if(!state.jobsToShow.length) state.jobsToShow = action.payload.jobs;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// A small helper of user state for `useSelector` function.
export const getJobsState = (state: { data: IState }) => state.data.jobsToShow;
export const getCompanies = (state: { data: IState }) => state.data.companies;
export const getSelectedCompany = (state: {data: IState}) => state.data.selectedCompany;

// Exports all actions
export const { selectCompany, showRecentJobs } = jobSlice.actions;

export default jobSlice.reducer;