import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchBlogById, likeBlog } from '../data/blogs.js';
import { Bookmark, Heart } from "lucide-react";
import { useGlobalContext } from "../context/globalContext";

const SingleBlogPage = () => {
    const { blogId } = useParams();
    const [singleBlog, setSingleBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    
    const { user, isLoggedIn } = useGlobalContext();
    const navigate = useNavigate();

    const [currentLikes, setCurrentLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const loadBlog = async () => {
            try {
                setIsLoading(true);
                setIsError(false);
                const blogData = await fetchBlogById(blogId);
                
                if (blogData) {
                    setSingleBlog(blogData);
                    setCurrentLikes(blogData.likesCount);
                    setIsLiked(user ? blogData.likes.includes(user._id) : false);
                } else {
                    setIsError(true);
                }
            } catch (error) {
                console.error('Error loading blog:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadBlog();
    }, [blogId, user]);

    const handleLike = async () => {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }
      try {
        const data = await likeBlog(blogId);
        setCurrentLikes(data.likesCount);
        setIsLiked(data.isLiked);
      } catch (error) {
        console.error("Failed to like post:", error);
      }
    };
    
    if (isLoading) {   
        return(
            <main>
                <section className="min-h-screen">
                    <div className="container mx-auto px-2">
                        <div className="py-12">
                            <LoadingComponent /> 
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    if (isError || !singleBlog) {
        return(
            <main>
                <section className="min-h-screen">
                    <div className="container mx-auto px-2">
                        <div className="py-12">
                            <h1 className="text-2xl font-bold text-red-600">Blog not found</h1>
                            <p className="mt-4">The blog you're looking for doesn't exist or has been removed.</p>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    const { 
        author, 
        category, 
        content, 
        expert,
        featuredImage, 
        tags, 
        title 
    } = singleBlog;
    
    const primaryAuthor = author && author.length > 0 ? author[0] : null;
    
    return(
        <main>
            <section className="min-h-screen">
                <div className="container mx-auto px-2">
                    <div className="py-12">
                        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4">{title}</h1>
                        
                        {expert && (
                            <div className="p-4 rounded bg-red-50 border border-red-400 text-red-800 mb-4">
                                <p>{expert}</p>
                            </div>
                        )}
                        
                        {featuredImage && (
                            <img 
                                src={featuredImage} 
                                alt={title} 
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                        )}
                        
                        <div className="flex items-center gap-3 justify-between mb-4">
                            <div className="flex items-center gap-2">
                                {primaryAuthor?.profilePicture && (
                                    <img 
                                        className="size-8 rounded-full object-cover" 
                                        src={primaryAuthor.profilePicture} 
                                        alt={primaryAuthor.username} 
                                    />
                                )}
                                <h4 className="text-lg font-semibold">{primaryAuthor?.username || "Anonymous"}</h4>
                            </div>
                            <div className="flex items-center gap-1">
                                <button><Bookmark /></button>
                                <button onClick={handleLike}>
                                  <Heart 
                                    className={isLiked ? "text-red-600 fill-red-600" : "text-gray-700"} 
                                  />
                                </button>
                                <p>{currentLikes || 0}</p>
                            </div>
                        </div>
                        
                        {tags && tags.length > 0 && (
                            <div className="flex gap-2 mb-4">
                                {tags.map((tag, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        <div dangerouslySetInnerHTML={{__html: content}} className="blog-content-container"/>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SingleBlogPage;

const LoadingComponent = () => {
    return(
        <article role="status" className="p-4 rounded animate-pulse">
            <div role="status" className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[3D0px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
        </article>      
    );
};