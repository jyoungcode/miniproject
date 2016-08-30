/*! DOMHelper.js © jyoungcode 2016 */

// ECMAScript 2015 Syntax
// var cleanWhiteSpace = ( el=document ) => {
// ECMAScript 3rd Edition
//   // \s : 공백문자 , \S: 공백문자가 아닌 나머지 문자, \w: 알파벳이나 숫자, \W: 알파벳이나 숫자를 제외한 나머지 문자
//   // test() : 정규표현식 문자를 검사하는 메서드

// ES6 : Arrow function
// var cleanWhiteSpace = (el=document) => {
// 	// 기존의 ES5의 초기화
//     // el = el || document;
//     var current_node = el.firstChild;
//     while( current_node ! == null ) {
//       if ( current_node.nodeType === 3 && !/\S/.test(current_node.nodeValue) ) {
//           removeNode(current_node);
//       } else if ( current_node.nodeType === 1 ) {
//           cleanWhiteSpace(current_node);
//       }
//       current_node = current_node.nextSibling;
//     }
// };

// 자주쓰는 간단한 함수
function log(msg){
  console.log(msg);
}
function tag(name){
  return document.getElementsByTagName(name);
}
function id(name){
  return document.getElementById(name);
}

// JQuery와 type() 같다.
//  자바스크립트의 모든 데이터 유형을 올바르게 감지할 수 있는 헬퍼 함수
function isType(data){
	// "[object Number]"
	return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

// 데이터 간 동등한지 유무 파악 헬퍼 함수
function equal(data1, data2){
	return data1 == data2;
}

// 데이터 간 완전하게 동등한지 유무 파악 헬퍼 함수
function strictEqual(data1, data2){
	return data1 === data2;
}

function throwError(type1, type2, err_msg){
	err_msg = err_msg || '기본 오류 메시지';
	if( isType(type1) !== type2) { throw new Error(err_msg)}
}

function validDate(data, type){
	throwError(type, 'string'); // 오류 발생 시 멈추고 화면에 오류 메시지 출력
	return strictEqual( isType(data), type );
}

// <body> 요소 맨 앞에 삽입(추가) 방법
// 방법 1. 표준 DOM API 방법인 insertBefore() 메소드를 활용
// target_node.parentNode.insertBefore(insert_node, target_node)
// var script_in_body = body.querySelector('script'); // IE 8+
// console.log('target_node:', script_in_body);
// var script_parent = script_in_body.parentNode;
// console.log('target_node.parentNode:', script_parent);
// script_parent.insertBefore(modal, script_in_body);


// 방법2
/**
 * prependChild(부모노드, 자식노드)
 * 부모노드의 첫번째 자식노드로 삽입한다.
 * ---------------------------------------------
 * @작성자    yamoo9
 * @버전     0.0.1
 * @param  {ELEMENT_NODE}  parent_node 부모노드
 * @param  {ELEMENT_NODE}  child_node  자식노드
 * @return {undefined}
 */
function prependChild(parent_node, child_node) {
  parent_node.insertBefore(child_node, parent_node.firstChild);
}

/**
 * insertAfter(목표노드, 삽입노드)
 * 목표노드 뒤에 삽입노드를 추가한다.
 * After 함수명에 맞게 쉽게 받아들이기위해서 parameter를 설정하기 위해 target_node 뒤에 insert_node를 설정.
 * ---------------------------------------------
 * @작성자    yamoo9
 * @버전     0.0.1
 * @param  {ELEMENT_NODE}  target_node  목표노드
 * @param  {ELEMENT_NODE}  insert_node  삽입노드
 * @return {undefined}
 */
function insertAfter(target_node, insert_node) {
// 삽입하고자 하는 노드를 목표 노드 뒤에 추가해주는 헬퍼 함수이다.
  var next_node = target_node.nextSibling;
  var parent_node = target_node.parentNode;
  if ( next_node ) { parent_node.insertBefore(insert_node, next_node); }
  else { parent_node.appendChild(insert_node); }
}

// parameter로 context를 나중에 넣는 이유는 안넣어도 될 파라미터를 나중에 쓰는것 때문에. 
function queryAll(selector_str, context) {
	// 사용자가 올바른 데이터를 전달하였는가?
	if( typeof selector_str !== 'string' ){
		// 조건이 참이 되면 오류 발생
		throw new Error ('첫번째 전달인자는 문자 유형이어야 합니다.');
	}
	// context 인자 값을 사용자가 전달하였는가?
	// 사용자가 context 값을 전달하지 않았을 경우는 undefined 이다.
	// if(typeof context === 'undefined')
	if( !context ) { context = document; }
	return context.querySelectorAll(selector_str);
}

function query(selector, parent){
	return queryAll(selector, parent)[0];
}

function $qOne(selector, context, num){
	if( num === 1 ){
		return querySelectorAll(selector);
	}else if( num === 2){
		return queryAll(selector, context)[0];
	}
}

function $qTwo(selector, hook, context){
	var method;
	if (hook === 1) {
		method = 'query';
	}else{
		method = 'queryAll';
	}
	return window[method]( (selector || '*'), context);
}
// (selector || '*') if문인데 앞에꺼 true면 뒤에꺼실행안됨. 앞에꺼 false면 뒤에꺼실행

// 문서 객체(요소노드)를 제거하는 헬퍼 함수
function removeNode(node) {
	node.parentNode.removeChild(node);
}

// createElement(), createTextNode()
// 2가지 일을 동시에 수행하는 헬퍼 함수
// "요소노드를 생성한 다음 내부에 텍스트노드를 자식 노드로 삽입"

function createNode(el_name, text) {
	var el_node = document.createElement(el_name);
	if ( typeof text !== 'undefined' && typeof text === 'string' ) {
		var text_node = document.createTextNode(text);
		el_node.appendChild(text_node);
	}
	return el_node;
}


// ------------------------------------------------
// 웹 브라우저에서 계산된 CSS 스타일 값 가져오는 방법
// ------------------------------------------------
// 비 표준 MS IE 방식 (IE 8-)
// 대상.currentStyle.스타일속성
// ------------------------------------------------
// 표준 W3C 방식 (IE 9+)
// window.getComputedStyle(대상,가상요소).스타일속성
// ------------------------------------------------
function getStyle(el, property, pseudo) {
  var value, el_style;
  // 유효성 검사
  if ( el.nodeType !== 1 ) {
    console.error('첫번째 인자 el은 요소노드여야 합니다.');
  }
  if ( typeof property !== 'string' ) {
    console.error('두번째 인자 property는 문자열이야 합니다.');
  }
  if ( pseudo && typeof pseudo !== 'string' ) {
    console.error('세번째 인자 pseudo는 문자열이야 합니다.');
  }

  // CSS 속성 이름이 카멜케이스화
  property = camelCase(property);

  if ( window.getComputedStyle ) {
    el_style = window.getComputedStyle(el,pseudo);
    if (pseudo && el_style.content === '') {
      return null;
    }
    value = el_style[property];
  } else {
    value = el.currentStyle[property];
  }
  return value;
}

 function setStyle(elNode, property, value) {
    if ( isntElNode(elNode) ) {
      errorMsg('요소노드가 전달되어야 합니다.');
    }
    if (isType(property) !== 'string') {
      errorMsg('두번째 전달인자는 문자열이어야 합니다.');
    }
    elNode.style[property] = value;
  }

  function css(elNode, prop, value) {
    if ( !value ) {
      return getStyle(elNode, prop);
    } else {
      setStyle(elNode, prop, value);
    }
  }

// 카멜케이스 // font-size -> fontSize
// function camelCase(css_prop) {
//    return css_prop.replace(/-./g, function($1){
//       return $1.replace('-','').toUpperCase();
//    });
// }

// ------------------------------------------------
// 전달된 텍스트를 카멜케이스화하여 반환하는 헬퍼 함수
function camelCase(text) {
   return text.replace(/(\s|-|_)./g, function($1){
      return $1.replace(/(\s|-|_)/g,'').toUpperCase();
   });
}

// ------------------------------------------------
// 오류 메시지를 출력하는 헬퍼 함수
function errorMsg(message) {
  if ( isType(message) !== 'string' ) {
    // 함수 자신을 다시 호출: 재귀함수
    errorMsg('오류 메시지는 문자 데이터 유형이어야 합니다.');
  }
  throw new Error(message);
}

// ------------------------------------------------
// 요소노드인지 아닌지를 체크하여 참/거짓을 반환하는 헬퍼함수
function isElNode(node) {
  return node.nodeType === 1;
}
function isntElNode(node) {
	// isElNode(node)가 #text 일때 true 반환 
  return !isElNode(node);
  // return node.nodeType !== 1;
}

// ------------------------------------------------
// 이전 형제요소 노드를 찾는 헬퍼 함수
function prevEl(node) {
  // 검증: 유효성 검사
  if ( isntElNode(node) ) {
    errorMsg('전달된 인자는 요소노드여야 합니다.');
  }
  // 구형 IE 9+, 신형 웹 브라우저
  if ( node.previousElementSibling ) {
    return node.previousElementSibling;
  }
  // 구형 IE 6-8
  else {
    do { node = node.previousSibling; }
    while(node && !isElNode(node) );
    return node;
  }
}

// ------------------------------------------------
// 다음 형제요소 노드를 찾는 헬퍼 함수
function nextEl(node) {
  // 검증: 유효성 검사
  // if ( isntElNode(node) ) {
  //   errorMsg('전달된 인자는 요소노드여야 합니다.');
  // }
  // 구형 IE 9+, 신형 웹 브라우저
  if ( node.nextElementSibling ) {
    return node.nextElementSibling;
  }
  // 구형 IE 6-8
  else {
    do { node = node.nextSibling; }
    while(node && !isElNode(node) );
    return node;
  }
}

// ------------------------------------------------
// 첫번째 자식요소 노드를 찾는 헬퍼 함수
function _firstEl(node) {
  return node.children[0];
}

function _lastEl(node) {
  var children = node.children;
  return children[children.length - 1];
}


function firstEl(node) {
	// errorMsg에서 throw error 해버리면 에러메시지 출력 후 함수종료됨.
  if ( isntElNode(node) ) { errorMsg('요소노드를 전달해야 합니다.'); }
  // firstElementChild, lastElementChild :  IE9부터 지원 
  if ( node.firstElementChild ) {
    return node.firstElementChild;
  } else {
    // IE 6-8
    // node 찾고자 하는 자식 노드의 부모이다.
    // 제일 먼저 부모 노드인 node의 첫번째 자식 노드를 찾는다.
    node = node.firstChild;
    // return;
    // 만약 찾은 자식 노드가 요소 노드가 아니라면 다음 형제 노드를 찾는다.
    // 다음 형제 노드가 요소 노드라면 반환하고, 아니라면 다시 다음 형제 노드를 요소노드인지 확인한다.
    // console.log(node && isntElNode(node));
    // return;
    return ( node && isntElNode(node) ) ? nextEl(node) : node;
  }
  // 함수는 명시적으로 어떤 값도 반환하지 않을 경우 undefined를 반환한다.
  // return undefined;
}

// 마지막 자식요소 노드를 찾는 헬퍼 함수
function lastEl(node) {
	if( isntElNode(node) ) { errorMsg('요소노드를 전달해야 합니다.'); }
	if( node.lastElementChild) {
		return node.lastElementChild;
	} else {
		node = node.lastChild;
		// true : retrun문에서 node와 isntElNode에서 node가 아닌거라면 next로 다음 node를 찾자.
		// false : node를 출력하자. 
		return ( node && isntElNode(node) ) ? nextEl(node) : node;
	}
}

// ---------------------------------------------------------
// 단위 제거 / 가져오기 / 소유하고 있는지 확인
function getUnit(value){
  var i=0, l=getUnit.units.length, unit;
  // var reg;
  // if( errorMsg(value)) return errorMsg();

  for( ; i<l; i++){
    unit = getUnit.units[i];
    // 방법1
    if( value.indexOf(unit) > -1 ){
      // 이 문제에 경우 units에서 'px rem em ...' 이런식으로 em 보다 rem을 먼저 선언하면 된다.
      break; 
    }

    // 방법2
    // reg = new RegExp('\\d+' + unit, 'i');
    // if( reg.test(value) ){
    //   break;
    // }
  }
  console.log(unit);
  return unit;
}
getUnit.units = 'px rem em % vw vh vmin vmax'.split(' ');

function removeUnit(value){
	removeUnit.unit = getUnit(value);
	return parseFloat(value, 10);
}
removeUnit.unit = null;

function isElName(node, name){
	if( isntElNode(node) ){ errorMsg('첫번째 인자로 요소노드가 전달되어야 합니다.') }
	if( isType(name) !== 'string' ){ 
		errorMsg('두번째 인자로 텍스트 데이터 유형이 전달되어야 합니다.')
	}
	return (node.localName || node.nodeName.toLowerCase()) === name;
}

// ------------------------------------------------------------

// ------------------------------------------------
// 텍스트노드의 유형인지 체크하는 함수
function isTextNode(node) {
  return node.nodeType === 3;
}
// ------------------------------------------------
// 텍스트노드의 유형이 아닌지 체크하는 함수
function isntTextNode(node) {
  // return !isTextNode(node);
  return node.nodeType !== 3;
}

// -------------------------------------------------
// 주석노드의 유형인지 체크하는 함수
function isCommentNode(node){
	return node.nodeType === 8;
}

//-------------------------------------------------------
// 해당 요소의 자식 요소만 모아서 출력하는 함수
// 그냥 querySellectorAll랑 같은 역할
function elementsCollection(parent_node) {
	var parent_node = document.querySelector(parent_node);
	var collection = parent_node.childNodes;
	if( isType(parent_node) !== 'string' ) { 
		errorMsg('인자값으로 문자 데이터 유형이어야 합니다.'); 
	}
	for( var el_collection=[], i=collection.length-1; collection[i]; i--){
		let node = collection[i];
		if( isTextNode(node) || isElName(node, 'script') || isCommentNode(node)){
			continue;
		}
		el_collection.push(node);
		// var array_like_ec = el_collection.push(node);
		// Array.prototype.slice.call(array_like_ec).toString();
	}
	return el_collection;
}


// 함수를 작성하는 이유
// 재사용할 것 같은 코드들...
// 매번 짜는 것은 비 효율적이다 보니
// 능률적으로 코드를 처리하기 위해 코드 묶음을
// 재사용/확장할 수 있도록 처리
// 유사 배열을 배열화
// data = array_like_obj 

function makeArray(data){
  // 전달된 객체는 배열 또는 유사 배열인가?
  var check_data = isType(data), result_arr = [], len=data.length;
  // 실제 배열
  if(check_data === 'array'){
    return data;
  }
  //유사배열
  if( len && check_data !== 'string' ){
    while( len-- ){
      result_arr.push( data[len] );
    }
  }
  return result_arr.reverse();
}


// ES6 standard 
// // Array.from() 메소드는 유사 배열 혹은 반복가능한 객체로부터 새 Array 인스턴스를 만듭니다.
// Array.from()은 다음으로부터 Array를 만듭니다:
// 유사 배열 객체 (length 속성과 인덱싱된 요소를 가진 객체)
// 반복 가능한 객체 (Map과 Set와 같이 객체의 요소를 얻을 수 있는 객체).

// slice() 메소드는 어떤 배열의 일부에 대한 얇은 복사본 배열을 반환합니다.


function convertArray( data ){
  if(Array.from) {
    return Array.from(data);
  } else {
    return Array.prototype.slice.call(data);
  }
}

// 1. 정식으로 클로저를 사용하는 방법으로 문제 해결방법
// 왜? array.from을 한번만 물어보려고~
function convertArray_wrapper(){
  // 내부에서 클로저 함수를 반환
  var closureFn;

  // 실행순서
  // 1번: closureFn 함수리터럴값은 전역 var closureFn에 담긴다.
  // 2번: var closureFn이 return으로 반환되고 
  // 3번: converArray_wrapper()의 반환값이 var covertArray에 담긴다. 
  // 4번: convertArray(인자)로 실행 (인자담아서) 
  if( Array.from ){
    // Array.from이 지원되는가?
    closureFn = function(data){
      return Array.from(data);
    };
  } else {
    // 지원되지 않는가?
    closureFn = function(data){
      return Array.prototype.slice.call(data);
    }
  }
  return closureFn;
}

var convertArray = convertArray_wrapper();

// 권장 방법 // 위에는 wrapper 실행해야하지만, IIFE는 즉각실행으로 단계를 줄인다. 
// 2. 약식(IIFE 패턴)을 사용하여 클로저 처리하는 문제 해결 방법
var convertArray = (function(){
  if(Array.from) {
    return function(data) {
      return Array.from(data);
    }
  } else {
    return function(data) {
      return Array.prototype.slice.call(data);
    }
  }
})();