/**
 * Created by mamol on 16/07/27.
 */
$(function () {
    $("#modify").click(function () {
        $("#show").hide();
        $("#hide").show()
    });

    
    $("#clear").click(function () {

        var id = $(".hidden_input").val();

        $("input").val(function () {

            $(".hidden_input").val(id)
        });
        $("textarea").val("");
    });

    $("#check").click(function () {
        var project_name = $("#project").val();
        var code = $("#code").val();

        if (project_name == ""){
            alert("案件名をご入力してください")
        }else if (code == ""){
            alert("番号をご入力してください")
        }else {
            $.ajax({
                data: {project: project_name, code: code},
                type: "get",
                success: function (result) {
                    $("#msg1").show();
                    $("#msg2").hide();

                    if (result == false){
                        $("#result").text("このキーもう存在しています");
                        $("#result").css('color', 'red')
                    }else {
                        $("#result").text("このキーは使用られることができます");
                        $("#result").css('color', 'green')
                    }
                }
            })
        }
    })
});