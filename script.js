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
const initialValue = 0;
let sum=0;
let resultDisplayCount = 0;
let img_element = document.createElement("img");
let rollNum = 0;
let total =0;
let rollCount = 0;
const diceResult = [];
const lastResult =[0,0,0,0,0,0,0,0,0,0,0,0,];
const tempResult =[0,0,0,0,0,0,0,0,0,0,0,0,0];
const judgeRoleDice = [0,0,0,0,0];

function ikasama(){
  let dest = Math.floor( Math.random() * 2) + 5;
  if( dest === 1 ){
    let dice = window.prompt("5ケタ入力");
    const result = [];
    for(const element of result){
      result.push(Number(element));
    }
    return handCalc(result);
  }
    window.aleart("はずれ");
}

//サイコロを振る
//サイコロ5個の目を配列に保存

function rollDice() {
  rollCount= rollCount + 1; 
  if(rollCount > 3){
    window.alert("役を選択してください");
  }else{
    //ダイスの保存をクリックしたら、クラスをchooseでトグル
    //judgeRoleDiceにダイス情報を保存
      for(let i=1; i<=5; i++) {
        const choose1 = document.getElementById(`result${i}-img`);
        const choose = document.getElementById(`result${i}`);
        choose1.addEventListener("click", () =>{
          choose1.classList.toggle(`choose`);
          rollNum = document.getElementsByClassName("choose").length;
          judgeRoleDice[i-1] = Number(document.getElementById(`result${i}`).innerHTML);
          document.getElementById(`result${i}-img`).src = `${judgeRoleDice[i-1]}_.jpg`;
          handCalc(diceResult);
        });
        //ロール1回目であれば、diceResultにダイス情報を格納し、
        //HTML上にサイコロの結果表示
        if(rollCount === 1) {
          let number = Math.floor( Math.random() * 6) +1;
          diceResult[i-1] = number;
          document.getElementById(`result${i}-img`).src = `${number}.jpg`;
          document.getElementById(`result${i}`).innerHTML = number;
        //ロール2回目以降、judgeRoleDiceが0 = ダイス保存がされていなければ、
        //diceResultにダイス情報を格納しHTMLに表示
        //それ以外の時は、何もしない
        }else if(rollCount !== 1 && judgeRoleDice[i-1] === 0 ) {
          let number = Math.floor( Math.random() * 6) + 1;
          diceResult[i-1] = number;
          document.getElementById(`result${i}-img`).src = `${number}.jpg`;
          document.getElementById(`result${i}`).innerHTML = number;
        }
      }
    }
    return handCalc(diceResult);
  }

    //役を確定ボタンが押されたとき、押された役の情報を
    //lastResultに格納し、それ以外の役の情報をクリア
    //rollCountも0にクリア
    let confirmed;
    function confirmedAndClear(tempResult,lastResult) {

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
        for(let i=0; i<5; i++){
          judgeRoleDice[i] = 0;
        }
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
  let oneNum = [];
  let twoNum = [];
  let threeNum = [];
  let fourNum = [];
  let fiveNum = [];
  let sixNum = [];
  const numArray =[];


  function handCalc(diceResult) {
    for(let i=0; i<=diceResult.length; i++) {
      if(i == 0) {
          oneNum = diceResult.filter((element)=> element == 1);
          numArray[i] = oneNum.length;
          tempResult[i] = oneNum.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
          initialValue,
        );
      }else if(i == 1) {
          twoNum = diceResult.filter((element)=> element == 2);
          numArray[i] = twoNum.length;
          tempResult[i] = twoNum.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
          initialValue,
        );
      }else if(i == 2) {
        threeNum = diceResult.filter((element)=> element == 3);
        numArray[i] = threeNum.length;
        tempResult[i] = threeNum.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      );
      }else if(i == 3) {
        fourNum = diceResult.filter((element)=> element == 4);
        numArray[i] = fourNum.length;
        tempResult[i] = fourNum.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      );
      }else if(i == 4) {
        fiveNum = diceResult.filter((element)=> element == 5);
        numArray[i] = fiveNum.length;
        tempResult[i] = fiveNum.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      );
      }else if(i == 5) {
        sixNum = diceResult.filter((element)=> element == 6);
        numArray[i] = sixNum.length;
        tempResult[i] = sixNum.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      );
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
    return sumResultDisplay(tempResult,lastResult);
  }

  //合計処理結果のHTMLへの表示
  function sumResultDisplay(tempResult,lastResult){   
    for(let i=0; i<lastResult.length; i++){
      let yaku = handName[i];
      if(lastResult[i] === 0 ){
        document.getElementById(yaku).innerHTML = tempResult[i];
      }else{
        document.getElementById(yaku).innerHTML = lastResult[i];
      }
    }
    return confirmedAndClear(tempResult,lastResult);
  }
     `あなたの得点は0点でした！！！</br>悪いことはしちゃダメです！`;

  }

