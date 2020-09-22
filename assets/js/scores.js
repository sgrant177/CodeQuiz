function printhighscores() {

    var highscore = window.localStorage.getItem("highscores");
    var initials = window.localStorage.getItem("Initials")
    var scoreList = $("#highscore");

    console.log(highscore);
    console.log(initials);
    initialEl = $("<li>");
    initialEl.attr("value", initials);
    scoreList.append(initials);
    scoreEl = $("<li>");
    scoreEl.attr("value", highscore)
    scoreList.append(scoreEl);
}
printhighscores();