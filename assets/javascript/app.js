var questions = [{question: "What?", answers: ["That", "No1", "No2", "No3"], correct: 0},
                 {question: "Where?", answers: ["Thatg", "Noy1", "No2", "No3"], correct: 1},
                 {question: "When?", answers: ["Thats", "No1w", "No2", "No3"], correct: 2},
                 {question: "What?", answers: ["That", "No1", "No2", "No3"], correct: 0},
                 {question: "Where?", answers: ["Thatg", "Noy1", "No2", "No3"], correct: 1},
                 {question: "When?", answers: ["Thats", "No1w", "No2", "No3"], correct: 2}];

$("#play").on("click", function() {
    $("#play").hide();

    showTimer();
})

var questionNumber = 0,
    time = 20,
    countdown,
    correct = 0,
    incorrect = 0,
    unanswered = 0,
    clockRunning = false;

function showTimer() {  
    time = 20;
    $("#countdown").html(time);
    startCountdown();
    displayQuestion(questionNumber);
}

function displayQuestion(questionNumber) {
    var rightAnswer;

    $("#question").html(questions[questionNumber].question).show();
        for(var i = 0; i < 4; i++) {

            var select = document.createElement('input');
            select.type = 'radio';
            select.name = 'radio';
            select.value = questions[questionNumber].answers[i];

            var answer = document.createElement('p');

            answer.innerHTML = questions[questionNumber].answers[i];

            document.getElementById('answers').style.display = 'block';
           
            rightAnswer = questions[questionNumber].answers[questions[questionNumber].correct];
            document.getElementById('answers').appendChild(answer).appendChild(select);
            
        }
        $('#answers input').on('change', function() {
            chooseAnswer();
        });

    function chooseAnswer() {
        console.log($('input[name=radio]:checked', '#answers').val());

        if ($('input[name=radio]:checked', '#answers').val() == rightAnswer) {
            var message = "<h2>Correct!</h2><p>";
            correct++;
            callNextQuestion(message);
        }
        else {
            var message = "<h2>Wrong!</h2><p>The answer is ";
            incorrect++;
            callNextQuestion(message);
        }
    }
    function callNextQuestion(msg) {
        $("#answers").empty();
        $("#question").hide();

        var gif = $("<div>");
        gif.html(msg + rightAnswer + "</p>");
        $("#answers").append(gif);
        stopCountdown();

        setTimeout(nextQuestion, 1000);
    }
}
  
function nextQuestion() {

    questionNumber++;
    
    if (questionNumber === questions.length) {
        stopCountdown();
        $("#question").hide();
        $("#countdown").hide();
        console.log(correct);
        $("#score").html("<h2>Correct: " + correct + "<br>Incorrect: " + incorrect + "<br>Unanswered: " + unanswered + "</h2>").show();
    }
    $("#answers").hide();
    $("#answers").empty();
    time = 21;
    startCountdown();
    displayQuestion(questionNumber);    
}
  
function startCountdown() {
    showQuestion = setInterval(count, 1000);
}

function stopCountdown() {
    clearInterval(showQuestion);
}
  
function count(){
    // Decrement seconds remaining
    time--;

    if (time < 0) {
        $("#question").hide();
        $("#answers").empty();
        var gif = $("<div>");
        gif.html("<h2>Out of time</h2><p>The answer is </p>" + questions[questionNumber].answers[questions[questionNumber].correct]);
        $("#answers").append(gif);

        unanswered++;
        nextQuestion(); 
    }
    else{
        // If there is time left, display updated time value
        $("#countdown").html(time);
    }
}










// function start(){
//     // if clock is not running
//     if(!clockRunning) {
//         // Call count every second
//         countdown = setInterval(count, 1000);
//         // Set clockRunning to true
//         clockRunning = true;
//     }
// }

// function count(){
//     // Decrement seconds remaining
//     time--;

//     if (time < 0) {
//         $("#answers").empty();
//         var gif = $("<div>");
//         gif.html("<h2>Out of time</h2><p>The answer is </p>");
//         $("#answers").append(gif);
//         questionNumber++;

//         setTimeout(stop, 3000);
//     }
//     else{
//         // If there is time left, display updated time value
//         $("#countdown").html(time);
//     }
// }

// function stop() {
//     // $("#answers").empty();
//     // $(".answer").empty();

//     clearInterval(countdown);
//     clockRunning = false;
//     if(questionNumber < questions.length - 1);
//         showTimer();
// }

// function showQuestion(indx){
//         $("#question").text(questions[questionNumber].question);
//             console.log("q: " + questions[questionNumber].correct);

//         for(var i = 0; i < 4; i++) {

//             var answer = $("<div>");
//                 answer.html(questions[questionNumber].answers[i]);
//                 answer.attr("data-question", questions[questionNumber].answers[i]);
//                 console.log(answer.attr("data-question"));
//                 answer.attr("data-correct", questions[questionNumber].correct);
//                 answer.addClass("answer");

//             $("#answers").append(answer);
//         }

//         $("#answers").on("click", ".answer", function () {  
//             console.log($(this).attr("data-question") + " " + questions[questionNumber].answers[questions[questionNumber].correct]);

//             if($(this).attr("data-question") == questions[questionNumber].answers[questions[questionNumber].correct]) {
//                 $("#answers").empty();
//                 var gif = $("<div>");
//                 gif.html("<h2>Correct!</h2><p>" + questions[questionNumber].answers[questions[questionNumber].correct] + "</p>");
//                 $("#answers").append(gif);
                
//                 setTimeout(stop, 3000);
//             }
//             else {
//                 $("#answers").empty();
//                 var gif = $("<div>");
//                 gif.html("<h2>Wrong!</h2><p>The answer is " + questions[questionNumber].answers[questions[questionNumber].correct] + "</p>");
//                 $("#answers").append(gif);
    
//                 setTimeout(stop, 3000);
//             }
//         });
//         return questionNumber;
// }