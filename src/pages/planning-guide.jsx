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

// --------------------------------------
//   30 WEDDING THEME CARDS
// --------------------------------------

const themes = [
  {
    id: 1,
    title: "Romantic Garden Wedding",
    description:
      "Embrace nature's beauty with lush florals, soft pastels, and outdoor elegance.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    category: "outdoor",
  },
  {
    id: 2,
    title: "Modern Minimalist",
    description: "Clean lines, neutral palettes, and sophisticated simplicity.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    category: "indoor",
  },
  {
    id: 3,
    title: "Vintage Romance",
    description: "Timeless charm with antique details and lacework.",
    image:
      "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&q=80",
    category: "classic",
  },
  {
    id: 4,
    title: "Bohemian Dream",
    description: "Free-spirited celebration with macramé and wildflowers.",
    image:
      "https://image.wedmegood.com/resized/720X/uploads/member/72297/1755654860_Screenshot_2568_08_20_at_08.46.34.png",
    category: "outdoor",
  },
  {
    id: 5,
    title: "Elegant Ballroom",
    description: "Crystal chandeliers, rich fabrics, and royal ambiance.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    category: "indoor",
  },
  {
    id: 6,
    title: "Beach Bliss",
    description: "Ocean views, sandy shores, and breezy evenings.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
    category: "outdoor",
  },

  // ⭐ NEW 24 CARDS
  {
    id: 7,
    title: "Rustic Barn Celebration",
    description: "Wood textures and warm fairy lights.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&q=80",
    category: "outdoor",
  },
  {
    id: 8,
    title: "Royal Palace Affair",
    description: "Regal luxury inspired by royal courts.",
    image:
      "https://images.unsplash.com/photo-1469975692758-74cddd2e4f0b?w=800&q=80",
    category: "indoor",
  },
  {
    id: 9,
    title: "Forest Enchantment",
    description: "Woodland magic with greenery and candles.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    category: "outdoor",
  },
  {
    id: 10,
    title: "Classic Church Ceremony",
    description: "Historic churches with stained glass windows.",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80",
    category: "classic",
  },
  {
    id: 11,
    title: "City Skyline Soirée",
    description: "Rooftop skyline views and modern decor.",
    image:
      "https://images.unsplash.com/photo-1529634806980-cd3def456a02?w=800&q=80",
    category: "indoor",
  },
  {
    id: 12,
    title: "Desert Sunset Vows",
    description: "Golden sands and orange sunset hues.",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    category: "outdoor",
  },
  {
    id: 13,
    title: "Winter Wonderland",
    description: "Snowy elegance with icy blue tones.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    category: "classic",
  },
  {
    id: 14,
    title: "Tropical Paradise",
    description: "Palm trees, ocean breeze, vibrant florals.",
    image:
      "https://images.unsplash.com/photo-1519821172141-b5d8c53c4a05?w=800&q=80",
    category: "outdoor",
  },
  {
    id: 15,
    title: "Art Gallery Chic",
    description: "Modern minimalist aesthetics and fine art.",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&q=80",
    category: "indoor",
  },
  {
    id: 16,
    title: "Fairytale Castle",
    description: "Vintage romance inside majestic castles.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    category: "classic",
  },
  {
    id: 17,
    title: "Lakeside Serenity",
    description: "Golden sunsets and peaceful waterside decor.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&q=80",
    category: "outdoor",
  },
  {
    id: 18,
    title: "Industrial Loft",
    description: "Exposed brick and warm industrial lighting.",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80",
    category: "indoor",
  },
  {
    id: 19,
    title: "Carnival of Love",
    description: "Colorful fun-filled carnival vibes.",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
    category: "outdoor",
  },
  {
    id: 20,
    title: "Garden High-Tea",
    description: "Soft pastel palettes and elegant floral china.",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80",
    category: "classic",
  },
  {
    id: 21,
    title: "Bollywood Glam",
    description: "Vibrant colors and cinematic effects.",
    image:
      "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?w=800&q=80",
    category: "indoor",
  },
  {
    id: 22,
    title: "Pastel Dream",
    description: "Soft pinks, blues, and dreamy tones.",
    image:
      "https://images.unsplash.com/photo-1529634806980-cd3def456a02?w=800&q=80",
    category: "classic",
  },
  {
    id: 23,
    title: "Night Garden Sparkle",
    description: "Candle-lit pathways and soft lantern decor.",
    image:
      "https://images.unsplash.com/photo-1496309732348-3627f3f040ee?w=800&q=80",
    category: "outdoor",
  },
  {
    id: 24,
    title: "Vintage Bollywood",
    description: "Retro cinematic aesthetics.",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
    category: "classic",
  },
  {
    id: 25,
    title: "Minimal White",
    description: "Pure white elegance with clean geometry.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    category: "indoor",
  },
  {
    id: 26,
    title: "Color Pop Carnival",
    description: "Bright colors and fun props.",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80",
    category: "outdoor",
  },
  {
    id: 27,
    title: "Heritage Haveli",
    description: "Traditional Indian architecture and culture.",
    image:
      "https://images.unsplash.com/photo-1470162656305-6f429ba817bf?w=800&q=80",
    category: "classic",
  },
  {
    id: 28,
    title: "Poolside Party",
    description: "Summer poolside luxury vibes.",
    image:
      "https://images.unsplash.com/photo-1529612700005-e35377bf1415?w=800&q=80",
    category: "outdoor",
  },
  {
    id: 29,
    title: "Library of Love",
    description: "Aesthetic book-themed vintage decor.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0ea?w=800&q=80",
    category: "indoor",
  },
  {
    id: 30,
    title: "Starry Tent Night",
    description: "Open sky tent with dreamy fairy lights.",
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?w=800&q=80",
    category: "outdoor",
  },
];

// --------------------------------------
//   RESOURCES — INDIVIDUAL FILE LINKS
// --------------------------------------

const resources = [
  {
    icon: Calendar,
    title: "12-Month Timeline Checklist",
    description:
      "Complete month-by-month planning guide from engagement to wedding day",
    downloads: "2.4K",
    type: "PDF Guide",
    file: "/downloads/12-month-timeline-checklist.pdf",
  },
  {
    icon: Users,
    title: "Guest List Manager",
    description:
      "Track RSVPs, meal preferences, and seating arrangements effortlessly",
    downloads: "1.8K",
    type: "Spreadsheet",
    file: "/downloads/guest-list-manager.xlsx",
  },
  {
    icon: Utensils,
    title: "Vendor Comparison Sheet",
    description:
      "Compare quotes, services, and reviews for all your wedding vendors",
    downloads: "3.1K",
    type: "Template",
    file: "/downloads/vendor-comparison-sheet.xlsx",
  },
  {
    icon: Gift,
    title: "Budget Breakdown Calculator",
    description:
      "Manage expenses and stay on track with detailed budget categories",
    downloads: "4.2K",
    type: "Excel Tool",
    file: "/downloads/budget-breakdown-calculator.xlsx",
  },
  {
    icon: Camera,
    title: "Photography Shot List",
    description:
      "Essential moments to capture - never miss a precious memory",
    downloads: "2.9K",
    type: "Checklist",
    file: "/downloads/photography-shot-list.pdf",
  },
  {
    icon: Music,
    title: "Reception Music Planner",
    description:
      "Curate the perfect playlist for every moment of your celebration",
    downloads: "1.5K",
    type: "Guide",
    file: "/downloads/reception-music-planner.pdf",
  },
  {
    icon: Flower2,
    title: "Seasonal Flower Guide",
    description:
      "Choose blooms that are in season for beauty and budget-friendliness",
    downloads: "2.2K",
    type: "PDF Guide",
    file: "/downloads/seasonal-flower-guide.pdf",
  },
  {
    icon: MapPin,
    title: "Venue Checklist",
    description:
      "Questions to ask and details to consider when touring venues",
    downloads: "3.5K",
    type: "Checklist",
    file: "/downloads/venue-checklist.pdf",
  },
];

const categories = [
  { id: "all", label: "All Themes" },
  { id: "outdoor", label: "Outdoor" },
  { id: "indoor", label: "Indoor" },
  { id: "classic", label: "Classic" },
];

export default function PlanningGuidePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredThemes =
    activeCategory === "all"
      ? themes
      : themes.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* HERO */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-rose-100 to-pink-100">
        <BookOpen size={48} className="mx-auto mb-4 text-rose-600" />
        <h1 className="text-5xl font-serif font-bold text-rose-900">
          Your Complete Planning Guide
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Explore wedding themes, download planning resources, and organize your
          big day.
        </p>
      </section>

      {/* CATEGORY FILTER */}
      <div className="flex justify-center gap-3 my-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-2 rounded-full transition-all ${
              activeCategory === cat.id
                ? "bg-rose-500 text-white"
                : "bg-white text-gray-700 border border-rose-300"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* THEMES GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 pb-20">
        {filteredThemes.map((theme) => (
          <div
            key={theme.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 transition-all cursor-pointer"
          >
            <div className="relative h-64">
              <img
                src={theme.image}
                className="w-full h-full object-cover"
                alt={theme.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60"></div>
              <h3 className="absolute bottom-4 left-4 text-2xl font-serif text-white">
                {theme.title}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{theme.description}</p>
              <a
                href="https://in.pinterest.com/search/pins/?q=wedding%20themes"
                className="text-rose-600 font-semibold flex items-center gap-2"
                target="_blank"
              >
                Explore Theme <Heart size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* RESOURCES SECTION */}
      <section className="py-16 bg-gradient-to-b from-white to-rose-50 px-4">
        <h2 className="text-center text-4xl font-serif text-rose-900 mb-6">
          Essential Planning Resources
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Download free tools, checklists, and templates to stay organized
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={index}
                className="bg-white border border-rose-200 rounded-xl p-6 shadow-md hover:shadow-xl transition"
              >
                <div className="flex justify-between mb-3">
                  <div className="p-3 bg-rose-100 rounded-lg">
                    <Icon size={24} className="text-rose-600" />
                  </div>
                  <span className="text-xs bg-pink-200 text-pink-700 px-3 py-1 rounded-full">
                    {resource.type}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900">{resource.title}</h3>
                <p className="text-gray-600 text-sm mt-2 mb-4">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {resource.downloads} downloads
                  </span>

                  <a
                    href={resource.file}
                    download
                    className="text-rose-600 font-medium text-sm flex items-center gap-1"
                  >
                    Download
                    <Download size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-20 text-center bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <Heart size={48} className="mx-auto mb-4" />
        <h2 className="text-4xl font-serif mb-4">
          Ready to Start Planning?
        </h2>
        <p className="mb-6 opacity-90">
          Join thousands of couples planning their dream wedding.
        </p>
        <button className="bg-white text-rose-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-rose-50">
          Create Your Account
        </button>
      </section>
    </div>
  );
}