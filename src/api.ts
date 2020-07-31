import { BASE_URL } from "./config"

export function get<T>(path: string): Promise<T> {
  return fetch(BASE_URL + path).then((response) => {
    if (response.status !== 200) {
      throw new Error('Unexpected status code: ' + response.status);
    }
    return response.json();
  });
}
