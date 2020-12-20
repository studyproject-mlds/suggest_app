import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '@/state/store';
import {
  PatientData,
  PatientDiabetesData,
  PatientGlobalStats,
  PatientTargetDurationStats,
  PatientParameters,
} from './types';
import {
  getPatientDataViz,
  getGlobalStats,
  getTargetDurationStats,
  getDiabetesParameters,
  patchDiabetesParameters,
} from './thunks';

const initialState: SliceState<PatientData> = {
  status: 'idle',
  error: null,
  data: {
    dataviz: [],
    globalStats: {
      glycemia: {
        reader: {
          mean_glycemia: 0,
          count_hypoglycemia: 0,
          daily_mean_count_measures: 0,
        },
        sensor: {
          mean_glycemia: 0,
          count_hypoglycemia: 0,
          daily_mean_count_measures: 0,
          usage_percent: 0,
        },
      },
      insulin: {
        daily_mean_long_insulin: 0,
        daily_mean_short_insulin: 0,
        daily_mean_total_insulin: 0,
        daily_mean_count_injections: 0,
      },
      count_days: 0,
    },
    targetDurationStats: {
      sensor: {
        high_glycemia: 0,
        target_glycemia: 0,
        low_glycemia: 0,
        total_time: 0,
        glycemia_distribution: [],
        parameters: {
          id: 0,
          threshold_hypoglycemia: 0,
          threshold_hyperglycemia: 0,
          threshold_hypoglycemia_2: 0,
          threshold_hyperglycemia_2: 0,
          patient: 0,
        },
      },
      reader: {
        high_glycemia: 0,
        target_glycemia: 0,
        low_glycemia: 0,
        total_glycemia: 0,
        glycemia_distribution: [],
        parameters: {
          id: 0,
          threshold_hypoglycemia: 0,
          threshold_hyperglycemia: 0,
          threshold_hypoglycemia_2: 0,
          threshold_hyperglycemia_2: 0,
          patient: 0,
        },
      },
    },
    diabetesParams: {
      id: 0,
      threshold_hypoglycemia: 0,
      threshold_hyperglycemia: 0,
      threshold_hypoglycemia_2: 0,
      threshold_hyperglycemia_2: 0,
      patient: 0,
    },
  },
};

const diabetesSlice = createSlice({
  name: 'patientData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPatientDataViz.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPatientDataViz.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getPatientDataViz.fulfilled,
        (state, action: PayloadAction<PatientDiabetesData>) => {
          state.status = 'succeeded';
          state.data.dataviz = [...action.payload];
        },
      )

      .addCase(getGlobalStats.pending, state => {
        state.status = 'loading';
      })
      .addCase(getGlobalStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getGlobalStats.fulfilled,
        (state, action: PayloadAction<PatientGlobalStats>) => {
          state.status = 'succeeded';
          state.data.globalStats = { ...action.payload };
        },
      )

      .addCase(getTargetDurationStats.pending, state => {
        state.status = 'loading';
      })
      .addCase(getTargetDurationStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getTargetDurationStats.fulfilled,
        (state, action: PayloadAction<PatientTargetDurationStats>) => {
          const { sensor, reader } = action.payload;
          const { glycemia_distribution, parameters } = sensor;
          const {
            glycemia_distribution: glycemia_distribution_reader,
            parameters: parameters_reader,
          } = reader;

          state.status = 'succeeded';
          state.data.targetDurationStats = {
            sensor: {
              ...sensor,
              glycemia_distribution: [
                {
                  ...glycemia_distribution[0],
                  glycemia_range: `>${parameters.threshold_hyperglycemia_2} mg/dL`,
                },
                {
                  ...glycemia_distribution[1],
                  glycemia_range: `${parameters.threshold_hyperglycemia} - ${parameters.threshold_hyperglycemia_2} mg/dL`,
                },
                ...glycemia_distribution.slice(2, 4),
                {
                  ...glycemia_distribution[4],
                  glycemia_range: `<${parameters.threshold_hypoglycemia_2} mg/dL`,
                },
              ],
            },
            reader: {
              ...reader,
              glycemia_distribution: [
                {
                  ...glycemia_distribution_reader[0],
                  glycemia_range: `>${parameters_reader.threshold_hyperglycemia_2} mg/dL`,
                },
                {
                  ...glycemia_distribution_reader[1],
                  glycemia_range: `${parameters_reader.threshold_hyperglycemia} - ${parameters_reader.threshold_hyperglycemia_2} mg/dL`,
                },
                ...glycemia_distribution_reader.slice(2, 4),
                {
                  ...glycemia_distribution_reader[4],
                  glycemia_range: `<${parameters_reader.threshold_hypoglycemia_2} mg/dL`,
                },
              ],
            },
          };
        },
      )

      .addCase(getDiabetesParameters.pending, state => {
        state.status = 'loading';
      })
      .addCase(getDiabetesParameters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        getDiabetesParameters.fulfilled,
        (state, action: PayloadAction<PatientParameters>) => {
          state.status = 'succeeded';
          state.data.diabetesParams = { ...action.payload };
        },
      )

      .addCase(patchDiabetesParameters.pending, state => {
        state.status = 'loading';
      })
      .addCase(patchDiabetesParameters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(
        patchDiabetesParameters.fulfilled,
        (state, action: PayloadAction<PatientParameters>) => {
          state.status = 'succeeded';
          state.data.diabetesParams = { ...action.payload };
        },
      );
  },
});

export default diabetesSlice.reducer;
