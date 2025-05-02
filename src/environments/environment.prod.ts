export const environment = {
  production: true,
  apiBaseUrl: (window as any)['env']['apiBaseUrl'] ?? 'http://localhost:8080'
};
