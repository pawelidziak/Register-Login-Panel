export class AuthService {

  token: string;
  private isSessionStored: boolean;

  constructor() {
    this.token = '';
  }

  setAccessToken(token: string, isSessionStored: boolean): void {
    if (isSessionStored) {
      localStorage.setItem('token', token);
      sessionStorage.clear();
    } else {
      sessionStorage.setItem('token', token);
      localStorage.clear();
    }

    this.token = token;
    this.isSessionStored = isSessionStored;
  }

  getAccessToken(): string {
    return this.isSessionStored ? localStorage.getItem('token') : sessionStorage.getItem('token');
  }

  clearAccessToken(): void {
    localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = '';
  }

}
