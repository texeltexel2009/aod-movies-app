import Moviestmdb from 'moviestmdb'

const tmdb = new Moviestmdb( process.env.NEXT_PUBLIC_TMDB_API_KEY )

export default tmdb
