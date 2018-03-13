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
    unanswered = 0,
    clockRunning = false;

    showTimer();
}

var questionNumber = 0,
    time = 20,
    countdown,
    correct = 0,
    incorrect = 0,
    unanswered = 0,
    clockRunning = false;

function showTimer() {  
    time = 20;
    questionNumber = 0;
    $("#countdown").html(time);
    startCountdown();
    displayQuestion(questionNumber);
}

function displayQuestion(questionNumber) {
    var rightAnswer;

    $("#question").html(questions[questionNumber].question).show();
        $('#answers').empty();

        for(var i = 0; i < 4; i++) {


            /*
            <div class="form-check radio-green">
            <input class="form-check-input" name="group101" type="radio" id="radio103">
            <label class="form-check-label" for="radio103">Option 1</label>


            </div> */
            var form = document.createElement('form');
            var div = document.createElement('div');
            div.className = 'form-check';
            var select = document.createElement('input');
            select.type = 'radio';
            select.name = 'radio';

            // select.className = 'form-check-input';
            // div.appendChild(select);
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
        $('#answers').empty();
        // document.getElementById('answers').innerHTML = "";
        $("#countdown").empty();
        $("#score").html("<h2>Correct: " + correct + "<br>Incorrect: " + incorrect + "<br>Unanswered: " + unanswered + "</h2>").show();

        $('#play').show();
        $("#play").on("click", function() {
            $("#score").empty();
            stopCountdown();

            newGame();
        })
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