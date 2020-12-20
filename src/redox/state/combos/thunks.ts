import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';
import { AppDispatch, RootState } from '../store';
// import { patchUserProfile } from '../user/thunks';
// import { getCarePlansForPatient } from '../care-plans/thunks';
// import {
//   getTeamMemberships,
//   postTeamMembershipCarePlanRole,
//   getTeamMembership,
// } from '../actions/healthProfessional';

// type AsyncThunkParams = {
//   token: string;
//   id: number;
//   validFormData?: unknown;
//   carePlanRoles?: unknown;
//   carePlanId?: unknown;
// };

// // CHAINED
// export const patchUserProfileAndCreateRole = createAsyncThunk<
//   void,
//   AsyncThunkParams,
//   { dispatch: AppDispatch; state: RootState }
// >(
//   'patients/postCarePlanForPatient',
//   async ({ token, id, validFormData }: AsyncThunkParams, thunkAPI) => {
//     const { dispatch, getState } = thunkAPI;
//     await dispatch(patchUserProfilePatient({ token, id, validFormData }));
//     await dispatch(getCarePlansForPatient({ token, id }));
//     const healthProfessionalId = getState().healthProfessional.user.user;
//     await dispatch(getTeamMemberships({ token, id: healthProfessionalId }));
//     if (getState().patient.carePlans) {
//       await dispatch(
//         postTeamMembershipCarePlanRole({
//           token,
//           data: {
//             care_plan: getState().patient.carePlans[0].id,
//             membership: getState().healthProfessional.teamMemberships[0].id,
//             role: 1,
//           },
//         }),
//       );
//     }
//   },
// );

// // CHAINED
// export const getPatientHistory = createAsyncThunk(
//   'patients/getPatientHistory',
//   async ({ token, id }: AsyncThunkParams) => {
//     const baseUrl = `patients/${id}`;
//     const response = await Promise.all([
//       API(token).get(`${baseUrl}/tasks/?status=done`),
//       API(token).get(`${baseUrl}/alerts/`),
//       API(token).get(`/observations/?recipient=${id}`),
//     ]);

//     const [tasks, alerts, observations] = response;
//     const data = [
//       ...tasks.data.map(task => ({ ...task, type: 'task' })),
//       ...alerts.data.map(alert => ({ ...alert, type: 'alert' })),
//       ...observations.data.map(observation => ({
//         ...observation,
//         type: 'observation',
//       })),
//     ];
//     return data;
//   },
// );

// // CHAINED
// const getCareTeamMembers = async (token, carePlanRoles) => {
//   const members = await Promise.all(
//     carePlanRoles.map(async carePlanRole => {
//       const membership = await getTeamMembership(
//         token,
//         carePlanRole.membership,
//       );
//       const profile = await API(token).get(
//         `profiles/${membership.health_professional}/`,
//       );

//       return {
//         membership: { ...membership, health_professional: profile.data },
//         roles: [{ id: carePlanRole.role, carePlanRoleId: carePlanRole.id }],
//       };
//     }),
//   );

//   return members;
// };

// // CHAINED
// const getOrganization = async (token, carePlanId) => {
//   try {
//     const careTeam = await API(token).get(`care_teams/${carePlanId}/`);
//     const organization = await API(token).get(
//       `organizations/${careTeam.data.organization}/`,
//     );
//     return organization.data;
//   } catch (error) {
//     toastError(error.message);
//   }
// };

// // CHAINED
// const reduceMembers = members => {
//   const reduced = [];

//   members.forEach(member => {
//     const idx = reduced.findIndex(
//       m =>
//         m.membership.health_professional.user ===
//         member.membership.health_professional.user,
//     );
//     if (idx < 0) {
//       reduced.push(member);
//     } else {
//       reduced[idx].roles.push(member.roles[0]);
//     }
//   });
//   return reduced;
// };

// // CHAINED
// export const getPatientCareTeam = createAsyncThunk(
//   'patients/getPatientCareTeam',
//   async ({ token, id, carePlanID }: AsyncThunkParams) => {
//     const careTeam = {};

//     const carePlanRoles = await getCarePlanRoles(token, id, carePlanID);

//     const members = await getCareTeamMembers(token, carePlanRoles);
//     careTeam.members = reduceMembers(members);

//     careTeam.organization = await getOrganization(
//       token,
//       members[0].membership.care_team,
//     );
//     return careTeam;
//   },
// );

// // CHAINED
// export const membershipSuggestions = createAsyncThunk(
//   'patients/membershipSuggestions',
//   async ({ token, carePlanID }: AsyncThunkParams) => {
//     const health_pros_response = await API(token).get(
//       `care_teams/${carePlanID}/health_professionals/`,
//     );
//     const health_pros = health_pros_response.data;

//     const hpProfiles = await Promise.all(
//       health_pros.map(async hp => {
//         const profile = await API(token).get(`profiles/${hp.user}`);

//         return {
//           ...hp,
//           user: profile.data,
//         };
//       }),
//     );
//     return { carePlanID, hpProfiles };
//   },
// );
