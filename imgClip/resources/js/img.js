commApp.controller('imgController', function ($scope, $state, $http, $filter, $timeout, $sce) {

    /*******************************************************方法-start***********************************************************/
    //初始化图片插件
    $scope.initImg = function () {
        //data-preview-src="" data-preview-group="1"
        //mui.previewImage();

        var $clip = $("#clip");
        var $file = $("#file");

        $("#toggle-file").click(function() {
            $file.trigger("click");
        });

        $clip.photoClip({
            width: 250,
            height: 250,
            fileMinSize: 20,
            file: $file,
            //defaultImg: '../resources/img/female.png',
            ok: '#clipBtn',
            loadStart: function() {
                console.log("照片读取中");
            },
            loadProgress: function(progress) {
                console.log(progress);
            },
            loadError: function() {
                console.log("图片加载失败");
                mui.toast('图片加载失败');
            },
            loadComplete: function() {
                console.log("照片读取完成");
            },
            imgSizeMin: function(kbs) {
                console.log(kbs, "上传图片过小");
                mui.toast('上传图片过小');
            },
            clipFinish: function(dataURL) {

                if(dataURL){
                    console.log(dataURL);

                    $('#view').css('background', 'url(' + dataURL + ')').css('background-size', 'cover');

                    //mui.showLoading('正在加载..', 'div');

                    var blobs = $scope.toBlob(dataURL);

                    //创建formData对象
                    var fd = new FormData();

                    fd.append('name', blobs, '1.jpg');

                    return false;

                    $.ajax({
                        async: true,
                        method: 'post',
                        processData : false,
                        contentType: false,
                        //'http://192.168.1.131:8080' + '/rest/consult/headImg/wx/' + $scope.accessKey + '/' + $scope.patientId,
                        url: $scope.addaUrl + '/rest/consult/headImg/wx/' + $scope.accessKey + '/' + $scope.patientId,
                        data: fd,
                        success:function (Data) {
                            mui.hideLoading();

                            var result = Data.result;

                            if(result === 200){

                                //window.location.href = 'personalEdit.html?account=' + $scope.account + '&openId=' + $scope.openId;
                            }else{
                                mui.toast('上传异常');
                            }

                        },
                        error:function (err) {
                            console.log(err);
                            mui.toast('上传异常');
                            mui.hideLoading();
                        }
                    });
                }

            }
        });

    };

    //base64转blob
    $scope.toBlob = function (urlData) {
        var bytes = window.atob(urlData.split(',')[1]);
        // 去掉url的头，并转换为byte
        // 处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab],{type : 'image/jpeg'});
    };

    $scope.go = function () {
        window.location.reload();
        //window.location.href = 'personalEdit.html?account=' + $scope.account + '&openId=' + $scope.openId;
    };

    /*******************************************************方法-end***********************************************************/

    /*******************************************************逻辑-start***********************************************************/
    //初始化图片插件
    $scope.initImg();

    /*******************************************************逻辑-end***********************************************************/

});
