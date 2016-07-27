/**
 * Created by mamol on 16/07/27.
 */
$(function () {
    $("#clear").click(function () {
        $("input").val("")
    });

    // $("#check").click(function () {
    //     var key = $("#project").val() +'-'+ $("#key").val();
    //     $.ajax({
    //         data: {key: key},
    //         type: get,
    //         success: function (data) {
    //             alert(data)
    //         }
    //     })
    // })
});