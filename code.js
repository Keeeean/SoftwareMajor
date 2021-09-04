function driver() {
    console.log(questions);
}
//SDDs HTML Start Quiz Button is clicked

function SDDQuiz() {
    questions = SDDQuestions(); // forming the questions array
    rules_box.classList.add("activeInfo");
    start_btn.style.display = "none";
}

const start_btn = document.querySelector(".start_btn button");
const rules_box = document.querySelector(".rules_box");
const exit_btn = rules_box.querySelector(".rules_buttons .quit");
const continue_btn = rules_box.querySelector(".rules_buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff  = quiz_box.querySelector("header .time_text");


exit_btn.onclick = ()=>{
    rules_box.classList.remove("activeInfo");
    start_btn.style.display = "block";
}

continue_btn.onclick = ()=> {
    rules_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;


const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");


restart_quiz.onclick = ()=>{
    window.location.reload();
}



// we need to make so that when the "next button" is clicked, it will show the next question along with the
// options of new question, as well as updating the current question out of how many there is in total.

next_btn.onclick = () =>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";
    }
    else {
        console.log("Questions completed.");
        showResultBox();
    }

}

function showQuestions(index) { // shows the current questions
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;

    if (userAns === correctAns) {
        answer.classList.add("correct");
        console.log("Answer is correct");
        userScore += 1;
    }
    else {
        answer.classList.add("incorrect");
        console.log("Answer is wrong.");

        for(let i = 0; i <allOptions; i++) {
            if(option_list.children[i].textContent === correctAns){
                option_list.children[i].setAttribute("class", "option correct");
            }
        }
    }
    // have to disable the user from selecting another option.
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0"+ addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for(let i = 0; i < allOptions; i++){
                if(option_list.children[i].textContent === correctAns){
                    option_list.children[i].setAttribute("class", "option correct");

                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer(){
        time +=1 ;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}


function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    bottom_ques_counter.innerHTML = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';

}

function showResultBox(){
    rules_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    scoreText.innerHTML = '<span>You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>'
}