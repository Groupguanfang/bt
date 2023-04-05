import { Baota } from '@/utils/request'

export class DashboardAPI extends Baota {
  /**
   * 获取实时状态信息(CPU、内存、网络、负载)
   */
  public async getNetWork() {
    const data = await this.request({
      params: {
        nai_baota: this.baseURL + '/system?action=GetNetWork'
      }
    })
    return data.data
  }
}
