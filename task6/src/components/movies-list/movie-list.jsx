import React, { useEffect, useState } from "react";
import MovieCard from "../movie-card/movie-card";
import "./movie-list.css";
import useDebounce from "./useDebounce";
import Button from "../button/button";

function fetchFilms(value) {
  return fetch(`http://localhost:3300/movies?title_like=${value}`)
    .then((res) => res.json())
    .catch(() => alert("Error in fetch!"));
}

const MovieList = ({
  showMovie,
  callAddMovie,
  movies,
  setMovies,
  stateMovie
}) => {

  const [value, setValue] = useState('');
  const { debounceValue } = useDebounce(value, 500)
  useEffect(() => {
    fetchFilms(value).then((res) => setMovies(res));
  }, [debounceValue]);

  return (
    <div className="movies-list">
      <div className="search">
        <input
          className="input-search"
          id="input-search"
          placeholder="Введите название фильма"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="movies">
        {movies.length ?
          movies.map((elem) => (
            <MovieCard key={elem.id} movie={elem} showMovie={showMovie} />
          ))
          :
          null
        }
      </div>
      <div className="line" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="found" style={{ marginLeft: 15 }}>
          <p className="found-text">Найдено {movies.length} фильмов</p>
        </div>
        <Button
          onClick={callAddMovie}
          disabled={stateMovie === "EDIT" ? true : false}
          text="Добавить фильм"
        />
      </div>
    </div>
  );
};

export default MovieList;
