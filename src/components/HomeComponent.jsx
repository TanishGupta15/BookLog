import { Navbar } from "./Navbar"
import LeaderBoard from "./LeaderBoard";
import HeroSection from "./HeroSection";
import ChooseUs from "./ChooseUs";
import Footer from "./Footer";

import USER from '../shared/userData'


function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <LeaderBoard USER={USER}/>
      <ChooseUs/>
      <Footer/>
    </div>
  )
}

export default Home