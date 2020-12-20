import API from '@/api';
import { toastError } from '@/components/toast/ToastComponent';

import {
  getTeamMemberships,
  postTeamMembershipCarePlanRole,
  getTeamMembership,
} from '@/state/actions/healthProfessional';

//USER & USER_PROFILE
//GET

export const REQUEST_USER_PATIENT = 'REQUEST_USER_PATIENT';
export const RECEIVE_USER_PATIENT = 'RECEIVE_USER_PATIENT';

export const requestUserPatient = token => ({
  type: REQUEST_USER_PATIENT,
  token,
});
export const receiveUserPatient = user => ({
  type: RECEIVE_USER_PATIENT,
  user,
});

export const getUserPatient = (token, id) => {
  return async dispatch => {
    dispatch(requestUserPatient(token));
    try {
      const response = await API(token).get(`users/${id}/`);
      return dispatch(receiveUserPatient(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const REQUEST_USER_PROFILE_PATIENT = 'REQUEST_USER_PROFILE_PATIENT';
export const RECEIVE_USER_PROFILE_PATIENT = 'RECEIVE_USER_PROFILE_PATIENT';

export const requestUserProfilePatient = token => ({
  type: REQUEST_USER_PROFILE_PATIENT,
  token,
});
export const receiveUserProfilePatient = userProfile => ({
  type: RECEIVE_USER_PROFILE_PATIENT,
  userProfile,
});

export const getUserProfilePatient = (token, id) => {
  return async dispatch => {
    dispatch(requestUserProfilePatient(token));
    try {
      const response = await API(token).get(`profiles/${id}/`);
      return dispatch(receiveUserProfilePatient(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

//PATCH

export const REQUEST_PATCH_USER_PATIENT = 'REQUEST_PATCH_USER_PATIENT';
export const RECEIVE_PATCH_USER_PATIENT = 'RECEIVE_PATCH_USER_PATIENT';

export const requestPatchUserPatient = token => ({
  type: REQUEST_PATCH_USER_PATIENT,
  token,
});
export const receivePatchUserPatient = user => ({
  type: RECEIVE_PATCH_USER_PATIENT,
  user,
});

export const patchUserPatient = (token, id, data) => {
  return async dispatch => {
    dispatch(requestPatchUserPatient(token));
    try {
      const response = await API(token).patch(`users/${id}/`, {
        ...data,
      });
      return dispatch(receivePatchUserPatient(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const REQUEST_PATCH_USER_PROFILE_PATIENT =
  'REQUEST_PATCH_USER_PROFILE_PATIENT';
export const RECEIVE_PATCH_USER_PROFILE_PATIENT =
  'RECEIVE_PATCH_USER_PROFILE_PATIENT';

export const requestPatchUserProfilePatient = token => ({
  type: REQUEST_PATCH_USER_PROFILE_PATIENT,
  token,
});
export const receivePatchUserProfilePatient = userProfile => ({
  type: RECEIVE_PATCH_USER_PROFILE_PATIENT,
  userProfile,
});

export const patchUserProfilePatient = (token, id, data) => {
  return async dispatch => {
    dispatch(requestPatchUserProfilePatient(token));
    try {
      const response = await API(token).patch(`profiles/${id}/`, {
        ...data,
      });
      return dispatch(receivePatchUserProfilePatient(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

//PATIENT

export const REQUEST_PATIENT = 'REQUEST_PATIENT';
export const RECEIVE_PATIENT = 'RECEIVE_PATIENT';

export const requestGetPatient = token => ({
  type: REQUEST_PATIENT,
  token,
});
export const receiveGetPatient = patient => ({
  type: RECEIVE_PATIENT,
  patient,
});

export const getPatient = (token, id) => {
  return async dispatch => {
    dispatch(requestGetPatient(token));
    try {
      const response = await API(token).get(`patients/${id}/`);
      return dispatch(receiveGetPatient(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_PATCH_PATIENT = 'REQUEST_PATCH_PATIENT';
export const RECEIVE_PATCH_PATIENT = 'RECEIVE_PATCH_PATIENT';

export const requestPatchPatient = token => ({
  type: REQUEST_PATCH_PATIENT,
  token,
});
export const receivePatchPatient = patient => ({
  type: RECEIVE_PATCH_PATIENT,
  patient,
});

export const patchPatient = (token, id, data) => {
  return async dispatch => {
    dispatch(requestPatchPatient(token));
    try {
      const response = await API(token).patch(`patients/${id}/`, {
        ...data,
      });
      return dispatch(receivePatchPatient(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_GET_CARE_PLANS_FOR_PATIENT =
  'REQUEST_GET_CARE_PLANS_FOR_PATIENT';
export const RECEIVE_GET_CARE_PLANS_FOR_PATIENT =
  'RECEIVE_GET_CARE_PLANS_FOR_PATIENT';

export const requestGetCarePlansForPatient = token => ({
  type: REQUEST_GET_CARE_PLANS_FOR_PATIENT,
  token,
});
export const receiveGetCarePlansForPatient = carePlans => ({
  type: RECEIVE_GET_CARE_PLANS_FOR_PATIENT,
  carePlans,
});

export const getCarePlansForPatient = (token, id) => {
  return async dispatch => {
    dispatch(requestGetCarePlansForPatient(token));
    try {
      const response = await API(token).get(`patients/${id}/care_plans/`);
      return dispatch(receiveGetCarePlansForPatient(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_CREATE_CARE_PLAN_FOR_PATIENT =
  'REQUEST_CREATE_CARE_PLAN_FOR_PATIENT';
export const RECEIVE_CREATE_CARE_PLAN_FOR_PATIENT =
  'RECEIVE_CREATE_CARE_PLAN_FOR_PATIENT';

export const requestPostCarePlanForPatient = token => ({
  type: REQUEST_CREATE_CARE_PLAN_FOR_PATIENT,
  token,
});
export const receivePostCarePlanForPatient = carePlan => ({
  type: RECEIVE_CREATE_CARE_PLAN_FOR_PATIENT,
  carePlan,
});

export const postCarePlanForPatient = (token, data) => {
  return async dispatch => {
    dispatch(requestPostCarePlanForPatient(token));
    try {
      const response = await API(token).post(`care_plans/`, {
        ...data,
      });
      return dispatch(receivePostCarePlanForPatient(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const patchUserProfileAndCreateRole = (token, id, validFormData) => {
  return function (dispatch, getState) {
    return dispatch(patchUserProfilePatient(token, id, validFormData))
      .then(() => dispatch(getCarePlansForPatient(token, id)))
      .then(() =>
        dispatch(
          getTeamMemberships(token, getState().healthProfessional.user.user),
        ),
      )
      .then(
        () =>
          getState().patient.carePlans &&
          dispatch(
            postTeamMembershipCarePlanRole(token, {
              care_plan: getState().patient.carePlans[0].id,
              membership: getState().healthProfessional.teamMemberships[0].id,
              role: 1,
            }),
          ),
      );
  };
};

// contacts

export const REQUEST_PATIENTS_CONTACTS = 'REQUEST_PATIENTS_CONTACTS';
export const RECEIVE_PATIENT_CONTACTS = 'RECEIVE_PATIENT_CONTACTS';

export const requestGetPatientContacts = token => ({
  type: REQUEST_PATIENTS_CONTACTS,
  token,
});
export const receiveGetPatientContacts = contacts => ({
  type: RECEIVE_PATIENT_CONTACTS,
  contacts,
});

export const getPatientContacts = (token, id) => {
  return async dispatch => {
    dispatch(requestGetPatientContacts(token));
    try {
      const response = await API(token).get(`patients/${id}/contacts/`);
      return dispatch(receiveGetPatientContacts(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_CREATE_PATIENT_CONTACT = 'REQUEST_CREATE_PATIENT_CONTACT';
export const RECEIVE_CREATE_PATIENT_CONTACT = 'RECEIVE_CREATE_PATIENT_CONTACT';

export const requestCreatePatientContact = token => ({
  type: REQUEST_CREATE_PATIENT_CONTACT,
  token,
});
export const receiveCreatePatientContact = contact => ({
  type: RECEIVE_CREATE_PATIENT_CONTACT,
  contact,
});

export const createPatientContact = (token, id, data) => {
  return async dispatch => {
    dispatch(requestCreatePatientContact(token));
    try {
      const response = await API(token).post(`patients/${id}/contacts/`, {
        ...data,
      });
      return dispatch(receiveCreatePatientContact(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_PATCH_PATIENT_CONTACT = 'REQUEST_PATCH_PATIENT_CONTACT';
export const RECEIVE_PATCH_PATIENT_CONTACT = 'RECEIVE_PATCH_PATIENT_CONTACT';

export const requestPatchPatientContact = token => ({
  type: REQUEST_PATCH_PATIENT_CONTACT,
  token,
});
export const receivePatchPatientContact = contact => ({
  type: RECEIVE_PATCH_PATIENT_CONTACT,
  contact,
});

export const patchPatientContact = (token, id, contactID, data) => {
  return async dispatch => {
    dispatch(requestPatchPatientContact(token));
    try {
      const response = await API(token).patch(
        `patients/${id}/contacts/${contactID}/`,
        {
          ...data,
        },
      );
      return dispatch(receivePatchPatientContact(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_DELETE_PATIENT_CONTACT = 'REQUEST_DELETE_PATIENT_CONTACT';
export const RECEIVE_DELETE_PATIENT_CONTACT = 'RECEIVE_DELETE_PATIENT_CONTACT';

export const requestDeletePatientContact = token => ({
  type: REQUEST_DELETE_PATIENT_CONTACT,
  token,
});
export const receiveDeletePatientContact = contactID => ({
  type: RECEIVE_DELETE_PATIENT_CONTACT,
  contactID,
});

export const deletePatientContact = (token, id, contactID) => {
  return async dispatch => {
    dispatch(requestDeletePatientContact(token));
    try {
      await API(token).delete(`patients/${id}/contacts/${contactID}/`);
      dispatch(receiveDeletePatientContact(contactID));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

//MEDICAL_CONTACTS

export const REQUEST_PATIENT_MEDICAL_CONTACTS =
  'REQUEST_PATIENT_MEDICAL_CONTACTS';
export const RECEIVE_PATIENT_MEDICAL_CONTACTS =
  'RECEIVE_PATIENT_MEDICAL_CONTACTS';

export const requestGetPatientMedicalContacts = token => ({
  type: REQUEST_PATIENT_MEDICAL_CONTACTS,
  token,
});
export const receiveGetPatientMedicalContacts = medicalContacts => ({
  type: RECEIVE_PATIENT_MEDICAL_CONTACTS,
  medicalContacts,
});

export const getPatientMedicalContacts = (token, id) => {
  return async dispatch => {
    dispatch(requestGetPatientMedicalContacts(token));
    try {
      const response = await API(token).get(`patients/${id}/medical_contacts/`);
      return dispatch(receiveGetPatientMedicalContacts(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_CREATE_PATIENT_MEDICAL_CONTACT =
  'REQUEST_CREATE_PATIENT_MEDICAL_CONTACT';
export const RECEIVE_CREATE_PATIENT_MEDICAL_CONTACT =
  'RECEIVE_CREATE_PATIENT_MEDICAL_CONTACT';

export const requestCreatePatientMedicalContact = token => ({
  type: REQUEST_CREATE_PATIENT_MEDICAL_CONTACT,
  token,
});
export const receiveCreatePatientMedicalContact = medicalContact => ({
  type: RECEIVE_CREATE_PATIENT_MEDICAL_CONTACT,
  medicalContact,
});

export const createPatientMedicalContact = (token, id, data) => {
  return async dispatch => {
    dispatch(requestCreatePatientMedicalContact(token));
    try {
      const response = await API(token).post(
        `patients/${id}/medical_contacts/`,
        {
          ...data,
        },
      );
      return dispatch(receiveCreatePatientMedicalContact(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_PATCH_PATIENT_MEDICAL_CONTACT =
  'REQUEST_PATCH_PATIENT_MEDICAL_CONTACT';
export const RECEIVE_PATCH_PATIENT_MEDICAL_CONTACT =
  'RECEIVE_PATCH_PATIENT_MEDICAL_CONTACT';

export const requestPatchPatientMedicalContact = token => ({
  type: REQUEST_PATCH_PATIENT_MEDICAL_CONTACT,
  token,
});
export const receivePatchPatientMedicalContact = medicalContact => ({
  type: RECEIVE_PATCH_PATIENT_MEDICAL_CONTACT,
  medicalContact,
});

export const patchPatientMedicalContact = (token, id, contactID, data) => {
  return async dispatch => {
    dispatch(requestPatchPatientMedicalContact(token));
    try {
      const response = await API(token).patch(
        `patients/${id}/medical_contacts/${contactID}/`,
        {
          ...data,
        },
      );
      return dispatch(receivePatchPatientMedicalContact(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_DELETE_PATIENT_MEDICAL_CONTACT =
  'REQUEST_DELETE_PATIENT_MEDICAL_CONTACT';
export const RECEIVE_DELETE_PATIENT_MEDICAL_CONTACT =
  'RECEIVE_DELETE_PATIENT_MEDICAL_CONTACT';

export const requestDeletePatientMedicalContact = token => ({
  type: REQUEST_DELETE_PATIENT_MEDICAL_CONTACT,
  token,
});
export const receiveDeletePatientMedicalContact = medicalContactID => ({
  type: RECEIVE_DELETE_PATIENT_MEDICAL_CONTACT,
  medicalContactID,
});

export const deletePatientMedicalContact = (token, id, contactID) => {
  return async dispatch => {
    dispatch(requestDeletePatientMedicalContact(token));
    try {
      await API(token).delete(`patients/${id}/medical_contacts/${contactID}/`);
      dispatch(receiveDeletePatientMedicalContact(contactID));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

//CONSENTS
export const REQUEST_CONSENTS = 'REQUEST_CONSENTS';
export const RECEIVE_CONSENTS = 'RECEIVE_CONSENTS';

export const requestGetConsents = token => ({
  type: REQUEST_CONSENTS,
  token,
});
export const receiveGetConsents = consents => ({
  type: RECEIVE_CONSENTS,
  consents,
});

export const getConsents = (token, id) => {
  return async dispatch => {
    dispatch(requestGetConsents(token));
    try {
      const response = await API(token).get(`users/${id}/consents/`);
      return dispatch(receiveGetConsents(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_PATCH_CONSENT = 'REQUEST_PATCH_CONSENT';
export const RECEIVE_PATCH_CONSENT = 'RECEIVE_PATCH_CONSENT';

export const requestPatchConsent = token => ({
  type: REQUEST_PATCH_CONSENT,
  token,
});
export const receivePatchConsent = consent => ({
  type: RECEIVE_PATCH_CONSENT,
  consent,
});

export const patchConsent = (token, id, consentID, data) => {
  return async dispatch => {
    dispatch(requestPatchConsent(token));
    try {
      const response = await API(token).patch(
        `users/${id}/consents/${consentID}/`,
        {
          ...data,
        },
      );
      return dispatch(receivePatchConsent(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};
//

export const REQUEST_CREATE_OBSERVATION_FOR_PATIENT =
  'REQUEST_CREATE_OBSERVATION_FOR_PATIENT';
export const RECEIVE_CREATE_OBSERVATION_FOR_PATIENT =
  'RECEIVE_CREATE_OBSERVATION_FOR_PATIENT';

export const requestPostObservationForPatient = token => ({
  type: REQUEST_CREATE_OBSERVATION_FOR_PATIENT,
  token,
});
export const receivePostObservationForPatient = observation => ({
  type: RECEIVE_CREATE_OBSERVATION_FOR_PATIENT,
  observation,
});

export const postObservationForPatient = (token, data) => {
  return async dispatch => {
    dispatch(requestPostObservationForPatient(token));
    try {
      const response = await API(token).post(`observations/`, {
        ...data,
      });
      return dispatch(receivePostObservationForPatient(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

//

export const REQUEST_PATIENT_ALERTS = 'REQUEST_PATIENT_ALERTS';
export const RECEIVE_PATIENT_ALERTS = 'RECEIVE_PATIENT_ALERTS';

export const requestGetPatientAlerts = token => ({
  type: REQUEST_PATIENT_ALERTS,
  token,
});
export const receiveGetPatientAlerts = alerts => ({
  type: RECEIVE_PATIENT_ALERTS,
  alerts,
});

export const getPatientAlerts = (token, patientId) => {
  return async dispatch => {
    dispatch(requestGetPatientAlerts(token));
    try {
      const response = await API(token).get(
        `patients/${patientId}/alerts/?is_active=true`,
      );
      return dispatch(receiveGetPatientAlerts(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const REQUEST_RESOLVE_PATIENT_ALERT = 'REQUEST_RESOLVE_PATIENT_ALERT';
export const RECEIVE_RESOLVE_PATIENT_ALERT = 'RECEIVE_RESOLVE_PATIENT_ALERT';

export const requestPatchPatientAlert = token => ({
  type: REQUEST_RESOLVE_PATIENT_ALERT,
  token,
});
export const receivePatchPatientAlert = alertId => ({
  type: RECEIVE_RESOLVE_PATIENT_ALERT,
  alertId,
});

export const patchPatientAlert = (token, patientId, alertId) => {
  return async dispatch => {
    dispatch(requestPatchPatientAlert(token));
    try {
      await API(token).delete(`patients/${patientId}/alerts/${alertId}/`);
      return dispatch(receivePatchPatientAlert(alertId));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const REQUEST_PATIENT_TASKS = 'REQUEST_PATIENT_TASKS';
export const RECEIVE_PATIENT_TASKS = 'RECEIVE_PATIENT_TASKS';

export const requestPatientTasks = token => ({
  type: REQUEST_PATIENT_TASKS,
  token,
});
export const receivePatientTasks = tasks => ({
  type: RECEIVE_PATIENT_TASKS,
  tasks,
});

export const getPatientTasks = (token, id, status = null) => {
  return async dispatch => {
    dispatch(requestPatientTasks(token));
    try {
      let url = `patients/${id}/tasks/`;
      if (status) {
        url = `${url}?status=${status}`;
      }

      const response = await API(token).get(url);
      return dispatch(receivePatientTasks(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const REQUEST_RESOLVE_PATIENT_TASKS = 'REQUEST_RESOLVE_PATIENT_TASKS';
export const RECEIVE_RESOLVE_PATIENT_TASKS = 'RECEIVE_RESOLVE_PATIENT_TASKS';

export const requestResolvePatientTasks = token => ({
  type: REQUEST_RESOLVE_PATIENT_TASKS,
  token,
});
export const receiveResolvePatientTasks = task => ({
  type: RECEIVE_RESOLVE_PATIENT_TASKS,
  task,
});

export const resolvePatientTasks = (token, patientId, taskId, data) => {
  return async dispatch => {
    dispatch(requestResolvePatientTasks(token));
    try {
      const response = await API(token).patch(
        `patients/${patientId}/tasks/${taskId}/`,
        {
          ...data,
        },
      );
      return dispatch(receiveResolvePatientTasks(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const REQUEST_MOVE_PATIENT_TASKS = 'REQUEST_MOVE_PATIENT_TASKS';
export const RECEIVE_MOVE_PATIENT_TASKS = 'RECEIVE_MOVE_PATIENT_TASKS';

export const requestMovePatientTasks = token => ({
  type: REQUEST_MOVE_PATIENT_TASKS,
  token,
});
export const receiveMovePatientTasks = task => ({
  type: RECEIVE_MOVE_PATIENT_TASKS,
  task,
});

export const movePatientTasks = (token, patientId, taskId, data) => {
  return async dispatch => {
    dispatch(requestMovePatientTasks(token));
    try {
      const response = await API(token).patch(
        `patients/${patientId}/tasks/${taskId}/`,
        {
          ...data,
        },
      );
      return dispatch(receiveMovePatientTasks(response.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const REQUEST_PATIENT_HISTORY = 'REQUEST_PATIENT_HISTORY';
export const RECEIVE_PATIENT_HISTORY = 'RECEIVE_PATIENT_HISTORY';

export const requestPatientHistory = token => ({
  type: REQUEST_PATIENT_HISTORY,
  token,
});

export const receivePatientHistory = history => ({
  type: RECEIVE_PATIENT_HISTORY,
  history,
});

export const getPatientHistory = (token, patientId) => {
  return async dispatch => {
    try {
      const baseUrl = `patients/${patientId}`;
      const response = await Promise.all([
        API(token).get(`${baseUrl}/tasks/?status=done`),
        API(token).get(`${baseUrl}/alerts/?is_active=false`),
        API(token).get(`/observations/?recipient=${patientId}`),
      ]);

      const [tasks, alerts, observations] = response;
      const data = [
        ...tasks.data.map(task => ({ ...task, type: 'task' })),
        ...alerts.data.map(alert => ({ ...alert, type: 'alert' })),
        ...observations.data.map(observation => ({
          ...observation,
          type: 'observation',
        })),
      ];

      return dispatch(receivePatientHistory(data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

export const REQUEST_CARE_TEAM = 'REQUEST_CARE_TEAM';
export const RECEIVE_CARE_TEAM = 'RECEIVE_CARE_TEAM';

const requestCareTeam = () => ({
  type: REQUEST_CARE_TEAM,
});
const receiveCareTeam = (careTeam, carePlanId) => ({
  type: RECEIVE_CARE_TEAM,
  careTeam,
  carePlanId,
});

export const getCareTeam = (token, carePlanId) => {
  return async dispatch => {
    dispatch(requestCareTeam());
    try {
      const careTeam = await API(token).get(
        `/care_teams/${carePlanId}/health_professionals/`,
      );
      return dispatch(receiveCareTeam(careTeam.data, carePlanId));
    } catch (error) {
      toastError(error.message);
    }
  };
};

// GET PATIENT CARE_TEAM
const getCarePlanRoles = async (token, patientId, carePlanId) => {
  try {
    const roles = await API(token).get(
      `patients/${patientId}/care_plans/${carePlanId}/roles/`,
    );
    return roles.data;
  } catch (error) {
    toastError(error.message);
  }
};

const getCareTeamMembers = async (token, carePlanRoles) => {
  const members = await Promise.all(
    carePlanRoles.map(async carePlanRole => {
      const membership = await getTeamMembership(
        token,
        carePlanRole.membership,
      );
      const profile = await API(token).get(
        `profiles/${membership.health_professional}/`,
      );

      return {
        membership: { ...membership, health_professional: profile.data },
        roles: [{ id: carePlanRole.role, carePlanRoleId: carePlanRole.id }],
      };
    }),
  );

  return members;
};

const getOrganization = async (token, carePlanId) => {
  try {
    const careTeam = await API(token).get(`care_teams/${carePlanId}/`);
    const organization = await API(token).get(
      `organizations/${careTeam.data.organization}/`,
    );
    return organization.data;
  } catch (error) {
    toastError(error.message);
  }
};

const reduceMembers = members => {
  const reduced = [];

  members.forEach(member => {
    const idx = reduced.findIndex(
      m =>
        m.membership.health_professional.user ===
        member.membership.health_professional.user,
    );
    if (idx < 0) {
      reduced.push(member);
    } else {
      reduced[idx].roles.push(member.roles[0]);
    }
  });
  return reduced;
};

export const REQUEST_PATIENT_CARE_TEAM = 'REQUEST_PATIENT_CARE_TEAM';
export const RECEIVE_PATIENT_CARE_TEAM = 'RECEIVE_PATIENT_CARE_TEAM';

const requestPatientCareTeam = () => ({
  type: REQUEST_PATIENT_CARE_TEAM,
});
const receivePatientCareTeam = (carePlanId, careTeam) => ({
  type: RECEIVE_PATIENT_CARE_TEAM,
  carePlanId,
  careTeam,
});

export const getPatientCareTeam = (token, patientId, carePlanId) => {
  return async dispatch => {
    try {
      dispatch(requestPatientCareTeam());
      const careTeam = {};

      const carePlanRoles = await getCarePlanRoles(
        token,
        patientId,
        carePlanId,
      );

      const members = await getCareTeamMembers(token, carePlanRoles);
      careTeam.members = reduceMembers(members);

      careTeam.organization = await getOrganization(
        token,
        members[0].membership.care_team,
      );

      return dispatch(receivePatientCareTeam(carePlanId, careTeam));
    } catch (error) {
      toastError(error.message);
    }
  };
};

//

export const REQUEST_DELETE_MEMBERSHIP_ROLE = 'REQUEST_DELETE_MEMBERSHIP_ROLE';
export const RECEIVE_DELETE_MEMBERSHIP_ROLE = 'RECEIVE_DELETE_MEMBERSHIP_ROLE';

const requestDeleteMembershipRole = () => ({
  type: REQUEST_DELETE_MEMBERSHIP_ROLE,
});
const receiveDeleteMembershipRole = (carePlanId, memberId, roleId) => ({
  type: RECEIVE_DELETE_MEMBERSHIP_ROLE,
  carePlanId,
  memberId,
  roleId,
});

export const deleteMembershipRole = (
  token,
  member,
  patientId,
  carePlanId,
  carePlanRoleId,
  roleId,
) => {
  return async dispatch => {
    try {
      dispatch(requestDeleteMembershipRole());
      await API(token).delete(
        `patients/${patientId}/care_plans/${carePlanId}/roles/${carePlanRoleId}/`,
      );
      return dispatch(
        receiveDeleteMembershipRole(carePlanId, member.id, roleId),
      );
    } catch (error) {
      toastError(error.message);
    }
  };
};

//

export const REQUEST_CREATE_MEMBERSHIP_ROLE = 'REQUEST_CREATE_MEMBERSHIP_ROLE';
export const RECEIVE_CREATE_MEMBERSHIP_ROLE = 'RECEIVE_CREATE_MEMBERSHIP_ROLE';

const requestCreateMembershipRole = () => ({
  type: REQUEST_CREATE_MEMBERSHIP_ROLE,
});
const receiveCreateMembershipRole = (carePlanId, hpId, newRole) => ({
  type: RECEIVE_CREATE_MEMBERSHIP_ROLE,
  carePlanId,
  hpId,
  newRole,
});

export const createMembershipRole = (
  token,
  member,
  patientId,
  carePlanId,
  roleId,
) => {
  return async dispatch => {
    try {
      dispatch(requestCreateMembershipRole());
      const newRole = await API(token).post(
        `patients/${patientId}/care_plans/${carePlanId}/roles/`,
        {
          membership: member.membership.id,
          care_plan: carePlanId,
          role: roleId,
        },
      );
      return dispatch(
        receiveCreateMembershipRole(
          carePlanId,
          member.membership.health_professional.user,
          newRole,
        ),
      );
    } catch (error) {
      toastError(error.message);
    }
  };
};

// ALERT CONFIGS
// -- GET
export const REQUEST_PATIENT_ALERT_CONFIGS = 'REQUEST_PATIENT_ALERT_CONFIGS';
export const RECEIVE_PATIENT_ALERT_CONFIGS = 'RECEIVE_PATIENT_ALERT_CONFIGS';

const requestPatientAlertConfigs = () => ({
  type: REQUEST_PATIENT_ALERT_CONFIGS,
});
const receivePatientAlertConfigs = alertConfigs => ({
  type: RECEIVE_PATIENT_ALERT_CONFIGS,
  alertConfigs,
});

export const getPatientAlertConfigs = (token, patientId) => {
  return async dispatch => {
    dispatch(requestPatientAlertConfigs());
    try {
      const alertConfigs = await API(token).get(
        `patients/${patientId}/alertconfigs/`,
      );
      return dispatch(receivePatientAlertConfigs(alertConfigs.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

// -- PATCH

export const REQUEST_PATCH_PATIENT_ALERT_CONFIGS =
  'REQUEST_PATCH_PATIENT_ALERT_CONFIGS';
export const RECEIVE_PATCH_PATIENT_ALERT_CONFIGS =
  'RECEIVE_PATCH_PATIENT_ALERT_CONFIGS';

const requestPatchPatientAlertConfigs = () => ({
  type: REQUEST_PATCH_PATIENT_ALERT_CONFIGS,
});
const receivePatchPatientAlertConfigs = patchedAlertConfig => ({
  type: RECEIVE_PATCH_PATIENT_ALERT_CONFIGS,
  patchedAlertConfig,
});

export const patchPatientAlertConfigs = (
  token,
  patientId,
  alertConfigId,
  patchedAlertConfig,
) => {
  return async dispatch => {
    dispatch(requestPatchPatientAlertConfigs());
    try {
      const alertConfigs = await API(token).patch(
        `patients/${patientId}/alertconfigs/${alertConfigId}/`,
        patchedAlertConfig,
      );
      return dispatch(receivePatchPatientAlertConfigs(alertConfigs.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

// -- DELETE

export const REQUEST_DELETE_PATIENT_ALERT_CONFIGS =
  'REQUEST_DELETE_PATIENT_ALERT_CONFIGS';
export const RECEIVE_DELETE_PATIENT_ALERT_CONFIGS =
  'RECEIVE_DELETE_PATIENT_ALERT_CONFIGS';

const requestDeletePatientAlertConfigs = () => ({
  type: REQUEST_DELETE_PATIENT_ALERT_CONFIGS,
});

const receiveDeletePatientAlertConfigs = alertConfigId => ({
  type: RECEIVE_DELETE_PATIENT_ALERT_CONFIGS,
  alertConfigId,
});

export const deletePatientAlertConfigs = (token, patientId, alertConfigId) => {
  return async dispatch => {
    dispatch(requestDeletePatientAlertConfigs());
    try {
      await API(token).delete(
        `patients/${patientId}/alertconfigs/${alertConfigId}/`,
      );
      return dispatch(receiveDeletePatientAlertConfigs(alertConfigId));
    } catch (error) {
      toastError(error.message);
    }
  };
};

// -- CREATE

export const REQUEST_CREATE_PATIENT_ALERT_CONFIGS =
  'REQUEST_CREATE_PATIENT_ALERT_CONFIGS';
export const RECEIVE_CREATE_PATIENT_ALERT_CONFIGS =
  'RECEIVE_CREATE_PATIENT_ALERT_CONFIGS';

const requestCreatePatientAlertConfigs = () => ({
  type: REQUEST_CREATE_PATIENT_ALERT_CONFIGS,
});
const receiveCreatePatientAlertConfigs = alertConfig => ({
  type: RECEIVE_CREATE_PATIENT_ALERT_CONFIGS,
  alertConfig,
});

export const createPatientAlertConfigs = (
  token,
  patientId,
  patchedAlertConfig,
) => {
  return async dispatch => {
    dispatch(requestCreatePatientAlertConfigs());
    try {
      const alertConfigs = await API(token).post(
        `patients/${patientId}/alertconfigs/`,
        patchedAlertConfig,
      );
      return dispatch(receiveCreatePatientAlertConfigs(alertConfigs.data));
    } catch (error) {
      toastError(error.message);
    }
  };
};

//

export const REQUEST_MEMBERSHIP_SUGGESTIONS = 'REQUEST_MEMBERSHIP_SUGGESTIONS';
export const RECEIVE_MEMBERSHIP_SUGGESTIONS = 'RECEIVE_MEMBERSHIP_SUGGESTIONS';

const requestMemberSuggestions = () => ({
  type: REQUEST_MEMBERSHIP_SUGGESTIONS,
});
const receiveMemberSuggestions = (carePlanId, membershipSuggestions) => ({
  type: RECEIVE_MEMBERSHIP_SUGGESTIONS,
  carePlanId,
  membershipSuggestions,
});

export const membershipSuggestions = (token, carePlanId) => {
  return async dispatch => {
    try {
      dispatch(requestMemberSuggestions());
      const health_pros_response = await API(token).get(
        `care_teams/${carePlanId}/health_professionals/`,
      );
      const health_pros = health_pros_response.data;

      const hpProfiles = await Promise.all(
        health_pros.map(async hp => {
          const profile = await API(token).get(`profiles/${hp.user}`);

          return {
            ...hp,
            user: profile.data,
          };
        }),
      );
      return dispatch(receiveMemberSuggestions(carePlanId, hpProfiles));
    } catch (error) {
      toastError(error.message);
    }
  };
};
