const path = require("path");
const fs =require('fs');
const watcher = require("node-watch");
const os=require('os')
const filePath = "./";
watcher(
  filePath,
  { recursive: true, filter: (f) => !/node_modules/.test(f) },
  function (evt, name) {
    // console.log(`${name}文件${evt}`);
    getContentData();
  }
);


getContentData();
const port = 3000;
const local_ip = getIPAddress();
var express = require("express");
var app = express();
app.use(express.static(path.join(__dirname, "/")));
app.listen(port, (res) => {
  console.log("web is running");
  console.log(`http://${local_ip}:${port}`);
  console.log(`http://127.0.0.1:${port}`);
});

//重定向根路由
app.get("/", (req, res, next) => {
  res.redirect("/examples");
  next();
});

function getIPAddress() {
  var interfaces = require("os").networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
}

function getContentData(){
    let list=travel(path.join(__dirname,"examples"));
    fs.writeFileSync(path.join(__dirname,'examples/datas/content.json'),JSON.stringify(list));
}

function travel(dir,list){
    list=list||[];
    fs.readdirSync(dir).forEach((file)=>{
        let pathname=path.join(dir,file)
        if(fs.statSync(pathname).isDirectory()){
            pathname=path.join(pathname,"index.html");
            if(fs.existsSync(pathname)){
                let item={
                    url:file,
                    title:null
                };
                let content=fs.readFileSync(pathname,{encoding:'utf-8'});
                if(content){
                    let reg = new RegExp('\<title[^\>]*\>\s*(?<Title>.*?)\s*\</title\>', 'ig');
                    let temp=reg.exec(content);
                    if(temp){
                        item.title=temp[1];
                    }
                }
                list.push(item);
            };
        }
    })
    return list;
}