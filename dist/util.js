'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.toMMSS=exports.requestPost=exports.requestGetRaw=exports.requestGet=exports.deepCopy=undefined;var _syncRequest=require('sync-request');var _syncRequest2=_interopRequireDefault(_syncRequest);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var deepCopy=function deepCopy(obj){return JSON.parse(JSON.stringify(obj))};var requestGet=function requestGet(url){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return JSON.parse((0,_syncRequest2.default)('GET',url,options).getBody('utf8'))};var requestGetRaw=function requestGetRaw(url){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return(0,_syncRequest2.default)('GET',url,options).getBody('utf8')};var requestPost=function requestPost(url,options){return JSON.parse((0,_syncRequest2.default)('POST',url,options).getBody('utf8'))};var toMMSS=function toMMSS(sec){var m=~~(sec/60);m=m<10?'0'+m:m;var s=Number.parseInt(sec%60);s=s<10?'0'+s:s;return m+':'+s};exports.deepCopy=deepCopy;exports.requestGet=requestGet;exports.requestGetRaw=requestGetRaw;exports.requestPost=requestPost;exports.toMMSS=toMMSS;