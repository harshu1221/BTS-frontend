import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router";
import api from "../config/api";
import BlogCard from "../components/blogCard";
import {
  User,
  Mail,
  Edit,
  Heart,
  Sparkles,
  Camera,
  Upload,
} from "lucide-react";

const ProfilePage = () => {
  const { user, isLoggedIn, loading: authLoading } = useGlobalContext();
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchMyBlogs = async () => {
      setLoading(true);
      try {
        const response = await api.get("/blogs/my-blogs");
        if (response.data && response.data.success) {
          setMyBlogs(response.data.data);
        }
      } catch (err) {
        setError("Failed to load your stories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, authLoading, navigate]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 1. Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (JPG, PNG, GIF, etc.)");
      return;
    }

    // 2. Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size should be less than 5MB");
      return;
    }

    setUploadingImage(true);
    setUploadError(null);

    try {
      // 3. Create FormData
      const formData = new FormData();
      formData.append("image", file);

      // 4. Send Request
      // FIX: Removed manual 'Content-Type' header.
      // The API client will now automatically set the correct boundary.
      const response = await api.put("/users/profile-picture", formData);

      if (response.data && response.data.success) {
        // Reload page to refresh user data with new profile picture
        window.location.reload();
      }
    } catch (err) {
      console.error("Upload failed", err);
      setUploadError(
        err.response?.data?.message ||
          "Failed to upload image. Please try again."
      );
    } finally {
      setUploadingImage(false);
      // Reset file input
      event.target.value = "";
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profile-picture-input").click();
  };

  if (authLoading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-rose-50 to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-rose-200 border-t-rose-600 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading your profile...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header Card */}
        <div className="bg-white border-2 border-rose-200 rounded-2xl shadow-lg p-8 md:p-10 mb-12 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 opacity-5">
            <Heart className="w-32 h-32 text-rose-500" fill="currentColor" />
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            {/* Profile Picture with Upload */}
            <div className="relative group">
              <img
                src={user.profilePicture || "https://via.placeholder.com/150"}
                alt={user.username}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-rose-300 shadow-lg"
              />

              {/* Upload overlay - shows on hover */}
              <button
                onClick={triggerFileInput}
                disabled={uploadingImage}
                className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer disabled:cursor-not-allowed"
                title="Click to upload new photo"
              >
                {uploadingImage ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Camera className="w-8 h-8 text-white" />
                    <span className="text-xs text-white font-medium">
                      Upload
                    </span>
                  </div>
                )}
              </button>

              {/* Hidden file input */}
              <input
                id="profile-picture-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full p-2 shadow-lg">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left w-full">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-rose-900">
                  {user.username}
                </h1>
                <button className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg text-sm font-semibold">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              <p className="flex items-center justify-center md:justify-start gap-2 text-base text-gray-600 mb-6">
                <Mail className="w-5 h-5 text-rose-500" />
                {user.email}
              </p>

              {/* Upload Status Messages */}
              {uploadError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-300 text-rose-700 rounded-lg text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{uploadError}</span>
                  <button
                    onClick={() => setUploadError(null)}
                    className="ml-auto text-rose-500 hover:text-rose-700 font-bold text-lg"
                  >
                    ×
                  </button>
                </div>
              )}

              {uploadingImage && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-300 text-blue-700 rounded-lg text-sm flex items-center gap-2">
                  <Upload className="w-4 h-4 animate-pulse" />
                  <span>Uploading your profile picture...</span>
                </div>
              )}

              {/* Bio Section */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-5 rounded-xl border-2 border-rose-200">
                <div className="flex items-start gap-2 mb-2">
                  <User className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-gray-800">About Me</h3>
                </div>
                <p className="text-gray-700 italic pl-7">
                  {user.bio ||
                    "No bio provided yet. Click 'Edit Profile' to share your story!"}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white border-2 border-rose-200 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-rose-600">
                    {myBlogs.length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {myBlogs.length === 1 ? "Story" : "Stories"}
                  </div>
                </div>
                <div className="bg-white border-2 border-rose-200 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-rose-600">
                    {myBlogs.reduce(
                      (sum, blog) => sum + (blog.likesCount || 0),
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Total Likes
                  </div>
                </div>
                <div className="bg-white border-2 border-rose-200 rounded-xl p-4 text-center col-span-2 md:col-span-1">
                  <div className="text-2xl font-bold text-rose-600">
                    {user.createdAt
                      ? new Date(user.createdAt).getFullYear()
                      : new Date().getFullYear()}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Member Since
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Stories Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-serif font-bold text-rose-900">
              <Sparkles className="w-8 h-8 text-rose-500" />
              My Wedding Stories
            </h2>
            {myBlogs.length > 0 && (
              <button
                onClick={() => navigate("/blogs/create")}
                className="hidden md:flex items-center gap-2 bg-white border-2 border-rose-300 hover:bg-rose-50 text-rose-600 px-6 py-3 rounded-full transition-all font-semibold"
              >
                <Sparkles className="w-5 h-5" />
                Share Another Story
              </button>
            )}
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-200 border-t-rose-600 mb-4"></div>
              <p className="text-gray-600">Loading your stories...</p>
            </div>
          )}

          {error && (
            <div className="p-6 text-center bg-rose-50 border-2 border-rose-300 text-rose-800 rounded-xl flex items-center justify-center gap-3">
              <Heart className="w-6 h-6" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {!loading && !error && myBlogs.length === 0 && (
            <div className="p-12 text-center bg-white border-2 border-rose-200 rounded-2xl shadow-lg">
              <div className="max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-6">
                  <Sparkles className="w-10 h-10 text-rose-500" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-rose-900 mb-3">
                  No Stories Yet
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Start sharing your wedding planning journey with our
                  community! Your story could inspire other couples.
                </p>
                <button
                  onClick={() => navigate("/blogs/create")}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-full transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  <Sparkles className="w-5 h-5" />
                  Share Your First Story
                </button>
              </div>
            </div>
          )}

          {!loading && !error && myBlogs.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {myBlogs.map((blog) => (
                  <BlogCard key={blog._id} blogDetails={blog} />
                ))}
              </div>

              <div className="mt-8 text-center md:hidden">
                <button
                  onClick={() => navigate("/blogs/create")}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-full transition-all font-semibold shadow-lg hover:shadow-xl"
                >
                  <Sparkles className="w-5 h-5" />
                  Share Another Story
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
