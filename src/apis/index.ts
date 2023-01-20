import request from "@/utils/request";

export async function getSystemTotal(baseURL: string, token: string) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/system?action=GetSystemTotal",
  });
}

export async function getDiskInfo(baseURL: string, token: string) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/system?action=GetDiskInfo",
  });
}

export async function getNetWork(baseURL: string, token: string) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/system?action=GetNetWork",
  });
}
