export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  employeeId?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: UserResponse;
    token: string;
  };
  errors?: ValidationError[];
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  department?: string;
  createdAt: Date;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface AuthorizedUserData {
  email: string;
  employeeId?: string;
  department?: string;
  isAuthorized: boolean;
  authorizedAt: Date;
}

export interface EligibilityResponse {
  success: boolean;
  data: {
    isEligible: boolean;
    message: string;
  };
}