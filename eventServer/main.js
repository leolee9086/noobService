const express = require("express");
const { WebSocketServer } = require("ws");
const noobBridge = {
  registry: [],
  servicies: {},
};

let app = express();
let noobServer;
module.exports = {
  初始化: (noob核心后端服务端口号) => {
    return new Promise((resolve, reject) => {
      try {
        noobServer = app.listen(noob核心后端服务端口号, () => {
          console.log(`noob事件服务在${noob核心后端服务端口号}上已启动`);
          wss(noobServer);
          addEventBridge(noobServer);
          resolve({expressApp:app,server:noobServer,express:express});
        });
      } catch (e) {
        reject(e);
      }
    });
  },
};
function wss(app) {
  app.on("upgrade", (req, socket, head) => {
    let _url = new URL(`http://127.0.0.1${req.url}`);
    const obj = app.wsRoute[_url.pathname];
    obj
      ? obj.wss.handleUpgrade(req, socket, head, (ws) => obj.mid(ws, req))
      : socket.destroy();
  });
  app.ws = (route, mid) => {
    app.wsRoute = app.wsRoute || {};
    app.wsRoute[route] = {
      wss: new WebSocketServer({ noServer: true }),
      mid,
    };
  };
}
let addEventBridge = (app) => {
  app.ws("/bridge", (ws, req) => {
    let _url = new URL(`http://127.0.0.1${req.url}`);
    let id = _url.searchParams.get("id");
    let serviceID = _url.searchParams.get("serviceID");
    if (id) {
      !noobBridge.registry ? (noobBridge.registry = []) : null;
      noobBridge.registry.push({ id: id, client: ws });
    }
    if (serviceID) {
      noobBridge.servicies[serviceID] = ws;
    }
    ws.on("message", (msg) => {
      let string = msg.toString();
      let json;
      try {
        json = JSON.parse(string);
      } catch (e) {
        return;
      }
      if (json.serviceID && noobBridge.servicies[json.serviceID]) {
        noobBridge.servicies[json.serviceID].send(JSON.stringify(json));
      } else if (json.callerID) {
        noobBridge.registry.forEach((element) => {
          element && element.client && element.id == json.callerID
            ? element.client.send(JSON.stringify(json))
            : null;
        });
      } else if (json.type) {
        noobBridge.registry.forEach((element) => {
          element && element.client
            ? element.client.send(JSON.stringify(json))
            : null;
        });
      }
    });
  });
};
