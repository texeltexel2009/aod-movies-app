import Post from './Post'

export default function PostsContainer({ data, type }) {
  return (
    <div className="px-4 py-4 sm:px-0 gap-5 grid grid-flow-row grid-cols-4">
      {data.map( ( d ) => (
        <Post key={d.id} type={type} {...d} />
      ) )}
    </div>
  )
}
