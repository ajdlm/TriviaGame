$(document).ready(function () {
    var myGlobal = {
        questionTimer: 0,

        questionOptions: [
            {
                question: "Which kingdom became the dominant power in England during the 8th century?",
                answer1: "Wessex",
                answer2: "Mercia",
                answer3: "East Anglia",
                answer4: "Northumbria",
                correctAnswer: "answer2"
            },

            {
                question: "Who was the first to rule as king of a united England?",
                answer1: "Alfred the Great",
                answer2: "William the Conqueror",
                answer3: "Æthelstan",
                answer4: "Edward the Elder",
                correctAnswer: "answer3"
            },

            {
                question: "Who was the last English king from the House of Wessex?",
                answer1: "Edgar Ætheling",
                answer2: "Æthelred Unræd",
                answer3: "Ælfweard",
                answer4: "Edward the Confessor",
                correctAnswer: "answer4"
            },
            
            {
                question: "What Anglo-Saxon name was Emma of Normandy given when she became Queen of England?",
                answer1: "Hild",
                answer2: "Ælfgifu",
                answer3: "Wulfhild",
                answer4: "Ælfflæd",
                correctAnswer: "answer2"
            },

            {
                question: "What did the Old English term Ætheling mean?",
                answer1: "prince or throne-worthy",
                answer2: "ruler of all Britain",
                answer3: "hero or champion",
                answer4: "holy man",
                correctAnswer: "answer1"
            },

            {
                question: "What was the weregild?",
                answer1: "The highest honor one could receive for valor in battle.",
                answer2: "The quality of being a great king.",
                answer3: "The ransom paid for a captured aristocrat.",
                answer4: "The amount of money paid in compensation for crippling or murdering someone.",
                correctAnswer: "answer4"
            },

            {
                question: "What was the seax, from which the Saxons derived their name?",
                answer1: "a knife or short sword",
                answer2: "a battleaxe",
                answer3: "a large, mallet-like hammer",
                answer4: "a short spear",
                correctAnswer: "answer1"
            },

            {
                question: "Which Anglo-Saxon king personally corresponded with Charlemagne?",
                answer1: "Æthelheard of Wessex",
                answer2: "Ælfwine of Deira",
                answer3: "Rædwulf of Northumbria",
                answer4: "Offa of Mercia",
                correctAnswer: "answer4"
            },

            {
                question: "Where in England did the vikings famously raid in CE 793?",
                answer1: "the monastery at Lindisfarne",
                answer2: "the Isle of Sheppey",
                answer3: "the Kentish coast",
                answer4: "Monkwearmouth–Jarrow Abbey",
                correctAnswer: "answer1"
            },

            {
                question: "Which Danish king converted to Christianity after being defeated in battle by Alfred the Great?",
                answer1: "Sweyn Forkbeard",
                answer2: "Harald Bluetooth",
                answer3: "Guthrum",
                answer4: "Ivar the Boneless",
                correctAnswer: "answer3"
            }
        ],

        correctAnswer: ""
    };

    function newQuestion() {
        $("#triviaDiv").empty();

        var questionChoice = Math.floor(Math.random() * myGlobal.questionOptions.length);

        var chosenQuestion = myGlobal.questionOptions[questionChoice];

        var nextQuestion = $("<div>");

        myGlobal.questionTimer = 30;

        var timeRemaining = $("<h2>");

        timeRemaining.text("Time Remaining: 30 Seconds");

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
    };

    $("#triviaDiv").on("click", "#startButton", function () {
        newQuestion();
    });
});