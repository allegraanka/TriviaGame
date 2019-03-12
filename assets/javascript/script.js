
var timer;
var intervalId;
var clockRunning = false;
var correct = 0;
var wrong = 0;
var randomQuestion;
$("#correctScore").hide();
$("#wrongScore").hide();

$("#startButton").on("click", getQuestion);
$("#startButton").on("click", showScores);

function getQuestion() {
    randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    if (!clockRunning) {
        countdown = 30;
        $("#clock").text(countdown);
        $("#question-container").text(randomQuestion.question);
        renderAnswers();
        timer = setTimeout(timeUp, 1000 * 30);
        clockRunning = true;
        intervalId = setInterval(function () {
            $("#clock").text(countdown);
            countdown--;
            if (countdown === 0) {
                clockRunning = false;
                $("#clock").text("Time's up! The correct answer is " + randomQuestion.answer + ". Try again?");
                clearInterval(intervalId);
            }
        }, 1000);
    }
    $("#startButton").hide();
}

function renderAnswers() {
    $("#answers-container").empty();
    for (var i = 0; i < randomQuestion.ansOptions.length; i++) {
        var newListItem = $("<li>");
        newListItem.addClass("ans-item");
        $(newListItem).text(randomQuestion.ansOptions[i]);
        $("#answers-container").append(newListItem);
    }
}

$(document).on("click", ".ans-item", function() {
    var currentChoice = $(this).text();
    if (randomQuestion.answer === currentChoice) {
        clockRunning = false;
        correct++;
        $("#correctScore").text(correct);
        clearTimeout(timer);
        clearInterval(intervalId);
        $("#clock").empty();
        $("#answers-container").empty();
        $("#question-container").text(currentChoice + " is correct!");
        setTimeout(getQuestion, 3500);
    } else if (randomQuestion !== currentChoice) {
        clockRunning = false;
        wrong++;
        $("#wrongScore").text(wrong);
        clearTimeout(timer);
        clearInterval(intervalId);
        $("#clock").empty();
        $("#answers-container").empty();
        $("#question-container").text("Wrong. You chose " + currentChoice + ". The correct answer is " + randomQuestion.answer + ".");
        setTimeout(getQuestion, 3500);
    }
});

function timeUp() {
    clockRunning = false;
    clearTimeout(timer);
    $("#question-container").empty();
    $("#answers-container").empty();
    setTimeout(getQuestion, 3500);
}

function resetGame() {
    clockRunning = false;
    correct = 0;
    wrong = 0;
    $("#question-container").empty();
    $("#answers-container").empty();
    $("#startButton").show().text("Play again.");
}

function showScores() {
    $("#correctScore").text("0").show();
    $("#wrongScore").text("0").show();
}