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
                image: "../images/flag-of-mercia.png"
            },

            {
                question: "Who was the first to rule as king of a united England?",
                answer1: "Alfred the Great",
                answer2: "William the Conqueror",
                answer3: "Æthelstan",
                answer4: "Edward the Elder",
                correctAnswer: "answer3",
                image: "../images/athelstan-portrait.jpg"
            },

            {
                question: "Who was the last English king from the House of Wessex?",
                answer1: "Edgar Ætheling",
                answer2: "Æthelred Unræd",
                answer3: "Ælfweard",
                answer4: "Edward the Confessor",
                correctAnswer: "answer4",
                image: "../images/edward-the-confessor.jpg"
            },

            {
                question: "What Anglo-Saxon name was Emma of Normandy given when she became Queen of England?",
                answer1: "Hild",
                answer2: "Ælfgifu",
                answer3: "Wulfhild",
                answer4: "Ælfflæd",
                correctAnswer: "answer2",
                image: "../images/emma-of-normandy.jpg"
            },

            {
                question: "What did the Old English term Ætheling mean?",
                answer1: "prince or throne-worthy",
                answer2: "ruler of all Britain",
                answer3: "hero or champion",
                answer4: "holy man",
                correctAnswer: "answer1",
                image: "../images/harold-godwinson.jpg"
            },

            {
                question: "What was the weregild?",
                answer1: "The highest honor one could receive for valor in battle.",
                answer2: "The quality of being a great king.",
                answer3: "The ransom paid for a captured aristocrat.",
                answer4: "The amount of money paid in compensation for crippling or murdering someone.",
                correctAnswer: "answer4",
                image: "../images/weregild-payment.png"
            },

            {
                question: "What was the seax, from which the Saxons derived their name?",
                answer1: "a knife or short sword",
                answer2: "a battleaxe",
                answer3: "a large, mallet-like hammer",
                answer4: "a short spear",
                correctAnswer: "answer1",
                image: "../images/seax.jpg"
            },

            {
                question: "Which Anglo-Saxon king personally corresponded with Charlemagne?",
                answer1: "Æthelheard of Wessex",
                answer2: "Ælfwine of Deira",
                answer3: "Rædwulf of Northumbria",
                answer4: "Offa of Mercia",
                correctAnswer: "answer4",
                image: "../images/offa-coin.jpg"
            },

            {
                question: "Where in England did the vikings famously raid in CE 793?",
                answer1: "the monastery at Lindisfarne",
                answer2: "the Isle of Sheppey",
                answer3: "the Kentish coast",
                answer4: "Monkwearmouth–Jarrow Abbey",
                correctAnswer: "answer1",
                image: "../images/lindisfarne.jpg"
            },

            {
                question: "Which Danish king converted to Christianity after being defeated in battle by Alfred the Great?",
                answer1: "Sweyn Forkbeard",
                answer2: "Harald Bluetooth",
                answer3: "Guthrum",
                answer4: "Ivar the Boneless",
                correctAnswer: "answer3",
                image: "../images/guthrum-conversion.jpg"
            }
        ],

        correctAnswer: "",

        currentImage: ""
    };

    function tooLate() {
        $("#triviaDiv").empty();

        var outOfTime = $("<h2>");

        outOfTime.text("Out of time!");

        var showCorrectAnswer = $("<h2>");

        showCorrectAnswer.text("Correct Answer: " + myGlobal.correctAnswer);

        var answerImage = $("<img>");

        answerImage.attr("src", myGlobal.currentImage);
    };

    function newQuestion() {
        $("#triviaDiv").empty();

        var questionChoice = Math.floor(Math.random() * myGlobal.questionOptions.length);

        var chosenQuestion = myGlobal.questionOptions[questionChoice];

        myGlobal.correctAnswer = chosenQuestion.correctAnswer;

        myGlobal.currentImage = chosenQuestion.image;

        var nextQuestion = $("<div>");

        myGlobal.questionTimer = 30;

        var timeRemaining = $("<h2>");

        timeRemaining.text("Time Remaining: 30 Seconds").addClass("keepACount");

        var question = $("<h2>");

        question.text(chosenQuestion.question);

        var answer1 = $("<h1>");

        answer1.text(chosenQuestion.answer1);

        var answer2 = $("<h1>");

        answer2.text(chosenQuestion.answer2);

        var answer3 = $("<h1>");

        answer3.text(chosenQuestion.answer3);

        var answer4 = $("<h1>");

        answer4.text(chosenQuestion.answer4);

        nextQuestion.append(timeRemaining, "<br />", question, "<br />", answer1, answer2, answer3, answer4).addClass("text-warning");

        $("#triviaDiv").append(nextQuestion);

        if (!myGlobal.timesUp) {
            var timerInterval = setInterval(function () {
                myGlobal.questionTimer--;
                $(".keepACount").text("Time Remaining: " + myGlobal.questionTimer + " Seconds");
                if (myGlobal.questionTimer === 0) {
                    myGlobal.timesUp = true;
                    clearInterval(timerInterval);
                    tooLate();
                };
            }, 1000);
        };
    };

    $("#triviaDiv").on("click", "#startButton", function () {
        newQuestion();
    });
});