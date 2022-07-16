$(function () {
    initArtCateList();
    var layer = layui.layer;

    var indexAdd=null;
    $('#addBtn1').on('click', function () {
        indexAdd= layer.open({
            type: 1,
            area: ['500px', '220px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    $('tbody').on('click','#delcate',function(){
        // console.log($(this).parent().parent());
        var $td_id=$($(this).parent().siblings()[0]);
        
        console.log($td_id.text());

        layer.confirm('确认删除？',{icon:3,title:'提示'},function(index){
            $.ajax({
                method:'GET',
                url:'/my/artcate/deletecate/'+$td_id.text(),
                success:function(res){
    
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    
                    layer.msg('删除分类成功！');
                    layer.close(index);
                    initArtCateList();
                    
                }
                
            })
        })
    })
   


    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/artcate/addcates',
            data: $(this).serialize(),
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList();
                layer.msg('新增分类成功！');
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd);
            }
        })
    })

})
function initArtCateList() {
    $.ajax({
        method: 'GET',
        url: '/my/artcate/cates',
        success: function (res) {

            var htmlStr = template('tpl-table', res);

            $('tbody').html(htmlStr)
        }
    })
}