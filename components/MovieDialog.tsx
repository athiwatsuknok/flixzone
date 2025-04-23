"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Movie } from "@/types";

type Props = {
  open: boolean;
  onClose: () => void;
  movie: Movie;
  trailerKey: string | null;
};

export default function MovieDialog({
  open,
  onClose,
  movie,
  trailerKey,
}: Props) {
  const genreNames = movie.genre_ids?.map((id) => id.toString()) ?? [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-sm:w-[80%] min-sm:w-[80%] min-lg:w-[70%] min-xl:w-[50%] max-md:h-[80%] !max-w-none min-h-1/2 bg-zinc-900 text-white rounded-xl shadow-lg border border-slate-800">
        <article
          className="flex flex-col min-md:flex-row h-full"
          aria-label="Movie Details"
        >
          <div className="min-md:space-y-4 min-sm:flex-1 flex flex-col justify-center">
            <DialogHeader>
              <VisuallyHidden>
                <DialogTitle>{movie.title}</DialogTitle>
              </VisuallyHidden>
            </DialogHeader>
            <h2 className="text-4xl max-md:text-2xl font-bold">
              {movie.title}{" "}
              <span className="text-zinc-400 max-md:text-xl">
                ({movie.release_date?.slice(0, 4)})
              </span>
            </h2>
            <div className="text-lg max-md:mt-2 text-yellow-400 font-semibold">
              ⭐ {movie.vote_average}
            </div>
            <div className="flex flex-wrap gap-2">
              {genreNames.map((name) => (
                <span
                  key={name}
                  className="bg-zinc-800 text-sm px-3 py-1 rounded-full border border-zinc-600"
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="text-base max-md:mt-2 max-md:text-[14px] text-zinc-300 leading-relaxed max-h-[30vh] overflow-y-auto pr-2">
              {movie.overview}
            </p>
          </div>
          <div className="flex-1 max-md:mt-2 bg-black relative">
            {trailerKey ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title={`Trailer for ${movie.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-400">
                No trailer available
              </div>
            )}
          </div>
        </article>
      </DialogContent>
    </Dialog>
  );
}
