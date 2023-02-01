import request from "@/utils/request";

export async function getPHP(baseURL: string, token: string, config: any) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/data?action=getData&table=sites",
    params: config,
  });
}

export async function getNodeJS(baseURL: string, token: string) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/project/nodejs/get_project_list",
  });
}

export async function getDomain(baseURL: string, token: string, config: any) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/data?action=getData&table=domain",
    params: config,
  });
}

export async function GetDirUserINI(baseURL: string, token: string, id: number) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/site?action=GetDirUserINI",
    params: { id }
  });
}

export async function SetDirUserINI(baseURL: string, token: string, path: string) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/site?action=SetDirUserINI",
    params: { path }
  });
}
