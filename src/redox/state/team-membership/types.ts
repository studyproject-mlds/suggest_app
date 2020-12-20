export type TeamMembership = {
  id: number;
  care_team: number;
  health_professional: number;
};

export type TeamMembershipData = {
  [teamMembership: number]: TeamMembership;
};
