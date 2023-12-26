import React, { useState, useEffect } from "react";
import { EditIcon } from "../../assets/icons/edit-icon";
import { StarIcon } from "../../assets/icons/star";
import "./movie-details.css";

const MovieDetails = ({
  movie,
  callEditMovie
}) => {
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite);

  useEffect(() => {
    setIsFavorite(movie.isFavorite);
  }, [movie.isFavorite]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    updateFavoritesInDatabase(movie.id, !isFavorite);
    // getAll()
  };

  const updateFavoritesInDatabase = async (movieId, isFavorite) => {
    try {
      const response = await fetch(`http://localhost:3300/movies/${movieId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFavorite }),
      });

      if (!response.ok) {
        throw new Error('Ответ сети пришел с ошибкой');
      }

      window.location.reload();
    } catch (error) {
      console.error('Ошибка обновления избранного:', error);
    }
  };

  // function getAll() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       fetch("http://localhost:3300/movies")
  //         .then((res) => res.json())
  //         .then((data) => resolve(data))
  //         .catch(() => {
  //           alert("Error in fetch!");
  //           reject("Error in fetch!");
  //         });
  //     }, 300); // 300 миллисекунд (0.3 секунды) задержки
  //   });
  // }

  return (
    <div className="movie-details">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p className="id">id: {movie.id}</p>
        <button
          className="edit-btn"
          onClick={() => {
            callEditMovie();
          }}
        >
          <EditIcon />
          <p className="edit-text">Редактировать</p>
        </button>
      </div>
      <div
        style={{ display: "flex" }}
      >
        <img
          className="image"
          src={movie.posterUrl}
          alt="img of film"
        ></img>
        <div className="info">
          <p className="title-of-film">{movie.title}{" "}
            <span onClick={toggleFavorite}>
              <StarIcon filled={isFavorite} />
            </span>
          </p>
          <p className="param" style={{ marginTop: 0 }}>
            {movie.director}
          </p>
          <p className="title-parameters"><strong>Параметры</strong></p>
          <PropsOfFilm nameParam='Год производства:' value={movie.year} />
          <PropsOfFilm nameParam='Длительность:' value={movie.runtime + ' мин.'} />
          <PropsOfFilm nameParam='Жанры:' value={movie.genres.join(", ")} />
          <PropsOfFilm nameParam='В главных ролях:' value={movie.actors} />
        </div>
      </div>
      <div className="block-description">
        <p> <strong>Описание:</strong></p>
        <p>{movie.plot}</p>
      </div>

    </div>
  );
};

export default MovieDetails;

const PropsOfFilm = ({
  nameParam,
  value
}) => {
  return (
    <div className="container-param">
      <p className="param">{nameParam}</p>
      <p className="param-value">{value}</p>
    </div>
  );
}