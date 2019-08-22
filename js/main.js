'use strict';
localStorage ? console.log('你的浏览器支持本地数据存储功能') : alert('你的浏览器不支持存储数据！');
// 载入工具区域主体
const outPut = document.querySelector('.output');
const wholeText = document.getElementById('wholeText');
const keyWordList = document.getElementById('keyWordAll');
let allkeyWords = keyWordList.innerHTML;
const keyWordin = document.getElementById('keyWords');
// 分别定义提交和扫描关键词函数
const oSub = document.getElementById('Sub1');
oSub.onclick = submit;
const oScan = document.getElementById('Scan1');
oScan.onclick = scan;
let storeWords = [];
storeWords = JSON.parse(localStorage.getItem(1)) || storeWords;
const buttonInLi = '<input type="button" class="delete" value="x" onclick="removeElement(this)">';
// 提前定义删除按钮
keyWordList.innerHTML = refresh();
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
function refresh() {
  for (let i = 0; i < storeWords.length; i++) {
    allkeyWords += `<li>${storeWords[i]}${buttonInLi}</li>`;
  }
  return allkeyWords;
}
// 扫描关键词函数
function scan() {
  let result = [];
  // 循环检查关键词并记录
  for (let i = 0; i < storeWords.length; i++) {
    if (wholeText.value.match(storeWords[i]) === null) {
      continue;
    } else {
      result.push(wholeText.value.match(storeWords[i]));
    }
  }
  console.log(result);
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
  storeWords.push(...temp);
  storeWords = Array.from(new Set(storeWords));
  allkeyWords = '';
  keyWordList.innerHTML = refresh();
  keyWordList.scrollTop = keyWordList.scrollHeight;
  localStorage.setItem(1, JSON.stringify(storeWords));
  // 使用户输入新关键词后能看到新关键词
  keyWordin.value = '';
  keyWordin.focus();
  // 每次提交关键词之后自动聚焦
}
// 删除关键词函数
function removeElement(_element) {
  let _parentElement = _element.parentNode;
  // 根据节点内容删除数组内容
  storeWords.splice(storeWords.indexOf(_parentElement.innerText), 1);
  _parentElement.remove();
  localStorage.setItem(1, JSON.stringify(storeWords));
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