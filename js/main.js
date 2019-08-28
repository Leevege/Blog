'use strict';
localStorage ? console.log('你的浏览器支持本地数据存储功能') : alert('你的浏览器不支持存储数据！');

// 载入工具区域主体
const outPut = document.querySelector('.output');
const wholeText = document.getElementById('wholeText');
const keyWordList = document.getElementById('keyWordAll');
const keyWordin = document.getElementById('keyWords');

// 分别定义提交和扫描关键词函数
const oSub = document.getElementById('Sub1');
oSub.onclick = submit;
const oScan = document.getElementById('Scan1');
oScan.onclick = scan;

let storedWords = JSON.parse(localStorage.getItem('wordArr')) || new Array();
// 提前定义删除按钮
const buttonInLi = '<input type="button" class="delete" value="x" onclick="removeElement(this)">';
keyWordList.innerHTML = refreshWord();
/*
'激情',
'能承受',
'压力',
'狼性',
'活力',
'奋斗',
'美女',
'月入',
'学习',
'挑战',
'吃苦',
'能力',
'梦想',
'理想',
'未来',
'期权',
'主动',
'领导',
'弹性',
'加班',
'抗压',
'面议',
'激励',
'团队精神',
'应届毕业',
'积极',
'信心',
'！'
*/
function refreshWord() {
  let temp = '';
  for (let i = 0; i < storedWords.length; i++) {
    temp += `<li>${storedWords[i]}${buttonInLi}</li>`;
  }
  return temp;
}
// 扫描关键词函数
function scan() {
  let result = new Array();
  let input = wholeText.value;
  // 循环检查关键词并记录
  for (let i = 0; i < storedWords.length; i++) {
    if (input.match(storedWords[i]) === null) {
      continue;
    } else {
      result.push(input.match(storedWords[i]));
    }
  }
  // 根据是否存在关键词输出结果
  if (result.length === 0) {
    outPut.textContent = '这段内容中没查询到任何关键词！';
  } else {
    outPut.textContent = '这段内容中查询到以下关键词：' + result;
  }
  wholeText.focus();
}
// 提交新关键词函数
function submit() {
  // 以空格切分关键词
  let temp = keyWordin.value;
  if (temp === '') return;
  temp = temp.split(' ').filter((words) => words.trim());
  storedWords.push(...temp);
  storedWords = Array.from(new Set(storedWords));
  keyWordList.innerHTML = refreshWord();
  keyWordList.scrollTop = keyWordList.scrollHeight;
  localStorage.setItem('wordArr', JSON.stringify(storedWords));
  // 使用户输入新关键词后能看到新关键词
  keyWordin.value = '';
  keyWordin.focus();
  // 每次提交关键词之后自动聚焦
}
// 删除关键词函数
function removeElement(_element) {
  let _parentElement = _element.parentNode;
  // 根据节点内容删除数组内容
  storedWords.splice(storedWords.indexOf(_parentElement.innerText), 1);
  _parentElement.remove();
  localStorage.setItem('wordArr', JSON.stringify(storedWords));
}
//使用回车键输入关键词
keyWordin.onkeydown = function (event) {
  let e = event || window.event;
  if (e && e.keyCode === 13) {
    submit();
  }
}
// ctrl和回车同时按下时扫描
wholeText.onkeydown = function (event) {
  let e = event || window.event;
  if (e && e.keyCode === 13 && 17) {
    scan();
  }
}