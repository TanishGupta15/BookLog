import { Navbar } from "./Navbar"
import LeaderBoard from "./LeaderBoard";

import USER from '../shared/userData'


function Home() {
  return (
    <div>
      <Navbar />
      <LeaderBoard USER={USER}/>
    </div>
  )
}

export default Home