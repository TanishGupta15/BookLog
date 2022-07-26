import { useEffect, useState } from 'react';
import MainComponent from './components/MainComponent.jsx';
import { UserContext } from './components/Login Pages/UserContext.jsx';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/user/profile', { withCredentials: true });
        console.log(data);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <MainComponent />
    </UserContext.Provider>
  );
}

export default App;
