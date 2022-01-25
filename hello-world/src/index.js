import React from 'react';
import ReactDOM from 'react-dom'

// ReactDOM.render(
//     <h1>Hello, world!</h1>,
//     document.getElementById('root')
// )

//-----------------------------------------------JSX
// const element = <h1>Hello, world</h1>
//문자열, html도 아니다. JSX 자바스크립트 확장 문법이다.

//view model처럼 분리하지 않고
//component라는 느슨하게 연결된 유닛으로 관심사를 분리

//jsx에서 표현식
// const name = 'Josh Perez';
// const element = <h1>Hello, {name}</h1>

// ReactDOM.render(
//     element,
//     document.getElementById('root')
// )

//중괄호 안에 유효한 모든 js 표현식 가능
//함수 호출 결과를 포함하는 예
// function formatName(user) {
//     return user.firstName + ' ' + user.lastName;
// }

// const user = {
//     firstName: 'Harper',
//     lastName: 'Perez'
// };

// const element = (
//     <h1>
//         Hello, {formatName(user)}!
//     </h1>
// );

// ReactDOM.render(
//     element,
//     document.getElementById('root')
// );

//자동 세미콜론 삽입을 피하고자 할 때 괄호를 묶는다.
//JSX표현식이 정규 js함수를 호출해 js객체로 인식한다.
//JSX.Element

// function formatName(user) {
//     return user.firstName + ' ' + user.lastName;
// }

// const user = {
//     firstName: 'Harper',
//     lastName: 'Perez'
// };

// function getGreeting(user) {
//     if(user) {
//         return <h1>Hello, {formatName(user)}!</h1>
//     }
//     return <h1>Hello, Stranger.</h1>
// }

// ReactDOM.render(
//     getGreeting(user),
//     document.getElementById('root')
// );

//JSX 속성 정의 
//따옴표 및 표현식

// const element = <a href='https://www.reactjs.org'> link </a>;
// const element = <img src={user.avatarUrl}></img>;

//동일한 속성에 따옴표나 중괄호중 하나만 써야한다. 둘다쓰면 안됨
//ReactDom은 camelCase
//ex) class - className tabindex - tabIndex

//JSX 자식 정의
//태그가 비어있다면 XML처럼 />로 닫아주어야 한다.
//const element = <img src={user.avatarUrl} />;

// const element = (
//     <div>
//         <h1>Hello!</h1>
//         <h2>Good to see you here.</h2>
//     </div>
// );

//JSX는 주입 공격을 방지한다.
// const title = response.potentiallyMaliciousInput;
// const element = <h1>{title}</h1>;

//ReactDOM은 JSX에 삽입된 모든 값을 렌더링하기 전에 이스케이프함
//명시적으로 작서외지 않은 내용은 주입되지 않는다.
//XSS공격을 방지할 수 있다.

//JSX는 객체를 표현한다.
//Babel은 JSX를 React.createElemnt()호출로 컴파일 한다.

// const element = (
//     <h1 className='greeting'>
//         Hello, world!
//     </h1>
// );

// const element = React.createElement(
//     "h1",
//     {className: 'greeting'},
//     'Hello, world!'
// );

//위 둘은 같은 코드

//React.createElement()가 버그가 없느 코드를 작성하는데 도움이 되는
//몇 가지 검사를 수행, 기본적으로 아래와 같은 객체를 생성함
//주의: 다음 구조는 단순화되었습니다.
// const element = {
//     type: 'h1',
//     props: {
//         className: 'greeting',
//         children: 'Hello, world!'
//     }
// };

//이러한 객체를 react element 화면에 보고 싶은 것을 나타내는 표현
//react는 객체를 읽어서 DOM을 구성하고 최신상태로 유지하는데 사용된다.

//----------------------------------------------------Element Rendering
//element는 react앱의 가장 작은 단위이다.
//const element = <h1>hello, world</h1>;

//브라우저 DOM엘리먼트와 달리 React엘리먼트는 일반객체(plain object)
//쉽게 생성가능, ReactDOM은 React엘리먼트와 일치하도록 DOM 업데이트

//컴포넌트와 엘리먼트는 다르다. 엘리먼트는 컴포넌트의 "구성요소"

//HTML 파일 어딘가에 <div id="root"></div>
//이 안에 들어가는 모든 엘리먼트들을 
//ReactDOM에서 관리하기 때문에 이것을 루트 DOM 노드라고 부른다.

//리엑트로 구현된 애플리케이션은 일반적으로 하나의 루트DOM노드가 있다.
//기존 앱에 통합하려는 경우? 많은 수의 독립된 루트 DOM 노드가 있을 수 있다.

// const element = <h1>Hello, world</h1>
// ReactDOM.render(element, document.getElementById("root"))

//렌더링 된 엘리먼트 업데이트 하기

//엘리먼트는 불변객체이다!!
//엘리먼트 생성 이후, 해당 엘리먼트의 자식이나 속성 변경 불가능

//지금까지의 바탕으로 UI 새로 업데이트 하는 방법은 ReactDOM.render()로 전달하는 것

// function tick() {
//     const element = (
//         <div>
//             <h1>Hello, world!</h1>
//             <h2>It is {new Date().toLocaleTimeString()}.</h2>
//         </div>
//     );
//     ReactDOM.render(element, document.getElementById('root'))
// }

// setInterval(tick, 1000);

//실제로는 ReactDOM은 한번만 호출된다.
//상태가 변하는 컴포넌트에 어떻게 캡슐화 되는지는 다음장에

//변경된 부분만 업데이트 하기

//React DOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전 엘리먼트와 비교하고
//DOM을 원하는 상태로 만드는데 필요한 경우에만 DOM을 업데이트

//개발자 도구로 마지막 예시를 보면

//전체 UI를 다시 그리도록 엘리먼트를 만들었지만
//ReactDOM은 내용이 변경되 텍스트 노드만 업데이트 하게 한다.

//--------------------------------------------Components and Props
//컴포넌트를 통해 UI를 재사용 가능한 개별적인 여러 조각으로 나눔
//조각을 개별적으로 살펴봄
//여기서는 개념을 소개

//함수 컴포넌트 vs 클래스 컴포넌트

//가장 간단한 방법은 js함수로 정의
// function Welcome(props) {
//     return <h1>Hello, {props.name}</h1>
// }

// 이 함수는 데이터를 가진 하나의 'props'(속성을 나타내는 데이터) 객체 인자를 받은 후
// React엘리먼트를 반환하므로 유효한 React 컴포넌트
//이러한 컴포넌트를 함수 컴포넌트

//ES6 class를 사용하여 컴포넌트 정의
// class Welcome extends  React.Component {
//     render() {
//         return <h1>Hello, {this.props.name}</h1>
//     }
// }

//React 관점으로 볼 때, 위 두가지 컴포넌트는 동일

//컴포넌트 렌더링
//React엘리먼트는 사용자 정의 컴포넌트로도 나타낼 수 있다.
// const element = <Welcome name="Sara" />;

//React가 사용자 정의 검포넌트로 작성된  엘리먼트를 발견하면
//JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달한다.
//이 객체를 props라고 한다.

// function Welcom(props) {
//     console.log(props)
//     return  <h1>Hello, {props.name}</h1>
// }

// const element = <Welcom name="Sara" ><span></span><div></div></Welcom>;
// ReactDOM.render(
//     element,
//     document.getElementById('root')
// );

//컴포넌트의 이름은 항상 대문자로 시작해야함, 소문자는 DOM 태그로 처리를 한다.

//컴포넌트 합성
//자신의 출력에 다른 컴포넌트를 참조할 수 있다.
//동일한 추상 컴포넌트를 사용할 수 있다.

// function Welcome(props) {
//     return <h1>Hello, {props.name}</h1>
// }

// function App() {
//     return (
//         <div>
//             <Welcome name="Sara" />
//             <Welcome name="Cahal" />
//             <Welcome name="Edite" />
//         </div>
//     )
// }

// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );

//React App에서는ㄴ 버튼, 폼, 다이얼로그, 화면 등의 모든 것들이 흔히 컴포넌트로 표현된다.

//일반적으로 새 React 앱능 최상위에 단일 App 컴포넌트를 가짐
//기존 앤에 React를 통합하는 경우에는 Button과 같은 작은 컴포넌트 부터
//뷰 계층의 상단으로 올라가면서 점진적으로 작업해야 할 수 있다.

//컴포넌트 추출
// function Comment(props) {
//     return (
//         <div className='Comment'>
//             <div className='UserInfo'>
//                 <img className='Avatar' 
//                     src={props.author.avatarUrl} 
//                     alt={props.author.name} 
//                 />
//                 <div className='UserInfo-name'>
//                     {props.author.name}
//                 </div>
//             </div>
//             <div className='Comment-text'>
//                 {props.text}
//             </div>
//             <div className='Comment-data'>
//                 {formatDate(props.date)}
//             </div>
//         </div>
//     );
// }

// 이 컴포넌트는 구성요소들이 모두 중첩구조로 이루어짐
//변경이 어렵고, 재사용이 힘듬

//Avatar 추출
// function Avatar(props) {
//     return (
//         <img className='Avartar' 
//             src={props.user.avatarUrl}
//             alt={props.user.name}
//         />
//     )
// }

//Avatar는 자신이 Comment내에서 렌더링 된다는 것을 알 필요가 없다.
//author에서 더욱 일반화된  user로 변경
//props의 이름은 사용될 context가 아닌 컴포넌트 자체의 관점에서 짓는 것을 권장


// function Comment(props) {
//     return (
//         <div className='Comment'>
//             <div className='UserInfo'>
//                 <Avatar user={props.author} />
//                 <div className='UserInfo-name'>
//                     {props.author.name}
//                 </div>
//             </div>
//             <div className='Comment-text'>
//                 {props.text}
//             </div>
//             <div className='Comment-data'>
//                 {formatDate(props.date)}
//             </div>
//         </div>
//     );
// }

//UserInfo 추출
// function UserInfo(props) {
//     return (
//         <div className='UserInfo'>
//             <Avatar user={props.user} />
//             <div className='UserInfo-name'>
//                 {props.user.name}
//             </div>
//         </div>
//     );
// }

// function Comment(props) {
//     return (
//         <div className='Comment'>
//             <UserInfo user={props.author} />
//             <div className='Comment-text'>
//                 {props.text}
//             </div>
//             <div className='Comment-data'>
//                 {formatDate(props.date)}
//             </div>
//         </div>
//     );
// }

//더 큰 앱에서 작업할 때 두각이 나타남
//UI 여러번 사용될 때 Button Panel Avatar
//일부가 자체적으로 복잡한 경우 App FeedStory  Comment

//props는 읽기전용

//함수 컴포넌트, 클래스 컴포넌트 모두 컴포넌트 자체 props를 수정하면 안된다.

// function sum(a,b) {
//     return a + b;
// }

//순수 함수, 입력갑을 바꾸려 하지 않고 항상 동일한 입력값에 대해
//동일한 출력값을 반환

//반면 다음 함수는 순수 함수가 아니다.

// function withdraw(account, amount ) {
//     account.total -= amount;    //자신의 입력값을 변경
// }

//React는 매우 유연하지만 한 가지 엄격한 규칙이 있다.
//모든 React 컴포넌트는 자신의 props를 다룰 때
//반드시 순수 함수처럼 동작해야 한다.

//물론 애플리케이션 UI는 동적이며 시간에 따라 변한다.
//state를 통해 위 규칙을 위반하지 않고
//사용자 액션, 네트워크 응답 및 다른 요소에대한 응답으로 시간에 따라 지신의 출력값을
//변경할 수 있다.

//------------------------------------------------------------state and Lifecycle
//state와 생명주기 개념

//시계  예시를 다시 살펴보면 
// function tick() {
//     const element = (
//     <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//     );
//     ReactDOM.render(element,
//     document.getElementById('root'));
// }

// setInterval(tick, 1000);

//Clock 컴포넌트를 완전히 재사용하고 캡슐화 하는 방법

// function Clock(props) {
//     return (
//         <div>
//             <h2>hello, world!</h2>
//             <h2>It is {props.date.toLocaleTimeString()}.</h2>
//         </div>
//     )
// }

// function tick() {
//     ReactDOM.render(
//         <Clock date={new Date()} />,
//         document.getElementById('root')
//     )
// }

// setInterval(tick, 1000);

//하지만 매초 실행되는 것은 Clock의 영역이다.
//이를 표현하기 위해서 Clock컴포넌트에 state를 추가해야 한다.
//state는  props와 비슷하지만, 비공개이며, 컴포넌트에 의해 완전히 제어된다.

//함수에서 클래스로 변환 

// class Clock extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h1>Hello, world</h1>
//                 <h2>It is {this.props.date.toLocaleTimeString}.</h2>
//             </div>
//         );
//     }
// }

//render메서드는 업데이트가 발생할 때마다 호출됨
//같은 DOM노드를 렌더링 하는 경우
//Clock클래스의 단일 인스턴스만 사용된다.~~
//이것은 로컬 state와 생명주기 메서드와 같은 부가기능을 사용하게 한다.

//클래스에 로컬 state 추가하기
//this.props.date를 this.state.date로 변경
//this.state를 지정하는 class constructor추가
//
// class Clock extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {date: new Date()};
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Hello, world</h1>
//                 <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//             </div>
//         )
//     }
// }

// ReactDOM.render(
//     <Clock />,
//     document.getElementById('root')
// )

//Clock이 스스로 타이머를 설정하고 매초 스스로 업데이트 하도록 설정하기

//많은 컴포넌트가 있는 애플리케이션에서
//컴포넌트가 삭제될 때 해당 컴포넌트가 사용중이던 리소스를 확보하는 것이 중요
//clock이 처음 DOM에 렌더링 될 때마다 타이머를 설정 //setInterval
//React에서 마운팅이라고 한다.

//DOM이 삭제될 때마다 타이머를 해제 //clearInterval
//React에서 언마운팅

//이러한 메서드들을 생명주기 메서드
// class Clock extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {date: new Date()};
//     }

//     componentDidMount() {
//         this.timerID = setInterval(
//             () => this.tick(),
//             1000
//         );
//     }

//     componentWillUnmount() {
//         clearInterval(this.timerID);
//     }

//     tick() {
//         this.setState({
//             date: new Date()
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Hello, world</h1>
//                 <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//             </div>
//         )
//     }
// }

// ReactDOM.render(
//     <Clock />,
//     document.getElementById('root')
// )

//setState() 올바르게 사용하기
//setState()알아야 할 사항
//직접 state 수정하지 마세요.

//Wrong
//this.state.comment = 'Hello'
//이 코드는 컴포넌트를 다ㅣ 렌더링 하지 않는다.

//대신 setState()를 사용하자
//this.setState({comment: 'Hello'})

//this.state를 지정할 수 있는 유일한 공간이 바로 constructor

//state 업데이트는 비동기적일 수 있다.
//React는 성능을 위해 여러 setState()호출을 단인 업데이트로 한번에 처리할 수 있다.

//this.props와 this.state가 비동기적으로 업데이트 될 수 있기 때문에
//때문에 다음 state를 계산할 대 해당 값에 의존하면 안된다.

//Wrong
// this.setState({
//     counter: this.state.counter + this.props.increment,
// })

//Correct
// this.setState((state, props) => ({
//     counter: state.counter + props.increment
// }))

//state 업데이트는 병합된다.
//다양한 독립적인 변수를 포함한다.

// constructor(props) {
//     super(props);
//     this.state = {
//         posts: [],
//         comments: []
//     }
// }

//별도의 setState()호출로 이러한 변수를 독립적으로 업데이트 할 수 있다.
// componentDidMount() {
//     fetchPosts().then(response => {
//         this.setState({
//             posts: response.posts,
//         })
//     })

//     fetchComments().then(response => {
//         this.setState({
//             comments: response.comments
//         })
//     })
// }

//병합은 얕게 이루어지기 때문에
//this.setState({comments})는 this.state.posts에 영향을 주진 않지만
//this.state.comments는 완전히 대체된다.

//top-down 단방향식 데이터 흐름

//모든 컴포넌트가 독립적이다.

// class Clock extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {date: new Date(), time: Math.floor(Math.random()*1000+1000)}
//     }

//     componentDidMount() {
//         this.timerID = setInterval(
//             () => this.tick(),
//             this.state.time
//         );
//     }

//     componentWillUnmount() {
//         clearInterval(this.timerID);
//     }

//     tick() {
//         this.setState({
//             date: new Date()
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Hello, world</h1>
//                 <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//             </div>
//         )
//     }
// }


// function App() {
//     return (
//         <div>
//             <Clock />
//             <Clock />
//             <Clock />
//         </div>
//     )
// }

// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// )