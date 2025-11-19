import { Search, Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchBlogs } from "../data/blogs";
import BlogCard from "../components/blogCard";

const BlogsPage = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const blogsData = await fetchBlogs();
        setLatestBlogs(blogsData);
      } catch (error) {
        console.error('Error loading blogs:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBlogs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault(); 
    setSubmittedQuery(searchQuery);
  };

  const filteredBlogs = latestBlogs.filter(blog =>
    blog.title.toLowerCase().includes(submittedQuery.toLowerCase())
  );

  return (
    <main className="bg-gradient-to-b from-white to-rose-50 min-h-screen">
      {/* Search section with wedding theme */}
      <div className="py-16 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <Heart className="absolute top-10 right-20 text-rose-400 w-16 h-16" fill="currentColor" />
          <Heart className="absolute bottom-10 left-20 text-pink-400 w-12 h-12" fill="currentColor" />
          <Sparkles className="absolute top-20 left-1/4 text-rose-300 w-10 h-10" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <Sparkles className="w-12 h-12 text-rose-500 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-rose-900 mb-4">
              Wedding Planning Stories
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover real stories, expert tips, and beautiful inspiration from couples around the world
            </p>
          </div>
          
          <form onSubmit={handleSearch}>
            <div className="relative max-w-2xl mx-auto">
              <input 
                type="text" 
                placeholder="Search for venues, tips, stories..." 
                className="border-2 border-rose-300 py-4 px-6 w-full bg-white text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 placeholder-gray-400 transition-all duration-300 shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white p-3 rounded-full transition-all shadow-lg"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LoadingComponent />
            <LoadingComponent />
            <LoadingComponent />
            <LoadingComponent />
            <LoadingComponent />
            <LoadingComponent />
          </div>
        ) : isError ? (
          <div className="py-16 text-center">
            <div className="max-w-md mx-auto">
              <Heart className="w-16 h-16 text-rose-300 mx-auto mb-4" />
              <h2 className="text-3xl font-serif font-bold text-rose-900 mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                We couldn't load the stories right now. Please try again later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-16 text-center">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-rose-300 mx-auto mb-4" />
              <h2 className="text-3xl font-serif font-bold text-rose-900 mb-4">
                {submittedQuery ? "No Stories Found" : "No Stories Yet"}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {submittedQuery 
                  ? `We couldn't find any stories matching "${submittedQuery}". Try a different search term.`
                  : "Be the first to share your beautiful wedding story with our community!"
                }
              </p>
              <button
                onClick={() => {
                  if (submittedQuery) {
                    setSearchQuery("");
                    setSubmittedQuery("");
                  } else {
                    window.location.href = "/blogs/create";
                  }
                }}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg inline-flex items-center gap-2"
              >
                {submittedQuery ? (
                  <>Clear Search</>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Share Your Story
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-rose-900">
                {submittedQuery 
                  ? `Search Results for "${submittedQuery}"` 
                  : "All Stories"}
              </h2>
              <p className="text-gray-600">
                {filteredBlogs.length} {filteredBlogs.length === 1 ? "story" : "stories"} found
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((el) => {
                return <BlogCard key={el._id} blogDetails={el} />
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default BlogsPage;

const LoadingComponent = () => {
  return (
    <article 
      role="status" 
      className="p-6 rounded-xl animate-pulse bg-white border-2 border-rose-200 shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 bg-rose-200 rounded-full w-24"></div>
        <div className="h-8 w-8 bg-rose-200 rounded-full"></div>
      </div>
      <div className="h-6 bg-rose-100 rounded-full w-3/4 mb-3"></div>
      <div className="h-4 bg-rose-100 rounded-full w-full mb-2"></div>
      <div className="h-4 bg-rose-100 rounded-full w-full mb-2"></div>
      <div className="h-4 bg-rose-100 rounded-full w-5/6 mb-4"></div>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 bg-rose-200 rounded-full"></div>
        <div className="h-4 bg-rose-200 rounded-full w-1/3"></div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-rose-100">
        <div className="h-10 w-24 bg-rose-200 rounded-full"></div>
        <div className="h-8 w-8 bg-rose-200 rounded-full"></div>
      </div>
    </article>      
  );
};