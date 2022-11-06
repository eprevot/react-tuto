import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function calculateWinner(squares) {
  if (squares[0] === squares[1] && squares[1] === squares[2]) return squares[0];
  if (squares[3] === squares[4] && squares[4] === squares[5]) return squares[3];
  if (squares[6] === squares[7] && squares[7] === squares[8]) return squares[6];
  if (squares[0] === squares[4] && squares[4] === squares[8]) return squares[0];
  if (squares[2] === squares[4] && squares[4] === squares[6]) return squares[2];
  if (squares[0] === squares[3] && squares[3] === squares[6]) return squares[0];
  if (squares[1] === squares[4] && squares[4] === squares[7]) return squares[1];
  if (squares[2] === squares[5] && squares[5] === squares[8]) return squares[2];
  return null;
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      XIsNext: true
    };
  }

  handleClick(i) {
    if (this.state.winner || this.state.squares[i]) {
      return;
    }
    const squares = this.state.squares.slice();
    squares[i] = this.state.XIsNext ? 'X' : 'O';
    this.setState({
      squares,
      XIsNext: !this.state.XIsNext,
      winner: calculateWinner(squares)
    });
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const status = this.state.winner ? this.state.winner + 'a gagné' : 'Next player: ' + (this.state.XIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);
