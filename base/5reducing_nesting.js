var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
	//转到getTitles
  getTitles(res);
}).listen(8000, "127.0.0.1");

function getTitles(res) {
  fs.readFile('./titles.json', function (err, data) {
    if (err) {
      hadError(err, res);
    }
    else {
    	//转到getTemplate
      getTemplate(JSON.parse(data.toString()), res);
    }
  });
}

function getTemplate(titles, res) {
  fs.readFile('./template.html', function (err, data) {
    if (err) {
      hadError(err, res);
    }
    else {
    	//转到formatHtml
      formatHtml(titles, data.toString(), res);
    }
  });
}
//res传到了结束
function formatHtml(titles, tmpl, res) {
  var html = tmpl.replace('%', titles.join('</li><li>'));
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}
//统一的错误处理
function hadError(err, res) {
  console.error(err);
  res.end('Server Error');
}
