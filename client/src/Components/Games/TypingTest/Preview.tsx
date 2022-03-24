import { FunctionComponent } from 'react';
import { useTyping } from './context/Context';

export const Preview: FunctionComponent = () => {
  const {
    state: { text, input },
  } = useTyping();
  const previewText = text.split('').map((s, i) => {
    let color = '';
    if (i < input.length) {
      color = s === input[i] ? 'green' : 'red';
    }
    return (
      <span key={`${s}_${i}`} className={color}>
        {s}
      </span>
    );
  });

  return <div className='preview'>{previewText}</div>;
};