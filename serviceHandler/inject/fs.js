const mimes =require("./mimeDb.js");
const path =require('path')
module.exports.readFile = async (file) => {
  let res = await fetch(kernelHost+"/api/file/getFile", {
    method: "POST",
    body: JSON.stringify({
      path: file,
    }),
  });
  if (res.status !== 200) {
    console.error(`${file}读取错误`);
  }
  let mime = await res.headers.get("Content-Type");
  if (module.exports.isText(mime)) {
    return await res.text();
  } else {
    let buf = await res.arrayBuffer();
    return buf;
  }
};
let mimetype = {};
Object.getOwnPropertyNames(mimes).forEach((type) => {
  let extensions = mimes[type]["extensions"];
  if (extensions) {
    extensions.forEach((extension) => {
      mimetype[extension] = type;
    });
  }
});
module.exports.writeFile = async (content, path, flag) => {
  if (!flag) {
    let extension = path.split(".").pop();
    let blob = new Blob([content], {
      type: mimetype[extension] || "text/plain",
    });
    let file = new File([blob], path.split("/").pop(), {
      lastModified: Date.now(),
    });
    return await module.exports.writeFileDirectly(file, path);
  } else {
    return await module.exports.writeFileDirectly(content, path);
  }
};
module.exports.writeFileDirectly = async (file, path) => {
  let data = new FormData();
  data.append("path", path);
  data.append("file", file);
  data.append("isDir", false);
  data.append("modTime", Date.now());
  let res = await fetch(kernelHost+"/api/file/putFile", {
    method: "POST",
    body: data,
  });
  return await res.json();
};
module.exports.readDir = async (path) => {
  let res = await fetch(kernelHost+"/api/file/readDir", {
    method: "POST",
    body: JSON.stringify({
      path: path,
    }),
  });
  if (res.status !== 200) {
    console.error(`${path}读取错误`);
  }
  let { data } = await res.json();
  return data;
};
module.exports.exists = async (name) => {
  try {
    let files = await module.exports.readDir(path.dirname(name));
    let result = files.find((file) => {
      return path.join(path.dirname(name), file.name) == name;
    });

    return result || undefined;
  } catch (e) {
    console.warn(`工作空间内容读取错误:${e}`);
    return undefined;
  }
};
module.exports.mkdir = async (path) => {
  let data = new FormData();
  data.append("path", path);
  data.append("file", "");
  data.append("isDir", true);
  data.append("modTime", Date.now());
  let res = await fetch(kernelHost+"/api/file/putFile", {
    method: "POST",
    body: data,
  });
  return await res.json();
};

module.exports.isText=(mime)=> {
  if (mime && mime.startsWith("text")) {
    return true;
  }
  if (mime == "application/json") {
    return true;
  }
  if (mime == "application/x-javascript") {
    return true;
  } else {return false};
}
module.exports.initFile = async (path, data) => {
  if (!(await module.exports.exists(path))) {
    if (data === undefined) {
      await module.exports.writeFile("", path);
    } else {
      await module.exports.writeFile(data, path);
    }
  }
};
