import { /* Component */ useEffect, useState, useCallback } from 'react'
import './style.css';
import { PostCard } from '../../components/PostCard';
import { loadPosts } from '../../utils/load';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPost] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerpage] = useState(10)
  const [searchValue, setSearchValue] = useState('')

  const noMorePosts = page + postsPerpage >= allPosts.length

  const filterPosts = searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      )
    })
    : posts;


    const handleLoadPosts = useCallback(async (page, postsPerpage) => {
      const postsAndPhotos = await loadPosts()

      setPosts(postsAndPhotos.slice(page, postsPerpage))
      setAllPost(postsAndPhotos)
    }, [])

    useEffect(() => {
      handleLoadPosts(0, postsPerpage)
    }, [handleLoadPosts, postsPerpage])

    const loadMorePosts = () => {
      const nextPage = page + postsPerpage
      const nextPosts = allPosts.slice(nextPage, nextPage + postsPerpage)
      posts.push(...nextPosts)

      setPosts(posts)
      setPage(nextPage)

    }

    const handleChange = (e) => {
        const {value} = e.target
        setSearchValue(value)
    }

  return (
    <section className='container'>

       <div className='search-container'>
           {!!searchValue && (
           <h1>Pesquisou por: {searchValue}</h1>
         )}

         <TextInput
         searchValue={searchValue}
         handleChange={handleChange}
         />
       </div>

        <div className="posts">

        {filterPosts.length > 0 && (
       <>
        {
         filterPosts.map(post => (
           <PostCard
           key={post.id}
             post={post}
           />
           ))
         }
         </>
     )}

         {filterPosts.length === 0 && (
           <p>Não existem Posts</p>
         )}

       <div className='button-container'>
         {!searchValue && (
           <Button
           text="Lore more Post"
           onclick={loadMorePosts}
           disabled={noMorePosts}
        />
         )}

       </div>
     </div>
    </section>
   );

}
