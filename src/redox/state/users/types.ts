type UserType = 'patient' | 'health_professional' | 'admin';

export type User = {
  id: number;
  auth_id: string;
  user_type: UserType;
  email: string;
  last_login: string;
  is_superuser: boolean;
  is_active: boolean;
  groups: number[];
  user_permissions: number[];
};

type PhoneDescription = 'Portable' | 'Fixe';

export type Phone = {
  description: PhoneDescription;
  number: string;
};

type Gender = 'male' | 'female';

type MaritalStatus =
  | 'single'
  | 'married'
  | 'widowed'
  | 'divorced'
  | 'separated';

export type UserProfile = {
  user: number;
  first_name: string;
  last_name: string;
  phones: Phone[];
  gender: Gender;
  birth_date: string;
  place_of_birth: string;
  marital_status: MaritalStatus;
  postal_address: string;
};

export type UserWithProfile = {
  user: User;
  profile: UserProfile;
};

export type UsersData = {
  [user: number]: UserWithProfile;
};
