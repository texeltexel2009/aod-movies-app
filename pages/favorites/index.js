import React from 'react'
import { Router, withRouter } from 'next/router'
import ReactPaginate from 'react-paginate'
import tmdb from '../../configs/tmdb'
import PostsContainer from '../../components/PostsContainer'
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'

const Favorites = ( props ) => {
  // When new page selected in paggination, we take current path and query parrams.
  // Then add or modify page parram and then navigate to the new route.
  const paginationHandler = ( page ) => {
    const currentPath = props.router.pathname
    const currentQuery = props.router.query
    currentQuery.page = page.selected + 1

    props.router.push( {
      pathname: currentPath,
      query: currentQuery,
    } )
  }

  let content
  if ( props.isAnimating ) {
    content = (
      <span className="visually-hidden">Loading...</span>
    )
  } else {
    content = (
      <PostsContainer data={props.posts} type="movies" />
    )
  }


  return (
    <>
      {content}

      <nav>
        <ReactPaginate
          containerClassName={'border-t border-gray-200 px-4 flex items-center justify-between sm:px-0'}
          previousClassName={'-mt-px w-0 flex-1 flex'}
          previousLinkClassName={'border-t-2 border-transparent py-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'}
          previousLabel={<span className="flex"><ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" /> Previous</span>}
          nextClassName={'-mt-px w-0 flex-1 flex justify-end'}
          nextLinkClassName={'border-t-2 border-transparent py-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'}
          nextLabel={<span className="flex">Next <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" /></span>}
          breakLabel={'...'}
          breakClassName={'hidden border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 py-4 px-4 md:inline-flex items-center text-sm font-medium'}
          pageLinkClassName={'hidden border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 py-4 px-4 md:inline-flex items-center text-sm font-medium'}
          activeLinkClassName={'border-indigo-500 text-indigo-600'}
          initialPage={props.currentPage - 1}
          pageCount={props.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={paginationHandler}
        />
      </nav>
    </>
  )
}

Favorites.getInitialProps = async ({ query }) => {
  // TODO: Add 500 limit as per TMDB limit
  const page = query.page || 1
  const tmdbData = await tmdb.discover( 'movie', [
    {
      param: 'sort_by',
      value: 'vote_count.desc',
    },
    {
      param: 'page',
      value: page
    },
  ] )

  return {
    totalCount: tmdbData.total_results,
    pageCount: tmdbData.total_pages,
    currentPage: tmdbData.page,
    perPage: 20,
    posts: tmdbData.results,
  }
}

export default withRouter( Favorites )
