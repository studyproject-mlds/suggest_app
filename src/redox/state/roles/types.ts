type RoleName = 'check_alerts' | 'perform_therapeutic_guidance';

export type Role = {
  id: number;
  name: RoleName;
  description: string;
};

export type RoleData = {
  [roleId: number]: Role;
};
