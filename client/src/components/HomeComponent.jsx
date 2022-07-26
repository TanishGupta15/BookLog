import { Navbar } from './Nav Pages/Navbar.jsx';
import HeroSection from './landingPage/Hero Section/HeroSection.jsx';
import GenreLists from './landingPage/GenreLists.jsx';
import ChooseUs from './landingPage/ChooseUs.jsx';
import Footer from './Nav Pages/Footer.jsx';

function Home() {
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
