import { useState } from "react";
import {
  Heart,
  Sparkles,
  Calendar,
  Users,
  Camera,
  Music,
  Utensils,
  Flower2,
  MapPin,
  Gift,
  BookOpen,
  Download,
} from "lucide-react";

const PlanningGuidePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const themes = [
    {
      id: 1,
      title: "Romantic Garden Wedding",
      description:
        "Embrace nature's beauty with lush florals, soft pastels, and outdoor elegance.",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
      category: "outdoor",
      color: "rose",
    },
    {
      id: 2,
      title: "Modern Minimalist",
      description:
        "Clean lines, neutral palettes, and sophisticated simplicity for contemporary couples.",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      category: "indoor",
      color: "gray",
    },
    {
      id: 3,
      title: "Vintage Romance",
      description:
        "Timeless charm with antique details, lace, and nostalgic elegance.",
      image:
        "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&q=80",
      category: "classic",
      color: "amber",
    },
    {
      id: 4,
      title: "Bohemian Dream",
      description:
        "Free-spirited celebration with macramé, wildflowers, and earthy tones.",
      image:
        "https://image.wedmegood.com/resized/720X/uploads/member/72297/1755654860_Screenshot_2568_08_20_at_08.46.34.png",
      category: "outdoor",
      color: "orange",
    },
    {
      id: 5,
      title: "Elegant Ballroom",
      description:
        "Grand luxury with crystal chandeliers, rich fabrics, and classic sophistication.",
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      category: "indoor",
      color: "purple",
    },
    {
      id: 6,
      title: "Beach Bliss",
      description:
        "Coastal magic with ocean views, sandy shores, and breezy elegance.",
      image:
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
      category: "outdoor",
      color: "blue",
    },
  ];

  const resources = [
    {
      icon: Calendar,
      title: "12-Month Timeline Checklist",
      description:
        "Complete month-by-month planning guide from engagement to wedding day",
      downloads: "2.4K",
      type: "PDF Guide",
    },
    {
      icon: Users,
      title: "Guest List Manager",
      description:
        "Track RSVPs, meal preferences, and seating arrangements effortlessly",
      downloads: "1.8K",
      type: "Spreadsheet",
    },
    {
      icon: Utensils,
      title: "Vendor Comparison Sheet",
      description:
        "Compare quotes, services, and reviews for all your wedding vendors",
      downloads: "3.1K",
      type: "Template",
    },
    {
      icon: Gift,
      title: "Budget Breakdown Calculator",
      description:
        "Manage expenses and stay on track with detailed budget categories",
      downloads: "4.2K",
      type: "Excel Tool",
    },
    {
      icon: Camera,
      title: "Photography Shot List",
      description:
        "Essential moments to capture - never miss a precious memory",
      downloads: "2.9K",
      type: "Checklist",
    },
    {
      icon: Music,
      title: "Reception Music Planner",
      description:
        "Curate the perfect playlist for every moment of your celebration",
      downloads: "1.5K",
      type: "Guide",
    },
    {
      icon: Flower2,
      title: "Seasonal Flower Guide",
      description:
        "Choose blooms that are in season for beauty and budget-friendliness",
      downloads: "2.2K",
      type: "PDF Guide",
    },
    {
      icon: MapPin,
      title: "Venue Checklist",
      description:
        "Questions to ask and details to consider when touring venues",
      downloads: "3.5K",
      type: "Checklist",
    },
  ];

  const categories = [
    { id: "all", label: "All Themes" },
    { id: "outdoor", label: "Outdoor" },
    { id: "indoor", label: "Indoor" },
    { id: "classic", label: "Classic" },
  ];

  const filteredThemes =
    activeCategory === "all"
      ? themes
      : themes.filter((theme) => theme.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-rose-100 to-pink-100">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center mb-6">
            <BookOpen className="text-rose-600" size={48} />
          </div>
          <h1 className="text-5xl font-serif font-bold text-rose-900 mb-6">
            Your Complete Planning Guide
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            From dreamy themes to practical tools, everything you need to plan
            the wedding of your dreams is right here.
          </p>
        </div>
      </section>

      {/* Wedding Themes Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Sparkles className="text-rose-600" size={32} />
              <h2 className="text-4xl font-serif font-bold text-rose-900">
                Wedding Themes & Styles
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover beautiful themes to match your vision and personality
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-rose-200 hover:border-rose-400"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Themes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredThemes.map((theme) => (
              <div
                key={theme.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={theme.image}
                    alt={theme.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-2xl font-serif font-bold text-white">
                    {theme.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{theme.description}</p>
                  <button className="text-rose-600 font-medium hover:text-rose-700 flex items-center gap-2 group/btn hover:cursor-pointer" onClick={() => window.open('https://in.pinterest.com/search/pins/?q=wedding%20themes&rs=typed', '_blank')}>
                    Explore This Theme
                    <Heart
                      size={16}
                      className="group-hover/btn:fill-rose-600 transition-all"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planning Resources Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-rose-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Download className="text-rose-600" size={32} />
              <h2 className="text-4xl font-serif font-bold text-rose-900">
                Essential Planning Resources
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Download free tools, checklists, and templates to stay organized
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-rose-100 hover:border-rose-300 group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors">
                      <Icon className="text-rose-600" size={24} />
                    </div>
                    <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-medium">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      {resource.downloads} downloads
                    </span>
                    <a
                      href={`/${resource.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}.pdf`}
                      download
                      className="text-rose-600 font-medium text-sm hover:text-rose-700 flex items-center gap-1 group/download"
                    >
                      Download
                      <Download
                        size={14}
                        className="group-hover/download:animate-bounce"
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <Heart className="mx-auto mb-6" size={48} fill="white" />
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Start Planning?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of couples who've planned their perfect day with
            Forever Vows
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => (window.location.href = "/register")}
              className="bg-white text-rose-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl"
            >
              Create Your Account
            </button>
            <button
              onClick={() => (window.location.href = "/stories")}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              Browse Love Stories
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanningGuidePage;
