const operator = $('#operator');
const numberOfButtons = 5;
const feedbackSelector = $('#feedback')
const firstNumSelector = $('#first-num')
const secondNumSelector = $('#second-num')
const numCorrectSelector = $('#num-correct')
const numTotalSelector = $('#num-total')
const btnContainerSelector = $("#button-container");
let isQuestionInProgress = false
let numCorrect = 0;
let numTotal = 0;
let addition = false;
let firstNum;
let secondNum
let operation;
generateQuestion();
$('#reset').click(function(){
    numCorrect = 0;
    numTotal = 0;
    numCorrectSelector.text(numCorrect)
    numTotalSelector.text(numTotal)
    generateQuestion()
})

function generateQuestion() {
    additionOrSubtraction()

    var chosenOne = generateStartingNums()

    const btnArr = [];

    console.log("ChosenOneBeforePush: "+chosenOne)
    btnArr.push(chosenOne)
    console.log('Pushed Chosen One: ' + chosenOne)

    for (let i = 1; i <= numberOfButtons; i++) {
        const button = $('#btn' + i);
        button.off('click');
    }
    //construct array


    for (let i = 0; i < 4; i++) {
        populateArray(btnArr)
    }

    btnArr.sort(function(a, b) {
        return a - b;
    });
    console.log('sorted: ' + btnArr)
    let j = 1
    for (let i = 0; i < numberOfButtons; i++) {
        console.log("In the loop: " + btnArr[i])
        if(btnArr[i] === chosenOne) {
            const chosenBtn = $('#btn'+ j)
            chosenBtn.text(chosenOne)
            chosenBtn.click(function () {
                feedbackSelector.removeClass("text-danger");
                feedbackSelector.addClass("text-success");
                feedbackSelector.text("Correct!");
                numTotal++
                numCorrect++
                numTotalSelector.text(numTotal)
                numCorrectSelector.text(numCorrect)
                console.log('Correct')
                generateQuestion()
            })
            console.log("Created Button: " + j)
        } else {
            const btn = $('#btn' + j)
            btn.text(btnArr[i])
            btn.click(function () {
                feedbackSelector.removeClass("text-success")
                feedbackSelector.addClass("text-danger")
                feedbackSelector.text(`Wrong. ${firstNum} ${operation} ${secondNum} = ${chosenOne}`)
                numTotal++
                numTotalSelector.text(numTotal)
                console.log('incorrect')
                generateQuestion()
            })
            console.log("Created Button: " + j);
        }
        j++;
    }
    console.log('..............Exiting generateQuestion');
}

function populateArray(btnArr){
    const randomNumber = generateNumber()
    if (!btnArr.includes(randomNumber)) {
     btnArr.push(randomNumber);
    } else {
       populateArray(btnArr)
    }
}
function generateNumber(){
    let num;
    if(addition){
         num = Math.floor(Math.random() * (199 - 21)) + 21
    }else{
        num = Math.floor(Math.random() * (100-11)) + 11
    }
    return num
}
function additionOrSubtraction () {
    const coinFlip = Math.random() < 0.5
    if(coinFlip) {
        operation = '+'
        operator.text(operation)
        console.log('addition')

        addition = true;
    }else{
        operation = '-'
        operator.text(operation)
        console.log('subtraction')
        addition = false;
    }
}

function generateStartingNums() {
    let chosenOne = 0;
    firstNum = generateFirstNumber();
    secondNum = generateSecondNumber();

    if (!addition && firstNum - secondNum <= 0) {
        return generateStartingNums(); // Return the result of the recursive call
    } else {
        if (addition) {
            console.log("Answer:" + (firstNum + secondNum));
            chosenOne = firstNum + secondNum; // Assign the value to chosenOne
        } else {
            console.log("Answer:" + (firstNum - secondNum));
            chosenOne = firstNum - secondNum; // Assign the value to chosenOne
        }
        return chosenOne; // Return the final chosenOne value
    }
}

function generateFirstNumber(){
    let num = Math.floor(Math.random() * (100-11) + 11)
    console.log("Generated firstNum: "+ num)
    firstNumSelector.text(num)
    return num
}
function generateSecondNumber(){
    let num = Math.floor(Math.random() * (99 - 10) + 10);
    console.log("Generated secondNum: "+ num)
    secondNumSelector.text(num)
    return num
}


