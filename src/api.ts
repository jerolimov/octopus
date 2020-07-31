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
