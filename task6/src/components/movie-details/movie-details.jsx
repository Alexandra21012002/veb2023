import React from "react";
import { EditIcon } from "../../assets/icons/edit-icon";
import "./movie-details.css";

const MovieDetails = ({
  movie,
  callEditMovie
}) => {
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
          <p className="title-of-film">{movie.title}</p>
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