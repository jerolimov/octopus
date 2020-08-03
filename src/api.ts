import { BASE_URL } from "./config"

export function get<T>(path?: string): Promise<T> {
  if (!path) {
    throw new Error('Missing path');
  }
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

export function deleteIt<T>(path: string): Promise<T> {
  const requestInit: RequestInit = {
    method: 'DELETE',
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

export function watch<T = any>(path: string, onMessage: (data: string, object: T) => void): () => void {
  const ws = new WebSocket(BASE_URL + path);
  ws.onopen = () => {
    console.log('onopen');
    // ws.send('something');
  };
  ws.onmessage = (event: WebSocketMessageEvent) => {
    if (event.data) {
      const data = JSON.parse(event.data);
      console.log('onmessage data', data.type, data.object.metadata.name);
      onMessage(data.type, data.object);
    }
  };
  ws.onerror = (event: WebSocketErrorEvent | any) => {
    console.warn('onerror', event);
  };
  ws.onclose = (event: WebSocketCloseEvent) => {
    console.log('onclose', event);
  };
  return () => {
    ws.close();
  }
}
