import { useState } from 'react'

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const winner = calculateWinner(board)

  function handleClick(index: number) {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = xIsNext ? 'X' : 'O'
    setBoard(newBoard)
    setXIsNext(!xIsNext)
  }

  function reset() {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">Jogo da Velha Distribuído</h1>
      <div className="grid grid-cols-3 gap-2 mb-8 bg-gray-700 p-2 rounded-lg">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-24 h-24 bg-gray-800 text-5xl font-bold flex items-center justify-center hover:bg-gray-600 transition-colors"
            onClick={() => handleClick(index)}
          >
            <span className={cell === 'X' ? 'text-red-400' : 'text-green-400'}>{cell}</span>
          </button>
        ))}
      </div>
      {winner ? (
        <div className="text-2xl font-bold text-yellow-400 animate-bounce">Vencedor: {winner}! 🎉</div>
      ) : (
        <div className="text-xl">Próximo a jogar: {xIsNext ? 'X' : 'O'}</div>
      )}
      <button onClick={reset} className="mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full font-semibold transition">Reiniciar</button>
    </div>
  )
}

function calculateWinner(squares: any[]) {
  const lines = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]
  }
  return null
}