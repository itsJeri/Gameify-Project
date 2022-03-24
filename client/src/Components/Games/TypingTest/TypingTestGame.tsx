import React from 'react';

import { TypingProvider } from './context/Context';
import { UserInput } from './UserInput';
import { Preview } from './Preview';
import { SpeedInfo } from './SpeedInfo';

interface gameProps {
  handleScoreSubmit: Function;
  errors: Array<string>;
}
// function TypingTestGame() {
//   return (
  export const TypingTestGame = () => (
    <TypingProvider>
      <h1>Typing Speed Test</h1>
      <div className='container'>
        <div className='typing-test'>
          <Preview />
          <UserInput />
        </div>
      <SpeedInfo />
      </div>
    </TypingProvider>
  )
// }

// export default TypingTestGame;