import axios from 'axios'
import md5 from 'md5'
import type { AxiosInstance } from 'axios'

export abstract class Baota {
  protected readonly request: AxiosInstance
  constructor(protected readonly baseURL: string, protected readonly key: string) {
    const timestamp = new Date().getTime()
    this.request = axios.create({
      baseURL: 'http://localhost:3400/proxy',
      withCredentials: false,
      headers: {
        'Content-Type': 'x-www-form-urlencoded'
      },
      params: {
        request_time: timestamp,
        request_token: md5(timestamp + md5(this.key)),
        nai_baota: baseURL
      },
      method: 'POST'
    })
  }
}
