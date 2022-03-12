import { Link } from "react-router-dom"
import "./css/leaderBoard.css"

function RenderLeader( {user} ) {
  const LinkStyle = {
    textDecoration: "none"
  };
  return (
    <div className="card">
      <Link to={`/user/${user.id}`} style={LinkStyle}>
        <div className="userImage">
          <img src={user.image} alt={user.name} />
        </div>
      </Link>
      <Link to={`/user/${user.id}`} style={LinkStyle}>
        <div className="userName">
          {user.name}
        </div>
      </Link>
    </div>
  );
}

function LeaderBoard(props) {
  const Leader = props.USER.map((user)=>{
    return(
    <RenderLeader user={user} key={user.id}/>
    )
  })
  return (
    <>
    <div className="heading">
      <h2>
        Leader Board
      </h2>
    </div>
    <div className="cardContainer">
      {Leader}
    </div>
    </>
  )
}

export default LeaderBoard