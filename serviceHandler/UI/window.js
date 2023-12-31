import {eventBridge} from "../../eventBridge/index.js"
const { BrowserWindow, screen } = require("@electron/remote");

const path = require("path");
//继承事件触发器
export class serverHost {
  constructor(options) {
    //调用super之后,才能够使用this
    this.options = options;
    //加载entry,也就是index.html
    this.reload();
    //自杀计数
   // this.tictok()
  }
  tictok(){
    this.timer = setTimeout(
        ()=>{
            try{
            this.host.webContents.destroy()
            if(this.options.stayAlive){
                this.reload()
            }
            this.tictok()
            }catch(e){}
        },this.options.TimeOut||5000
    )
  }
 
  reload() {
    let { options } = this;
    if(this.host&&!this.host.isDestroyed()){
      this.host.destroy()
    }
    let host = new BrowserWindow({
      width: screen.getPrimaryDisplay().size.width / 2,
      height: screen.getPrimaryDisplay().workAreaSize.height / 2,
      frame: true,
      icon: options.icon,
      show: false,
      webPreferences: {
        preload: path.join(
          siyuan.config.system.workspaceDir,
          "data",
          "plugins",
          'noobService',
          "serviceHandler",
          "inject",
          "preload.js"
        ),
        nativeWindowOpen: true,
        nodeIntegration: true,
        webviewTag: true,
        webSecurity: false,
        contextIsolation: false,
      },
    });
    //使host能够使用remote模块
    require("@electron/remote")
      .require("@electron/remote/main")
      .enable(host.webContents);
    //host挂载到实例中
    this.host = host;
    this.host.loadURL(options.URL);
    this.host.webContents.send('buildBridge',{
        id:options.id,
        TimeOut:options.TimeOut||5000,
        port:options.noobPort,
        kernelPort:options.kernelPort,
        path:options.path,
        corePath:options.corePath,
        workspaceDir:window.siyuan.config.system.workspaceDir
    })
    this.mainBridge =new eventBridge(options.id+'-main',options.id+'-main')
    this.mainBridge.on('tictoc',()=>{
        clearTimeout(this.timer)
    })
  }
  show() {
    console.log(this.host);
    try {
      if (this.host && !this.host.isDestroyed()) {
        this.host.show();
        this.showing=true
      } else {
        this.reload();
        this.host.show();
        this.showing=true

      }
    } catch (e) {
      console.error(e);
    }
  }
  hide(){
    if (this.host && !this.host.isDestroyed()) {
      this.host.hide();
      this.showing=false
    }
  }
  
}
export default serverHost;
