import tmdb from '../configs/tmdb'
import Moviescontainer from '../components/CardContainer'

export default function Home({ moviesData }) {
  const { page, results, total_pages, total_results } = moviesData;
  //console.log(page)
  //console.log(total_pages)
  //console.log(total_results)

  return (
    <Moviescontainer data={results} type="movies" />
  )
}

export const getStaticProps = async () => {
  const movies = await tmdb.discover( 'movie', [
    {
      param: 'sort_by',
      value: 'vote_count.desc',
    },
    {
      param: 'page',
      value: 1
    },
  ] )

  return {
    props: {
      moviesData: movies,
    },
  }
}
