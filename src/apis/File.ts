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

export async function createFile(baseURL: string, token: string, path: string) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/files?action=CreateFile",
    params: { path },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });
}

export async function createDir(baseURL: string, token: string, path: string) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/files?action=CreateDir",
    params: { path },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });
}

export async function deleteDir(baseURL: string, token: string, path: string) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/files?action=DeleteDir",
    params: { path },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });
}

export async function deleteFile(baseURL: string, token: string, path: string) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/files?action=DeleteFile",
    params: { path },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });
}
