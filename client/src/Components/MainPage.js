import { useState, useEffect } from 'react';
import Leaderboards from './Leaderboards';

function MainPage({ games }) {

  return (
    <>
    <div className='home-leaderboard'>
      <Leaderboards />
    </div>
    </>
  )
}

export default MainPage;