$(document).ready(function() {
    var myGlobal = {
        questionTimer: 0,
        questionOptions: [

        ]
    };

    function newQuestion() {
        $("#triviaDiv").empty();

        var nextQuestion = $("<div>");

        var timeRemaining = $("<h2>");

        timeRemaining.text("Time Remaining: 30 Seconds");

        var question = $("<h2>");

        //question.text

        myGlobal.questionTimer = 30;

        nextQuestion.append();        
    };

    $("#triviaDiv").on("click", "#startButton", function() {
        newQuestion();
    });
});