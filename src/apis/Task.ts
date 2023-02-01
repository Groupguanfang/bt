import request from "@/utils/request";

export async function getCrontab(baseURL: string, token: string) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/crontab?action=GetCrontab",
  });
}

export async function getLogs(baseURL: string, token: string, id: number) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/crontab?action=GetLogs",
    params: { id },
  });
}
