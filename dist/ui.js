'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _blessed=require('blessed');var _blessed2=_interopRequireDefault(_blessed);var _blessedContrib=require('blessed-contrib');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var PlayBox=function(_gauge){(0,_inherits3.default)(PlayBox,_gauge);function PlayBox(options){(0,_classCallCheck3.default)(this,PlayBox);return(0,_possibleConstructorReturn3.default)(this,(PlayBox.__proto__||(0,_getPrototypeOf2.default)(PlayBox)).call(this,options))}(0,_createClass3.default)(PlayBox,[{key:'doProcessing',value:function doProcessing(percent,current_time,total_time){if(!this.ctx){throw'error: canvas context does not exist. setData() for gauges must be called after the gauge has been added to the screen via screen.append()'}var c=this.ctx;c.strokeStyle=this.options.stroke;c.fillStyle=this.options.fill;c.clearRect(0,0,this.canvasSize.width,this.canvasSize.height);if(percent<1.001){percent=percent*100}var width=percent/100*(this.canvasSize.width-3);c.fillRect(1,1,width,0);var textX=this.canvasSize.width-12;c.strokeStyle='normal';if(this.options.showLabel)c.fillText(current_time+'/'+total_time,textX,0)}}]);return PlayBox}(_blessedContrib.gauge);var Ui=function(){function Ui(){var _this2=this;(0,_classCallCheck3.default)(this,Ui);this.screen=_blessed2.default.screen({debug:true,warnings:false,dockBorders:true,smartCSR:true,fullUnicode:true,title:'NECM'});this.initListWidget();this.initSearchWidget();this.initPlayBox();this.initLoginForm();this.renderFocus();this.screen.key(['tab'],function(ch,key){_this2.screen.focusNext()});this.screen.key(['S-tab'],function(ch,key){_this2.screen.focusPrevious()});this.screen.key(['escape','q','C-c'],function(ch,key){process.exit()});this.list.focus();this.screen.render()}(0,_createClass3.default)(Ui,[{key:'_bind',value:function _bind(){var _this3=this;for(var _len=arguments.length,methods=Array(_len),_key=0;_key<_len;_key++){methods[_key]=arguments[_key]}methods.forEach(function(method){return _this3[method]=_this3[method].bind(_this3)})}},{key:'renderFocus',value:function renderFocus(){var _this4=this;this.screen.on('element focus',function(cur,old){if(old.border)old.style.border.fg='default';if(cur.border)cur.style.border.fg='green';_this4.screen.render()})}},{key:'initListWidget',value:function initListWidget(){this.list=_blessed2.default.list({mouse:true,keys:true,vi:true,align:'left',label:' \u7F51\u6613\u4E91\u97F3\u4E50 ',border:'line',width:'50%',height:'50%',top:'center',left:'center',padding:1,items:[' 0. loading',' 1. loading',' 2. loading',' 3. loading',' 4. loading',' 5. loading',' 6. loading',' 7. loading',' 8. loading',' 9. loading'],style:{fg:'blue',bg:'default',border:{fg:'default',bg:'default'},selected:{fg:'#f0f0f0',bg:'green'}}});this.screen.append(this.list)}},{key:'initSearchWidget',value:function initSearchWidget(){var _this5=this;this.searchBox=_blessed2.default.textbox({label:' \u641C\u7D22 ',content:'',border:'line',style:{fg:'blue',bg:'default',bar:{bg:'default',fg:'blue'},border:{fg:'default',bg:'default'}},padding:{left:1},width:'30%',height:3,right:0,top:2,keys:true,vi:true,mouse:true});this.searchBox.on('submit',function(value){if(value)_this5.list.setLabel(' \u641C\u7D22> '+value+' ');_this5.list.focus();_this5.searchBox.clearInput();_this5.screen.render()});this.screen.append(this.searchBox)}},{key:'initPlayBox',value:function initPlayBox(){this.playBox=new PlayBox({label:' playing... ',border:'line',width:'50%',height:4,left:'center',top:'75%',stroke:'green'});this.screen.append(this.playBox)}},{key:'initLoginForm',value:function initLoginForm(){var _this6=this;this.loginForm=_blessed2.default.form({label:' \u8BF7\u767B\u9646 => ',mouse:true,keys:true,width:'50%',height:'50%',top:'center',left:'center',border:'line',hidden:true,style:{fg:'blue',border:{fg:'green'}}});this.loginForm.on('show',function(){_this6.screen.removeAllListeners('element focus');_this6.screen.append(_this6.loginForm);_this6.loginForm.focus();_this6.screen.render()});this.loginForm.on('hide',function(){_this6.renderFocus();_this6.screen.remove(_this6.loginForm);_this6.list.focus();_this6.screen.render()});this.loginForm.on('cancel',function(){_this6.loginForm.hide()});var usernameLabel=_blessed2.default.text({parent:this.loginForm,style:{fg:'white'},height:1,width:8,left:'50%-16',top:3,content:'\u7528\u6237\u540D\uFF1A'});var username=_blessed2.default.textbox({parent:this.loginForm,mouse:true,keys:true,padding:{left:1,right:1},style:{fg:'white',bg:'blue'},height:1,width:22,left:'50%-8',top:3,name:'username'});username.on('focus',function(){return username.readInput()});var passwordLabel=_blessed2.default.text({parent:this.loginForm,style:{fg:'white'},height:1,width:8,left:'50%-16',top:6,content:'\u5BC6  \u7801\uFF1A'});var password=_blessed2.default.textbox({parent:this.loginForm,mouse:true,keys:true,censor:true,padding:{left:1,right:1},style:{fg:'white',bg:'blue'},height:1,width:22,left:'50%-8',top:6,name:'password'});password.on('focus',function(){return password.readInput()});this.loginTipsLabel=_blessed2.default.text({parent:this.loginForm,align:'center',style:{fg:'red'},height:1,left:'50%-16',top:9,content:''});var submit=_blessed2.default.button({parent:this.loginForm,mouse:true,keys:true,shrink:true,padding:{left:1,right:1},left:'50%-10',bottom:3,name:'submit',content:'\u767B\u9646',style:{fg:'white',bg:'blue',hover:{bg:'red'},focus:{bg:'red'}}});submit.on('press',function(){return _this6.loginForm.submit()});var cancel=_blessed2.default.button({parent:this.loginForm,mouse:true,keys:true,shrink:true,padding:{left:1,right:1},left:'50%+4',bottom:3,name:'submit',content:'\u53D6\u6D88',style:{fg:'white',bg:'blue',hover:{bg:'red'},focus:{bg:'red'}}});cancel.on('press',function(){return _this6.loginForm.cancel()})}}]);return Ui}();exports.default=Ui;