// Questions
var questions = [{question: "Which song have members of the gang never sang together?", answers: ["'Space Oddity' by David Bowie", "'Psycho Killer' by Talking Heads", "'Just A Friend' by Biz Markie", "'MotownPhilly' By Boyz II Men"], correct: 0, gif: "assets/images/boyziimen.gif"},
                 {question: "How many times does Charlie's mom believe she must flip light switches to prevent Charlie from dying?", answers: [5, 7, 3, 4], correct: 2, gif:"assets/images/charlie-mom.jpg"},
                 {question: "Which character stalks the waitress?", answers: ["Mac", "Dee", "Charlie", "Dennis"], correct: 2, gif: "assets/images/charlie-waitress.gif"},
                 {question: "Which is not a drawing from Charlie's dream book?", answers: ["Tooth Oven", "Worm Hat", "Bird with Teeth", "Denim Chicken"], correct: 0, gif: "assets/images/charlie-dream.gif"},
                 {question: "What was Dee's nickname in school?", answers: ["Dr. Mantis Toboggan", "Aluminum Monster", "The Professor", "Wildcard"], correct: 1, gif: "assets/images/Aluminum-Monster.gif"},
                 {question: "What is the McPoyle's favorite drink?", answers: ["Apple Juice", "Coffee", "Grape Juice", "Milk"], correct: 3, gif: "assets/images/mcpoyles.gif"},
                 {question: "What was Cricket's origional profession??", answers: ["Waiter", "Preacher", "Dog Walker", "Teahcer"], correct: 1, gif: "assets/images/cricket.gif"},
                 {question: "Who played the Nightman in 'The Nightman Cometh'?", answers: ["Charlie", "Frank", "Dennis", "Mac"], correct: 3, gif: "assets/images/nightman.gif"},
                 {question: "Which character gets 'salted' in the show?", answers: ["Maureen Ponderosa", "Gail the Snail", "The Waitress", "Artemis"], correct: 1, gif: "assets/images/snail.gif"},
                 {question: "What does the tattoo that Charlie gave himself say?", answers: ["Waitress", "Asleep", "Ladder", "Badnew"], correct: 3, gif: "assets/images/badnew.jpg"}];

// Declare interval id             
var showQuestion;
var rightAnswer;

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
    rightAnswer = '';
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
    // var rightAnswer;
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
            // Set right answer for this question
            rightAnswer = questions[questionNumber].answers[questions[questionNumber].correct];
            // Append form to answers
            $('#answers').append(form).show();    
        }
        // When one answer is selected
        $('#answers input').on('change', function() {
            // Call chooseAnswer function
            chooseAnswer();
        });

    function chooseAnswer() {
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
    
}

function callNextQuestion(msg) {
    // Empty possible answers
    $("#answers").empty();
    // Hide question div
    $("#question").hide();
    // Create div for question results
    var questionResults = $("<div>");
    // Set html for question results
    questionResults.append(msg + rightAnswer);

    questionResults.append($('<img>',{id:'gif',src:questions[questionNumber].gif}));
    // Append to answers div
    $("#answers").append(questionResults);
    // Stop the countdown
    stopCountdown();
    // Call next question in a few seconds
    setTimeout(nextQuestion, 5 * 1000);
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
        // Increment unanswered
        unanswered++;
        // Set message
        var message = "<h2>Out of time</h2><p>The answer is ";
        callNextQuestion(message);
    }
    else{
        // If there is time left, display updated time value
        $("#countdown").html(time);
    }
}