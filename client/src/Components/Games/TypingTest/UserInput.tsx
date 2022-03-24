import { FunctionComponent } from 'react';

import { useTyping } from './context/Context';

export const UserInput: FunctionComponent = () => {
  const {
    state: { input },
    onInput,
  } = useTyping();

  return (
    <textarea
      rows={5}
      value={input}
      onChange={(e) => onInput(e.target.value)}
    />
  );
};