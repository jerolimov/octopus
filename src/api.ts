import { BASE_URL } from "./config"

export function get<T>(path: string): Promise<T> {
  return fetch(BASE_URL + path).then((response) => {
    if (response.status !== 200) {
    console.warn('get ' + BASE_URL + path + ' has an unexpected status code ' + response.status);
      throw new Error('Unexpected status code: ' + response.status);
    }
    return response.json();
  }, (error) => {
    console.warn('get ' + BASE_URL + path + ' failed:', error);
    throw error;
  });
}

export function post<T>(path: string, data: any): Promise<T> {
  const requestInit: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data, null, 2),
  }
  return fetch(BASE_URL + path, requestInit).then((response) => {
    if (!response.ok) {
    console.warn('get ' + BASE_URL + path + ' has an unexpected status code ' + response.status);
      throw new Error('Unexpected status code: ' + response.status);
    }
    return response.json();
  }, (error) => {
    console.warn('get ' + BASE_URL + path + ' failed:', error);
    throw error;
  });
}
