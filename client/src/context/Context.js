import { createContext, useState } from 'react';

export const Context = createContext()

function ContextProvider(props) {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);

  function regex(str) {
    return(
      str.replace(/[^a-z0-9\s-]/ig,'')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase()
    )
  }

  const store = {
    user,
    setUser,
    games,
    setGames,
    regex
  }

  return (
    <Context.Provider value={store}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;