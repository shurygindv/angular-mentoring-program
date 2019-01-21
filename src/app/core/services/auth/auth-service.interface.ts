export interface AuthService {
  login(email: string, password: string): void;
  logout(): void;
  isAuthenticated(): boolean;
  getUserInfo(): string;
}
