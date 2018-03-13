var questions = [{question: "What?", answers: ["That", "No1", "No2", "No3"], correct: 0},
                 {question: "Where?", answers: ["Thatg", "Noy1", "No2", "No3"], correct: 1},
                 {question: "When?", answers: ["Thats", "No1w", "No2", "No3"], correct: 2},
                 {question: "What?", answers: ["That", "No1", "No2", "No3"], correct: 0},
                 {question: "Where?", answers: ["Thatg", "Noy1", "No2", "No3"], correct: 1},
                 {question: "When?", answers: ["Thats", "No1w", "No2", "No3"], correct: 2}];

$("#play").on("click", function() {
    newGame();
})

function newGame() {
    $("#play").hide();

    correct = 0,
    incorrect = 0,
    unanswered = 0;

    showTimer();
}

var questionNumber = 0,
    showQuestion,
    time = 20,
    correct = 0,
    incorrect = 0,
    unanswered = 0;

function showTimer() {  
    time = 20;
    questionNumber = 0;

    $("#countdown").show();
    $("#countdown").html(time);
    startCountdown();
    displayQuestion();
}

function displayQuestion() {
    var rightAnswer;
    console.log(questionNumber);

    $("#question").html(questions[questionNumber].question).show();
        $('#answers').empty();

        for(var i = 0; i < 4; i++) {

            var form = document.createElement('form');
            var div = document.createElement('div');
            div.className = 'form-check';
            var select = document.createElement('input');
            select.type = 'radio';
            select.name = 'radio';

            select.value = questions[questionNumber].answers[i];

            var answer = document.createElement('label');
            answer.className = 'form-check-label';
            answer.innerHTML = questions[questionNumber].answers[i] + " ";
            answer.appendChild(select);
            div.appendChild(answer);
            form.appendChild(div);

            document.getElementById('answers').style.display = 'block';
           
            rightAnswer = questions[questionNumber].answers[questions[questionNumber].correct];
            // document.getElementById('answers').appendChild(div);
            $('#answers').append(form);
            
        }
        $('#answers input').on('change', function() {
            chooseAnswer();
        });

    function chooseAnswer() {
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
        $("#question").empty();
        $("#answers").hide();
        $('#answers').empty();
        stopCountdown();
        console.log(showQuestion);

        $("#countdown").hide();
        $("#score").html("<h2>Correct: " + correct + "<br>Incorrect: " + incorrect + "<br>Unanswered: " + unanswered + "</h2>").show();

        $('#play').show();
        $("#play").on("click", function() {
            $("#score").empty();

            newGame();
        })
    }
    else {
        $("#answers").hide();
        $("#answers").empty();
        time = 21;
        count();
        startCountdown();
        displayQuestion(questionNumber);    
    } 
}
  
function startCountdown() {
    if(showQuestion) {
        clearInterval(showQuestion);
        console.log('hi');

    }
    showQuestion = setInterval(count, 1000);

    // if(clockRunning == false) {
    //     clockRunning = true;
    // }
}

function stopCountdown() {
    clearInterval(showQuestion);
    // clockRunning = false;
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