import tmdb from '../../configs/tmdb'
import Moviescontainer from '../../components/CardContainer'

export default function Home({ series }) {
  return (
    <Moviescontainer data={series} type="tv-shows" />
  )
}

export const getStaticProps = async () => {
  const series = await tmdb.discover("tv", [
    {
      param: "sort_by",
      value: "vote_count.desc",
    },
  ]);
  return {
    props: {
      series: series.results,
    },
  };
};
