import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./Navbar";
import HeroSection from "./GenrePageComponents/GenreHeroSection";

function GenresPage() {
  const { genre } = useParams();
  return (
    <>
      <Navbar />
      <HeroSection genre={genre} />
    </>
  );
}

export default GenresPage;
