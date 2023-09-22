export type RegistrationData = {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  lastName: string;
};

export type AuthResponse = {
  success: boolean;
  message?: string;
  data?: string;
};
