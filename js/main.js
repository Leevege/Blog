'use strict';
// 获取工具区域所有标签
let Tag = document.getElementsByClassName('nav-bar')[0];
let RealTags = Tag.getElementsByTagName('a');
// 载入工具区域主体
let iWantWords = document.getElementById('typeWords');
const buttonInLi = '<input type="button" class="delete" value="x" onclick="removeElement(this)">';
// 在控制台输出信息,如果可以打印说明载入无误
console.log(iWantWords);
let outPut = document.querySelector('.output');
let allkeyWords = document.getElementById('keyWordAll').innerHTML;
// 分别定义提交和扫描关键词函数
let oSub = document.getElementById('Sub1');
oSub.onclick = submit;
let oScan = document.getElementById('Scan1');
oScan.onclick = scan;
  let scanwords = [
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
  ];
  // 首先将数据库中的关键词都打印出来
  for (let i = 0; i < scanwords.length; i++) {
    allkeyWords += '<li>' + scanwords[i] + buttonInLi + '</li>';
  }
  // 输出结果
  document.getElementById('keyWordAll').innerHTML = allkeyWords;
  // 扫描关键词函数
function scan(){
  let result = [];
  // 循环检查关键词并记录
  for (let i = 0; i < scanwords.length; i++) {
  	if (iWantWords.value.match(scanwords[i]) === null){
      result = null;
  		continue;
  	} else {
  		result += ' “' + iWantWords.value.match(scanwords[i]) +'”';
  	}
  }
  // 想加入条件判断，未完成！！！
  console.log(result);
  outPut.textContent = '这段内容中查询到以下关键词：' + result;
  document.getElementById('typeWords').focus();
}
// 提交新关键词函数
function submit(){
  // 以空格切分关键词
  let temp = document.getElementById('keyWords').value.split(' ');
  (temp === '') ? null : (function(){for (let i = 0; i < temp.length; i++){scanwords.push(temp[i]);}}());
  scanwords = Array.from(new Set(scanwords));
  allkeyWords = '';
  for (let i = 0; i < scanwords.length; i++) {
    allkeyWords += '<li>' + scanwords[i] + buttonInLi + '</li>';
  }
  document.getElementById('keyWordAll').innerHTML = allkeyWords;
  document.getElementById('keyWords').value = '';
  document.getElementById('keyWords').focus();
  //每次提交关键词之后自动聚焦
}
// 删除关键词函数
function removeElement(_element){
  let _parentElement = _element.parentNode;
  // 根据节点内容删除数组内容
  scanwords.splice(scanwords.indexOf(_parentElement.innerText),1);
  _parentElement.remove();
}
//使用回车键输入关键词
document.getElementById('keyWords').onkeydown = function (event) {
  let e = event || window.event;
    if (e && e.keyCode === 13){
    submit();
    }
}
// ctrl和回车同时按下时扫描
iWantWords.onkeydown = function (event) {
  let e = event || window.event;
    if (e && e.keyCode === 13 && 17){
    scan();
    }
}

// for(let i = 0; i<RealTags.length;i++){
//   RealTags[i].onclick = console.log('yes!');
// }