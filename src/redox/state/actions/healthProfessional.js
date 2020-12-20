import API from '@/api';
import { toastError } from '@/components/toast/ToastComponent';
import { getPatientAlerts } from './patient';

// USER & USER_PROFILE
//GET

export const REQUEST_USER_HEALTH_PROFESSIONAL =
  'REQUEST_USER_HEALTH_PROFESSIONAL';
export const RECEIVE_USER_HEALTH_PROFESSIONAL =
  'RECEIVE_USER_HEALTH_PROFESSIONAL';

export const requestUserHealthProfessional = token => ({
  type: REQUEST_USER_HEALTH_PROFESSIONAL,
  token,
});
export const receiveUserHealthProfessional = user => ({
  type: RECEIVE_USER_HEALTH_PROFESSIONAL,
  user,
});

export const getUserHealthProfessional = (token, id) => {
  return async dispatch => {
    dispatch(requestUserHealthProfessional(token));
    try {
      const response = await API(token).get(`users/${id}/`);
      return dispatch(receiveUserHealthProfessional(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const REQUEST_USER_PROFILE_HEALTH_PROFESSIONAL =
  'REQUEST_USER_PROFILE_HEALTH_PROFESSIONAL';
export const RECEIVE_USER_PROFILE_HEALTH_PROFESSIONAL =
  'RECEIVE_USER_PROFILE_HEALTH_PROFESSIONAL';

export const requestUserProfileHealthProfessional = token => ({
  type: REQUEST_USER_PROFILE_HEALTH_PROFESSIONAL,
  token,
});
export const receiveUserProfileHealthProfessional = userProfile => ({
  type: RECEIVE_USER_PROFILE_HEALTH_PROFESSIONAL,
  userProfile,
});

export const getUserProfileHealthProfessional = (token, id) => {
  return async dispatch => {
    dispatch(requestUserProfileHealthProfessional(token));
    try {
      const response = await API(token).get(`profiles/${id}/`);
      return dispatch(receiveUserProfileHealthProfessional(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

//PATCH

export const REQUEST_PATCH_USER_HEALTH_PROFESSIONAL =
  'REQUEST_PATCH_USER_HEALTH_PROFESSIONAL';
export const RECEIVE_PATCH_USER_HEALTH_PROFESSIONAL =
  'RECEIVE_PATCH_USER_HEALTH_PROFESSIONAL';

export const requestPatchUserHealthProfessional = token => ({
  type: REQUEST_PATCH_USER_HEALTH_PROFESSIONAL,
  token,
});
export const receivePatchUserHealthProfessional = user => ({
  type: RECEIVE_PATCH_USER_HEALTH_PROFESSIONAL,
  user,
});

export const patchUserHealthProfessional = (token, id, data) => {
  return async dispatch => {
    dispatch(requestPatchUserHealthProfessional(token));
    try {
      const response = await API(token).patch(`users/${id}/`, {
        ...data,
      });
      return dispatch(receivePatchUserHealthProfessional(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const REQUEST_PATCH_USER_PROFILE_HEALTH_PROFESSIONAL =
  'REQUEST_PATCH_USER_PROFILE_HEALTH_PROFESSIONAL';
export const RECEIVE_PATCH_USER_PROFILE_HEALTH_PROFESSIONAL =
  'RECEIVE_PATCH_USER_PROFILE_HEALTH_PROFESSIONAL';

export const requestPatchUserProfileHealthProfessional = token => ({
  type: REQUEST_PATCH_USER_PROFILE_HEALTH_PROFESSIONAL,
  token,
});
export const receivePatchUserProfileHealthProfessional = userProfile => ({
  type: RECEIVE_PATCH_USER_PROFILE_HEALTH_PROFESSIONAL,
  userProfile,
});

export const patchUserProfileHealthProfessional = (token, id, data) => {
  return async dispatch => {
    dispatch(requestPatchUserProfileHealthProfessional(token));
    try {
      const response = await API(token).patch(`profiles/${id}/`, {
        ...data,
      });
      return dispatch(receivePatchUserProfileHealthProfessional(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

// HEALTH_PROFESSIONAL

export const REQUEST_GET_ME = 'REQUEST_GET_ME';
export const RECEIVE_GET_ME = 'RECEIVE_GET_ME';

export const requestGetMe = token => ({
  type: REQUEST_GET_ME,
  token,
});
export const receiveGetMe = userProfile => ({
  type: RECEIVE_GET_ME,
  userProfile,
});

export const getMe = token => {
  return async dispatch => {
    dispatch(requestGetMe(token));
    try {
      const response = await API(token).get('me/');
      return dispatch(
        receiveGetMe(
          response.data && response.data.length > 0
            ? response.data[0]
            : response.data,
        ),
      );
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_HEALTH_PROFESSIONAL = 'REQUEST_HEALTH_PROFESSIONAL';
export const RECEIVE_HEALTH_PROFESSIONAL = 'RECEIVE_HEALTH_PROFESSIONAL';

export const requestGetHealthProfessional = token => ({
  type: REQUEST_HEALTH_PROFESSIONAL,
  token,
});
export const receiveGetHealthProfessional = healthProfessional => ({
  type: RECEIVE_HEALTH_PROFESSIONAL,
  healthProfessional,
});

export const getHealthProfessional = (token, id) => {
  return async dispatch => {
    dispatch(requestGetHealthProfessional(token));
    try {
      const response = await API(token).get(`health_professionals/${id}/`);
      return dispatch(receiveGetHealthProfessional(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_PATCH_HEALTH_PROFESSIONAL =
  'REQUEST_PATCH_HEALTH_PROFESSIONAL';
export const RECEIVE_PATCH_HEALTH_PROFESSIONAL =
  'RECEIVE_PATCH_HEALTH_PROFESSIONAL';

export const requestPatchHealthProfessional = token => ({
  type: REQUEST_PATCH_HEALTH_PROFESSIONAL,
  token,
});
export const receivePatchHealthProfessional = healthProfessional => ({
  type: RECEIVE_PATCH_HEALTH_PROFESSIONAL,
  healthProfessional,
});

export const patchHealthProfessional = (token, id, data) => {
  return async dispatch => {
    dispatch(requestPatchHealthProfessional(token));
    try {
      const response = await API(token).patch(`health_professionals/${id}/`, {
        ...data,
      });
      return dispatch(receivePatchHealthProfessional(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_PATIENTS = 'REQUEST_PATIENTS';
export const RECEIVE_PATIENTS = 'RECEIVE_PATIENTS';

export const requestGetPatients = token => ({
  type: REQUEST_PATIENTS,
  token,
});
export const receiveGetPatients = patients => ({
  type: RECEIVE_PATIENTS,
  patients,
});

export const getPatients = (token, id) => {
  return async dispatch => {
    dispatch(requestGetPatients(token));
    try {
      const response = await API(token).get(
        `health_professionals/${id}/patients/`,
      );
      return dispatch(receiveGetPatients(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const REQUEST_USER_PROFILE_PATIENTS = 'REQUEST_USER_PROFILE_PATIENTS';
export const RECEIVE_USER_PROFILE_PATIENTS = 'RECEIVE_USER_PROFILE_PATIENTS';

export const requestUserProfilePatients = token => ({
  type: REQUEST_USER_PROFILE_PATIENTS,
  token,
});
export const receiveUserProfilePatients = userProfilesPatients => ({
  type: RECEIVE_USER_PROFILE_PATIENTS,
  userProfilesPatients,
});

export const getUserProfilePatients = token => {
  return async (dispatch, getState) => {
    dispatch(requestUserProfilePatients(token));
    const patients = getState().healthProfessional.patients;
    const userProfilePatientsPromises = patients.map(patient =>
      API(token).get(`profiles/${patient.user}/`),
    );
    try {
      const responses = await Promise.all(userProfilePatientsPromises);
      const responsesData = responses.map(response => response.data);
      return dispatch(receiveUserProfilePatients(responsesData));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_CREATE_ORGANIZATION = 'REQUEST_CREATE_ORGANIZATION';
export const RECEIVE_CREATE_ORGANIZATION = 'RECEIVE_CREATE_ORGANIZATION';

export const requestPostOrganization = token => ({
  type: REQUEST_CREATE_ORGANIZATION,
  token,
});
export const receivePostOrganization = organization => ({
  type: RECEIVE_CREATE_ORGANIZATION,
  organization,
});

export const postOrganization = (token, data) => {
  return async dispatch => {
    dispatch(requestPostOrganization(token));
    try {
      const response = await API(token).post(`organizations/`, {
        ...data,
      });
      return dispatch(receivePostOrganization(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_CREATE_CARETEAM = 'REQUEST_CREATE_CARETEAM';
export const RECEIVE_CREATE_CARETEAM = 'RECEIVE_CREATE_CARETEAM';

export const requestPostCareTeam = token => ({
  type: REQUEST_CREATE_CARETEAM,
  token,
});
export const receivePostCareTeam = careTeam => ({
  type: RECEIVE_CREATE_CARETEAM,
  careTeam,
});

export const postCareTeam = (token, data) => {
  return async dispatch => {
    dispatch(requestPostCareTeam(token));
    try {
      const response = await API(token).post(`care_teams/`, {
        ...data,
      });
      return dispatch(receivePostCareTeam(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//
export const REQUEST_GET_TEAM_MEMBERSHIPS = 'REQUEST_GET_TEAM_MEMBERSHIPS';
export const RECEIVE_GET_TEAM_MEMBERSHIPS = 'RECEIVE_GET_TEAM_MEMBERSHIPS';

export const requestGetTeamMemberships = token => ({
  type: REQUEST_GET_TEAM_MEMBERSHIPS,
  token,
});
export const receiveGetTeamMembership = teamMemberships => ({
  type: RECEIVE_GET_TEAM_MEMBERSHIPS,
  teamMemberships,
});

export const getTeamMemberships = (token, id) => {
  return async dispatch => {
    dispatch(requestGetTeamMemberships(token));
    try {
      const response = await API(token).get(
        `health_professionals/${id}/memberships/`,
      );
      return dispatch(receiveGetTeamMembership(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const REQUEST_CREATE_TEAM_MEMBERSHIP = 'REQUEST_CREATE_TEAM_MEMBERSHIP';
export const RECEIVE_CREATE_TEAM_MEMBERSHIP = 'RECEIVE_CREATE_TEAM_MEMBERSHIP';

export const requestPostTeamMembership = token => ({
  type: REQUEST_CREATE_TEAM_MEMBERSHIP,
  token,
});
export const receivePostTeamMembership = teamMembership => ({
  type: RECEIVE_CREATE_TEAM_MEMBERSHIP,
  teamMembership,
});

export const postTeamMembership = (token, data) => {
  return async dispatch => {
    dispatch(requestPostTeamMembership(token));
    try {
      const response = await API(token).post(`team_memberships/`, {
        ...data,
      });
      return dispatch(receivePostTeamMembership(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_CREATE_ROLE = 'REQUEST_CREATE_ROLE';
export const RECEIVE_CREATE_ROLE = 'RECEIVE_CREATE_ROLE';

export const requestPostRole = token => ({
  type: REQUEST_CREATE_ROLE,
  token,
});
export const receivePostRole = role => ({
  type: RECEIVE_CREATE_ROLE,
  role,
});

export const postRole = (token, data) => {
  return async dispatch => {
    dispatch(requestPostRole(token));
    try {
      const response = await API(token).post(`roles/`, {
        ...data,
      });
      return dispatch(receivePostRole(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_CREATE_TEAM_MEMBERSHIP_CAREPLAN_ROLE =
  'REQUEST_CREATE_TEAM_MEMBERSHIP_CAREPLAN_ROLE';
export const RECEIVE_CREATE_TEAM_MEMBERSHIP_CAREPLAN_ROLE =
  'RECEIVE_CREATE_TEAM_MEMBERSHIP_CAREPLAN_ROLE';

export const requestPostTeamMembershipCarePlanRole = token => ({
  type: REQUEST_CREATE_TEAM_MEMBERSHIP_CAREPLAN_ROLE,
  token,
});
export const receivePostTeamMembershipCarePlanRole = teamMembershipCarePlanRole => ({
  type: RECEIVE_CREATE_TEAM_MEMBERSHIP_CAREPLAN_ROLE,
  teamMembershipCarePlanRole,
});

export const postTeamMembershipCarePlanRole = (token, data) => {
  return async dispatch => {
    dispatch(requestPostTeamMembershipCarePlanRole(token));
    try {
      const response = await API(token).post(
        `team_membership_careplan_roles/`,
        {
          ...data,
        },
      );
      return dispatch(receivePostTeamMembershipCarePlanRole(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

// GET_TEAM

export const REQUEST_TEAM_MEMBERSHIP_ROLE = 'REQUEST_TEAM_MEMBERSHIP_ROLE';
export const RECEIVE_TEAM_MEMBERSHIP_ROLE = 'RECEIVE_TEAM_MEMBERSHIP_ROLE';

const requestTeamMembershipRole = () => ({
  type: REQUEST_TEAM_MEMBERSHIP_ROLE,
});

const receiveTeamMembershipRole = role => ({
  type: RECEIVE_TEAM_MEMBERSHIP_ROLE,
  role,
});

export const getTeamMembershipRole = (token, roleId) => {
  return async dispatch => {
    try {
      dispatch(requestTeamMembershipRole());
      const role = await API(token).get(`roles/${roleId}/`);
      return dispatch(receiveTeamMembershipRole(role.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

//

export const REQUEST_SEARCH_USER_BY_EMAIL = 'REQUEST_SEARCH_USER_BY_EMAIL';
export const RECEIVE_SEARCH_USER_BY_EMAIL = 'RECEIVE_SEARCH_USER_BY_EMAIL';
export const RESET_SEARCH_USER_BY_EMAIL = 'RESET_SEARCH_USER_BY_EMAIL';

export const requestSearchPatientByEmail = () => ({
  type: REQUEST_SEARCH_USER_BY_EMAIL,
});

export const receiveSearchPatientByEmail = (
  patientEmailFound,
  patientBeingAdded,
) => ({
  type: RECEIVE_SEARCH_USER_BY_EMAIL,
  patientEmailFound,
  patientBeingAdded,
});

export const resetSearchPatientByEmail = () => ({
  type: RESET_SEARCH_USER_BY_EMAIL,
});

export const searchPatientByEmail = (token, data) => {
  return async dispatch => {
    requestSearchPatientByEmail();
    try {
      const response = await API(token).get(`users/?email=${data}`);
      const patientEmailFound = response.data[0].email === data;
      const patientBeingAdded = response.data;
      return dispatch(
        receiveSearchPatientByEmail(patientEmailFound, patientBeingAdded),
      );
    } catch (error) {
      toastError(error.message);
    }
  };
};

//

export const REQUEST_CARETEAMS = 'REQUEST_CARETEAMS';
export const RECEIVE_CARETEAMS = 'RECEIVE_CARETEAMS';

export const requestCareTeam = () => ({
  type: REQUEST_CARETEAMS,
});
export const receiveCareTeams = careTeams => ({
  type: RECEIVE_CARETEAMS,
  careTeams,
});

export const getCareTeams = (token, userId) => {
  return async dispatch => {
    requestCareTeam();
    try {
      const careTeams = await API(token).get(
        `health_professionals/${userId}/care_teams/`,
      );
      return dispatch(receiveCareTeams(careTeams.data));
    } catch (error) {
      toastError(error);
    }
  };
};

// GET TEAM_MEMBERSHIP

export const getTeamMembership = async (token, careTeamId) => {
  try {
    const teamMember = await API(token).get(`team_memberships/${careTeamId}/`);
    return teamMember.data;
  } catch (error) {
    toastError(error.message);
  }
};

// GetPatients + GetUserProfilePatients + roles
export const RECEIVE_PATIENTS_CARE_PLANS_ROLES_AND_PROFILES_WITH_MAX_ALERT =
  'RECEIVE_PATIENTS_CARE_PLANS_ROLES_AND_PROFILES_WITH_MAX_ALERT';

const receiveCarePlansRolesPatients = patients => ({
  type: RECEIVE_PATIENTS_CARE_PLANS_ROLES_AND_PROFILES_WITH_MAX_ALERT,
  patients,
});

export const getPatientsCarePlansRolesAndProfilesWithMaxAlert = (
  token,
  hpId,
) => {
  return async (dispatch, getState) => {
    const alertsCriticities = {
      low: 1,
      medium: 2,
      high: 3,
    };

    try {
      await dispatch(getPatients(token, hpId));
      await dispatch(getUserProfilePatients(token));
      const patientsUsers = getState().healthProfessional.patients;
      const patientsProfiles = getState().healthProfessional
        .userProfilesPatients;
      const hpCarePlansRoles = await API(token).get(
        '/team_membership_careplan_roles/',
      );
      const patients = patientsUsers.map((patient, idx) => ({
        ...patient,
        profile: patientsProfiles[idx],
      }));
      const patientList = await Promise.all(
        patients.map(async patient => {
          const [carePlans, alerts] = await Promise.all([
            API(token).get(`/patients/${patient.user}/care_plans/`),
            API(token).get(`patients/${patient.user}/alerts/?is_active=true`),
          ]);

          const alertMax =
            alerts.data.sort(
              (cur, nxt) =>
                alertsCriticities[nxt.config?.criticity] -
                alertsCriticities[cur.config?.criticity],
            )[0] ?? null;

          patient.carePlan = carePlans.data[0];
          const hpRolesInPatientCarePlan = hpCarePlansRoles.data.filter(
            role => role.care_plan === patient.carePlan.id,
          );
          patient.carePlan.roles = hpRolesInPatientCarePlan.map(
            carePlanRole => carePlanRole.role % 2,
          );
          patient.alertMax = alertMax;
          return patient;
        }),
      );
      return dispatch(receiveCarePlansRolesPatients(patientList));
    } catch (error) {
      toastError(error.message);
    }
  };
};

// check if patient exist in desmos
export const REQUEST_CHECK_PATIENT_DESMOS = 'REQUEST_CHECK_PATIENT_DESMOS';
export const RECEIVE_CHECK_PATIENT_DESMOS = 'RECEIVE_CHECK_PATIENT_DESMOS';

export const requestCheckPatientDesmos = token => ({
  type: REQUEST_CHECK_PATIENT_DESMOS,
  token,
});
export const receiveCheckPatientDesmos = patientExistsInDesmos => ({
  type: RECEIVE_CHECK_PATIENT_DESMOS,
  patientExistsInDesmos,
});

export const checkPatientExistsInDesmos = (token, patient_pk, params) => {
  return async dispatch => {
    dispatch(requestCheckPatientDesmos(token));
    try {
      const response = await API(token).get(
        `patients/${patient_pk}/desmos/check_patient`,
        {
          params,
        },
      );
      return dispatch(receiveCheckPatientDesmos(response.data.patient));
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };
};

export const RESET_CHECK_PATIENT_DESMOS = 'RESET_CHECK_PATIENT_DESMOS';
export const resetCheckPatientExistsInDesmos = () => ({
  type: RESET_CHECK_PATIENT_DESMOS,
});
