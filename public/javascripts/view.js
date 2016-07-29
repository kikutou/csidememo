/**
 * Created by mamol on 16/07/27.
 */
$(function () {
    $(".a_key").click(function () {
        $("#key_text").val($(this).text());
        $("#key_submit").click()
    });
    
    $(".classification").click(function () {
        var condition = 'classification';
        var value = $(this).val();

        $("#check_condition").val(condition);
        $("#check_value").val(value);
        $("#check_submit").click()
        
    });

    $(".status").click(function () {
        var condition = 'status';
        var value = $(this).val();

        $("#check_condition").val(condition);
        $("#check_value").val(value);
        $("#check_submit").click()

    });

    $(".species").click(function () {
        var condition = 'species';
        var value = $(this).val();

        $("#check_condition").val(condition);
        $("#check_value").val(value);
        $("#check_submit").click()

    });

    $(".submitter").click(function () {
        var condition = 'submitter';
        var value = $(this).val();

        $("#check_condition").val(condition);
        $("#check_value").val(value);
        $("#check_submit").click()

    });

    $(".principal").click(function () {
        var condition = 'principal';
        var value = $(this).val();

        $("#check_condition").val(condition);
        $("#check_value").val(value);
        $("#check_submit").click()

    });

    $(".a_del").click(function () {

        var key = $(this).text().replace('削除', "");
        $("#del_key").val(key);
        $("#del_submit").click()
    });

    $("#clear").click(function () {
        $("input").val("");
        // $(".option").attr("selected", true)
        $("select").val("")
    })

});
