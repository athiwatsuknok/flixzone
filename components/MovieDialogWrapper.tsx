"use client";

import { useState, useEffect } from "react";
import MovieDialog from "./MovieDialog";
import { Movie } from "@/types";
import { fetchMovieTrailer } from "@/lib/api";

type Props = {
  selectedMovie: Movie | null;
  onClose: () => void;
};

export default function MovieDialogWrapper({ selectedMovie, onClose }: Props) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    if (selectedMovie) {
      fetchMovieTrailer(selectedMovie.id).then(setTrailerKey);
    }
  }, [selectedMovie]);

  if (!selectedMovie) return null;

  return (
    <MovieDialog
      open={!!selectedMovie}
      onClose={onClose}
      movie={selectedMovie}
      trailerKey={trailerKey}
    />
  );
}
