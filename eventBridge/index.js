export default class eventBridge {
  constructor(name, serviceID,port) {
    this.handlers = {};
    this.id =name+'@' +new Date().getTime();
    this.name = name;
    this.serviceID = serviceID;
    this.port=port
  }
  init() {
    return new Promise((resolve, reject) => {
        let websocketURL = `${
            window.location.protocol === "https:" ? "wss" : "ws"
          }://127.0.0.1:${this.port}/bridge?id=${this.id}`;
          if (this.serviceID) {
            websocketURL = websocketURL + `&&serviceID=${this.serviceID}`;
          }
          this.ws = new WebSocket(`${websocketURL}`);
          this.ws.onmessage = (msg) => {
            let json = JSON.parse(msg.data);
            let _type;
      
            if (typeof json.type == "string") {
              _type = json.type;
            } else {
              _type = JSON.stringify(json.type);
            }
            if (json && json.type && this.handlers[_type]) {
              this.handlers[_type].forEach(async (cb) => {
                try{
                    await cb(json.data)
                }catch(e){
                    console.error(e)
                };
              });
            }
          };
          this.ws.onclose = () => {
            this.ready = false;
            this.初始化(this.id);
          };
          let ping = () => {
            this.ws.send("ping");
          };
          this.ws.onopen = () => {
            this.ready = true;
            setInterval(ping, 3000);
            resolve(this)
          };
          this.ws.onclose = clearInterval(ping);
      
    })
  }
  send(type, data) {
    if (this.ready) {
      let obj = JSON.stringify({
        type: type,
        data: data,
        aTime: new Date().getTime(),
      });
      this.ws.send(obj);
    } else {
      setTimeout(() => {
        this.send(type, data), 100;
      });
    }
  }
  listen(type, cb) {
    let _type;
    if (typeof type == "string") {
      _type = type;
    } else if (type instanceof Object) {
      _type = JSON.stringify(type);
    }
    if (!this.handlers[_type]) {
      this.handlers[_type] = [];
    }
    this.handlers[_type].push(cb);
  }
  call(name, type, data) {
    let realType = { _name: name, _type: type };
    this.send(realType, data);
  }
  on(type, cb) {
    let realType = { _name: this.name, _type: type };
    this.listen(realType, cb);
  }
  off(type, cb) {
    if (this.handlers[type]) {
      this.handlers[type].forEach((item) => {
        item == cb ? (item = undefined) : null;
      });
    }
  }
  once(type, cb) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    this.handlers[type].push((...args) => {
      cb(...args);
      this.off(cb);
    });
  }
  invoke = (serviceID, name, ...args) => {
    let meta = { _callerID: this.id, _name: name };
    let fTime = new Date().getTime();
    let obj = JSON.stringify({
      serviceID: serviceID,
      type: "FunctionCall",
      data: {
        args: Array.from(args),
        meta: meta,
        fTime: fTime,
      },
    });
    let flag,
      retry = 0;
    let a = () => {
      if (this.ready) {
        this.ws.send(obj);
        flag = true;
      } else {
        if (!flag && retry < 5) {
          setTimeout(a, 500);
          retry += 1;
        }
      }
    };
    a()
    return new Promise((resolve, reject) => {
      this.once("FunctionReturn", (data) => {
        if (data.fTime == fTime) {
          if (!data.error) {
            resolve(data.result);
          } else {
            reject(data.error);
          }
        }
      });
    });
  };
  handler = (name, cb) => {
    let ws = this.ws;
    if (!this.serviceID) {
      throw "需要提供serviceID方可注册";
    } else {
      this.listen("FunctionCall", async (data) => {
        let { args, meta, fTime } = data;
        if (meta._name == name) {
          try {
            let res = await cb(meta._callerID,...args);
            ws.send(
              JSON.stringify({
                callerID: meta._callerID,
                type: "FunctionReturn",
                data: {
                  result: res,
                  fTime: fTime,
                },
              })
            );
          } catch (e) {
            ws.send(
              JSON.stringify({
                callerID: meta._callerID,
                type: "FunctionReturn",
                data: {
                  error: e,
                  fTime: fTime,
                },
              })
            );
            throw { caller: meta._callerID, time: fTime, error: e };
          }
        }
      });
    }
  };
}
export {eventBridge as eventBridge}