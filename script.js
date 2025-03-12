'use strict'
// 1行目に記載している 'use strict' は削除しないでください

const handName = {
    0 : "self-one",
    1 : "self-two",
    2 : "self-three",
    3 : "self-four",
    4 : "self-five",
    5 : "self-six",
    6 : "self-choice",
    7 : "self-four-dice",
    8 : "self-full-house",
    9 : "self-min-straight",
    10 : "self-max-straight",
    11 : "self-yocht",
}; 
// const handNamePlayer2 = {
//   0 : "com-one",
//   1 : "com-two",
//   2 : "com-three",
//   3 : "com-four",
//   4 : "com-five",
//   5 : "com-six",
//   6 : "com-choice",
//   7 : "com-four-dice",
//   8 : "com-full-house",
//   9 : "com-min-straight",
//   10 : "com-max-straight",
//   11 : "com-yocht",
// }; 

const initialValue = 0;
let sum=0;
let resultDisplayCount = 0;
let img_element = document.createElement("img");
let rollNum = 0;
let total =0;
let rollCount = 0;
const diceResult = [];
const preDiceResult = [];
const lastResult =[0,0,0,0,0,0,0,0,0,0,0,0,];
const tempResult =[0,0,0,0,0,0,0,0,0,0,0,0,0];
const judgeRoleDice = [0,0,0,0,0];

// function ikasama(){
//   let dest = Math.floor( Math.random() * 5) + 1;
//   if( dest === 1 ){
//     let dice = window.prompt("5ケタ入力");
//     console.log(dice)
//     const result = [];
//     for(const element of dice){
//       result.push(Number(element));
//     }
//     return handCalc(result);
//   }
// }

//サイコロを振る
//サイコロ5個の目を配列に保存

function rollDice(){
  rollCount= rollCount + 1; 
  if(rollCount > 3){
    window.alert("役を選択してください");
  }else{
    for(let i=0; i<=4; i++) {
      let number = Math.floor( Math.random() * 6) + 1;
      if(rollCount != 1){
        preDiceResult[i] = diceResult[i];
      }
      diceResult[i] = number;
    }
    console.log("aaaaa")
    return chooseDiceCalc(diceResult,preDiceResult);
  }
}

function chooseDiceCalc(diceResult,preDiceResult){
  let diceChooseClass = document.getElementsByClassName("choose");
  let dice = document.getElementsByName("dice")
  for(const element of diceChooseClass){
    diceResult[element.id -1] = preDiceResult[element.id -1];
  }

  for(const element of dice){
    element.src = `${diceResult[element.id - 1]}.jpg`;
  }
  handCalc(diceResult)

}

// let sum=0;
// let resultDisplayCount = 0;
// let total =0;
// const lastResult =[0,0,0,0,0,0,0,0,0,0,0,0,];
// const tempResult =[0,0,0,0,0,0,0,0,0,0,0,0,0];
// function player1(diceResult){

  // const judgeRoleDice = [0,0,0,0,0];
  
    //役を確定ボタンが押されたとき、押された役の情報を
    //lastResultに格納し、それ以外の役の情報をクリア
    //rollCountも0にクリア
    let confirmed;
    function confirmedAndClear(diceResult,tempResult,lastResult) {
      let diceChoose = document.getElementsByName("dice");
      for(const element of diceChoose){
        element.onclick  = function(){
          element.classList.toggle("choose");
        }
      }

    
      for(const key in handName) {
      const button = document.getElementById(handName[key]);
      button.addEventListener("click", () =>{
        resultDisplayCount++;
        confirmed =button.id;
        button.classList.add("hand");
        lastResult[key] = document.getElementById(confirmed).innerHTML;
        total = lastResult.reduce(
          (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
        initialValue,
        );
        document.getElementById("self-total").innerHTML = total;
     
        for(let i = 0; i < lastResult.length; i++) {
          if( lastResult[i] === 0 ) {
            const button = document.getElementById(handName[i]);
            button.innerHTML = "";
          } 
        }
        const deleteClass = document.getElementsByClassName("choose"); 
        for(let i=0; i<deleteClass.length; i++){
          deleteClass[i].classList.remove("choose");
        }
        // for(let i=0; i<5; i++){
        //   judgeRoleDice[i] = 0;
        // }
        rollCount = 0;
      },{once: true})
    }
    const hand = document.getElementsByClassName("hand");
    if(hand.length === 12) {
      document.getElementById("result-display").innerHTML =
      `あなたの得点は${total}点でした！！！`;
    }
  }

 //役ごとの合計処理

  function sumDiceNum(result, tempResult, num){
    tempResult[num] = result.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    initialValue,
  );
  return tempResult;
  }

  function handCalc(diceResult) {
    let oneNum = [];
    let twoNum = [];
    let threeNum = [];
    let fourNum = [];
    let fiveNum = [];
    let sixNum = [];
  
    for(let i=0; i<=diceResult.length; i++) {
      if(i == 0) {
        oneNum = diceResult.filter((element)=> element == 1);
        sumDiceNum(oneNum, tempResult, i);
      }else if(i == 1) {
        twoNum = diceResult.filter((element)=> element == 2);
        sumDiceNum(twoNum, tempResult, i);
      }else if(i == 2) {
        threeNum = diceResult.filter((element)=> element == 3);
        sumDiceNum(threeNum, tempResult, i);
      }else if(i == 3) {
        fourNum = diceResult.filter((element)=> element == 4);
        sumDiceNum(fourNum, tempResult, i);
      }else if(i == 4) {
        fiveNum = diceResult.filter((element)=> element == 5);
        sumDiceNum(fiveNum, tempResult, i);
      }else if(i == 5) {
        sixNum = diceResult.filter((element)=> element == 6);
        sumDiceNum(sixNum, tempResult, i);
      }
    }
    sum = diceResult.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue,
      );
      tempResult[6] = sum;

      //S.ストレートの役
      if((tempResult[0] != 0 && tempResult[1] != 0 && tempResult[2] != 0 && tempResult[3] != 0) || 
            (tempResult[1] != 0 && tempResult[2] != 0 && tempResult[3] != 0 && tempResult[4] != 0) ||
            (tempResult[2] != 0 && tempResult[3] != 0 && tempResult[4] != 0 && tempResult[5] != 0) ){
        tempResult[9] = 15;
      }else{
        tempResult[9] = 0;
      }
      //B.ストレートの役
      if(tempResult[0] == 1 && tempResult[1] == 2 && tempResult[2] == 3 && tempResult[3] == 4 && tempResult[4] == 5 ||
        tempResult[1] == 2 && tempResult[2] == 3 && tempResult[3] == 4 && tempResult[4] == 5 && tempResult[5] == 6 ){
        tempResult[10] = 30;
      }else{
        tempResult[10] = 0;
      }
      //ヨット
      if(tempResult[0] === 5 || tempResult[1] === 10 || tempResult[2] === 15 || tempResult[3] === 20 || 
        tempResult[4] === 25 || tempResult[5] === 30) {
          tempResult[11] = 50;
      }else{
         tempResult[11] = 0;
      }
      //フォーダイス
      if(oneNum.length >= 4 || twoNum.length >= 4 ||
         threeNum.length >= 4 || fourNum.length >= 4 ||
          fiveNum.length >= 4) {
        tempResult[7] = sum;
      }else{
        tempResult[7] = 0;
      }
      //フルハウス
      let countNotZero =0;
      for(let i=0; i<=5; i++){
        if(tempResult[i] !== 0){
          countNotZero ++;
        }
      }
      if(countNotZero === 2){
        tempResult[8] = sum;
      }else{
        tempResult[8] =0;
      }
    return sumResultDisplay(diceResult,tempResult,lastResult);
  }

  //合計処理結果のHTMLへの表示
  function sumResultDisplay(diceResult,tempResult,lastResult){   
    for(let i=0; i<lastResult.length; i++){
      let yaku = handName[i];
      if(lastResult[i] === 0 ){
        document.getElementById(yaku).innerHTML = tempResult[i];
      }else{
        document.getElementById(yaku).innerHTML = lastResult[i];
      }
    }
    return confirmedAndClear(diceResult,tempResult,lastResult);
  }
// }
