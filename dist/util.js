'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.aesRsaEncrypt=exports.MD5=exports.encodeId=exports.toMMSS=exports.requestPostRaw=exports.requestPost=exports.requestGetRaw=exports.requestGet=exports.deepCopy=undefined;var _parseInt=require('babel-runtime/core-js/number/parse-int');var _parseInt2=_interopRequireDefault(_parseInt);var _stringify=require('babel-runtime/core-js/json/stringify');var _stringify2=_interopRequireDefault(_stringify);var _syncRequest=require('sync-request');var _syncRequest2=_interopRequireDefault(_syncRequest);var _crypto=require('crypto');var _crypto2=_interopRequireDefault(_crypto);var _bigInteger=require('big-integer');var _bigInteger2=_interopRequireDefault(_bigInteger);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var deepCopy=function deepCopy(obj){return JSON.parse((0,_stringify2.default)(obj))};var requestGet=function requestGet(url){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return JSON.parse((0,_syncRequest2.default)('GET',url,options).getBody('utf8'))};var requestGetRaw=function requestGetRaw(url){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return(0,_syncRequest2.default)('GET',url,options).getBody('utf8')};var requestPost=function requestPost(url,options){return JSON.parse((0,_syncRequest2.default)('POST',url,options).getBody('utf8'))};var requestPostRaw=function requestPostRaw(url,options){return(0,_syncRequest2.default)('POST',url,options)};var toMMSS=function toMMSS(sec){var m=~~(sec/60);m=m<10?'0'+m:m;var s=(0,_parseInt2.default)(sec%60);s=s<10?'0'+s:s;return m+':'+s};var str2ta=function str2ta(str){var buf=new ArrayBuffer(str.length);var bufView=new Uint8Array(buf);str.split('').map(function(s,i){bufView[i]=s.charCodeAt()});return bufView};var encodeId=function encodeId(dfsId){var a1=str2ta('3go8&$8*3*3h0k(2)2'),a2=str2ta(dfsId),a1l=a1.length;a2.map(function(c,i){a2[i]=c^a1[i%a1l]});return _crypto2.default.createHash('md5').update(a2).digest('base64').replace(/\//g,'_').replace(/\+/g,'-')};var addPadding=function addPadding(encText,modulus){var ml=modulus.length;for(var i=0;ml>0&&modulus[i]=='0';i++){ml--}var num=ml-encText.length,prefix='';for(var _i=0;_i<num;_i++){prefix+='0'}return prefix+encText};var aesEncrypt=function aesEncrypt(text,secKey){var cipher=_crypto2.default.createCipheriv('AES-128-CBC',secKey,'0102030405060708');return cipher.update(text,'utf-8','base64')+cipher.final('base64')};var rsaEncrypt=function rsaEncrypt(text,exponent,modulus){var rText='',radix=16;for(var i=text.length-1;i>=0;i--){rText+=text[i]}var biText=(0,_bigInteger2.default)(new Buffer(rText).toString('hex'),radix),biEx=(0,_bigInteger2.default)(exponent,radix),biMod=(0,_bigInteger2.default)(modulus,radix),biRet=biText.modPow(biEx,biMod);return addPadding(biRet.toString(radix),modulus)};var createSecretKey=function createSecretKey(size){var keys='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';var key='';for(var i=0;i<size;i++){var pos=Math.random()*keys.length;pos=Math.floor(pos);key=key+keys.charAt(pos)}return key};var modulus='00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7';var nonce='0CoJUm6Qyw8W8jud';var pubKey='010001';var MD5=function MD5(text){return _crypto2.default.createHash('md5').update(text).digest('hex')};var aesRsaEncrypt=function aesRsaEncrypt(text){var secKey=createSecretKey(16);return{params:aesEncrypt(aesEncrypt(text,nonce),secKey),encSecKey:rsaEncrypt(secKey,pubKey,modulus)}};exports.deepCopy=deepCopy;exports.requestGet=requestGet;exports.requestGetRaw=requestGetRaw;exports.requestPost=requestPost;exports.requestPostRaw=requestPostRaw;exports.toMMSS=toMMSS;exports.encodeId=encodeId;exports.MD5=MD5;exports.aesRsaEncrypt=aesRsaEncrypt;