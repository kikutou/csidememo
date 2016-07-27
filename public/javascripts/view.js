/**
 * Created by mamol on 16/07/27.
 */
$(function () {
    $("a").click(function () {
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

});