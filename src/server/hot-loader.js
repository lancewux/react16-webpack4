const fs = require("fs");
const path = require("path");
const vm = require("vm");


const handlerMap = {};
const cacheMap = {};

/**
* 加载文件内的代码并监视更新热加载
*	[@return](/user/return) {Promise.<void>}
*/
const loadHandlers = async function (path) {
	/// 查看指定文件夹下的所有文件
 	const files = await new Promise((resolve, reject) => {
    	fs.readdir(path.join(__dirname, path), function (err, files) {
        	if (err) {
            	reject(err);
        	} else {
            	resolve(files);
        	}
   	 	});
 	});
	/// 遍历加载文件
	for (let f in files) {
   	 	if (/.*?\.js$/.test(files[f])) {
        	handlerMap[files[f]] = await loadHandler(path.join(__dirname, 'hots', files[f]));
    	}
	}
	/// 监视文件变动
	watchHandlers();
	};

/**
* 监视文件变动
*/
const watchHandlers = function () {
	console.log('watching ', path.join(__dirname, 'hots'));
	fs.watch(path.join(__dirname, 'hots'), {recursive: true}, function (eventType, filename) {
   	 	if (/.*?\.js$/.test(filename)) {
			/// 这里先删除旧的缓存代码 防止内存泄漏
			if( cacheMap[require.resolve(path.join(__dirname, 'hots', filename))] )
				delete cacheMap[require.resolve(path.join(__dirname, 'hots', filename))];
			/// 这里缓存现在运行的代码,热加载失败后恢复用,还有就是防止现有运行的代码异步没有返回就删除会因为逻辑可能没有执行完毕引起逻辑bug
        	cacheMap[require.resolve(path.join(__dirname, 'hots', filename))] = require.cache[require.resolve(path.join(__dirname, 'hots', filename))];
			///重置require.cache缓存
        	require.cache[require.resolve(path.join(__dirname, 'hots', filename))] = null;
			
        	loadHandler(path.join(__dirname, 'hots', filename)).then(function (data) {
            	if (data) {
                	handlerMap[filename] = data;
            	} else {
                	delete handlerMap[filename];
            	}
            	console.log("热更成功", filename, "当前代码", handlerMap);
        	}).catch(function (err) {
            	console.log("热更失败: 代码包含以下错误:", err, "当前代码:", handlerMap);
            	require.cache[require.resolve(path.join(__dirname, 'hots', filename))] = cacheMap[require.resolve(path.join(__dirname, 'hots', filename))];
            	cacheMap[require.resolve(path.join(__dirname, 'hots', filename))] = null;
        	});
    	}
	});
};

/**
* 加载文件
* [@param](/user/param) filename
* [@return](/user/return) {Promise.<*>}
*/
const loadHandler = async function (filename) {
	const exists = await new Promise(resolve => {
    	/// 查看代码文件是否存在
    	fs.access(filename, fs.constants.F_OK | fs.constants.R_OK, err => {
        	if (err) {
            	resolve(false);
        	} else {
            	resolve(true);
        	}
    	});
	});
	if (exists) {
    	return await new Promise((resolve, reject) => {
        	fs.readFile(filename, function (err, data) {
            	if (err) {
                	resolve(null);
            	} else {
                	try {
                    	/// 使用vm script编译热加载的代码
                    	new vm.Script(data);
                    	//const script = new vm.Script(data);
                    	// const context = new vm.createContext({
                    	//     require: require,
                    	//     module: {}
                    	// });
                    	// script.runInContext(context);
                	} catch (e) {
                    	/// 语法错误,编译失败
                    	reject(e);
                    	return;
                	}
                	/// 编译成功的代码
                	resolve(require(filename));
            	}
        	});
    	});
	} else {
    	/// 文件被删除
    	return null;
	}
};

loadHandlers().then(function () {
	console.log("run...");
	}).catch(function (e) {
	console.error(e);
});