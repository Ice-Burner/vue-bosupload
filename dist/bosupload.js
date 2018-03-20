(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bosupload"] = factory();
	else
		root["bosupload"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "H:\\L_J_B\\npm-package\\vue-bos\\dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default={name:'bos-uploader',props:{typeLimit:{type:Array,default:function _default(){return['video/mp4','image/jpg','image/jpeg','image/png'];}},maxImageSize:{type:Number,default:function _default(){return 102400;}},bosConfig:{type:Object,required:true},bosCdnPath:{type:String,default:function _default(){return'http://websdk.cdn.bcebos.com/bos/bce-bos-uploader/bce-bos-uploader.bundle.js';}},jqueryPath:{type:String,default:function _default(){return'http://websdk.cdn.bcebos.com/bos/jquery/dist/jquery.min.js';}}},data:function data(){return{scriptTagStatus:0,//js文件的加载状态
file_info:'',bos_uploader:null//承接百度云的实例化对象
};},mounted:function mounted(){if(window.baidubce&&window.jQuery){this.scriptTagStatus=2;this.initBos();}else{this.insertScriptTag();}},watch:{'bosConfig':function bosConfig(){if(!this.bos_uploader&&JSON.stringify(this.bosConfig)!=="{}"){this.initBos();}}},methods:{/**
         * file模式的input改变时触发的事件
         * @param  {Object} e {事件e}
         * @return {undefined}
         */changeInput:function changeInput(e){if(this.validateFileType(e.target.files[0])){this.file_info=e.target.files[0].name;}else{this.file_info='';}},/**
         * 校验文件类型
         * @param  {Object} file {文件对象}
         * @return {Boolean} {true代表校验通过，false代表不通过}
         */validateFileType:function validateFileType(file){if(!file){if(!this.$Message){alert('未选择任何文件！');}else{this.$Message.error('未选择任何文件！');}return;};var ch_reg=new RegExp('[\\u4E00-\\u9FFF]+',"g");var file_type=file.type;var file_name=file.name;if(this.typeLimit.indexOf(file_type)!==-1){if(parseFloat(file.size)/1024>this.maxImageSize){if(!this.$Message){alert('所选文件超过大小限制！');}else{this.$Message.error('所选文件超过大小限制！');}this.$emit('validate',false);return false;}else{this.$emit('validate',true);return true;}}else{if(!this.$Message){alert('所选文件格式不正确！');}else{this.$Message.error('所选文件格式不正确！');}this.$emit('validate',false);return false;}},/**
         * 获取文件名
         * @param  {Object} file {文件对象}
         * @return {string} {拼接好的文件名}
         */getNewFileName:function getNewFileName(file){var FILE_NAME_MAX_CHAR=16;var file_name=file.name;// xxx.jpeg
var mime_type=file.type;// eg. "image/jpeg"
var file_name_arr=file_name.split('.');// [ 'xxx' , 'jpg' ]
var extension=mime_type.split('/').pop();// jpeg
file_name_arr[0]=file_name_arr[0].slice(0,FILE_NAME_MAX_CHAR);// limit file name length
file_name_arr.pop();// [ 'xxx' ]
file_name_arr.push('_'+new Date().getTime());// [ 'xxx' , '_1491231123' ]
file_name_arr.push('.'+extension);// [ 'xxx' , '_123123' , '.jpeg' ]
return file_name_arr.join('');},/**
         * 动态加载bosuploader所需js
         * @return {undefined}
         */insertScriptTag:function insertScriptTag(){var _this=this;var jqScriptTag=document.getElementById('jqScriptTag');var bosScriptTag=document.getElementById('bosScriptTag');var s=document.getElementsByTagName('head')[0];// 如果这个tag不存在，则生成相关代码tag以加载代码
if(!window.jQuery){jqScriptTag=document.createElement('script');jqScriptTag.type='text/javascript';jqScriptTag.src=this.jqueryPath;jqScriptTag.id='jqScriptTag';s.appendChild(jqScriptTag);}if(!window.baidubce){bosScriptTag=document.createElement('script');bosScriptTag.type='text/javascript';bosScriptTag.src=this.bosCdnPath;bosScriptTag.id='bosScriptTag';s.appendChild(bosScriptTag);}// 等待代码加载完成后初始化编辑器
if(jqScriptTag.loaded){this.scriptTagStatus++;}else{jqScriptTag.addEventListener('load',function(){_this.scriptTagStatus++;jqScriptTag.loaded=true;});}if(bosScriptTag.loaded){this.scriptTagStatus++;}else{bosScriptTag.addEventListener('load',function(){_this.scriptTagStatus++;bosScriptTag.loaded=true;});}this.initBos();},/**
         * 初始化bos
         * @return {undefined}
         */initBos:function initBos(){var self=this;if(this.scriptTagStatus===2&&!this.bos_uploader){this.bos_uploader=new baidubce.bos.Uploader({browse_button:'#bos_button',bos_bucket:self.bosConfig.bucket,bos_endpoint:self.bosConfig.end_point,bos_task_parallel:1,// 通过 JSONP 获取 临时token
uptoken_url:self.bosConfig.token_url,get_new_uptoken:false,max_file_size:self.bosConfig.upload_max_size,bos_multipart_min_size:self.bosConfig.upload_max_size,init:{//开始上传
BeforeUpload:function BeforeUpload(_,file){if(!self.$Message){alert('开始上传');}else{self.$Message.info('开始上传');}},// 上传完成的回调
FileUploaded:function FileUploaded(_,file,info){var bucket=info.body.bucket;var object=info.body.object;var url=self.bosConfig.end_point+'/'+bucket+'/'+object;self.$refs.bos_btn.value='';self.file_info='';self.$emit('post');},// 如果上传的过程中出错了，调用这个函数
Error:function Error(_,error,file){self.$Message.error({content:error,duration:5,closable:true});},//  重命名 BOS 存储的文件名称
Key:function Key(_,file){var bos_key=self.bosConfig.prefix+self.getNewFileName(file);self.$emit('setKey',bos_key);return bos_key;// 如果需要重命名 BOS 存储的文件名称，这个函数
// 返回新的文件名即可
// 如果这里需要执行异步的操作，可以返回 Promise 对象
// 如果需要自定义bucket和object，可以返回{bucket: string, key: string}
// 例如：
// return new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     resolve(file.name);
//   }, 2000);
// });
// return "haha/hehe/cc.jpg";
},// 文件的上传进度
UploadProgress:function UploadProgress(_,file,progress,event){var upload_progress=parseInt(progress.toFixed(2)*100);self.$emit('progress',upload_progress);}}});}}}};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_14_2_1_vue_loader_lib_selector_type_script_index_0_bosupload_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_14_2_1_vue_loader_lib_selector_type_script_index_0_bosupload_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_14_2_1_vue_loader_lib_selector_type_script_index_0_bosupload_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_14_2_1_vue_loader_lib_selector_type_script_index_0_bosupload_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_14_2_1_vue_loader_lib_selector_type_script_index_0_bosupload_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_14_2_1_vue_loader_lib_template_compiler_index_id_data_v_723f8931_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_14_2_1_vue_loader_lib_selector_type_template_index_0_bosupload_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_14_2_1_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(8);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(2)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-723f8931"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_14_2_1_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_14_2_1_vue_loader_lib_selector_type_script_index_0_bosupload_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_14_2_1_vue_loader_lib_template_compiler_index_id_data_v_723f8931_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_14_2_1_vue_loader_lib_selector_type_template_index_0_bosupload_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_14_2_1_vue_loader_lib_template_compiler_index_id_data_v_723f8931_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_14_2_1_vue_loader_lib_selector_type_template_index_0_bosupload_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\bosupload.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-723f8931", Component.options)
  } else {
    hotAPI.reload("data-v-723f8931", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(5).default
var update = add("c7387e88", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.11@css-loader/index.js?sourceMap!../node_modules/_vue-loader@14.2.1@vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-723f8931\",\"scoped\":true,\"sourceMap\":true}!../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../node_modules/_vue-loader@14.2.1@vue-loader/lib/selector.js?type=styles&index=0!./bosupload.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.11@css-loader/index.js?sourceMap!../node_modules/_vue-loader@14.2.1@vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-723f8931\",\"scoped\":true,\"sourceMap\":true}!../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../node_modules/_vue-loader@14.2.1@vue-loader/lib/selector.js?type=styles&index=0!./bosupload.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(true);
// imports


// module
exports.push([module.i, "\n.v-component-bosupload[data-v-723f8931] {\n  position: relative;\n  display: inline-block;\n  background: #fff;\n  border: 1px solid #99D3F5;\n  border-radius: 4px;\n  padding: 6px 23px;\n  overflow: hidden;\n  color: #1E88C7;\n  text-decoration: none;\n  text-indent: 0;\n  line-height: 20px;\n}\n.v-component-bosupload input[type='file'][data-v-723f8931] {\n  position: absolute;\n  font-size: 100px;\n  right: 0;\n  top: 0;\n  opacity: 0;\n}\n.v-component-bosupload[data-v-723f8931]:hover {\n  background: #AADFFD;\n  border-color: #78C3F3;\n  color: #004974;\n  text-decoration: none;\n}\n", "", {"version":3,"sources":["H:/L_J_B/npm-package/vue-bos/src/bosupload.vue"],"names":[],"mappings":";AAAA;EACE,mBAAmB;EACnB,sBAAsB;EACtB,iBAAiB;EACjB,0BAA0B;EAC1B,mBAAmB;EACnB,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,sBAAsB;EACtB,eAAe;EACf,kBAAkB;CACnB;AACD;EACE,mBAAmB;EACnB,iBAAiB;EACjB,SAAS;EACT,OAAO;EACP,WAAW;CACZ;AACD;EACE,oBAAoB;EACpB,sBAAsB;EACtB,eAAe;EACf,sBAAsB;CACvB","file":"bosupload.vue","sourcesContent":[".v-component-bosupload {\n  position: relative;\n  display: inline-block;\n  background: #fff;\n  border: 1px solid #99D3F5;\n  border-radius: 4px;\n  padding: 6px 23px;\n  overflow: hidden;\n  color: #1E88C7;\n  text-decoration: none;\n  text-indent: 0;\n  line-height: 20px;\n}\n.v-component-bosupload input[type='file'] {\n  position: absolute;\n  font-size: 100px;\n  right: 0;\n  top: 0;\n  opacity: 0;\n}\n.v-component-bosupload:hover {\n  background: #AADFFD;\n  border-color: #78C3F3;\n  color: #004974;\n  text-decoration: none;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(6);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a",
    { staticClass: "v-component-bosupload", attrs: { href: "javascript:;" } },
    [
      _vm._v("\n    " + _vm._s(_vm.file_info || "选择视频") + "\n    "),
      _c("input", {
        ref: "bos_btn",
        attrs: { type: "file", id: "bos_button", accept: "video/mp4" },
        on: { change: _vm.changeInput }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-723f8931", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normalizeComponent;
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  scriptExports = scriptExports || {}

  // ES6 modules interop
  var type = typeof scriptExports.default
  if (type === 'object' || type === 'function') {
    scriptExports = scriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=bosupload.js.map