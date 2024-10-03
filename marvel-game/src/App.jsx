import './App.css';
import { useState, useEffect } from 'react';
import apiCall from './apiCall';

function App() {
  const [characters, setCharacters] = useState([]);
  const [gridItems, setGridItems] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const prepareGrid = (arr, numPairs) => {
    const shuffled = shuffleArray(arr);
    const selectedItems = shuffled.slice(0, numPairs);
    const duplicatedItems = [...selectedItems, ...selectedItems];
    return shuffleArray(duplicatedItems);
  };

  useEffect(() => {
    async function fetchCharacters() {
      const response = await apiCall();
      const allCharacters = response.data.results;
      const filteredCharacters = allCharacters.filter(character => {
        const { path, extension } = character.thumbnail;
        const fullImageUrl = `${path}.${extension}`;
        return path && extension && !path.includes('image_not_available') && !extension.includes('gif') && fullImageUrl;
      });
      setCharacters(filteredCharacters);
    }
    fetchCharacters();
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setMatchedCards([]);
    setFlippedCards([]);
    setGameCompleted(false);
    setGridItems(prepareGrid(characters, 18));
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (gridItems[firstIndex].name === gridItems[secondIndex].name) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
      }
      if (matchedCards.length + 2 === gridItems.length) {
        setGameCompleted(true);
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1500);
    }
  };

  useEffect(() => {
    if (characters.length > 0 && gameStarted) {
      startGame();
    }
  }, [characters]);

  const placeholderImage = 'https://wallpaperaccess.com/full/961865.jpg';

  const isMobile = window.innerWidth <= 768; // Check for mobile screen size

  return (
    <div className='memory-game'>
      {isMobile ? (
        <div className="mobile-warning">
          <h2>This game is best viewed on a PC.</h2>
          <p>Please switch to a larger screen for the best experience.</p>
        </div>
      ) : (
        <>
          {!gameStarted && (
            <div className="rules">
              <h2>Memory Game Rules</h2>
              <p>Welcome to the Memory Game! Your objective is to match pairs of cards by flipping them over. You will have 36 cards in total, arranged in a 6x6 grid. Each card has a matching pair hidden underneath. Take turns flipping two cards at a time. If you find a matching pair, those cards will remain flipped and you will earn points. If the cards do not match, they will flip back over after a brief moment. Be strategic and remember the locations of the cards that you have already flipped over. The game ends when you successfully match all pairs. Good luck, and may the best memory win!</p>
              {characters.length > 0 ? <button onClick={startGame}>Start Game</button> : <button>Fetching data for the cards...</button>}
            </div>
          )}
          {(gameStarted && !gameCompleted) && (
            <div>
              <div className='grid'>
                {gridItems.map((item, index) => (
                  <div
                    className={`card ${flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''}`}
                    key={index}
                    onClick={() => handleCardClick(index)}
                  >
                    <img
                      src={flippedCards.includes(index) || matchedCards.includes(index) ? `${item.thumbnail.path}.${item.thumbnail.extension}` : placeholderImage}
                      alt={item.name}
                      className="card-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {gameCompleted && (
            <div className="completed">
              <h2>Congratulations! You've matched all pairs!</h2>
              <button onClick={startGame}>Restart Game</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
