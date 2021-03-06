$(function () {

    getUserInfo();


    var layer=layui.layer;
    $('#btnLoginout').on('click',function(){
        layer.confirm('确定要退出登录吗？',{icon:3,title:'提示'},function(index){
            localStorage.removeItem('token');
            location.href='/login.html';

              // 关闭 confirm 询问框
            layer.close(index);
        })
    })


})


function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        Headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0)
                return layui.layer.msg(res.message);
            renderAvatar(res.data);
        }
    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username;

    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    }
    else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}

