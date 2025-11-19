import { Heart, Sparkles, Users, Target, Award, Globe } from "lucide-react";
import { useNavigate } from "react-router";

const AboutPage = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-gradient-to-b from-white via-rose-50 to-pink-50">
            {/* Hero Section */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-50 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Heart className="absolute top-20 left-10 text-rose-400 w-24 h-24" fill="currentColor" />
                    <Heart className="absolute bottom-20 right-20 text-pink-400 w-20 h-20" fill="currentColor" />
                    <Sparkles className="absolute top-32 right-32 text-rose-300 w-16 h-16" />
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 border-2 border-rose-300 shadow-lg">
                            <Heart className="w-10 h-10 text-rose-500" fill="currentColor" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-rose-900 mb-6">
                            About Forever Vows
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                            We're here to make your wedding planning journey memorable, stress-free, and filled with joy. 
                            Our community-driven platform connects couples with real stories, expert advice, and endless inspiration.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white border-2 border-rose-200 rounded-2xl shadow-lg p-8 md:p-12">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-900 mb-6 text-center">
                                Our Story
                            </h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                    Forever Vows was born from a simple belief: every couple deserves to have the wedding 
                                    of their dreams without the overwhelming stress that often comes with planning.
                                </p>
                                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                    What started as a small blog sharing wedding tips has grown into a vibrant community 
                                    where couples from around the world share their experiences, learn from each other, 
                                    and find inspiration for their special day.
                                </p>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Today, we're proud to be a trusted resource for thousands of couples, offering 
                                    everything from venue ideas and budget tips to real wedding stories that inspire 
                                    and guide you through every step of your journey.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-16 bg-gradient-to-b from-transparent to-rose-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-rose-900 mb-4 text-center">
                        What We Stand For
                    </h2>
                    <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Our values guide everything we do and shape the community we're building together
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Value 1 */}
                        <div className="bg-white border-2 border-rose-200 rounded-xl p-8 hover:shadow-lg transition-shadow text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                                <Heart className="w-8 h-8 text-rose-500" fill="currentColor" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-rose-900 mb-3">
                                Authenticity
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                We celebrate real stories from real couples. Every experience shared here is genuine, 
                                helping you make informed decisions for your special day.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-white border-2 border-rose-200 rounded-xl p-8 hover:shadow-lg transition-shadow text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                                <Users className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-rose-900 mb-3">
                                Community
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Wedding planning is better together. Our community supports, inspires, and helps 
                                each other create unforgettable celebrations of love.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-white border-2 border-rose-200 rounded-xl p-8 hover:shadow-lg transition-shadow text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                                <Sparkles className="w-8 h-8 text-rose-500" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-rose-900 mb-3">
                                Inspiration
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                From intimate ceremonies to grand celebrations, we provide endless inspiration 
                                to help you create a wedding that's uniquely yours.
                            </p>
                        </div>

                        {/* Value 4 */}
                        <div className="bg-white border-2 border-rose-200 rounded-xl p-8 hover:shadow-lg transition-shadow text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                                <Target className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-rose-900 mb-3">
                                Practicality
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Beautiful weddings don't have to break the bank. We share practical tips and 
                                budget-friendly ideas to help you plan smartly.
                            </p>
                        </div>

                        {/* Value 5 */}
                        <div className="bg-white border-2 border-rose-200 rounded-xl p-8 hover:shadow-lg transition-shadow text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                                <Award className="w-8 h-8 text-rose-500" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-rose-900 mb-3">
                                Excellence
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                We're committed to providing high-quality content, reliable advice, and a 
                                platform that truly serves couples in their planning journey.
                            </p>
                        </div>

                        {/* Value 6 */}
                        <div className="bg-white border-2 border-rose-200 rounded-xl p-8 hover:shadow-lg transition-shadow text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                                <Globe className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-rose-900 mb-3">
                                Inclusivity
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Love is love. We celebrate all couples and all types of weddings, creating a 
                                welcoming space for everyone's unique love story.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-r from-rose-100 to-pink-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-900 mb-12 text-center">
                            Forever Vows by the Numbers
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-5xl md:text-6xl font-bold text-rose-600 mb-2">
                                    10K+
                                </div>
                                <p className="text-xl text-gray-700 font-medium">
                                    Happy Couples
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl md:text-6xl font-bold text-rose-600 mb-2">
                                    5K+
                                </div>
                                <p className="text-xl text-gray-700 font-medium">
                                    Real Stories Shared
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl md:text-6xl font-bold text-rose-600 mb-2">
                                    50+
                                </div>
                                <p className="text-xl text-gray-700 font-medium">
                                    Countries Represented
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-white border-2 border-rose-200 rounded-2xl shadow-xl p-8 md:p-12 text-center">
                        <Heart className="w-16 h-16 text-rose-500 mx-auto mb-6" fill="currentColor" />
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-900 mb-4">
                            Join Our Community
                        </h2>
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            Whether you're just starting to plan or counting down the days to your big day, 
                            we'd love to have you as part of our Forever Vows family. Share your story, 
                            get inspired, and connect with couples just like you.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => navigate("/register")}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                            >
                                <Sparkles className="w-5 h-5" />
                                Get Started Free
                            </button>
                            <button
                                onClick={() => navigate("/blogs")}
                                className="inline-flex items-center gap-2 bg-white border-2 border-rose-300 hover:bg-rose-50 text-rose-600 px-8 py-4 rounded-full font-semibold text-lg transition-all"
                            >
                                Explore Stories
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;