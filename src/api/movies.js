import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDA5MjFmNjk5ZjkyNGJhMjYxMjgyOTVjZTAxODhmYSIsIm5iZiI6MTczNDcwMDk4MC4yOTMsInN1YiI6IjY3NjU2ZmI0ZjkyNmJlMDNjYzc0OWU2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iW4G0Q8Vwd-Ulf7Hewx8kpvdiVEAKFSlUvtE4kEHCy0",
};

const primaryLanguage = "en-US";

const searchMovies = async (query, page = 1) => {
  const { data } = await axios("search/movie", {
    headers,
    params: {
      query,
      page,
      language: primaryLanguage,
    },
  });
  return data;
};

const getTrendingMovies = async (page = 1) => {
  const { data } = await axios("trending/movie/day", {
    headers,
    params: {
      language: primaryLanguage,
      page,
    },
  });
  return data;
};

const getMovie = async (movie_id) => {
  const { data } = await axios(`movie/${movie_id}`, {
    headers,
    params: {
      language: primaryLanguage,
    },
  });
  return data;
};

const getMovieCast = async (movie_id) => {
  const { data } = await axios(`movie/${movie_id}/credits`, {
    headers,
    params: {
      language: primaryLanguage,
    },
  });
  return data;
};

const getMovieReviews = async (movie_id, page = 1) => {
  const { data } = await axios(`movie/${movie_id}/reviews`, {
    headers,
    params: {
      page,
      language: primaryLanguage,
    },
  });
  return data;
};

export {
  searchMovies,
  getTrendingMovies,
  getMovie,
  getMovieCast,
  getMovieReviews,
};
