import { Bookmark, Heart } from "lucide-react";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../context/globalContext";
import { likeBlog } from "../data/blogs";
import { useState } from "react";

const BlogCard = ({ blogDetails }) => {
  const { _id, title, author, category, likesCount, likes } = blogDetails;
  const navigate = useNavigate();
  const { user, isLoggedIn } = useGlobalContext();

  const [currentLikes, setCurrentLikes] = useState(likesCount);
  const [isLiked, setIsLiked] = useState(() => 
    user ? likes.includes(user._id) : false
  );

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      const data = await likeBlog(_id);
      setCurrentLikes(data.likesCount);
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const primaryAuthor = author && author.length > 0 ? author[0] : null;

  return (
    <article 
      className="p-4 border border-neutral-400 rounded relative hover:shadow-xl transition-shadow cursor-pointer bg-neutral-200" 
      onClick={() => navigate(`/blogs/${_id}`)}
    >
      <span className="absolute top-2 right-2 bg-purple-50 border border-purple-500 text-purple-500 px-2 py-0.5 rounded">
        {category}
      </span>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>

      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-2">
          {primaryAuthor?.profilePicture && (
            <img 
              src={primaryAuthor.profilePicture} 
              alt={primaryAuthor.username} 
              className="w-8 h-8 rounded-full object-cover"
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
    </article>
  );
};

export default BlogCard;