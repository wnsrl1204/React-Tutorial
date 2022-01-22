import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

//함수 컴포넌트
function Square(props) {
    // onClick은 인자로 함수를 받는다. onClick = {console.log('click')} 같은 오류를 범하기 쉽다.
    return (
        <button
            className='square'
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i){
        const squares =this.state.squares.slice(); //기존 배열 수정이 아닌, 배열 사본 생성
        //데이터 변경 2가지 방식
        //값을 직접변경
        //원하는 변경 값을 가진 새로운 사본으로 데이터 교체
        //
        //갑을 직접 변경하지 않을 때 이점
        // 복잡한 특징들을 단순하게
        // 이전 상태로 돌아가게 할 수 있다.
        // 재사용 가능
        //변화 감지
        //렌더링 시기 결정
        //React에서 다시 렌더링하는 시기 결정 **
        //컴포넌트 업데이트시 객체주소가 변경된 것을 토대로 업데이트
        if(calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext:!this.state.xIsNext,

        });
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}// 네이밍 on[Event] handle[Event]
        />
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if(winner) {
            status = 'Winner: '+winner;
        } else {
            status = 'Next player: ' +(this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className='status'>{status}</div>
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>


            </div>
        )
    }
}

class Game extends React.Component {
    render() {
        return  (
            <div className='game'>
                <div className='game-board'>
                    <Board />
                </div>
                <div className='game-info'>
                    <div>{/* status */}</div>
                    <ol>{/*TODO */}</ol>
                </div>
            </div>
        )
    }
}

class ShoppingList extends React.Component {
    render() {
        return (
            <div className='shopping-list'>
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}   //사용 예제: <ShoppingList name="Mark" />

// =================================

ReactDOM.render(
    <Game />,//<ShoppingList name="Mark" />,
    document.getElementById('root')
);


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}