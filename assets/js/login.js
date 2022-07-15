$(function(){
    $('#link-reg').on('click',function(){
        $('.login-box').hide();
        $('.register-box').show();
    });

    $('#link-login').on('click',function(){
        $('.login-box').show();
        $('.register-box').hide();
    })
});