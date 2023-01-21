import request from "@/utils/request";

export async function getDir(baseURL: string, token: string, path: string) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/files?action=GetDir",
    params: { path },
  });
}

export async function getFileBody(
  baseURL: string,
  token: string,
  path: string
) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/files?action=GetFileBody",
    data: { path },
  });
}
