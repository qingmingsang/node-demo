var qs = require('querystring');
//发送HTML响应
exports.sendHtml = function(res, html) {
		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Content-Length', Buffer.byteLength(html));
		res.end(html);
	}
	//解析HTTP POST
exports.parseReceivedData = function(req, cb) {
	var body = '';
	req.setEncoding('utf8');
	req.on('data', function(chunk) {
		body += chunk
	});
	req.on('end', function() {
		var data = qs.parse(body);
		cb(data);
	});
};
//渲染简单的表单
exports.actionForm = function(id, path, label) {
	var html =
		'<form method="POST" action="' + path + '">' +
		'<input type="hidden" name="id" value="' + id + '">' +
		'<input type="submit" value="' + label + '" />' +
		'</form>';
	return html;
};
//增C
exports.add = function(db, req, res) {
	exports.parseReceivedData(req, function(work) {
		//添加工作记录SQL
		db.query(
			"INSERT INTO work (hours, date, description) " +
			//？是占位符
			" VALUES (?, ?, ?)",
			//替代占位符的值
			[work.hours, work.date, work.description],
			function(err) {
				if (err) throw err;
				exports.show(db, res);
			}
		);
	});
};
//删D
exports.delete = function(db, req, res) {
	exports.parseReceivedData(req, function(work) {
		//删除从WORK表中删除id为work.id的值
		db.query(
			"DELETE FROM work WHERE id=?", 
			[work.id],
			function(err) {
				if (err) throw err;
				exports.show(db, res);
			}
		);
	});
};
//改U
exports.archive = function(db, req, res) {
	exports.parseReceivedData(req, function(work) {
		db.query(
			"UPDATE work SET archived=1 WHERE id=?", 
			[work.id],
			function(err) {
				if (err) throw err;
				exports.show(db, res);
			}
		);
	});
};
//查R
exports.show = function(db, res, showArchived) {
	var query =
		"SELECT * FROM work " +
		"WHERE archived=? " +
		"ORDER BY date DESC";
	var archiveValue = (showArchived) ? 1 : 0;
	db.query(
		query, 
		//归档状态
		[archiveValue],
		function(err, rows) {
			if (err) throw err;
			html = (showArchived) ? '' : '<a href="/archived">Archived Work</a><br/>';
			html += exports.workHitlistHtml(rows);
			html += exports.workFormHtml();
			exports.sendHtml(res, html);
		}
	);
};

exports.showArchived = function(db, res) {
	exports.show(db, res, true);
};
//渲染数据成表格
exports.workHitlistHtml = function(rows) {
	var html = '<table>';
	for (var i in rows) {
		html += '<tr>';
		html += '<td>' + rows[i].date + '</td>';
		html += '<td>' + rows[i].hours + '</td>';
		html += '<td>' + rows[i].description + '</td>';
		if (!rows[i].archived) {
			html += '<td>' + exports.workArchiveForm(rows[i].id) + '</td>';
		}
		html += '<td>' + exports.workDeleteForm(rows[i].id) + '</td>';
		html += '</tr>';
	}
	html += '</table>';
	return html;
};

exports.workFormHtml = function() {
	var html =
		'<form method="POST" action="/">' +
		'<p>Date (YYYY-MM-DD):<br/><input name="date" type="text"><p/>' +
		'<p>Hours worked:<br/><input name="hours" type="text"><p/>' +
		'<p>Description:<br/>' +
		'<textarea name="description"></textarea></p>' +
		'<input type="submit" value="Add" />' +
		'</form>';
	return html;
};
//归档按钮表单
exports.workArchiveForm = function(id) {
	return exports.actionForm(id, '/archive', 'Archive');
}
//删除按钮表单
exports.workDeleteForm = function(id) {
	return exports.actionForm(id, '/delete', 'Delete');
}