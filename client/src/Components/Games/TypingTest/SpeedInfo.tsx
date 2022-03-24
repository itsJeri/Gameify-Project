import React from 'react';

import { wpm } from './utils';
import { useTyping } from './context/Context';

export const SpeedInfo = () => {
  const {
    state: { characters, seconds },
    onReset,
  } = useTyping();
  return (
    <div className='typing-speed'>
      Typing speed
      <div>{seconds}</div>
      <div>WPM: {wpm(characters, seconds)}</div>
      <div>Correct characters: {characters}</div>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};