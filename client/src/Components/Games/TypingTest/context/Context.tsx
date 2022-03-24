import { createContext, FunctionComponent, useReducer, useContext, Dispatch } from 'react';

import { initialState, reducer, ActionTypes, Action, State } from './state';

export const typingContext = createContext<[State, Dispatch<Action<any>>]>([
  initialState,
  () => {},
]);

export const TypingProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <typingContext.Provider value={[state, dispatch]}>
      {children}
    </typingContext.Provider>
  );
};

export const useTyping = () => {
  const [state, dispatch] = useContext(typingContext);

  const onInput = (value: string) => {
    if (!state.timerId) {
      startTimer();
    }
    if (state.input.length >= state.text.length && state.timerId) {
      stopTimer();
    }
    dispatch({ type: ActionTypes.CHANGE_INPUT, payload: value });
  };

  const startTimer = () => {
    const timerId = setInterval(
      () => dispatch({ type: ActionTypes.TICK }),
      1000
    );
    dispatch({ type: ActionTypes.SET_TIMER, payload: timerId });
  };

  const stopTimer = () => {
    clearInterval(state.timerId);
    dispatch({ type: ActionTypes.SET_TIMER });
  };

  const onReset = () => {
    stopTimer();
    dispatch({ type: ActionTypes.CHANGE_INPUT, payload: '' });
    dispatch({type: ActionTypes.RESET_TIMER});
  };

  return { state, onInput, onReset };
};