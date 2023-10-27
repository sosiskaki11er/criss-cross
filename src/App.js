import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    };
  }

  handleCellClick = (index) => {
    if (this.state.winner || this.state.board[index]) {
      return;
    }

    const newBoard = [...this.state.board];
    newBoard[index] = this.state.currentPlayer;

    this.setState({
      board: newBoard,
      currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X',
    });

    this.checkWinner(newBoard);
  };

  checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        this.setState({ winner: board[a] });
        return;
      }
    }
  };

  resetGame = () => {
    this.setState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    });
  };

  handleHelp = () => {
    if (this.state.winner) {
      return;
    }

    const emptyCells = this.state.board.reduce((acc, cell, index) => {
      if (!cell) {
        acc.push(index);
      }
      return acc;
    }, []);

    if (emptyCells.length > 0) {
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      this.handleCellClick(randomIndex);
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Criss-Cross</h1>
        <h2>Amir Ziyarkhodjaev</h2>
        <h3>For DSR Bootcamp</h3>
        <p>Current Player: {this.state.currentPlayer}</p>
        <p>Winner: {this.state.winner ? this.state.winner : 'None'}</p>
        <div className="board">
          {this.state.board.map((cell, index) => (
            <div key={index} className="cell" onClick={() => this.handleCellClick(index)}>
              {cell}
            </div>
          ))}
        </div>
        <button onClick={this.resetGame}>New Game</button>
        <button onClick={this.handleHelp}>Help</button>
      </div>
    );
  }
}

export default App;
