import ServersEn from "./Servers.en";
import ServersZh from "./Servers.zh";
import HomeEn from "./Home.en";
import HomeZh from "./Home.zh";
import MenuZh from "./Menu.zh";
import MenuEn from "./Menu.en";

export default (lang: "zh" | "", part: "server" | "home" | "menu") => {
  if (lang === "zh") {
    // Chinese
    if (part === "server") {
      return ServersZh;
    } else if (part === "home") {
      return HomeZh;
    } else if (part === "menu") {
      return MenuZh;
    }
  } else {
    // English
    if (part === "server") {
      return ServersEn;
    } else if (part === "home") {
      return HomeEn;
    } else if (part === "menu") {
      return MenuEn;
    }
  }
};
