import { ReactNode, useEffect, useState } from "react";
import { get } from "./util/http";
import BlogPosts, { type BlogPost } from "./components/BlogPosts";
import fetchingImg from './assets/data-fetching.png'
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPosts = {
  id: number;
  userId: number;
  title: string;
  body: string;
}

function App() {

  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchPosts = async() => {
      setIsLoading(true);
      try {
        const data = (await get('https://jsonplaceholder.typicode.com/posts')) as RawDataBlogPosts[];
        const blogPost: BlogPost[] = data.map((rawPost) => {
          return{
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body
          }
        });
        setFetchedPosts(blogPost);
      } catch (error) {
        if(error instanceof Error){
          setError(error.message)
        }
      }
     
      setIsLoading(false)
    }
      fetchPosts()
  }, [])

  let content: ReactNode;
  if(error){
    content = <ErrorMessage text={error} />
  }
  if(fetchedPosts){
    content = <BlogPosts posts={fetchedPosts} />
  }
  if(isLoading === true)  {
    content = <p id="loading-fallback">Fetching posts...</p>
  }

  return (
    <main>
      <img src={fetchingImg} alt="Img" />
      {content}
    </main>
  );
}

export default App;
