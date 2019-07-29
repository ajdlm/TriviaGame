$(document).ready(function () {
    var myGlobal = {
        questionTimer: 0,

        timesUp: false,

        questionOptions: [
            {
                question: "Which kingdom became the dominant power in England during the 8th century?",
                answer1: "Wessex",
                answer2: "Mercia",
                answer3: "East Anglia",
                answer4: "Northumbria",
                correctAnswer: "answer2",
                image: "assets/images/flag-of-mercia.png"
            },

            {
                question: "Who was the first to rule as king of a united England?",
                answer1: "Alfred the Great",
                answer2: "William the Conqueror",
                answer3: "Æthelstan",
                answer4: "Edward the Elder",
                correctAnswer: "answer3",
                image: "assets/images/athelstan-portrait.jpg"
            },

            {
                question: "Who was the last English king from the House of Wessex?",
                answer1: "Edgar Ætheling",
                answer2: "Æthelred Unræd",
                answer3: "Ælfweard",
                answer4: "Edward the Confessor",
                correctAnswer: "answer4",
                image: "assets/images/edward-the-confessor.jpg"
            },

            {
                question: "What Anglo-Saxon name was Emma of Normandy given when she became Queen of England?",
                answer1: "Hild",
                answer2: "Ælfgifu",
                answer3: "Wulfhild",
                answer4: "Ælfflæd",
                correctAnswer: "answer2",
                image: "assets/images/emma-of-normandy.jpg"
            },

            {
                question: "What did the Old English term Ætheling mean?",
                answer1: "prince or throne-worthy",
                answer2: "ruler of all Britain",
                answer3: "hero or champion",
                answer4: "holy man",
                correctAnswer: "answer1",
                image: "assets/images/harold-godwinson.jpg"
            },

            {
                question: "What was the Old English term for the amount of money paid in compensation for crippling or murdering someone?",
                answer1: "danegeld",
                answer2: "bretwalda",
                answer3: "gaderung",
                answer4: "weregild",
                correctAnswer: "answer4",
                image: "assets/images/weregild-payment.png"
            },

            {
                question: "What was the seax, from which the Saxons derived their name?",
                answer1: "a knife or short sword",
                answer2: "a battleaxe",
                answer3: "a large, mallet-like hammer",
                answer4: "a short spear",
                correctAnswer: "answer1",
                image: "assets/images/seax.jpg"
            },

            {
                question: "Which Anglo-Saxon king personally corresponded with Charlemagne?",
                answer1: "Æthelheard of Wessex",
                answer2: "Ælfwine of Deira",
                answer3: "Rædwulf of Northumbria",
                answer4: "Offa of Mercia",
                correctAnswer: "answer4",
                image: "assets/images/offa-coin.jpg"
            },

            {
                question: "Where in England did the vikings famously raid in CE 793?",
                answer1: "the monastery at Lindisfarne",
                answer2: "the Isle of Sheppey",
                answer3: "the Kentish coast",
                answer4: "Monkwearmouth–Jarrow Abbey",
                correctAnswer: "answer1",
                image: "assets/images/lindisfarne.jpg"
            },

            {
                question: "Which Danish king converted to Christianity after being defeated in battle by Alfred the Great?",
                answer1: "Sweyn Forkbeard",
                answer2: "Harald Bluetooth",
                answer3: "Guthrum",
                answer4: "Ivar the Boneless",
                correctAnswer: "answer3",
                image: "assets/images/guthrum-conversion.jpg"
            }
        ],

        questionsFinished: [],

        correctAnswer: "",

        correctAnswerNumber: "",

        currentImage: "",

        timerInterval: "",

        correctAnswerCount: 0,

        incorrectAnswerCount: 0,

        unansweredCount: 0
    };

    function correctChoice() {
        clearInterval(myGlobal.timerInterval);

        myGlobal.correctAnswerCount++;

        $(".deleteThis").remove();

        var sayCorrect = $("<h2>");

        sayCorrect.text("Correct!");

        var answerImage = $("<img>");

        answerImage.attr("src", myGlobal.currentImage).addClass("my-3").css("border-style", "solid").css("border-color", "#ffc107").css("border-width", "5px").css("border-radius", "10px");

        $("#triviaDiv").append("<br />", sayCorrect, "<br />", answerImage);

        queueQuestion();
    };

    function incorrectChoice() {
        clearInterval(myGlobal.timerInterval);

        myGlobal.incorrectAnswerCount++;

        $(".deleteThis").remove();

        var sayNope = $("<h2>");

        sayNope.text("Nice try!")

        var showCorrectAnswer = $("<h2>");

        showCorrectAnswer.text("Correct Answer: " + myGlobal.correctAnswer);

        var answerImage = $("<img>");

        answerImage.attr("src", myGlobal.currentImage).addClass("my-3").css("border-style", "solid").css("border-color", "#ffc107").css("border-width", "5px").css("border-radius", "10px");

        $("#triviaDiv").append("<br />", sayNope, "<br />", showCorrectAnswer, "<br />", answerImage);

        queueQuestion();
    };

    function tooLate() {
        myGlobal.unansweredCount++;

        var outOfTime = $("<h2>");

        outOfTime.text("Out of time!");

        var showCorrectAnswer = $("<h2>");

        showCorrectAnswer.text("Correct Answer: " + myGlobal.correctAnswer);

        var answerImage = $("<img>");

        answerImage.attr("src", myGlobal.currentImage).addClass("my-3").css("border-style", "solid").css("border-color", "#ffc107").css("border-width", "5px").css("border-radius", "10px");

        $("#triviaDiv").append("<br />", outOfTime, "<br />", showCorrectAnswer, "<br />", answerImage);

        queueQuestion();
    };

    function gameFinished() {
        var allDone = $("<h2>");

        allDone.text("You finished! Here are your results:");

        var correctAnswerResults = $("<h3>");

        correctAnswerResults.text("Correct Answers: " + myGlobal.correctAnswerCount);

        var incorrectAnswerResults = $("<h3>");

        incorrectAnswerResults.text("Incorrect Answers: " + myGlobal.incorrectAnswerCount);

        var unansweredResults = $("<h3>");
        
        unansweredResults.text("Unanswered: " + myGlobal.unansweredCount);

        var restartButton = $("<button>");

        restartButton.text("Try Again").addClass("btn btn-warning").attr("id", "restartButton");

        $("#triviaDiv").empty().append(allDone, "<br />", correctAnswerResults, "<br />", incorrectAnswerResults, "<br />", unansweredResults, "<br />", restartButton);
    };

    function newQuestion() {
        $("#triviaDiv").empty();

        var questionChoice = Math.floor(Math.random() * myGlobal.questionOptions.length);

        var chosenQuestion = myGlobal.questionOptions[questionChoice];

        myGlobal.questionsFinished.push(chosenQuestion);

        myGlobal.questionOptions.splice(questionChoice, 1);

        myGlobal.correctAnswerNumber = chosenQuestion.correctAnswer;

        if (chosenQuestion.correctAnswer === "answer1") {
            myGlobal.correctAnswer = chosenQuestion.answer1;
        }

        else if (chosenQuestion.correctAnswer === "answer2") {
            myGlobal.correctAnswer = chosenQuestion.answer2;
        }

        else if (chosenQuestion.correctAnswer === "answer3") {
            myGlobal.correctAnswer = chosenQuestion.answer3;
        }

        else {
            myGlobal.correctAnswer = chosenQuestion.answer4;
        };

        myGlobal.currentImage = chosenQuestion.image;

        var nextQuestion = $("<div>");

        myGlobal.questionTimer = 30;

        var timeRemaining = $("<h2>");

        timeRemaining.text("Time Remaining: 30 Seconds").addClass("keepACount");

        var question = $("<h2>");

        question.text(chosenQuestion.question);

        var answer1 = $("<h1>");

        answer1.text(chosenQuestion.answer1).attr("id", "answerOne").addClass("possibleAnswer").css("cursor", "pointer");
        
        var answer2 = $("<h1>");

        answer2.text(chosenQuestion.answer2).attr("id", "answerTwo").addClass("possibleAnswer").css("cursor", "pointer");

        var answer3 = $("<h1>");

        answer3.text(chosenQuestion.answer3).attr("id", "answerThree").addClass("possibleAnswer").css("cursor", "pointer");

        var answer4 = $("<h1>");

        answer4.text(chosenQuestion.answer4).attr("id", "answerFour").addClass("possibleAnswer").css("cursor", "pointer");

        nextQuestion.append("<br />", question, "<br />", answer1, answer2, answer3, answer4).addClass("deleteThis");

        $("#triviaDiv").append(timeRemaining, nextQuestion);

        if (!myGlobal.timesUp) {
            myGlobal.timerInterval = setInterval(function () {
                myGlobal.questionTimer--;
                $(".keepACount").text("Time Remaining: " + myGlobal.questionTimer + " Seconds");
                if (myGlobal.questionTimer === 0) {
                    myGlobal.timesUp = true;
                    clearInterval(myGlobal.timerInterval);
                    $(".deleteThis").remove();
                    tooLate();
                };
            }, 1000);
        };
    };

    function queueQuestion() {
        if (myGlobal.questionOptions.length > 0) {
            setTimeout(newQuestion, 3000);
        }

        else {
            setTimeout(gameFinished, 3000);
        };
    };

    $("#triviaDiv").on("mouseenter", ".possibleAnswer", function() {
        $(this).addClass("bg-warning text-danger");
    });

    $("#triviaDiv").on("mouseleave", ".possibleAnswer", function() {
        $(this).removeClass("bg-warning text-danger");
    });

    // function(){ $(this).removeClass("bg-warning") }
    $("#triviaDiv").on("click", "#startButton", function () {
        newQuestion();
    });

    $("#triviaDiv").on("click", "#answerOne", function () {
        if (myGlobal.correctAnswerNumber === "answer1") {
            correctChoice();
        }

        else {
            incorrectChoice();
        };
    });

    $("#triviaDiv").on("click", "#answerTwo", function () {
        if (myGlobal.correctAnswerNumber === "answer2") {
            correctChoice();
        }

        else {
            incorrectChoice();
        };
    });

    $("#triviaDiv").on("click", "#answerThree", function () {
        if (myGlobal.correctAnswerNumber === "answer3") {
            correctChoice();
        }

        else {
            incorrectChoice();
        };
    });

    $("#triviaDiv").on("click", "#answerFour", function () {
        if (myGlobal.correctAnswerNumber === "answer4") {
            correctChoice();
        }

        else {
            incorrectChoice();
        };
    });

    $("#triviaDiv").on("click", "#restartButton", function () {
        myGlobal.questionOptions = myGlobal.questionsFinished;

        myGlobal.questionsFinished = [];

        myGlobal.correctAnswerCount = 0;

        myGlobal.incorrectAnswerCount = 0;

        myGlobal.unansweredCount = 0;

        newQuestion();
    });
});