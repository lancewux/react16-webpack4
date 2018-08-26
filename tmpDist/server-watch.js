
setTimeout(() => {
    console.log('process.app',  process.app);
}, 2000);

const port = process.env.PORT || 3008;
const host = process.env.IP || 'localhost';

const app = require('./server');
console.log('process.env.app',  process.env.app);
// app.listen(port, host, () => {
//   console.info(chalk.red('==> ✅  Server is listening on %s:%d'), host, port);
// });

var fs = require("fs");      //文件系统模块

function cleanCache(modulePath) {
    var module = require.cache[modulePath];
    if (!module) {
        return;
    }

    if (module.parent) {
        module.parent.children.splice(module.parent.children.indexOf(module), 1);
    }
    require.cache[modulePath] = null;
}

var watchFile = function (filepath) {
    var fullpath = require.resolve(filepath);
    fs.watch(fullpath,function(event,filename){
        if (event === "change") {
            cleanCache(fullpath);
            try {
                var routes = require(filepath);
                console.log("reload module",filename);
            } catch (ex) {
                console.error('module update failed');
            }
        }
    });
};

var g_WatchFiles = ["./server"];
for (var i=0;i<g_WatchFiles.length;i++) {
    watchFile(g_WatchFiles[i]);
}