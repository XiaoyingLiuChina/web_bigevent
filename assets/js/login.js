$(function() {
    $('#link_login').on('click', function() {
        console.log('songy');
        $('.register-box').hide()
        $('.login-box').show()
    })

    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.register-box').show()
    })

    var form = layui.form
    var layer = layui.layer

    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
        ],

        repass: function(newpwd) {
            var oldpwd = $('.register-box [name=password]').val()

            if (newpwd != oldpwd) {
                return '两次密码不一致'
            }
        }
    })

    $('#form-reg').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            url: '/api/register',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {

                    return layer.msg(res.message);
                }
                layer.msg('注册成功')
                $('#link_login').trigger('click')
            }
        })
    })

    $('#form-login').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {

                    return layer.msg(res.message);
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        })
    })
})