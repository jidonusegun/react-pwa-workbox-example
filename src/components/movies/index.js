import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from './movie';

const Movies = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    
  }, [])

  return (
      <div className="flex flex-wrap -mb-4">
        {!loading && movies?.length ? movies.map( (movie, index) =>  <Movie key={movie?.id ?? index} movie={movie}/>) : <h2>Loading...</h2>}
      </div>
  )
}

export default Movies
