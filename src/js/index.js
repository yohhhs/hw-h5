function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
        return r[2]
    } else {
        return null
    }
}
new Vue({
    el: '#app',
    data: {
        orderList: [],
        driverCode: '',
        password: '',
        keyword: ''
    },
    methods: {
        getOrder: function () {
            console.log(111)
            let self = this
            if (self.driverCode === '') {
                layer.open({
                    content: '请输入司机编号',
                    btn: '我知道了'
                });
                return
            }
            if (self.password === '') {
                layer.open({
                    content: '请输入查询密码',
                    btn: '我知道了'
                });
                return
            }

            $.post('http://132.232.197.118/cms/front/order/getOrderList', {
                driverCode: this.driverCode,
                password: this.password,
                keyword: this.keyword
            }, function (result) {
                if (result.statusCode === 200) {
                    self.orderList = result.data
                }
            })
        }
    }
})