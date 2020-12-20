export type Organization = {
  id: number;
  name: string;
};

export type OrganizationData = {
  [id: number]: Organization;
};
