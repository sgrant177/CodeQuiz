
var startscreen = $("#start-screen");
var questioncard = $("#question-card");
var nextButton = $("#next");
var start = $("#start-button");
var time = $("#timer");
var timeLimit = 100;
var currentQuestionIndex = 0;
var score = $("#score");
var currentScore = 0;
var allScores = [];
var allInitals = [];

function startQuiz() {
    $(start).on("click", function () {
        startscreen.attr("hidden", true);
        questioncard.attr("hidden", false);
        setTime();
        getQuestions();
        getOptions();
    });
};

function setTime() {
    var timerInterval = setInterval(function () {
        timeLimit--;
        time.text("Timer : " + timeLimit);

        if (timeLimit === 0) {
            questioncard.attr("hidden", true);
            $(".navbar").attr("hidden", true);
            $("#end-screen").attr("hidden", false);
            clearInterval(timerInterval);
            return;
        };

    }, 1000);
};

function getQuestions() {
    var currentQuestion = questions[currentQuestionIndex];
    var question = $("#question");
    question.text(currentQuestion.question);
};

function getOptions() {

    var options = $("#options");
    var currentOptions = questions[currentQuestionIndex].options;
    var answer = questions[currentQuestionIndex].answer;
    var answerSelection = document.createElement("button");
    for (var i = 0; i < currentOptions.length; i++) {
        var optionSelection = document.createElement("button");
        optionSelection.setAttribute("class", "options btn btn-primary");
        optionSelection.setAttribute("id", "incorrect");
        optionSelection.setAttribute("value", currentOptions[i]);
        optionSelection.textContent = currentOptions[i]
        options.append(optionSelection);
    };
    answerSelection.setAttribute("class", "options btn btn-primary");
    answerSelection.setAttribute("id", "answer");
    answerSelection.setAttribute("value", answer);
    answerSelection.textContent = answer;
    options.append(answerSelection);
};

$(start).on("click", startQuiz());

$("#options").on("click", function () {

    var button = $(".options");
    var question = $("#question");
    var newQuestion = questions[currentQuestionIndex++];

    question.text(newQuestion.question);
    button.remove();
    getQuestions();
    getOptions();

    if (currentQuestionIndex === questions.length - 1) {
        questioncard.attr("hidden", true);
        $(".navbar").attr("hidden", true);
        $("#end-screen").attr("hidden", false);
        $("#final-score").text("You scored " + currentScore);
    };

});

$(document).on("click", "#answer", function () {
    currentScore = currentScore + 100;
    score.text(currentScore);
});

$(document).on("click", "#incorrect", function () {
    timeLimit = timeLimit - 10;
    time.text("Timer : " + timeLimit);
});

$("#submit").on("click", function (event) {
    event.preventDefault();
    saveScores();
    window.location.href="highscores.html";
});

function saveScores() {
    var userInitals = $("#user-initials").val();
    console.log(userInitals);
    localStorage.setItem("Initials", userInitals);
    localStorage.setItem("highscores", JSON.stringify(currentScore));
}

