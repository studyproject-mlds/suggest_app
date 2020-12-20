import { RootState } from '@/state/store';
import { PatientWithUserProfile } from '../patients/types';
import { selectAllPatients } from '../patients/selectors';
import { selectHealthProfessionalTeamMemberships } from '../team-membership/selectors';
import { TeamMembershipCarePlanRole } from '../team-membership-careplan-role/types';
import { getFullName } from '../users/utils';
import { Task } from '../tasks/types';
import { Alert } from '../alerts/types';
import { Observation } from '../observations/types';
import { selectPatientObservations } from '../observations/selectors';
import { selectPatientInactiveAlerts } from '../alerts/selectors';
import { selectPatientTasksDone } from '../tasks/selectors';
import { AlertConfig } from '../alert-configs/types';

export type FilterTypes = {
  notifications: boolean;
  therapeutic_support: boolean;
  in_charge: boolean;
};

type PatientWithUserProfileAndCarePlans = PatientWithUserProfile & {
  carePlans: TeamMembershipCarePlanRole[][];
};

export const selectFilteredPatientsProfiles = (
  state: RootState,
  filters: FilterTypes,
  search: string,
) => {
  const healthProfessionalId = state.me.data.user;
  const healthProfessionalMemberships = selectHealthProfessionalTeamMemberships(
    state,
    healthProfessionalId,
  );
  const patients = selectAllPatients(state);
  const patientsWithCarePlans = patients.map(patient => {
    return {
      ...patient,
      carePlans: state.carePlans.data[patient.user].map(
        carePlan => state.carePlanRole.data[patient.user][carePlan.id],
      ),
    };
  });

  const filteredPatientsWithCarePlans = patientsWithCarePlans.filter(
    (patient: PatientWithUserProfileAndCarePlans) =>
      getFullName(patient.profile).toLowerCase().includes(search.toLowerCase()),
  );

  const roleCheckAlertId =
    Object.values(state.roles.data).find(role => role.name === 'check_alerts')
      ?.id ?? 0;
  const roleTherapeuticGuidance =
    Object.values(state.roles.data).find(
      role => role.name === 'perform_therapeutic_guidance',
    )?.id ?? 1;

  // const hasRole = (
  //   patient: PatientWithUserProfileAndCarePlans,
  //   roleId: number,
  // ) =>
  //   patient.carePlans.find(carePlan =>
  //     carePlan
  //       .filter(carePlan => carePlan.role === roleId)
  //       .find(carePlan =>
  //         healthProfessionalMemberships.find(
  //           teamMembership => teamMembership.id === carePlan.membership,
  //         ),
  //       ),
  //   ) !== undefined;

  return filteredPatientsWithCarePlans.filter(patient => {
    const notifications = false;
    const therapeutic_support = false;
    // let in_charge = false;

    // if (filters.notifications) {
    //   notifications = hasRole(patient, roleCheckAlertId);
    // }
    // if (filters.therapeutic_support) {
    //   therapeutic_support = hasRole(patient, roleTherapeuticGuidance);
    // }
    // if (filters.in_charge) {
    //   in_charge = patient?.my_roles?.role_on_call === true;
    // }

    if (Object.values(filters).every(value => value === false)) {
      return true;
    }
    return notifications || therapeutic_support || filters.in_charge;
  });
};

export type HistoryType =
  | ({ type: 'task' } & Task)
  | ({ type: 'alert' } & Alert & AlertConfig)
  | ({ type: 'observation' } & Observation);

export const selectPatientHistory = (state: RootState, patientId: number) => {
  const observations = selectPatientObservations(state, patientId) ?? [];
  const alerts = selectPatientInactiveAlerts(state, patientId) ?? [];
  const tasks = selectPatientTasksDone(state, patientId) ?? [];

  return [
    ...observations.map(obs => ({ type: 'observation', ...obs })),
    ...alerts.map(alert => ({ type: 'alert', ...alert })),
    ...tasks.map(task => ({ type: 'task', ...task })),
  ];
};
