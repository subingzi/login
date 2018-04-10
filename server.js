var querystring = require('querystring');
var fs = require('fs');
var path = require('path');
var url = require('url');
//导入
var http = require('http');
//创建服务器
var server = http.createServer();
//监听请求
server.on('request', function (req, res) {

    //设置路由
    if (req.url === '/' && req.method === 'GET') {
        //读取login.html
        fs.readFile(path.join(__dirname, 'login.html'), function (err, data) {
            if (err) {
                throw err
            }
            //返回
            res.end(data);
        })
    } else if (req.url.indexOf('/lib') === 0 && req.method === 'GET') {
        fs.readFile(path.join(__dirname, url.parse(req.url,true).pathname), function (err, data) {
            if (err) {
                throw err
            }
            //返回
            res.end(data);
        })
    } else if (req.url === '/css/index.css' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, req.url), function (err, data) {
            if (err) {
                throw err
            }
            //返回
            res.end(data);
        })
    } else if (req.url === '/js/jquery-3.1.1.min.js' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, req.url), function (err, data) {
            if (err) {
                throw err
            }
            //返回
            res.end(data);
        })
    } else if (req.url === '/js/login.js' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, req.url), function (err, data) {
            if (err) {
                throw err
            }
            //返回
            res.end(data);
        })
    } else if (req.url.indexOf('/img') === 0 && req.method === 'GET') {
        console.log(path.join(__dirname, decodeURI(req.url)));
        
        fs.readFile(path.join(__dirname, decodeURI(req.url)), function (err, data) {
            if (err) {
                throw err
            }
            //返回
            res.end(data);
        })
    }

    //获取参数
    var postdata;
    req.on('data', function (chuck) {
        postdata += chuck;
    })
    req.on('end', function () {
        // console.log(postdata);
        var objdata = querystring.parse(postdata);
        //读取文件
        fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', function (err, data) {
            if (err) {
                throw err
            }
            var objdata = JSON.parse(data);
            //循环
            objdata.heros.forEach(function (item) {
                if (item.name === objdata.name && item.pword === objdata.pword) {
                    res.end('success');
                }
            })
        })
    })

})
//开启服务器
server.listen(3000, '', function (err) {
    if (err) {
        throw err;
    }
    console.log('服务器开启成功');
})