import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import { getMovieCast } from "../../api/movies";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const defaultImg =
  "https://thumbs.dreamstime.com/z/actor-icon-trendy-flat-vector-white-background-fr-professions-collection-illustration-can-be-use-web-mobile-eps-130325765.jpg?w=768"
const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const res = await getMovieCast(movieId);
        setCast(res.cast);
      } catch (err) {
        console.log(err.message)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchCast();
    }
  }, [movieId]);
  
  return (
    <div>
    <ul className={css.list}>
      {cast &&
        cast.map(({ id, profile_path, name, character }) => (
          <li key={id} className={css.item}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500${profile_path}`
                  : defaultImg
              }
              alt={name}
              width={100}
            />
            <strong>{name}</strong> as {character}
          </li>
        ))}
    </ul>
    {loading && <Loader />}
      {!loading && error && (
        <ErrorMessage
          message={"Oops, something went wrong... Please reload!"}
        />
      )}

    </div>
  );
};

export default MovieCast;
