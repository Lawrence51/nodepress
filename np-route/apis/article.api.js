/*
*
* 文章API
*
*/

// 引用文章控制器处理
var articleCtrl = require('../../np-controller/article.controller');
var articleApi;
articleApi = {};
articleApi.list = {};
articleApi.item = {};

// 类型识别
articleApi.method = (req, res, type) => {
  let method = req.method;
  let support = !!articleApi[type] && !!articleApi[type][method];
  if (support) articleApi[type][method](req, res);
  if (!support) res.jsonp({ code: 0, message: '请求不支持！' });
};

// 获取文章列表
articleApi.list.GET = function(req, res){
  articleCtrl.getList({
    query: req.query,
    success: data => {
      res.jsonp({ 
        code: 1, 
        message: '文章列表获取成功',
        result: data
      });
    },
    error: err => { 
      res.jsonp({ code: 0, message: err.message || '文章列表获取失败' }) 
    }
  });
};

// 发布文章
articleApi.list.POST = function(req, res){
  articleCtrl.postItem({
    body: req.body,
    success: data => {
      res.jsonp({ 
        code: 1, 
        message: data.message || '文章发布成功',
        result: data
      });
    },
    error: err => { 
      res.jsonp({ code: 0, message: err.message || '文章发布失败', debug: err.debug || null }) 
    }
  });
};

// 批量更新文章
articleApi.list.PUT = function(req, res){
  res.jsonp({ code: 1, message: '文章批量更新成功' });
};

// 批量删除文章
articleApi.list.DELETE = function(req, res){
  res.jsonp({ code: 1, message: '文章批量删除成功' });
};

// 获取单篇文章
articleApi.item.GET = function(req, res){
  res.jsonp({ code: 1, message: '单篇文章获取成功' });
};

// 修改单篇文章
articleApi.item.PUT = function(req, res){
  res.jsonp({ code: 1, message: '单篇文章修改成功' });
};

// 删除单篇文章
articleApi.item.DELETE = function(req, res){
  res.jsonp({ code: 1, message: '单篇文章删除成功' });
};

// 模块暴露
exports.list = (req, res) => { articleApi.method(req, res, 'list') };
exports.item = (req, res) => { articleApi.method(req, res, 'item') };