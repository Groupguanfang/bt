import { Baota } from '@/utils/request'

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
  /*
  export async function newTerminal(host: string): Promise<number> {
    const data = await axios({
      baseURL: host,
      url: "/terminal",
      method: "POST",
    });
    return data.data;
  }*/

  public async getTerminal() {
    const data = await this.request({
      baseURL: 'http://192.168.0.174:3400/terminal',
      method: 'POST'
    })
    return data.data
  }
}
