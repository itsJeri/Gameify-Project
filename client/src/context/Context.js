import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Context = createContext()

function ContextProvider(props) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);

  const navigate = useNavigate();

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
    users,
    setUsers,
    games,
    setGames,
    navigate,
    regex
  }

  return (
    <Context.Provider value={store}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;