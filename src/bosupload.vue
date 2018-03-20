/*
 * 适用于iview框架的bos百度云上传组件
 * @Author: ljb
 * @Date: 2017-10-12 13:59:50
 * @Last Modified by: ljb
 * @Last Modified time: 2018-03-20 16:51:57
 */
<style lang="less" rel="stylesheet/less" type="text/less" scoped>

    .v-component-bosupload {
        position: relative;
        display: inline-block;
        background: #fff;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        padding: 6px 23px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
        input[type='file'] {
            position: absolute;
            font-size: 100px;
            right: 0;
            top: 0;
            opacity: 0;
        }
        &:hover {
            background: #AADFFD;
            border-color: #78C3F3;
            color: #004974;
            text-decoration: none;
        }
    }
</style>
<template>
    <a href="javascript:;" class="v-component-bosupload">
        {{ file_info || '选择视频' }}
        <input type="file" id="bos_button" ref="bos_btn" accept="video/mp4" @change="changeInput">
    </a>
</template>

<script>

export default {
    name: 'bos-uploader',
    props : {
		typeLimit: {
			type: Array,
			default: () => {
				return ['video/mp4','image/jpg','image/jpeg','image/png'];
			}
		},
		maxImageSize: {
			type: Number,
			default: () => {
				return 102400;
			}
		},
        bosConfig: {
            type: Object,
            required: true,
		},
		bosCdnPath: {
			type: String,
			default: () => {
				return 'http://websdk.cdn.bcebos.com/bos/bce-bos-uploader/bce-bos-uploader.bundle.js';
			}
		},
		jqueryPath: {
			type: String,
			default: () => {
				return 'http://websdk.cdn.bcebos.com/bos/jquery/dist/jquery.min.js';
			}
		},
    },
    data() {
        return {
			scriptTagStatus: 0,			//js文件的加载状态
            file_info : '',
            bos_uploader : null           //承接百度云的实例化对象
        }
	},
	mounted () {

		if( window.baidubce && window.jQuery ) {

			this.scriptTagStatus = 2;

			this.initBos();

		}else {

			this.insertScriptTag();

		}

	},
    watch : {
        'bosConfig' : function(){

            if( !this.bos_uploader && JSON.stringify(this.bosConfig) !== "{}" ) {

                this.initBos();

            }

        }
    },
    methods: {

        /**
         * file模式的input改变时触发的事件
         * @param  {Object} e {事件e}
         * @return {undefined}
         */
        changeInput(e){

            if( this.validateFileType(e.target.files[0]) ) {

                this.file_info = e.target.files[0].name;

            }else {

                this.file_info = '';

            }

        },

        /**
         * 校验文件类型
         * @param  {Object} file {文件对象}
         * @return {Boolean} {true代表校验通过，false代表不通过}
         */
        validateFileType(file) {

            if( !file ) {

				if( !this.$Message ) {

                  	alert('未选择任何文件！');

                }else {

                  	this.$Message.error('未选择任何文件！');

                }

                return;

            };

            let ch_reg = new RegExp("[\\u4E00-\\u9FFF]+","g");

            let file_type = file.type;

            let file_name = file.name;

            if( this.typeLimit.indexOf(file_type) !== -1 ) {

                if( parseFloat(file.size)/1024 > this.maxImageSize ) {

                    if( !this.$Message ) {

                      	alert('所选文件超过大小限制！');

                    }else {

                      	this.$Message.error('所选文件超过大小限制！');

                    }

                    this.$emit('validate',false);

                    return false;

                }else {

                    this.$emit('validate',true);

                    return true;

                }

            }else {

                if( !this.$Message ) {

                  	alert('所选文件格式不正确！');

                }else {

                  	this.$Message.error('所选文件格式不正确！');

                }

                this.$emit('validate',false);

                return false;

            }

        },

        /**
         * 获取文件名
         * @param  {Object} file {文件对象}
         * @return {string} {拼接好的文件名}
         */
        getNewFileName(file) {

            const FILE_NAME_MAX_CHAR = 16;

            let file_name = file.name; // xxx.jpeg
            let mime_type = file.type; // eg. "image/jpeg"

            let file_name_arr = file_name.split('.');  // [ 'xxx' , 'jpg' ]
            let extension = mime_type.split('/').pop(); // jpeg

            file_name_arr[0] = file_name_arr[0].slice( 0 , FILE_NAME_MAX_CHAR ); // limit file name length
            file_name_arr.pop(); // [ 'xxx' ]
            file_name_arr.push( '_' + (new Date()).getTime() ); // [ 'xxx' , '_1491231123' ]
            file_name_arr.push( '.' + extension); // [ 'xxx' , '_123123' , '.jpeg' ]

            return file_name_arr.join('');
		},

		/**
         * 动态加载bosuploader所需js
         * @return {undefined}
         */
        insertScriptTag() {

			let jqScriptTag = document.getElementById('jqScriptTag');

			let bosScriptTag = document.getElementById('bosScriptTag');

			let s = document.getElementsByTagName('head')[0];

            // 如果这个tag不存在，则生成相关代码tag以加载代码
            if ( !window.jQuery ) {

				jqScriptTag = document.createElement('script');
                jqScriptTag.type = 'text/javascript';
                jqScriptTag.src = this.jqueryPath;
				jqScriptTag.id = 'jqScriptTag';

				s.appendChild(jqScriptTag);

			}

			if( !window.baidubce ) {

				bosScriptTag = document.createElement('script');
                bosScriptTag.type = 'text/javascript';
                bosScriptTag.src = this.bosCdnPath;
				bosScriptTag.id = 'bosScriptTag';

				s.appendChild(bosScriptTag);

			}

            // 等待代码加载完成后初始化编辑器
            if (jqScriptTag.loaded) {
                this.scriptTagStatus++;
            } else {
                jqScriptTag.addEventListener('load', () => {
                    this.scriptTagStatus++;
                    jqScriptTag.loaded = true;
                });
            }

            if (bosScriptTag.loaded) {
                this.scriptTagStatus++;
            } else {
                bosScriptTag.addEventListener('load', () => {
                    this.scriptTagStatus++;
                    bosScriptTag.loaded = true;
                });
            }

            this.initBos();
        },

        /**
         * 初始化bos
         * @return {undefined}
         */
        initBos(){

			const self = this;

			if( this.scriptTagStatus === 2 && !this.bos_uploader ) {

				this.bos_uploader = new baidubce.bos.Uploader({

					browse_button: '#bos_button',
					bos_bucket: self.bosConfig.bucket,
					bos_endpoint: self.bosConfig.end_point,

					bos_task_parallel : 1,

					// 通过 JSONP 获取 临时token
					uptoken_url: self.bosConfig.token_url,
					get_new_uptoken: false,
					max_file_size: self.bosConfig.upload_max_size,
					bos_multipart_min_size: self.bosConfig.upload_max_size,

					init: {
						//开始上传
						BeforeUpload: function (_, file) {

							if( !self.$Message ) {

								alert('开始上传');

							}else {

								self.$Message.info('开始上传');

							}

						},

						// 上传完成的回调
						FileUploaded: function (_, file, info) {

							var bucket = info.body.bucket;
							var object = info.body.object;
							var url = self.bosConfig.end_point + '/' + bucket + '/' + object;

							self.$refs.bos_btn.value = '';

							self.file_info = '';

							self.$emit('post');

						},

						// 如果上传的过程中出错了，调用这个函数
						Error: function (_, error, file) {

							self.$Message.error({
								content: error,
								duration: 5,
								closable: true
							});

						},

						//  重命名 BOS 存储的文件名称
						Key: function (_, file) {

							let bos_key = self.bosConfig.prefix + self.getNewFileName(file);

							self.$emit('setKey',bos_key);

							return bos_key;

							// 如果需要重命名 BOS 存储的文件名称，这个函数
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

						},

						// 文件的上传进度
						UploadProgress: function (_, file, progress, event) {

							let upload_progress = parseInt(progress.toFixed(2) * 100);

							self.$emit('progress',upload_progress);

						}

					}

				});

			}

        }
    }
}
</script>
