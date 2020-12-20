export type TeamMembershipCarePlanRole = {
  id: number;
  care_plan: number;
  membership: number;
  role: number;
};

export type TeamMembershipCarePlanRoleRemoved = {
  carePlanId: number;
  roleId: number;
};

export type TeamMembershipCarePlanRoleData = {
  [carePlanId: number]: TeamMembershipCarePlanRole[];
};
