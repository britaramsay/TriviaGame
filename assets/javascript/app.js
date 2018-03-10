var questions = [{"question": "What?", "answers": ["That", "No1", "No2", "No3"]},
                {"question": "When?", "answers": ["That", "No1", "No2", "No3"]}, 
                {"question": "Where?", "answers": ["That", "No1", "No2", "No3"]}
            ];

var clockRunning = false;

$("#play").on("click", function() {
    $("#play").hide();

    $("#countdown").html(time);

    start();
    showQuestion(questionNumber);
})

var time = 20;
var questionNumber = 0;

function start(){
    if(!clockRunning) {
        var countdown = setInterval(count, 1000);
        clockRunning = true;
    }
}

function count(){
    time--;

    if (time < 0) {
        alert("Out of time");
        questionNumber++;
    }
    else
        $("#countdown").html(time);
}

function stop() {
    clearInterval(countdown);
    clockRunning = false;
}

function showQuestion(indx){
    $("#question").show().html(questions[indx].question);

    var order = Math.floor(Math.random(4));

    for(var i = 0; i < 4 ; i++) {
        var answer = $("<div>").html(questions[indx].answers[i]);
        $("#answers").show().append(answer);
        
        // else {
        //     var wrongs = $("<div>").html(questions[indx].wrong1);
        //     $("#answers").show().append(wrongs);
        // }
    }


}