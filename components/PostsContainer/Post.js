import Image from 'next/image'
import Link from 'next/link'
import genSlug from '../../utils/gen-slug'
import { HeartIcon } from '@heroicons/react/outline'

export default function Post(props) {
  const { title, name, id, poster_path, type, popularity, release_date, vote_average } = props;

  return (
    <article className="aspect-w-2 aspect-h-3 group" data-movie-id={id}>
      <Link href={`/${type}/${genSlug(title || name, id)}`}>
        <a className="flex w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto cursor-pointer rounded-xl transform shadow-lg hover:shadow-2xl text-white">
          <Image className="relative block w-full object-cover object-top group-hover:scale-110 transition duration-300 ease-in-out" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} layout='fill' />
          <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-[#000000cc] via-[#0000009e] to-transparent"></div>
          <div className="w-full absolute bottom-0 group z-10 p-10 space-y-6">
            <div className="align-self-end w-full">
              <div className="space-y-6">
                <div className="flex flex-col space-y-2 inner">
                  <h1 className="text-2xl font-bold text-white" data-unsp-sanitized="clean">{title || name}</h1>
                </div>
                <div className="flex flex-row justify-between datos">
                  <div className="flex flex-col">
                    <div className="popularity">{popularity}</div>
                    <div className="text-sm text-gray-400">Popularity:</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="release">{release_date}</div>
                    <div className="text-sm text-gray-400">Release date:</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="runtime">{vote_average}</div>
                    <div className="text-sm text-gray-400">Vote Average:</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="button" className="absolute top-3 right-3 z-20 flex-shrink-0 rounded-full ml-3 p-1 border-2 border-white text-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
            <span className="sr-only">Add to favorites</span>
            <HeartIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </a>
      </Link>
    </article>
  )
}
