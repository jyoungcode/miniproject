/*! action.js © yamoo9.naver.com */
(function(d){
	
	// 대상 객체 참조
	// body = <body>, toggle_btn = <button id="toggle-baseline">
	var body       = d.body,
		toggle_btn = d.getElementById('toggle-baseline');
	
	// toggle_btn 클릭 이벤트 핸들링
	toggle_btn.onclick = function() {
		// body 클래스 조건 제어
		body.className = (body.className == '') ? 'remove-baseline' : '';
	}

})(document);