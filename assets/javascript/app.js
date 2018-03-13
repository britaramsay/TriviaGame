// Questions
var questions = [{question: "What?", answers: ["That", "No1", "No2", "No3"], correct: 0},
                 {question: "Where?", answers: ["Thatg", "Noy1", "No2", "No3"], correct: 1},
                 {question: "When?", answers: ["Thats", "No1w", "No2", "No3"], correct: 2},
                 {question: "What?", answers: ["That", "No1", "No2", "No3"], correct: 0},
                 {question: "Where?", answers: ["Thatg", "Noy1", "No2", "No3"], correct: 1},
                 {question: "When?", answers: ["Thats", "No1w", "No2", "No3"], correct: 2}];

// Declare interval id             
var showQuestion;

// Call newGame when play is clicked
$("#play").on("click", function() {
    newGame();
})

function newGame() {
    // Hide play button
    $("#play").hide();
    // Set new game variables
    correct = 0,
    incorrect = 0,
    unanswered = 0;
    // Call showTimer
    showTimer();
}

function showTimer() {  
    // Set variables for a new game
    time = 20;
    questionNumber = 0;
    // Show and set countdown div
    $("#countdown").show();
    $("#countdown").html(time);
    // Start countdown
    startCountdown();
    // Display next question
    displayQuestion();
}

function displayQuestion() {
    var rightAnswer;
    // Set question html
    $("#question").html(questions[questionNumber].question).show();
        $('#answers').empty();

        for(var i = 0; i < 4; i++) {
            // Create form element
            var form = document.createElement('form');
            // Create div element
            var div = document.createElement('div');
            div.className = 'form-check';
            // Create input element
            var select = document.createElement('input');
            select.type = 'radio';
            select.name = 'radio';
            // Set radio button value to current answer
            select.value = questions[questionNumber].answers[i];
            // Create label
            var answer = document.createElement('label');
            answer.className = 'form-check-label';
            // Set label html to possible answer
            answer.innerHTML = questions[questionNumber].answers[i] + " ";
            // Append input to label
            answer.appendChild(select);
            // Append label to div
            div.appendChild(answer);
            // Append label to form
            form.appendChild(div);
            // Show answers div
            document.getElementById('answers').style.display = 'block';
            // Set right answer for this question
            rightAnswer = questions[questionNumber].answers[questions[questionNumber].correct];
            // Append form to answers
            $('#answers').append(form);    
        }
        // When one answer is selected
        $('#answers input').on('change', function() {
            // Call chooseAnswer function
            chooseAnswer();
        });

    function chooseAnswer() {
        console.log($('input[name=radio]:checked', '#answers'));
        // If the value of the radio button checked is the right answer
        if ($('input[name=radio]:checked', '#answers').val() == rightAnswer) {
            // Set message
            var message = "<h2>Correct!</h2><p>";
            // Increment correct answers
            correct++;
            callNextQuestion(message);
        }
        else {
            // Set message
            var message = "<h2>Wrong!</h2><p>The answer is ";
            // Increment incorrect
            incorrect++;
            callNextQuestion(message);
        }
    }
    function callNextQuestion(msg) {
        // Empty possible answers
        $("#answers").empty();
        // Hide question div
        $("#question").hide();
        // Create div for question results
        var questionResults = $("<div>");
        // Set html for question results
        questionResults.html(msg + rightAnswer + "</p>");
        // Append to answers div
        $("#answers").append(questionResults);
        // Stop the countdown
        stopCountdown();
        // Call next question in a few seconds
        setTimeout(nextQuestion, 1000);
    }
}
  
function nextQuestion() {
    // Increment question number
    questionNumber++;
    // If they just answered the last question
    if (questionNumber === questions.length) {
        // Stop the countdown
        stopCountdown();
        // Empty/hide question and answers divs
        $("#question").empty();
        $("#answers").hide();
        $('#answers').empty();
        // Stop countdown
        stopCountdown();
        // Hide countdown
        $("#countdown").hide();
        // Show game score
        $("#score").html("<h2>Correct: " + correct + "<br>Incorrect: " + incorrect + "<br>Unanswered: " + unanswered + "</h2>").show();
        // Show play button to replay
        $('#play').show();
        $("#play").on("click", function() {
            // If play is clicked empty score div
            $("#score").empty();
            // Call newGame
            newGame();
        })
    }
    // If there are still more questions
    else {
        // Hide/empty Q/A divs
        $("#answers").hide();
        $("#answers").empty();
        // Reset time
        time = 21;
        // Call count for first second
        count();
        // Start the countdown
        startCountdown();
        // Display next question
        displayQuestion(questionNumber);    
    } 
}

function startCountdown() {
    // If the ID is defined
    if(showQuestion) {
        // Clear interval
        clearInterval(showQuestion);
    }
    // set interval for count every second
    showQuestion = setInterval(count, 1000);
}

function stopCountdown() {
    // Clear interval ID
    clearInterval(showQuestion);
}
  
function count(){
    // Decrement seconds remaining
    time--;
    // If time has run out
    if (time < 0) {
        // Hide/empty Q/A divs
        $("#question").hide();
        $("#answers").empty();
        // Make div for question results
        var questionResults = $("<div>");
        // Set results html
        questionResults.html("<h2>Out of time</h2><p>The answer is </p>" + questions[questionNumber].answers[questions[questionNumber].correct]);
        // Append to answers
        $("#answers").append(questionResults);
        // Increment unanswered
        unanswered++;
        // Call nextQuestion
        nextQuestion(); 
    }
    else{
        // If there is time left, display updated time value
        $("#countdown").html(time);
    }
}