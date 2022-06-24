import { useParams } from "react-router-dom";
import { Navbar } from "../Nav Pages/Navbar";

function GenresPage() {
  const { genre } = useParams();
  return (
    <>
      <Navbar />
      <h1 justify='center'>
        {genre}
      </h1>
    </>
  );
}

export default GenresPage;
