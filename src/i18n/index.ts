import ServersEn from "./Servers.en";
import ServersZh from "./Servers.zh";

export default (lang: "zh" | "", part: "server") => {
  if (lang === "zh") {
    if (part === "server") {
      return ServersZh;
    }
  } else {
    if (part === "server") {
      return ServersEn;
    }
  }
};
