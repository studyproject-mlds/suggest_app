import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import diabetesReducer from './diabetes/diabetesSlice';
import patientsReducer from './patients/patientsSlice';
import carePlansReducer from './care-plans/carePlansSlice';
import carePlanRoleReducer from './care-plan-role/carePlanRoleSlice';
import consentsReducer from './consents/consentsSlice';
import tasksReducer from './tasks/tasksSlice';
import observationsReducer from './observations/observationsSlice';
import alertsReducer from './alerts/alertsSlice';
import alertConfigsReducer from './alert-configs/alertConfigsSlice';
import careTeamsReducer from './care-team/careTeamsSlice';
import contactsReducer from './contacts/contactsSlice';
import usersReducer from './users/usersSlice';
import healthProfessionalsReducer from './health-professionals/healthProfessionalsSlice';
import meReducer from './me/meSlice';
import organizationsReducer from './organizations/organizationsSlice';
import teamMembershipsReducer from './team-membership/teamMembershipsSlice';
import rolesReducer from './roles/rolesSlice';
import teamMembershipCarePlanRolesReducer from './team-membership-careplan-role/teamMembershipCareplanRoleSlice';
import uiReducer from './ui/uiSlice';

export const store = configureStore({
  reducer: combineReducers({
    diabetes: diabetesReducer,
    patients: patientsReducer,
    carePlans: carePlansReducer,
    carePlanRole: carePlanRoleReducer,
    consents: consentsReducer,
    tasks: tasksReducer,
    alerts: alertsReducer,
    alertConfigs: alertConfigsReducer,
    observations: observationsReducer,
    careTeams: careTeamsReducer,
    contacts: contactsReducer,
    users: usersReducer,
    healthProfessionals: healthProfessionalsReducer,
    me: meReducer,
    organizations: organizationsReducer,
    teamMemberships: teamMembershipsReducer,
    roles: rolesReducer,
    teamMembershipCarePlanRoles: teamMembershipCarePlanRolesReducer,
    ui: uiReducer,

    // Legacy reducers below
    // patient: patientReducer,
    // healthProfessional: healthProfessionalReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type SliceState<T> = {
  data: T;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null | undefined;
};

// from https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;
