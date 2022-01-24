import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

//함수 컴포넌트
function Square(props) {
    console.log(props.isLastPosition)
    // onClick은 인자로 함수를 받는다. onClick = {console.log('click')} 같은 오류를 범하기 쉽다.
    return (
        <button
            className={"square "+ (props.isLastPosition? "square-highlight":"")}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            value={this.props.squares[i]} 
            isLastPosition={this.props.lastPosition === i}
            onClick={() => this.props.onClick(i)}// 네이밍 on[Event] handle[Event]
        />
    }

    render() {
        const board = (() => {
            const boardRaw = 3;
            const boardColumn = 3;
            const squares = Array.from({length: boardRaw*boardColumn}
                , (_, i) => this.renderSquare(i));

            const boardRawArr = []; 
            // [
            //     [this.renderSquare(0), this.renderSquare(1), this.renderSquare(2)],
            //     [this.renderSquare(3), this.renderSquare(4), this.renderSquare(5)],
            //     [this.renderSquare(6), this.renderSquare(7), this.renderSquare(8)],
            // ] 최종  형태
            
            const result = [];
            // [
            //     (<div className='board-row' key={0}>{boardRawArr[0]}</div>),
            //     (<div className='board-row' key={1}>{boardRawArr[1]}</div>),
            //     (<div className='board-row' key={2}>{boardRawArr[2]}</div>),
            // ]  최종 형태
            
            let index = 0;

            for(let i = 0; i < boardRaw; i++) {
                boardRawArr.push([]);

                for(let j = 0; j < boardColumn; j++) {
                    boardRawArr[i].push(squares[index++])
                }
                
                result.push((<div className='board-row' key={i}>{boardRawArr[i]}</div>));
            }
            return result;
        })()

        return (
            <div>
                {board}
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                lastPosition: -1,
            }],
            stepNumber: 0,
            xIsNext: true,
            areMovesSortedInAsc: true,
        }
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        if(calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                lastPosition: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    movesSortToggle() {
        this.setState({
            areMovesSortedInAsc: !this.state.areMovesSortedInAsc,
        })
    }

    render() {
        const areMovesSortedInAsc = this.state.areMovesSortedInAsc;
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const sortToggleDesc = areMovesSortedInAsc ? "DESC" : "ASC"

        const moves = ((items)=> {
                return  areMovesSortedInAsc ? items : items.reverse();
        })
        (
            history.map((step, move) => {
            const status = (move % 2) === 1 ? 'X' : 'O';
            const position = `(${Math.floor(step.lastPosition / 3)}, ${step.lastPosition % 3})`;
            const desc = move ?
                'Go to '+status+" "+position :
                'Go to game Start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
            })
        );

        let status;
        if(winner) {
            status = 'Winner: '+winner;
        } else {
            status = 'Next player: ' +(this.state.xIsNext ? 'X' : 'O');
        }

        return  (
            <div className='game'>
                <div className='game-board'>
                    <Board 
                        squares={current.squares}
                        lastPosition={current.lastPosition}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <button onClick={() => this.movesSortToggle()}>{sortToggleDesc}</button>
                    <ol>{moves}</ol>
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