var paixun;
$(function () {
    paixun = new Paixun();
    paixun.import();
    paixun.checking();

})

function Paixun() {

}

Paixun.prototype = {
    //输入框变色
    import: function () {
        //获取焦点事件
        $('.info').on('focus', '.foc', function () {
            //取消所有的getfocus类名
            $(this).parent().siblings().removeClass('getfocus');
            //给父盒子加上一个类名 getfocus
            $(this).parent().addClass('getfocus');
        })
    },

    //验证用户名和密码
    checking: function () {
        $('#form').on('submit', function (e) {
            //禁用表单默认提交事件
            e.preventDefault();
            $.ajax({
                url: 'http://127.0.0.1',
                type: 'post',
                dataType: 'json',
                data: $(this).serialize(),
                success: function (data) {
                    
                    if (data === 'success') {
                        //说明账户密码正确
                        //再在本地存储账户密码
                        //获取内容
                        var onename = $('.username').val();
                        var password = $('.password').val();
                        var obj = {
                            name: onename,
                            psd: password,
                        }

                        //是否记住密码
                        var state = $('.choose').prop('checked');
                        if (state) {
                            //取
                            var history = window.localStorage.getItem('loginfo')
                            if (history) {
                                history = JSON.parse(history);
                            } else {
                                history = [];
                            }
                            console.log(obj);

                            for (var i = 0; i < history.length; i++) {
                                // 如果有重复的就直接 return
                                if (history[i].name == obj.name) {
                                    return;
                                }
                            }

                            //追加
                            history.push(obj);
                            console.log(history);

                            //存
                            history = JSON.stringify(history);
                            window.localStorage.setItem('loginfo', history);

                        }
                    }
                    else{
                        alert('用户名或密码错误');
                    }
                }
            });
        });
    },

    //本地存储
    // storage: function () {
    //     //获取
    //     var onename = $('.username').val();
    //     var password = $('.password').val();
    //     var obj = {
    //         name: onename,
    //         psd: password,
    //     }

    //     //点击登录
    //     $('.btn').on('click', function () {
    //         //是否记住密码
    //         var state = $('.choose').prop('checked');
    //         if (state) {
    //             //取
    //             var history = window.localStorage.getItem('loginfo')
    //             if (history) {
    //                 history = JSON.parse(history);
    //             } else {
    //                 history = [];
    //             }
    //             console.log(obj);

    //             for (var i = 0; i < history.length; i++) {
    //                 // 如果有重复的就直接 return
    //                 if (history[i].name == obj.name) {
    //                     return;
    //                 }
    //             }

    //             //追加
    //             history.push(obj);
    //             console.log(history);

    //             //存
    //             history = JSON.stringify(history);
    //             window.localStorage.setItem('loginfo', history);

    //         }
    //     })



    // }
}