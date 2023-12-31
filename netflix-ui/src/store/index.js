import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${process.env.REACT_APP_TMDB_BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
  );
  return genres;
});

const createArrayFromData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });

    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return getData(
      `${process.env.REACT_APP_TMDB_BASE_URL}/trending/${type}/week?api_key=${process.env.REACT_APP_API_KEY}`,
      genres,
      true
    );
    // console.log(data);
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  "netflix/movies",
  async ({ genre, type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return getData(
      `${process.env.REACT_APP_TMDB_BASE_URL}/discover/${type}?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genre}`,
      genres
    );
    // console.log(data);
  }
);

export const getUserLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:4000/api/user/liked/${email}`);
    return movies;
  }
);

export const removeMovieFromLiked = createAsyncThunk(
  "netflix/removeLiked",
  async ({ movieId, email }) => {
    const {
      data: { movies },
    } = await axios.put("http://localhost:4000/api/user/remove", {
      email,
      movieId,
    });
    return movies;
  }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
