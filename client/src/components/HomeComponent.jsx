import { Navbar } from './Nav Pages/Navbar.jsx';
import HeroSection from './landingPage/Hero Section/HeroSection.jsx';
import LeaderBoard from './landingPage/LeaderBoard.jsx';
import GenreLists from './landingPage/GenreLists.jsx';
import ChooseUs from './landingPage/ChooseUs.jsx';
import Footer from './Nav Pages/Footer.jsx';

import USER from '../shared/userData.js';

function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <LeaderBoard USER={USER} />
      <GenreLists />
      <ChooseUs />
      <Footer />
    </div>
  );
}

export default Home;
