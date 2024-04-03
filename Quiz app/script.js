const questions = [

    {
        question:"When a student is eligible for GAT exam ?",
        answers:[
            {text: "After 10th" ,correct:false},
            {text: "After Graduation" ,correct:true},
            {text: "After 12th" ,correct:false},
            {text: "After post Graduation" ,correct:false}
        ]
    },
    {
        question:"When a student is eligible for JEE-Mains exam ?",
        answers:[
            {text: "After 10th" ,correct:false},
            {text: "After Graduation" ,correct:false},
            {text: "After 12th" ,correct:true},
            {text: "After post Graduation" ,correct:false}
        ]
    },
    {
        question:"When a student is eligible for JEE-advance exam ?",
        answers:[
            {text: "After clearing JEE-mains" ,correct:true},
            {text: "After graduation" ,correct:false},
            {text: "After 12th" ,correct:false},
            {text: "After post Graduation" ,correct:false}
        ]
    }
    
    
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQueston();

}
function showQueston()
{   resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct  = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true" ;
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");

    }
    Array.from(answerButtons.children).forEach(button =>{ if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQueston();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
       handleNextButton(); 
    }else{
        startQuiz();
    }
});

startQuiz();

