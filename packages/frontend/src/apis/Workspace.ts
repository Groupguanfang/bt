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
}
