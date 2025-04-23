"use client";

import { useState } from "react";
import Image from "next/image";
import { Movie } from "@/types";
import MovieDialogWrapper from "./MovieDialogWrapper";

type GenreData = {
  genre: {
    id: number;
    name: string;
  };
  movies: Movie[];
};

type Props = {
  genreData: GenreData[];
  search: string;
};

export default function ClientMovieSection({ genreData, search }: Props) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const normalizedSearch = search.toLowerCase();

  // ✅ Handle search mode: flatten all movies and dedupe by ID
  if (search) {
    const allMovies = genreData.flatMap(({ movies }) => movies);
    const uniqueMovies = Array.from(
      new Map(allMovies.map((m) => [m.id, m])).values()
    );
    const filtered = uniqueMovies.filter((movie) =>
      movie.title.toLowerCase().includes(normalizedSearch)
    );

    return (
      <>
        <section className="px-6 py-6">
          <h2 className="text-xl font-semibold mb-4">
            Search Results for {search}
          </h2>

          {filtered.length === 0 ? (
            <p className="text-center text-zinc-400 mt-10">No results found.</p>
          ) : (
            <div className="flex flex-wrap gap-6">
              {filtered.map((movie, idx) => (
                <div
                  key={movie.id}
                  className="w-[200px] cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <div className="aspect-[2/3] relative mb-2 rounded-lg overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      alt={`Poster for ${movie.title}`}
                      width={200}
                      height={300}
                      className="rounded-lg object-cover"
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 60vw, 200px"
                    />
                  </div>
                  <h3 className="text-base font-medium truncate">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {movie.release_date?.slice(0, 4)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <MovieDialogWrapper
          selectedMovie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      </>
    );
  }

  // ✅ Default genre section rendering (when no search)
  return (
    <>
      <section className="px-6 py-6">
        {genreData.map(({ genre, movies }) => (
          <article key={genre.id} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{genre.name} Movies</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {movies.map((movie, idx) => (
                <div
                  key={movie.id}
                  className="min-w-[200px] cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <div className="aspect-[2/3] relative mb-2 rounded-lg overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      alt={`Poster for ${movie.title}`}
                      width={200}
                      height={300}
                      className="rounded-lg object-cover"
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 60vw, 200px"
                    />
                  </div>
                  <h3 className="text-base font-medium truncate">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {movie.release_date?.slice(0, 4)}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <MovieDialogWrapper
        selectedMovie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
}
