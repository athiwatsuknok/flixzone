import { headers } from "next/headers";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { fetchMoviesByGenre } from "@/lib/api";
import ClientMovieSection from "@/components/ClientMovieSection";
import { Button } from "@/components/ui/button";

const genres = [
  { id: 28, name: "Action" },
  { id: 16, name: "Animation" },
  { id: 18, name: "Drama" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 99, name: "Documentary" },
];

export default async function HomePage() {
  const headersList = headers();
  const host = (await headersList).get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const fullUrl = `${protocol}://${host}${
    (await headersList).get("x-next-url") || "/"
  }`;
  const url = new URL(fullUrl);

  const search = url.searchParams.get("q")?.toLowerCase() || "";

  const genreData = await Promise.all(
    genres.map(async (genre) => {
      const movies = await fetchMoviesByGenre(genre.id);
      return { genre, movies };
    })
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="px-6 pt-6 flex items-center justify-between z-10 relative">
        <Link href="/" className="text-2xl font-bold">
          Flix<span className="text-[#ef233c]">Zone</span>
        </Link>
        <form action="/" method="get" className="flex gap-2">
          <Input
            type="text"
            name="q"
            defaultValue={search}
            placeholder="Search movies..."
            className="w-full max-w-sm bg-zinc-900 text-white placeholder-zinc-400 border-zinc-700"
          />
          <Button
            type="submit"
            className="px-4 py-2 rounded bg-zinc-800 text-white hover:bg-zinc-700"
          >
            Search
          </Button>
        </form>
      </header>

      <ClientMovieSection genreData={genreData} search={search} />
    </main>
  );
}
