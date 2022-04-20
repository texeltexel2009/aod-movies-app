const fs = require("fs");
const Movietmdb = require("moviestmdb");
const tmdb = new Movietmdb("your-api");
const slugify = require("slugify");
const getMovie = (movie) => {
  return {
    id: movie.id,
    title: movie.title,
    slug: slugify(`${movie.title}-${movie.id}`, {
      lower: true,
      remove: /[*+~,.()'"!:@]/g,
    }),
  };
};
const generateJSON = (page, cb) => {
  let lists = [];
  let pages = Array.from({ length: page }, (_, i) => i + 1);

  pages.forEach(async (p) => {
    try {
      const res = await tmdb.discover("movie", [
        {
          param: "sort_by",
          value: "vote_count.desc",
        },
        {
          param: "page",
          value: p,
        },
      ]);
      console.log(`Currently Processing Page: ${res.page}`);
      res.results.forEach((movie) => lists.push(getMovie(movie)));
      cb(lists);
    } catch (err) {
      console.log(err);
    }
  });
};
const totaPage = 2;
// this will get link of 40 movies i.e totalpage * 20
generateJSON(totaPage, (lists) => {
  // Will create a JSON file under the data directory
  fs.writeFile(
    "data/discovermovies.json",
    JSON.stringify(lists),
    "utf8",
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
});
