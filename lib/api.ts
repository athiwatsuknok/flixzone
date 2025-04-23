import { Movie, VideoResult } from "@/types";

// Fetch movies by genre ID
export const fetchMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=96f178a2a0db79946b0f6f817a225a4f&with_genres=${genreId}`
  );
  const data = await res.json();
  return data.results;
};

// Fetch trailer for a specific movie
export const fetchMovieTrailer = async (
  movieId: number
): Promise<string | null> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=96f178a2a0db79946b0f6f817a225a4f`
  );
  const data = await res.json();
  const trailer = data.results.find(
    (vid: VideoResult) => vid.type === "Trailer" && vid.site === "YouTube"
  );
  return trailer?.key || null;
};
