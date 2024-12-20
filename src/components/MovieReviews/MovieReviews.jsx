import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import { getMovieReviews } from "../../api/movies";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const res = await getMovieReviews(movieId);
        setReviews(res.results);
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
    <>
    <ul className={css.list}>
      {reviews && reviews.length > 0 ? (
        reviews.map(({ id, author, content }) => (
          <li key={id} className={css.item}>
            <h3 className={css.title}>{author}</h3>
            <p className={css.text}>{content}</p>
          </li>
        ))
      ) : (
        <li className={css.item}>
          <p>{"We don't have any reviews for this movie."}</p>
        </li>
      )}
    </ul>

{loading && <Loader />}
{!loading && error && (
  <ErrorMessage
    message={"Oops, something went wrong... Please reload!"}
  />
)}
</>
  );
};

export default MovieReviews;
