'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _typeof2=require('babel-runtime/helpers/typeof');var _typeof3=_interopRequireDefault(_typeof2);var _assign=require('babel-runtime/core-js/object/assign');var _assign2=_interopRequireDefault(_assign);var _stringify=require('babel-runtime/core-js/json/stringify');var _stringify2=_interopRequireDefault(_stringify);var _querystring=require('querystring');var _querystring2=_interopRequireDefault(_querystring);var _config=require('./config');var _util=require('./util');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var top_list=[['\u4E91\u97F3\u4E50\u98D9\u5347\u699C',19723756],['\u4E91\u97F3\u4E50\u65B0\u6B4C\u699C',3779629],['\u7F51\u6613\u539F\u521B\u6B4C\u66F2\u699C',2884035],['\u4E91\u97F3\u4E50\u70ED\u6B4C\u699C',3778678],['\u4E91\u97F3\u4E50\u7535\u97F3\u699C',10520166],['UK\u6392\u884C\u699C\u5468\u699C',180106],['\u7F8E\u56FDBillboard\u5468\u699C',60198],['KTV\u55E8\u699C',21845217],['iTunes\u699C',11641012],['Hit FM Top\u699C',120001],['\u65E5\u672COricon\u5468\u699C',60131],['\u97E9\u56FDMelon\u6392\u884C\u699C\u5468\u699C',3733003],['\u97E9\u56FDMnet\u6392\u884C\u699C\u5468\u699C',60255],['\u97E9\u56FDMelon\u539F\u58F0\u5468\u699C',46772709],['\u4E2D\u56FDTOP\u6392\u884C\u699C(\u6E2F\u53F0\u699C)',112504],['\u4E2D\u56FDTOP\u6392\u884C\u699C(\u5185\u5730\u699C)',64016],['\u9999\u6E2F\u7535\u53F0\u4E2D\u6587\u6B4C\u66F2\u9F99\u864E\u699C',10169002],['\u534E\u8BED\u91D1\u66F2\u699C',4395559],['\u4E2D\u56FD\u563B\u54C8\u699C',1899724],['\u6CD5\u56FD NRJ EuroHot 30\u5468\u699C',27135204],['\u53F0\u6E7EHito\u6392\u884C\u699C',112463],['Beatport\u5168\u7403\u7535\u5B50\u821E\u66F2\u699C',3812895]];var getTopListNames=function getTopListNames(){return top_list.map(function(l,i){return' '+i+'. '+l[0]})};var getTopSongList=function getTopSongList(){var index=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var option=(0,_util.deepCopy)(_config.globalOption);var url=_config.origin+'/discover/toplist?id='+top_list[index][1];var body=(0,_util.requestGetRaw)(url,option);var re=new RegExp(/>\[.*\]</);return JSON.parse(body.match(re)[0].slice(1,-1))};var getSongUrl=function getSongUrl(songId){var csrf=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';var bitRate=arguments.length>2&&arguments[2]!==undefined?arguments[2]:320000;var option=(0,_util.deepCopy)(_config.globalOption);var url=_config.origin+'/weapi/song/enhance/player/url?csrf_token='+csrf;var data=(0,_stringify2.default)({ids:[songId],br:bitRate,csrf_token:csrf});var body=_querystring2.default.stringify((0,_util.aesRsaEncrypt)(data));(0,_assign2.default)(option,{body:body});return(0,_util.requestPost)(url,option).data[0].url};var song=function song(id){var option=(0,_util.deepCopy)(_config.globalOption);var url=_config.origin+'/api/song/detail?ids=%5B'+id+'%5d';return(0,_util.requestGet)(url,option).songs[0]};var getMp3Url=function getMp3Url(song){var music={};if(song.hMusic){music=song.hMusic}else if(song.mMusic){music=song.mMusic}else{return song.mp3Url}var song_id=music.dfsId.toString();var enc_id=(0,_util.encodeId)(song_id);return'http://m2.music.126.net/'+enc_id+'/'+song_id+'.mp3'};var getMp3UrlById=function getMp3UrlById(song_id){return getMp3Url(song(song_id))};var search=function search(){var name=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var type=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;var onlySong=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;var limit=arguments.length>3&&arguments[3]!==undefined?arguments[3]:3;var offset=arguments.length>4&&arguments[4]!==undefined?arguments[4]:0;var option=(0,_util.deepCopy)(_config.globalOption);var url=_config.origin+'/api/search/suggest/web';var body=_querystring2.default.stringify({s:name,type:type,limit:limit,offset:offset});(0,_assign2.default)(option,{body:body});var info=(0,_util.requestPost)(url,option);var data=void 0;if(onlySong){data=info.result.songs}else{data={songs:info.result.songs,mvs:info.result.mvs}}return data};var lrc=function lrc(id){var lv=arguments.length>1&&arguments[1]!==undefined?arguments[1]:-1;var option=(0,_util.deepCopy)(_config.globalOption);var url=_config.origin+'/api/song/lyric?lv='+lv+'&id='+id;var l=(0,_util.requestGet)(url,option);return l.hasOwnProperty('lrc')?l.lrc.lyric:'no lyric'};var playList=function playList(id){var option=(0,_util.deepCopy)(_config.globalOption);var url=_config.origin+'/api/playlist/detail?id='+id;return(0,_util.requestGet)(url,option).result};var artistAlbums=function artistAlbums(id){var limit=arguments.length>1&&arguments[1]!==undefined?arguments[1]:3;var offset=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var option=(0,_util.deepCopy)(_config.globalOption);var url=_config.origin+'/api/artist/albums/'+id+'?offset='+offset+'&limit='+limit;return(0,_util.requestGet)(url,option)};var albums=function albums(id){var option=(0,_util.deepCopy)(_config.globalOption);var url=_config.origin+'/api/album/'+id;return(0,_util.requestGet)(url,option).album};var login=function login(username,password){if(/^1[34578]\d{9}$/.test(username)){return phoneLogin(username,password)}var option=(0,_util.deepCopy)(_config.globalOption);var url=_config.origin+'/weapi/login';var data=(0,_stringify2.default)({username:username,password:(0,_util.MD5)(password),rememberLogin:true});var body=_querystring2.default.stringify((0,_util.aesRsaEncrypt)(data));(0,_assign2.default)(option,{body:body});var r=(0,_util.requestPostRaw)(url,option);var rBody=JSON.parse(r.getBody('utf8'));if(rBody.code!=200){return rBody.msg}else{var _ret=function(){var cookies=r.headers['set-cookie'];var c={};cookies.map(function(s){return(0,_assign2.default)(c,_querystring2.default.parse(s,'; '))});return{v:c}}();if((typeof _ret==='undefined'?'undefined':(0,_typeof3.default)(_ret))==='object')return _ret.v}};var phoneLogin=function phoneLogin(phone,password){var option=(0,_util.deepCopy)(_config.globalOption);var url=_config.origin+'/weapi/login/cellphone';var data=(0,_stringify2.default)({phone:phone,password:(0,_util.MD5)(password),rememberLogin:true});var body=_querystring2.default.stringify((0,_util.aesRsaEncrypt)(data));(0,_assign2.default)(option,{body:body});var r=(0,_util.requestPostRaw)(url,option);var rBody=JSON.parse(r.getBody('utf8'));if(rBody.code!=200){return rBody.msg}else{var _ret2=function(){var cookies=r.headers['set-cookie'];var c={};cookies.map(function(s){return(0,_assign2.default)(c,_querystring2.default.parse(s,'; '))});return{v:c}}();if((typeof _ret2==='undefined'?'undefined':(0,_typeof3.default)(_ret2))==='object')return _ret2.v}};var dailyRecommend=function dailyRecommend(csrf,u){var offset=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var limit=arguments.length>3&&arguments[3]!==undefined?arguments[3]:20;var option=(0,_util.deepCopy)(_config.globalOption);option.headers.Cookie=_querystring2.default.stringify({MUSIC_U:u});var url=_config.origin+'/weapi/v1/discovery/recommend/songs?csrf_token='+csrf;var data=(0,_stringify2.default)({csrf_token:csrf,total:true,offset:offset,limit:limit});var body=_querystring2.default.stringify((0,_util.aesRsaEncrypt)(data));(0,_assign2.default)(option,{body:body});return(0,_util.requestPost)(url,option).recommend};exports.default={getTopListNames:getTopListNames,getTopSongList:getTopSongList,getSongUrl:getSongUrl,song:song,getMp3Url:getMp3Url,getMp3UrlById:getMp3UrlById,search:search,lrc:lrc,playList:playList,artistAlbums:artistAlbums,albums:albums,login:login,dailyRecommend:dailyRecommend};