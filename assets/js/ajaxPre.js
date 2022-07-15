// 每次发起$.ajax或$.post或$.get请求之前，都会先调用$.ajaxPrefilter
// $.ajaxPrefilter的options 参数时 $.ajax或$.post或$.get的对象
$.ajaxPrefilter(function(options) {
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
          Authorization: localStorage.getItem('token') || ''
        }
      }
    
        options.url = 'http://127.0.0.1:3007' + options.url;
})