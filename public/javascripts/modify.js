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
});