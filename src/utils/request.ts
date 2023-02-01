import axios from "axios";
import md5 from "md5-node";

export default (baseURL: string, token: string) => {
  const time = new Date().getTime();
  const instance = axios.create({
    baseURL,
    method: "post",
    params: {
      request_time: time,
      request_token: md5(time + md5(token)),
    },
    headers: {
      "Content-Type": "x-www-form-urlencoded",
    },
    withCredentials: true,
  });
  return instance;
};
