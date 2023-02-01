import request from "@/utils/request";

export async function getSoftList(
  baseURL: string,
  token: string,
  type: number
) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/plugin?action=get_soft_list",
    params: { type },
  });
}

export async function getSoftFind(
  baseURL: string,
  token: string,
  name: string
) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/plugin?action=get_soft_find",
    params: { sName: name },
  });
}
