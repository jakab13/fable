$(document).ready(function() {
    $( "#recommendations" ).accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    });

    $( "#vote").click(function(event){
        event.preventDefault();
        $.post("/vote",
            {user: req.user})
            .done(function(data){
                $("#vote-count").html(data)
            })
    })
});