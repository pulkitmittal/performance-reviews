export enum UserRole {
  EMPLOYEE = 'employee',
  ADMIN = 'admin'
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}
