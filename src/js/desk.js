var URL = 'http://132.232.197.118/cms'
new Vue({
    el: '#app',
    data: {
        driverCode: '',
        password: '',
        orderInId: '',
        orderName: '',
        logisticsImage: '',
        isSelect: false,
        orderList: [],
        timer: null,
        fileName: ''
    },
    watch: {
        driverCode: function () {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = setTimeout(this.getOrderList, 1000)
            } else {
                this.timer = setTimeout(this.getOrderList, 1000)
            }
        },
        password: function () {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = setTimeout(this.getOrderList, 1000)
            } else {
                this.timer = setTimeout(this.getOrderList, 1000)
            }
        }
    },
    methods: {
        changeOrder: function () {
            if (this.orderList && this.orderList.length > 0) {
                this.isSelect = true
            } else {
                layer.open({
                    content: '暂无相关订单',
                    btn: '我知道了'
                });
            }
        },
        getOrderList: function () {
            var self = this
            if (this.driverCode && this.password) {
                $.post('http://132.232.197.118/cms/front/order/getOrderList', {
                    driverCode: this.driverCode,
                    password: this.password
                }, function (result) {
                    if (result.statusCode === 200) {
                        self.orderList = result.data
                    }
                })
            }
        },
        chooseGoods: function (item) {
            this.orderInId = item.orderInId
            this.orderName = item.customer
        },
        fileChange: function (e) {
            var files = e.target.files[0]
            if (!files) {
                vm.fileName = ''
                vm.logisticsImage = ''
                return;
            }
            var vm = this
            var fd = new FormData();
            fd.append("files", files);
            $.ajax({
                url: "http://132.232.197.118/cms/file/uploadFile",
                type: "POST",
                processData: false,
                contentType: false,
                data: fd,
                success: function(res) {
                    vm.logisticsImage = res.data
                    vm.fileName = files.name
                }
            });
        },
        infoConfirm: function () {
            var vm = this
            if (this.driverCode === '') {
                return layer.open({
                    content: '请输入司机编码',
                    btn: '我知道了'
                });
            }
            if (this.password === '') {
                return layer.open({
                    content: '请输入查询密码',
                    btn: '我知道了'
                });
            }
            if (this.orderInId === '') {
                return layer.open({
                    content: '请选择订单',
                    btn: '我知道了'
                });
            }
            if (this.logisticsImage === '') {
                return layer.open({
                    content: '请上传图片',
                    btn: '我知道了'
                });
            }
            $.post('http://132.232.197.118/cms/front/order/updateLogisticsImage', {
                driverCode: this.driverCode,
                orderInId: this.orderInId,
                logisticsImage: this.logisticsImage,
                password: this.password
            }, function (result) {
                if (result.statusCode === 200) {
                    layer.open({
                        content: '上传成功',
                        btn: '我知道了'
                    });
                } else {
                    layer.open({
                        content: 'msg',
                        btn: '我知道了'
                    });
                }
            })
        }
    }
})