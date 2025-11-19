import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { fetchBlogs } from '../data/blogs';
import BlogCard from '../components/blogCard';
import { ArrowRight, Sparkles, Heart, Calendar, Camera, UtensilsCrossed } from 'lucide-react';
import { useGlobalContext } from '../context/globalContext';

const HomePage = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn } = useGlobalContext();
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const blogsData = await fetchBlogs();
        setLatestBlogs(blogsData.slice(0, 3));
      } catch (error) {
        console.error("Failed to load blogs:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadBlogs();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-100 via-pink-50 to-rose-50 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-rose-300">
            <Heart size={80} fill="currentColor" />
          </div>
          <div className="absolute bottom-20 right-20 text-pink-300">
            <Heart size={60} fill="currentColor" />
          </div>
          <div className="absolute top-1/2 right-10 text-rose-200">
            <Sparkles size={50} />
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-4">
            <Heart size={48} className="text-rose-500 mx-auto mb-2" fill="currentColor" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-rose-900">
            Forever Vows
          </h1>
          <p className="text-2xl md:text-3xl text-rose-600 mb-8 font-semibold italic">
            Your dream wedding starts here
          </p>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            More than just planning advice—it's a community where couples share their journey, tips, and beautiful moments. Let us help you create the wedding of your dreams.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {isLoggedIn && (
            <button 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              onClick={() => navigate("/blogs/create")}
            >
              <Sparkles className="w-5 h-5" />
              Share Your Story
            </button>)}
            <button 
              className="inline-flex items-center gap-2 bg-white hover:bg-rose-50 border-2 border-rose-300 text-rose-600 px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-md hover:shadow-lg"
              onClick={() => navigate("/planning-guide")}
            >
              Explore Ideas
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-4 text-rose-900">
            Everything for Your Perfect Day
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Expert guidance and real stories to help you plan every detail
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl hover:bg-rose-50 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Venue Ideas</h3>
              <p className="text-gray-600">Find the perfect location for your special day</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:bg-pink-50 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                <Camera className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Photography Tips</h3>
              <p className="text-gray-600">Capture memories that last forever</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:bg-rose-50 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                <UtensilsCrossed className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Catering Guide</h3>
              <p className="text-gray-600">Delight your guests with amazing food</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:bg-pink-50 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                <Heart className="w-8 h-8 text-pink-600" fill="currentColor" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Real Stories</h3>
              <p className="text-gray-600">Be inspired by couples like you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-4 text-rose-900">
            Latest Planning Tips
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Fresh inspiration and advice from our community
          </p>
          
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-rose-200 border-t-rose-600"></div>
              <p className="mt-4 text-gray-600">Loading wonderful ideas...</p>
            </div>
          )}
          
          {isError && (
            <div className="text-center py-12">
              <p className="text-rose-600 text-lg">Unable to load posts. Please try again later.</p>
            </div>
          )}
          
          {!isLoading && !isError && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {latestBlogs.map(blog => (
                  <BlogCard key={blog._id} blogDetails={blog} />
                ))}
              </div>
              
              {latestBlogs.length > 0 && (
                <div className="text-center">
                  <button
                    onClick={() => navigate("/blogs")}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                  >
                    View All Posts
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
          
          {!isLoading && !isError && latestBlogs.length === 0 && (
            <div className="text-center py-12">
              <Heart size={64} className="mx-auto mb-4 text-rose-300" />
              <p className="text-gray-500 text-lg">No posts available yet. Be the first to share your wedding story!</p>
              <button
                onClick={() => navigate("/blogs/create")}
                className="mt-6 inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                Create First Post
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;