//提供HTTP服务器，客户端功能
var http = require('http');
//文件系统相关功能
var fs  = require('fs');
//文件系统路径相关功能
var path = require('path');
//根据文件扩展名得出MIME类型
var mime = require('mime');
//缓存文件内容
var cache = {};
//文件不存在时发送404错误
function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}
//发送文件内容
function sendFile(response, filePath, fileContents) {
  response.writeHead(
    200, 
    {"content-type": mime.lookup(path.basename(filePath))}
  );
  response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
	//检查文件是否缓存在内存中
  if (cache[absPath]) {
  	//从内存中返回文件
    sendFile(response, absPath, cache[absPath]);
  } else {
  	//检查文件是否存在
    fs.exists(absPath, function(exists) {
      if (exists) {
      	//从硬盘中读取文件
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            //从硬盘中读取文件并返回
            sendFile(response, absPath, data);
          }
        });
      } else {
      	//404
        send404(response);
      }
    });
  }
}
//创建http服务器
var server = http.createServer(function(request, response) {
  var filePath = false;

  if (request.url == '/') {
  	//确定返回的默认HTML文件
    filePath = 'public/index.html';
  } else {
  	//将url路径转为文件的相对路径
    filePath = 'public' + request.url;
  }
	
  var absPath = './' + filePath;
  //返回静态文件
  serveStatic(response, cache, absPath);
});
//启动HTTP服务器
server.listen(3000, function() {
  console.log("Server listening on port 3000.");
});

//启动Socket.IO服务器
var chatServer = require('./lib/chat_server');
chatServer.listen(server);
