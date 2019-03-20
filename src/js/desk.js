var URL = 'http://132.232.197.118/cms'
new Vue({
    el: '#app',
    data: {
        driverCode: '',
        password: '',
        orderInId: '',
        orderList: []
    },
    created: function () {
        // this.getOrderList()
    },
    methods: {
        getOrderList: function () {
            $.post(URL +'/order/out/getOrderOutList', {
                pageSize: 10000000,
                pageNo: 1
            }, function (result) {
                if (result.statusCode === 200) {
                    self.orderList = result.data.list
                }
            })
        },
        fileChange: function (e) {
            var files = e.target.files
            if (!files) {
                return;
            }
        }
    }
})