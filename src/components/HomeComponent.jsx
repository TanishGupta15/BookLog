import { Navbar } from "./Navbar"
import LeaderBoard from "./LeaderBoard";
import HeroSection from "./HeroSection";

import USER from '../shared/userData'


function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <LeaderBoard USER={USER}/>
    </div>
  )
}

export default Home