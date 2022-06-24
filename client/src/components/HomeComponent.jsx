import { Navbar } from "./Nav Pages/Navbar";
import HeroSection from "./landingPage/Hero Section/HeroSection";
import LeaderBoard from "./landingPage/LeaderBoard";
import GenreLists from "./landingPage/GenreLists";
import ChooseUs from "./landingPage/ChooseUs";
import Footer from "./Nav Pages/Footer";

import USER from "../shared/userData";

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
