type TeamMembershipCarePlanRole = {
  id: number;
  membership: number;
  care_plan: number;
  role: number;
};

type BaseTeamRole = {
  patientId: number;
  carePlanID: number;
};

export type TeamRoles = BaseTeamRole & {
  roles: TeamMembershipCarePlanRole[];
};

export type TeamRole = BaseTeamRole & {
  role: TeamMembershipCarePlanRole;
};

export type TeamRoleDeleted = BaseTeamRole & {
  roleID: number;
};

export type TeamRolesData = {
  [patientId: number]: { [carePlanId: number]: TeamMembershipCarePlanRole[] };
};
