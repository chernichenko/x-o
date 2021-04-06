import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import cn from 'classnames';
import { initialItemsState, winnerValuesArray } from './utils/constants';
import { isArrayIncludesAnotherArray } from './utils';

const App = () => {
  const [items, setItems] = useState(initialItemsState);
  const [isNextX, setIsNextX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winnerCombination, setWinnerCombination] = useState(null);

  const onClickHandler = clickedIndex => {
    if (!items[clickedIndex] && !winner) {
      setItems(prevItems => {
        const nextValue = isNextX ? 'X' : 'O';
        return prevItems.map((item, key) => key !== clickedIndex ? item : nextValue);
      });
      setIsNextX(s => !s);
    }
  }

  useEffect(() => {
    onCheckHandler();
  }, [items])

  const onCheckHandler = () => {
    let isHasWinner = false;
    winnerValuesArray.forEach(winnerValues => {
      const positionsX = [];
      const positionsO = [];
      items.forEach((item, index) => {
        item === 'X' && positionsX.push(index);
        item === 'O' && positionsO.push(index);
      });

      if (isArrayIncludesAnotherArray(positionsX, winnerValues)) {
        setWinner('X');
        setWinnerCombination(winnerValues);
        isHasWinner = true;
      }

      if (isArrayIncludesAnotherArray(positionsO, winnerValues)) {
        setWinner('O');
        setWinnerCombination(winnerValues);
        isHasWinner = true;
      }

      if (items.filter(item => item !== null).length === 9 && !isHasWinner) {
        setWinner('DRAW');
      }
    })
  }

  const resetHandler = () => {
    setItems(initialItemsState);
    setIsNextX(true);
    setWinner(null);
    setWinnerCombination(null);
  }

  return (
    <div className={styles.app}>
      <div className={styles.inner}>
        {winner
        ? (
          <h1>
            {winner === 'DRAW'
            ? 'Draw'
            : `Winner: ${winner === 'X' ? 'X' : 'O'}`}
          </h1>
        )
        : <h1>Next is: {isNextX ? 'X' : 'O'}</h1>}
        <div className={styles.wrap}>
          {items.map((item, key) => (
            <div
              key={key}
              className={cn(styles.item, styles[`item${key}`], winnerCombination?.includes(key) && styles.winner)}
              onClick={() => onClickHandler(key)}
            >
              {item}
            </div>
          ))}
        </div>
        <button onClick={resetHandler}>Restart</button>
      </div>
    </div>
  );
}

export default App;
