import tmdb from "../../configs/tmdb"
import Image from "next/image"
import getIdFromSlug from "../../utils/parse-slug"

export default function SingleMovie({ tvData }) {
  const {
    poster_path,
    name,
    original_name,
    overview,
    tagline,
    genres,
    videos: { results },
    credits: { cast },
    seasons,
  } = tvData;

  return (
    <div className="container px-4">
      <section className="mt-8 text-gray-800 grid md:grid-cols-3 gap-2">
        <section className="col-span-3 md:col-span-1 flex flex-col items-center">
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={original_name}
            width="300"
            height="350"
            className="rounded-lg"
          />
          <div className="text-2xl">
            {name}
            <p className="text-sm italic">{tagline}</p>
          </div>
        </section>
        <section className="col-span-3 md:col-span-2">
          <div>
            <p className="text-3xl mb-3 font-semibold">Overview</p>
            {overview}
          </div>
          <div>
            <p className="text-2xl font-semibold">Genres</p>
            <div className="flex  gap-2">
              {genres.map((genre) => (
                <div className="m-1 " key={genre.id}>
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-2xl font-semibold">Total Seasons</p>
            <div className="flex  gap-2">{seasons.length}</div>
          </div>
          <button className="my-2 p-3 bg-red-500 text-gray-50 rounded-lg">
            <a
              href={`https://www.youtube.com/watch?v=${results[0].key}`}
              target="_blank"
              rel="noreferrer"
              className="flex gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-35.20005 -41.33325 305.0671 247.9995"
                className="h-6 w-6 mr-1"
              >
                <path
                  d="M93.333 117.559V47.775l61.334 34.893zm136.43-91.742c-2.699-10.162-10.651-18.165-20.747-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.555 7.652 7.603 15.655 4.904 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.904 56.849c2.699 10.163 10.65 18.165 20.747 20.883 18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.683-4.934c10.096-2.718 18.048-10.72 20.747-20.883 4.904-18.42 4.904-56.85 4.904-56.85s0-38.43-4.904-56.849"
                  fill="#fff"
                ></path>
              </svg>
              Watch Trailer
            </a>
          </button>
        </section>
      </section>
      <section className="mt-8">
        <p className="text-3xl mb-3">Cast</p>

        <div className="grid grid-cols-2 md:grid-cols-6 ">
          {cast.slice(0, 6).map((c) => (
            <div key={c.id} className="flex flex-col items-center m-2">
              <Image
                src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
                alt={c.character}
                width="150"
                height="180"
                className="rounded-lg"
              />
              <p> {c.name}</p>
              <p className="text-gray-700 italic"> {c.character}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const slug = ctx.params !== undefined ? ctx.params.slug : "";
  const id = getIdFromSlug(slug);
  const tvData = await tmdb.tv(id, {
    append: ["videos", "credits"],
  });
  return {
    props: {
      tvData,
      error: false,
    },
  };
};
