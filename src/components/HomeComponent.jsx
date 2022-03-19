import { Navbar } from "./Navbar"
import LeaderBoard from "./LeaderBoard";
import HeroSection from "./HeroSection";
import ChooseUs from "./ChooseUs";
import Footer from "./Footer";
import BrowseBooks from "./BrowseBooksSection";

import USER from '../shared/userData'


function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <LeaderBoard USER={USER}/>
      <ChooseUs/>
      <BrowseBooks/>
      <Footer/>
    </div>
  )
}

export default Home