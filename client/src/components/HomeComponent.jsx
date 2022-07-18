import { useState } from 'react';
import axios from 'axios';
import { Navbar } from './Nav Pages/Navbar.jsx';
import HeroSection from './landingPage/Hero Section/HeroSection.jsx';
import GenreLists from './landingPage/GenreLists.jsx';
import ChooseUs from './landingPage/ChooseUs.jsx';
import Footer from './Nav Pages/Footer.jsx';

// TODO -> Use user thing
function Home() {
  const [user, setUser] = useState(null);
  const gertUser = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/user/login/success');
      // setUser(user.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* <LeaderBoard USER={USER} /> */}
      <GenreLists />
      <ChooseUs />
      <Footer />
    </div>
  );
}

export default Home;
