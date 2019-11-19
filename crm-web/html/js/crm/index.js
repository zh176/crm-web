$(function () {
    //存放菜单数据
    var right;
    var token = getToken();
    var payload = parsePayload(token);
    $(".font-bold").text(payload.userName);
    $(".roleName").text(payload.roleName);
    $.ajaxSettings.async = false;
    $.ajax({
        //http://127.0.0.1:8080/
        url:"/right/"+payload.roleId,
        type:"GET",
        headers:{'Authorization':''+token+''},
        success:function (data) {
            if (data.code == 401){
                window.location.href = "login.html";
                window.event.returnValue = false;
                return false;
            }
            if (data.code == 1){
                right = data.data;
                removeRight(right);
            }
        }
    });

    $.ajaxSettings.async = true;
    if (right!=undefined){
        removeMenu(right);
    }

});
 function removeRight(data){
     $("#side-menu li[code]").each(function (i,v) {
         var flag = true;
         var code = $(v).attr("code");
         $.each(data,function (j,r) {
             if (r.code == code){
                 flag = true;
                 return false;
             }
             flag = false;
         })
         if (!flag){
             $(v).remove();
         }
     })
 }
 function removeMenu(data) {
     $("#side-menu li[code]").each(function (i,v) {
         var parentCode = $(v).attr("code");
         $(v).children("ul").children().each(function (i, r) {
            var code = $(r).attr("code");
            var flag = false;
            $.each(data,function (i,j) {
                if(j.parentCode == parentCode){
                    if (j.code == code){
                        flag = true;
                    }
                }

            });
            if (!flag){
                $(r).remove();
            }
         });
     });
 }