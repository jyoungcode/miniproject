[ 스타일 가이드 ]

### CSS에서 세미콜론(;)은 다 넣어 주는게 좋다. 그렇지 않으면?
`body { font-size: 20; line-height: 200%; font-family: arial; }`
에서 세미콜론 안찍은거와 그 뒤까지만 적용안된다.

### 셀렉터를 어떻게 쓸것인가? 
```html
	<nav class="main-menu">
		<a href="#">메뉴</a>
		<ul>
			<li><a href="#">로그인</a></li>
			<li><a href="#">회원가입</a></li>
		</ul>
	</nav>
	<nav class="sub-menu">
		<ul>
			<li><a href="#">고객센터</a></li>
			<li><a href="#">내정보</a></li>
		</ul>
	</nav>
```

```css
	header {}
	.main-menu {}
	.main-menu ul {}
	.main-menu li {}
	.main-menu a {}
	.sub-menu {}
	.sub-menu ul {}
	.sub-menu ul li {}
	.sub-menu ul a {}
	.sub-menu ul span {}
```
- `.main-menu` `.sub-menu`가 `header`에서만 쓰인다고 하면 `header`를 쓸 필요가 없다.
- `ul` 밑에는 무조건 `li`가 들어가면 `ul`을 넣을 필요가 없다. (단, `header`와 `ul`사이에 다른 요소가 있다면 `ul`을 넣어줘야 한다)
** 셀렉터를 간소화 시킬 수록 성능은 향상 된다. 어떻게하면 더 간결하게 이해 하기 쉽게 나타낼 수 있는지 고민하자  **
- 사이트가 다이어트를 한다. 100kb 줄이면 0.3초가 빨라진다. 0.3초가 늘면 1.4% 유저가 나갔다는 구글 자료가 있다. 줄이는 건 의미있다.
- 일반자식 셀렉터 보다 직계 자식이 빠르다.
- 클래스명은 숫자로 시작하지 말자 가끔 IE같은 데서 적용이 안 될 수도 있다.

### child 셀렉터
- `:first-child` = IE 7까지 지원 
- `:last-child` = IE 9까지 지원
- `:nth-child(2n+1)` = IE9부터 지원. 수식 사용가능. n은 0부터 계속 늘어남.
** pc에서는 쓰기 어려우나 mobile에서는 잘 지원한다. **

### 내가 쓰는 셀렉터가 크로스브라우징이 되는지 caniuse를 확인하자.

### A + B 형제 셀렉터
```css
	.main-menu li { border-top: 1px solid #000; }
	.main-menu li:first-child { border-top: 0; } 
```
이렇게 해서 navigation에 밑줄을 주고 첫번째만 없앨 수 있는 UI가 완성된다. 그러나! 셀렉터를 간소화 할 수 없을 까?
```css
	.main-menu li+li { border-top : 1px solid #000; }
```
이렇게 하면 li의 아래 형제 부터 적용이 되기 때문에 동일한 UI가 완성된다.
** 형제 셀렉터는 사실상 li 두개 씩만 형제고 연다라 있을 경우 겹쳐 보여서 마치 최상위 li의 형제들이 다 적용 된 것 처럼 보인다.

- `+`셀렉터는 첫째 요소에 margin-bottom을 주고 둘째 요소는 적용 안하거나 할때 많이 쓰이지만 `~`셀렉터는 잘 안쓰인다.





