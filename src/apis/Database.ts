import request from "@/utils/request";

export async function GetCloudServer(
  baseURL: string,
  token: string,
  type: "mysql" | "sqlserver" | "mongodb"
) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/database?action=GetCloudServer",
    data: { type },
  });
}

export async function GetDatabase(baseURL: string, token: string) {
  const instance = request(baseURL, token);
  return await instance({
    url: "/data?action=getData",
    params: {
      table: "databases",
    },
  });
}
