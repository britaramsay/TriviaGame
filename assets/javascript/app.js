var clockRunning = false;

$("#play").on("click", function() {
    $("#play").hide();
    $("<div><h3>This is a question?</h3></div>").appendTo("#main-section");

    start();
    //showQuestion();
})

var time = 20;

function start(){
    if(!clockRunning) {
        var countdown = setInterval(count, 1000);
        clockRunning = true;
    }
}

function count(){
    console.log("count");
    time--;

    if (time <= 0) {
        alert("Out of time")
    }
    else
        $("#countdown").html(time);
}

function stop() {
    clearInterval(countdown);
    clockRunning = false;
}

function showQuestion(){
    $("#question").html("questions[i]");
}