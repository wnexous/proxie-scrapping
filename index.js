import fetch from "node-fetch";
import HttpProxyAgent from "https-proxy-agent";
import fs from "fs";

(async () => {
  const readFiles = fs
    .readFileSync("./proxies.txt", { encoding: "utf8" })
    .split("\r\n");

  for (const ip of readFiles) {
    try {
      const getCurrentDate = new Date();

      const proxyAgent = new HttpProxyAgent.HttpsProxyAgent("http://" + ip);
      const response = await fetch("http://httpbin.org/ip", {
        timeout: 5000,
        agent: proxyAgent,
      });
      const body = await response.json();
      const getEndDate = new Date();
      const getTime = getEndDate.getTime() - getCurrentDate.getTime()

      fs.appendFileSync("./good_proxies.txt", ip + ` ${getTime}ms` + "\r\n");
      console.log("GOOD", body.origin);
    } catch (error) {
      console.log("FAIL", ip);
    }
  }
})();
