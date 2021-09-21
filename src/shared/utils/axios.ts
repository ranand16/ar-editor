import axios from "axios";

export default {
  get: (url: string, config: object = {}): Promise<any> =>
    axios.get(url, config),
  post: (url: string, data: any, config: object = {}): Promise<any> =>
    axios.post(url, data, config),
  request: (config: object = {}): Promise<any> => axios.request(config),
  delete: (url: string, config: object = {}): Promise<any> =>
    axios.delete(url, config),
  head: (url: string, config: object = {}): Promise<any> =>
    axios.head(url, config),
  options: (url: string, config: object = {}): Promise<any> =>
    axios.options(url, config),
  put: (url: string, data?: any, config: object = {}): Promise<any> =>
    axios.put(url, data, config),
  patch: (url: string, data?: any, config: object = {}): Promise<any> =>
    axios.patch(url, data, config),
};
