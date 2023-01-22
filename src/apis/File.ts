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

export async function saveFileBody(
  baseURL: string,
  token: string,
  path: string,
  data: string
) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/files?action=SaveFileBody",
    data: {
      path,
      data,
      encoding: "utf-8",
    },
  });
}

export async function createFile(
  baseURL: string,
  token: string,
  path: string
) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/files?action=CreateFile",
    data: { path },
  });
}

