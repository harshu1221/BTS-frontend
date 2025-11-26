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
      "https://cdn0.weddingwire.com/article/3138/original/1280/jpg/8313-2-a-rustic-affair-rustic-wedding-centerpieces.jpeg",
    category: "outdoor",
  },
  {
    id: 8,
    title: "Royal Palace Affair",
    description: "Regal luxury inspired by royal courts.",
    image:
      "https://assets.anantara.com/image/upload/q_auto,f_auto,c_limit,w_756/media/minor/anantara/images/anantara-jewel-bagh-jaipur-hotel/05_wedding_ok/1g6a8181.jpg",
    category: "indoor",
  },
  {
    id: 9,
    title: "Forest Enchantment",
    description: "Woodland magic with greenery and candles.",
    image:
      "https://images.stockcake.com/public/8/b/0/8b0a37b8-5073-43a8-b769-50aebb837f43_large/enchanted-forest-wedding-stockcake.jpg",
    category: "outdoor",
  },
  {
    id: 10,
    title: "Classic Church Ceremony",
    description: "Historic churches with stained glass windows.",
    image:
      "https://i.pinimg.com/736x/ff/c8/74/ffc874e86e6b7728e7885b31ac05bd52.jpg",
    category: "classic",
  },
  {
    id: 11,
    title: "City Skyline Soirée",
    description: "Rooftop skyline views and modern decor.",
    image:
      "https://www.thefusiondecor.com/uploads/blog-images/1703257349_Sky-High-Love.jpg",
    category: "indoor",
  },
  {
    id: 12,
    title: "Desert Sunset Vows",
    description: "Golden sands and orange sunset hues.",
    image:
      "https://i.pinimg.com/736x/ae/08/fd/ae08fd792a2e278b6d4d2ce41cc03116.jpg",
    category: "outdoor",
  },
  {
    id: 13,
    title: "Winter Wonderland",
    description: "Snowy elegance with icy blue tones.",
    image:
      "https://i.pinimg.com/736x/23/71/e5/2371e5a3d9018f8d637b90b017d5074f.jpg",
    category: "classic",
  },
  {
    id: 14,
    title: "Tropical Paradise",
    description: "Palm trees, ocean breeze, vibrant florals.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7BvAchN8pbys3zBBF6g1yaL5wxZl46i2YJw&s",
    category: "outdoor",
  },
  {
    id: 15,
    title: "Art Gallery Chic",
    description: "Modern minimalist aesthetics and fine art.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3lwuKQf7h1HvNUEIyqpv835Ao8QeqXySvew&s",
    category: "indoor",
  },
  {
    id: 16,
    title: "Fairytale Castle",
    description: "Vintage romance inside majestic castles.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBV_5r5rnO5QfTOONJyn3niL4H4VjpYkv01w&s",
    category: "classic",
  },
  {
    id: 17,
    title: "Lakeside Serenity",
    description: "Golden sunsets and peaceful waterside decor.",
    image:
      "https://cdn0.weddingwire.com/article/3138/original/1280/jpg/8313-2-a-rustic-affair-rustic-wedding-centerpieces.jpeg",
    category: "outdoor",
  },
  {
    id: 18,
    title: "Industrial Loft",
    description: "Exposed brick and warm industrial lighting.",
    image:
      "https://cdn0.weddingwire.in/vendor/4280/3_2/960/jpg/seven-seas-hotel-rohini-11_15_54280-1555334764.jpeg",
    category: "indoor",
  },
  {
    id: 19,
    title: "Carnival of Love",
    description: "Colorful fun-filled carnival vibes.",
    image:
      "https://www.marriagecolours.com/wp-content/uploads/2025/02/Sanjhana-Aebel-Ashtamudi-Haldi-38.jpg",
    category: "outdoor",
  },
  {
    id: 20,
    title: "Garden High-Tea",
    description: "Soft pastel palettes and elegant floral china.",
    image:
      "https://www.peerspace.com/resources/wp-content/uploads/Victorian-Rococo-Dollhouse-Themed-Tea-Room-south-miami-rental.jpg",
    category: "classic",
  },
  {
    id: 21,
    title: "Bollywood Glam",
    description: "Vibrant colors and cinematic effects.",
    image:
      "https://weddingsutra.com/images/simran-ashish-thumb.jpg",
    category: "indoor",
  },
  {
    id: 22,
    title: "Pastel Dream",
    description: "Soft pinks, blues, and dreamy tones.",
    image:
      "https://styl-inc.com/wp-content/uploads/2021/03/Pastel-Wedding-Decorations-10.jpg",
    category: "classic",
  },
  {
    id: 23,
    title: "Night Garden Sparkle",
    description: "Candle-lit pathways and soft lantern decor.",
    image:
      "https://img.freepik.com/premium-photo/indian-wedding-light-decoration_221414-1490.jpg",
    category: "outdoor",
  },
  {
    id: 24,
    title: "Vintage Bollywood",
    description: "Retro cinematic aesthetics.",
    image:
      "https://cdn0.weddingwire.in/article/9732/original/1280/jpg/52379-vintagetheme-gautamkhullarphotography-lead.jpeg",
    category: "classic",
  },
  {
    id: 25,
    title: "Minimal White",
    description: "Pure white elegance with clean geometry.",
    image:
      "https://destinationweddingsindia.com/wp-content/uploads/2024/08/Engagement-Themes.jpg",
    category: "indoor",
  },
  {
    id: 26,
    title: "Color Pop Carnival",
    description: "Bright colors and fun props.",
    image:
      "https://weddingsutra.com/images/wedding-images/blog-images/hannah-vidhur/hannah-vidhur-01.jpg",
    category: "outdoor",
  },
  {
    id: 27,
    title: "Heritage Haveli",
    description: "Traditional Indian architecture and culture.",
    image:
      "https://static.wixstatic.com/media/794597_e5d53824fe57464eadc910cabfd137f7~mv2.jpg/v1/fill/w_640,h_386,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/794597_e5d53824fe57464eadc910cabfd137f7~mv2.jpg",
    category: "classic",
  },
  {
    id: 28,
    title: "Poolside Party",
    description: "Summer poolside luxury vibes.",
    image:
      "https://img.weddingbazaar.com/photos/pictures/001/690/677/new_medium/88197189_581614689233541_1682559208406061089_n.jpg?1586767489",
    category: "outdoor",
  },
  {
    id: 29,
    title: "Library of Love",
    description: "Aesthetic book-themed vintage decor.",
    image:
      "https://image.wedmegood.com/resized/720X/uploads/member/3068665/1678440538_Screenshot_2023_03_10_122821.jpg?crop=107,124,792,446",
    category: "indoor",
  },
  {
    id: 30,
    title: "Starry Tent Night",
    description: "Open sky tent with dreamy fairy lights.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHwEbCc2fkhIxVVryn6wMPjM2uBMLcB4qewg&s",
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