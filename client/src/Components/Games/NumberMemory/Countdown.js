import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

// GLOBAL VARIABLES
const seconds = 3
const time = seconds * 10

function Countdown({ setAnswerPage }) {
  const [countDown, setCountDown] = useState(time);
  const now = (countDown / time ) * 100

  useEffect(() => {
    const timer = setTimeout(() => {
      return setCountDown(countDown - 1)
    }, 100)
    if (countDown < 0) {
      clearTimeout(timer);
      setAnswerPage(true);
    }
  }, [countDown])

  return (
    <ProgressBar style={{width: '50%', margin: 'auto'}} now={now} />
  )
}

export default Countdown;