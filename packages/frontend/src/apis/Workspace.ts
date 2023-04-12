import { Baota } from '@/utils/request'
import config from '@/config/config'

export class WorkspaceAPI extends Baota {
  /**
   * 获取文件列表
   *
   * @param path 路径
   */
  public async getDir(path: string) {
    const data = await this.request({
      params: {
        nai_baota: this.baseURL + `/files?action=GetDir`
      },
      data: {
        path: path
      }
    })
    return data.data
  }

  public async getTerminal() {
    const data = await this.request({
      baseURL: `http://${config.serverURL}/terminal`,
      method: 'POST'
    })
    return data.data
  }

  public async getFileBody(path: string) {
    const data = await this.request({
      params: {
        nai_baota: this.baseURL + `/files?action=GetFileBody`
      },
      data: {
        path: path
      }
    })
    return data.data
  }

  public async saveFileBody(data: string, path: string) {
    const req = await this.request({
      params: {
        nai_baota: this.baseURL + `/files?action=SaveFileBody`
      },
      data: {
        path: path,
        data: data,
        encoding: 'utf-8'
      }
    })
    return req.data
  }
}
