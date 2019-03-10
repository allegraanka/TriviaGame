
var timer;
var intervalId;
var clockRunning = false;
var randomQuestion = questions[Math.floor(Math.random() * questions.length)];
$("#startButton").on("click", getQuestion);

function getQuestion() {
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
        clearTimeout(timer);
        clearInterval(intervalId);
        $("#clock").empty();
        $("#answers-container").empty();
        $("#question-container").text("Correct! You chose " + currentChoice + ".");
        setTimeout(getQuestion, 3500);
    } else if (randomQuestion !== currentChoice) {
        clockRunning = false;
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