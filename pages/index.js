import React from 'react'
import { Router, withRouter } from 'next/router'
import ReactPaginate from 'react-paginate'
import tmdb from '../configs/tmdb'
import PostsContainer from '../components/PostsContainer'

const Home = ( props ) => {
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

      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        activeClassName={'active'}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        initialPage={props.currentPage - 1}
        pageCount={props.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={paginationHandler}
      />
    </>
  )
}

Home.getInitialProps = async ({ query }) => {
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

export default withRouter( Home )
