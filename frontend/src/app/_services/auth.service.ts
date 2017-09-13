import {Headers, RequestOptions} from '@angular/http';

export class AuthService {

  constructor() {
  }

  setJwtToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private getAccessToken(): string {
    return localStorage.getItem('token');
  }

  clearJwtToken(): void {
    localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = '';
  }

  createJwtHeader(): RequestOptions {
    // tworzenie nagłówka dla jwt bearer i zwrócenie opcji
    const token = this.getAccessToken();
    if (token) {
      const headers = new Headers({'Authorization': 'Bearer ' + token});
      return new RequestOptions({headers: headers});
    }
  }

}
