const { Plugin } = require("siyuan");
const clientApi = require("siyuan");
/*上面这堆东西在插件初始化之后就可以用了*/
let path;
let 思源工作空间;
let 插件自身路径;
let loadModule;
let Vue;
let plugin;
let 核心api;
const workspaceDir = window.siyuan.config.system.workspaceDir;
//通过思源工作空间的内部路径来获取绝对路径
function 获取内部路径绝对路径(内部路径) {
  return path.join(workspaceDir, 内部路径)
}
//@todo:判定某个绝对路径是否在某个思源工作空间下面
async function 是否工作空间子路径(绝对路径) {
  let 思源工作空间列表 = await 核心api.getWorkspaces()

  let 是子路径 = false
  for await (let 工作空间信息 of 思源工作空间列表) {
    let 工作空间根路径 = 工作空间信息.path
    let 正规绝对路径 = 绝对路径.replace(/\\/g, '/')
    if (正规绝对路径.startsWith(工作空间路径)) {
      是子路径 = true
    }
  }
  return 是子路径
}


/*这些东西其实本来应该是插件的方法,但是不想让插件代码太长,所以把其他插件可能也需要代码拖出来放到这里*/
/*插件的依赖路径指向node_modules*/
function requireDep() {
  return window.require(path.join(plugin.依赖路径, id));
}
function requirePluginModule() {
  return window.require(path.join(plugin.插件自身路径, id));
}
/*这个东西是一个集市客户端,远程的集市服务器需要实现与思源集市兼容的接口*/
class bazzarClient {
  constructor(远程集市服务器地址) {
    this.远程集市服务器地址 = 远程集市服务器地址
  }
  InstalledPlugins
}

/*这个东西是一个集市服务器,用于提供第三方集市服务*/
class bazzarServer {
  constructor() {

  }
}
/*在插件初始化之后,path才可以使用*/
class noobService extends Plugin {
  onload() {
    if (window.require) {
      plugin = this;
      this.初始化();
    }
  }
  async 初始化() {
    this.config = {
      //是否作为集市包服务器
      bazaarProvider: true,
      //集市服务器的地址
      集市服务器地址: "http://noob-service-registry.localhost",
      //所有服务的聚合服务端口
      服务端口: 80,
      //所有服务的http聚合服务端口
      ssl服务端口: 443,
    };
    //因为一些界面元素需要同步初始化,所以单独初始化界面
    this.初始化界面();
    this.初始化服务数据();
  }
  async 初始化服务数据() {
    clear();
    this.初始化数据;
    await this.初始化依赖路径();
    await this.初始化消息服务器();
    await this.加载已安装服务();
    this.部署集市列表();
  }
  async 初始化依赖路径() {
    path = (await import(`/plugins/${this.name}/polyfills/path.js`))["default"];
    this.插件自身URL = path.join("/plugins", this.name);
    this.数据内部路径 = path.join("/data", "storage", "petal", this.name);
    this.插件自身路径 = path.join(
      siyuan.config.system.workspaceDir,
      "data",
      "plugins",
      this.name
    );
    插件自身路径 = this.插件自身路径;
    this.依赖路径 = path.join(this.插件自身路径, "node_modules");
    this.消息服务路径 = path.join(this.插件自身路径, "eventServer");
    this.端口文件内部路径 = path.join("temp", "noobTemp", "ports.json");
    this.服务列表内部路径 = path.join(this.数据内部路径, "serviceList.json");
    this.服务安装文件夹内部路径 = path.join("/data", "servicies");
    思源工作空间 = await import(
      path.join(this.插件自身URL, "polyfills", "fs.js")
    );
    核心api = (
      await import(path.join(this.插件自身URL, "polyfills", "kernelApi.js"))
    )["default"];
  }
  async 初始化界面() {
    this.注册图标();
    this.添加顶栏按钮();
    await this.初始化vue();
  }
  注册图标() {
    this.addIcons(`<symbol  id="iconBerry" viewBox='0 0 1024 1024'>
    <path d="M868.352 635.904V386.048c34.304-6.144 61.952-38.4 61.952-74.752 0-42.496-34.304-74.752-74.752-74.752-21.504 0-42.496 10.752-55.296 25.6l-213.504-119.296c2.048-6.144 4.096-12.8 4.096-21.504 0-42.496-34.304-74.752-74.752-74.752s-74.752 34.304-74.752 74.752c0 6.144 2.048 12.8 2.048 19.456L230.4 262.656c-16.896-16.896-36.352-27.648-57.344-27.648-42.496 0-74.752 34.304-74.752 74.752 0 36.352 25.6 66.048 59.904 74.752v251.904c-34.304 8.704-59.904 38.4-59.904 74.752 0 42.496 34.304 74.752 74.752 74.752 21.504 0 42.496-10.752 55.296-25.6l215.552 119.296c-4.096 8.704-6.144 19.456-6.144 29.696 0 42.496 34.304 74.752 74.752 74.752s74.752-34.304 74.752-74.752c0-10.752-2.048-21.504-6.144-31.744l215.552-117.248c14.848 14.848 34.304 25.6 57.344 25.6 42.496 0 74.752-34.304 74.752-74.752 1.536-39.424-24.064-69.12-60.416-75.264z m-309.248 212.992c-8.704-6.144-16.896-10.752-25.6-12.8v-189.952h-36.352v189.952c-10.752 2.048-21.504 8.704-29.696 14.848l-219.648-121.856c2.048-6.144 2.048-12.8 2.048-19.456 0-34.304-23.552-64-55.296-72.704V384c12.8-4.096 23.552-8.704 31.744-19.456l159.744 98.304 19.456-29.696-160.256-98.304c2.048-8.704 4.096-14.848 4.096-23.552 0-6.144-2.048-12.8-2.048-19.456L460.8 170.496c12.8 14.848 34.304 23.552 55.296 23.552 21.504 0 40.448-8.704 53.248-23.552l213.504 121.856c-2.048 6.144-2.048 12.8-2.048 19.456 0 8.704 2.048 14.848 4.096 23.552l-159.744 98.304 19.456 29.696 157.696-96.256c8.704 8.704 19.456 14.848 31.744 19.456V640c-31.744 8.704-53.248 38.4-53.248 72.704 0 6.144 0 12.8 2.048 16.896l-223.744 119.296z" fill="#2B85FB" p-id="3731"></path><path d="M443.392 583.68c38.4 38.4 100.352 38.4 138.752 0s38.4-100.352 0-138.752-100.352-38.4-138.752 0c-38.4 37.888-38.4 100.352 0 138.752z"></path>
    </symbol>`);
  }
  /*使用sfc-loader来从源文件加载界面组件*/
  async 初始化vue() {
    Vue = await import("/plugins/noobService/static/vue.js");
    console.log(Vue);
    loadModule = (
      await import("/plugins/noobService/static/vue3-sfc-loader.js")
    )["default"].loadModule;
  }
  添加顶栏按钮() {
    this.顶栏按钮 = this.addTopBar({
      icon: "iconBerry",
      title: "服务集市",
      position: "left",
      callback: () => {
        let rect = this.顶栏按钮.getBoundingClientRect();
        // 如果被隐藏，则使用更多按钮
        if (rect.width === 0) {
          rect = document.querySelector("#barMore").getBoundingClientRect();
        }
        if (rect.width === 0) {
          rect = document.querySelector("#barPlugins").getBoundingClientRect();
        }
        this.显示集市对话框(rect);
      },
    });
  }
  async 读取端口记录() {
    const 端口文件内容 = await 思源工作空间.readFile(this.端口文件内部路径);
    return JSON.parse(端口文件内容);
  }
  async 显示集市对话框() {
    this.集市对话框 = new clientApi.Dialog({
      title: "服务集市",
      content: '<div class="b3-dialog__content"></div>',
      width: "92vw",
      height: "90vh",
    });
    this.集市对话框.element.querySelector(
      ".b3-dialog__container"
    ).style.maxWidth = "1280px";
    const 集市信息 = await (
      await fetch(this.config.集市服务器地址 + "/bazaar/info")
    ).json();
    console.log(集市信息);
    const Bazaar = await importSFC(
      path.join(this.插件自身URL, "components", "bazaar.vue")
    );
    let that = this;
    const bazaarApp = Vue.createApp({
      components: {
        Bazaar,
      },
      template: '<Bazaar :bazaarList="bazaarList" :plugin="plugin"></Bazaar>',
      data: () => {
        return {
          bazaarList: 集市信息.servicies,
          plugin: that,
        };
      },
    });
    bazaarApp.mount(this.集市对话框.element.querySelector(".b3-dialog__body"));
  }
  async 部署集市列表() {
    if (this.config && this.config.bazaarProvider) {
      console.log("正在重新部署集市");
      const servicies = await (
        await fetch(
          "https://raw.githubusercontent.com/leolee9086/noobBazaar/main/servicies.json"
        )
      ).json();
      await 思源工作空间.writeFile(
        JSON.stringify(servicies),
        path.join("temp", "noobTemp", "bazaar", "servicies.json")
      );
      await this.遍历并更新服务列表(servicies);


    }
    setTimeout(this.部署集市列表, 1000 * 60 * 60);
  }
  遍历并更新服务列表(servicies) {
    Object.getOwnPropertyNames(servicies).forEach(async (name) => {
      const repo = servicies[name];
      const repoMeta = await (
        await fetch(
          `https://raw.githubusercontent.com/${repo}/master/service.json`
        )
      ).json();
      let needUpdate = true;
      const tempPackagePath = path.join(
        "temp",
        "noobTemp",
        "bazaar",
        "packages",
        "servicies",
        `${name}`
      );
      if (
        await 思源工作空间.exists(path.join(tempPackagePath, "service.json"))
      ) {
        let currentMeta = JSON.parse(
          await 思源工作空间.readFile(tempPackagePath + "/service.json")
        );
        if (currentMeta.version === repoMeta.version) {
          needUpdate = false;
        }
      }
      if (needUpdate) {
        console.log(`集市包${name}需要重新拉取:`);

        const releasePath = `https://api.github.com/repos/${repo}/releases/latest`;
        const releaseMeta = await (await fetch(releasePath)).json();
        const packagePath = releaseMeta.assets.find((asset) => {
          return asset.name == "package.zip";
        });
        let blob = await (
          await fetch(packagePath.browser_download_url)
        ).blob();
        let file = new File([blob], name, {
          lastModified: Date.now(),
        });

        const tempPackageZipPath = tempPackagePath + ".zip";
        if (await 思源工作空间.exists(tempPackagePath)) {
          console.log("正在删除旧集市包:", tempPackagePath);

          await 思源工作空间.removeFile(tempPackagePath);
        }
        await 思源工作空间.writeFile(file, tempPackageZipPath);
        const compression = this.requireDep("compressing");
        setTimeout(() => {
          compression.zip.uncompress(
            path.join(siyuan.config.system.workspaceDir, tempPackageZipPath),
            path.join(siyuan.config.system.workspaceDir, tempPackagePath),
            { zipFileNameEncoding: "GBK" }
          );
        }, 1000);
      }
    });
  }
  requireDep(id) {
    return window.require(path.join(this.依赖路径, id));
  }
  requireModule(id) {
    return window.require(path.join(this.插件自身路径, id));
  }
  async 初始化消息服务器() {
    let 思源核心服务端口号 = parseInt(window.location.port);
    let noob核心后端服务端口号 = this.config.服务端口;
    await this.写入端口记录("siyuanKernel", 思源核心服务端口号);
    await this.写入端口记录("noobEvent", noob核心后端服务端口号);
    this.端口记录 = JSON.parse(
      await 思源工作空间.readFile(this.端口文件内部路径)
    );
    const 事件服务启动器 = this.requireModule("eventServer/main.js");
    this.事件服务器 = await 事件服务启动器.初始化(this.端口记录.noobEvent);
    let 事件桥类 = (
      await import(path.join(this.插件自身URL, "eventBridge", "index.js"))
    )["default"];
    this.事件桥 = new 事件桥类("noobMain", "noobMain", this.端口记录.noobEvent);
    await this.事件桥.init();
    this.事件桥.on("test", (data) => {
      console.log(data);
    });
    this.事件桥.handler("siyuanConfig", () => {
      return window.siyuan.config;
    });
    this.事件桥.handler("error", (e) => {
      console.error(e);
    });
    this.事件桥.handler("port", async (callerID, data) => {
      let 端口记录名 = callerID.split("@")[0];
      let 意向端口 = data.apply;
      if (!端口记录名) {
        return "";
      }
      if (!意向端口) {
        意向端口 = parseInt(window.location.port);
      }
      let 端口号 = await 获取可用端口号(意向端口);
      await this.写入端口记录(端口记录名, 端口号);
      await 代理服务(端口记录名);
      return 端口号;
    });

    this.事件桥.on("status__msg", (data) => {
      this.显示状态消息(data.msg);
    });
    this.事件桥.on("time", (data) => {
      return new Date().getTime();
    });
    let remote = window.require("@electron/remote");
    let { app } = remote;
    let appDir = path.dirname(app.getAppPath().replace(/\\/g, "/"));
    console.log(appDir);
    this.事件服务器.expressApp.use(
      "/stage",
      this.事件服务器.express.static(path.join(appDir, "stage"))
    );
    //app.use("/ui", express.static(path.join(_selfPath, "/ui")))

    this.事件服务器.expressApp.use(
      "/appearance",
      this.事件服务器.express.static(
        path.join(workspaceDir, "conf", "appearance")
      )
    );
    let lastFetch = 0;
    if (this.config && this.config.bazaarProvider) {
      this.事件服务器.expressApp.use(
        "/bazaar/packages",
        (req, res, next) => {
          let time = new Date().getTime();
          if (time - lastFetch >= 1000) {
            next();
            lastFetch = time + 0;
          } else {
            res.end(
              "sorry,Personal server has limited load and can only accept one request per second, we apologize for the inconvenience."
            );
          }
        },
        this.事件服务器.express.static(
          path.join(workspaceDir, "temp", "noobTemp", "bazaar", "packages")
        )
      );
      this.事件服务器.expressApp.use("/bazaar/info", async (req, res, next) => {
        const servicies = JSON.parse(
          await 思源工作空间.readFile(
            path.join("temp", "noobTemp", "bazaar", "servicies.json")
          )
        );
        let names = Object.getOwnPropertyNames(servicies);
        const list = [];
        for await (let name of names) {
          try {
            let json = JSON.parse(
              await 思源工作空间.readFile(
                path.join(
                  "temp",
                  "noobTemp",
                  "bazaar",
                  "packages",
                  "servicies",
                  name,
                  "service.json"
                )
              )
            );
            let icon = await this.内部图片路径转base64(
              path.join(
                "temp",
                "noobTemp",
                "bazaar",
                "packages",
                "servicies",
                name,
                "icon.png"
              )
            );
            json.icon = icon;
            console.log(json);
            json.readme = await 思源工作空间.readFile(
              path.join(
                "temp",
                "noobTemp",
                "bazaar",
                "packages",
                "servicies",
                name,
                "README.md"
              )
            );
            list.push(json);
          } catch (e) { }
        }
        res.json({ servicies: list });
      });
    }
  }
  async 内部图片路径转base64(图片路径) {
    let data = await 思源工作空间.readFile(图片路径);
    let extname = path.extname(图片路径);
    let bytes = new Uint8Array(data);
    let binary = "";
    for (var len = bytes.byteLength, i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/${extname};base64,` + btoa(binary);
  }
  async 写入端口记录(记录名, 记录值) {
    let json = {};
    if (await 思源工作空间.exists(this.端口文件内部路径)) {
      json = JSON.parse(await 思源工作空间.readFile(this.端口文件内部路径));
    }
    json[记录名] = 记录值;
    await 思源工作空间.writeFile(
      JSON.stringify(json, undefined, 2),
      this.端口文件内部路径
    );
  }
  显示状态消息(消息) {
    let 状态显示器 = document.querySelector(".status__msg");
    状态显示器.innerHTML = Lute.EscapeHTMLStr(消息);
  }
  async 加载已安装服务() {
    this.服务列表 = [];
    await 思源工作空间.mkdir(this.服务安装文件夹内部路径);
    this.服务列表 = await 思源工作空间.readDir(this.服务安装文件夹内部路径);
    this.解析服务列表();
  }
  async 解析服务列表() {
    console.log(this.服务列表);
    //遍历服务列表,然后根据情况加载服务入口文件
    //为了简化操作,服务入口文件统一为index.html
    for await (let 服务文件项 of this.服务列表) {
      console.log(服务文件项);
      if (服务文件项.isDir) {
        let 服务属性文件路径 = path.join(
          this.服务安装文件夹内部路径,
          服务文件项.name,
          "service.json"
        );
        if (await 思源工作空间.exists(服务属性文件路径)) {
          console.log(await 思源工作空间.readFile(服务属性文件路径));
          服务文件项.meta = JSON.parse(
            await 思源工作空间.readFile(服务属性文件路径)
          );
          服务文件项.path = path.join(
            siyuan.config.system.workspaceDir,
            this.服务安装文件夹内部路径,
            服务文件项.name
          );
          服务文件项.handler = await this.加载服务入口文件(服务文件项);
          try {
            服务文件项.UIProvider = await this.加载服务主界面扩展(服务文件项);
          } catch (e) {
            console.error(e);
          }
        } else {
          console.error(`服务${服务文件项.name}未提供service.json`);
        }
      } else {
        let 扩展名 = path.extName(服务文件项.name);
        let 服务属性文件路径 = path.join(
          siyuan.config.system.workspaceDir,
          this.服务安装文件夹内部路径,
          服务文件项.name
        );
        switch (扩展名) {
          case ".json":
            console.log(await 思源工作空间.readFile(服务属性文件路径));
        }
      }
    }
  }
  async 加载服务主界面扩展(服务文件项) {
    let moduleURL = `http://127.0.0.1:${this.端口记录.noobEvent}/service/${服务文件项.name}/appExtension.js`;
    let _module = { default: "" };
    let 事件桥类 = (
      await import(path.join(this.插件自身URL, "eventBridge", "index.js"))
    )["default"];
    let 事件桥 = new 事件桥类(
      服务文件项.name + "-app",
      服务文件项.name + "-app",
      this.端口记录.noobEvent
    );
    _module = await import(moduleURL);

    _module.default(this, clientApi, 核心api, 事件桥);
    return _module;
  }
  async 加载服务入口文件(服务文件项) {
    const serviceWindow = (
      await import(
        path.join(this.插件自身URL, "serviceHandler", "serviceWindow.js")
      )
    )["serviceWindow"];
    this.事件服务器.expressApp.use(
      `/service/${服务文件项.name}/`,
      this.事件服务器.express.static(服务文件项.path.replace(/\\/g, "/"))
    );
    let options = {
      id: 服务文件项.name,
      URL:
        window.location.origin.replace(
          window.location.port,
          this.端口记录.noobEvent
        ) + `/service/${服务文件项.name}/`,
      path: 服务文件项.path,
      TimeOut: 5000,
      stayAlive: true,
      corePath: this.插件自身路径,
      noobPort: this.端口记录.noobEvent,
      kernelPort: window.location.port,
    };
    await serviceWindow.New(options);
    await 代理服务(服务文件项.name);
  }
  async 安装服务() { }
}
module.exports = noobService;

/*一些工具方法*/
async function 获取可用端口号(端口号) {
  return new Promise(async (resolve, reject) => {
    let http = window.require("http");
    let 测试服务 = http.createServer();
    let 可用端口号 = 端口号 || parseInt(window.location.port);
    let 端口记录内容 = await plugin.读取端口记录();
    if (
      Object.keys(端口记录内容).find((k) => {
        return 端口记录内容[k] == 可用端口号;
      })
    ) {
      resolve(await 获取可用端口号(可用端口号 + 1));
      return;
    }
    测试服务.on("listening", () => {
      测试服务.close(() => {
        resolve(可用端口号);
      });
    });
    测试服务.on("error", async (error) => {
      if (error.code === "EADDRINUSE") {
        resolve(await 获取可用端口号(可用端口号 + 1));
      } else {
        reject(error);
      }
    });
    测试服务.listen(端口号);
  });
}
function clear() {
  const { webContents } = window.require("@electron/remote");
  console.log(webContents.getAllWebContents());
  webContents.getAllWebContents().forEach((webcontent) => {
    webcontent.send("closeAll", { workspaceDir: workspaceDir });
  });
}

const options = {
  moduleCache: {
    vue: Vue,
  },
  async getFile(url) {
    const res = await fetch(url);
    if (!res.ok)
      throw Object.assign(new Error(res.statusText + " " + url), { res });
    return {
      getContentData: (asBinary) => (asBinary ? res.arrayBuffer() : res.text()),
    };
  },
  addStyle(textContent) {
    const style = Object.assign(document.createElement("style"), {
      textContent,
    });
    const ref = document.head.getElementsByTagName("style")[0] || null;
    document.head.insertBefore(style, ref);
  },
};
async function addVmodule(name, module) {
  options.moduleCache[name] = module;
}
async function importSFC(moduleURL) {
  options.moduleCache.vue = Vue;
  const component = Vue.defineAsyncComponent(() =>
    loadModule(moduleURL, options)
  );
  console.log(component);
  return component;
}

/*为服务提供代理转发,这样所有服务模块,统一以同一个端口聚合对外服务*/
/*各个服务模块通过次级域名区分,也就是说,没有域名的话是不能对外服务的*/
/*服务模块的宿主端口全部都是80和443,所以它们之间可以通过路由互相访问*/
const 代理表 = {};
async function 代理服务(服务名称) {
  const { createProxyMiddleware } = plugin.requireDep("http-proxy-middleware");
  const 端口记录 = await plugin.读取端口记录();
  const 端口号 = () => {
    return 端口记录[服务名称];
  };
  const 代理配置 = {
    target: `http://127.0.0.1:${端口号()}`,
    changeOrigin: true,
    pathRewrite: {},
    ws: true,
    followRedirects: true,
  };
  const 代理中间件 = createProxyMiddleware(代理配置);
  代理表[服务名称] = 代理中间件;
  plugin.事件服务器.expressApp.use((req, res, next) => {
    if (!req.hostname.startsWith(服务名称 + ".")) {
      next();
    } else 代理表[服务名称](req, res, next);
  });
}
