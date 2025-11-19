import { Link } from "react-router";
import { FiEye, FiClock, FiEdit3 } from "react-icons/fi";
import { motion } from "framer-motion";

function BlogCard({
  title,
  author,
  publishedAt,
  updatedAt,
  status,
  category,
  slug,
  viewCount,
  highlighted = false,
  coverImage,
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={highlighted 
        ? "bg-[#19183B]/40 border-[#A1C2BD]/30 backdrop-blur-xl rounded-xl p-6 border transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(25,24,59,0.37)] relative flex flex-col h-full"
        : "bg-[#E7F2EF]/10 border-[#E7F2EF]/20 backdrop-blur-xl rounded-xl p-6 border transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(25,24,59,0.37)] relative flex flex-col h-full"
      }
    >
      {/* Cover Image */}
      {coverImage && (
        <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-[#19183B]/20">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Category and Status */}
      <div className="flex gap-2 mb-3">
        <span className="bg-[#19183B]/30 text-[#E7F2EF] text-xs font-semibold px-3 py-1 rounded-full border border-[#E7F2EF]/20">
          {category}
        </span>
        {status !== "published" && (
          <span className="bg-[#708993]/30 text-[#E7F2EF] text-xs font-semibold px-3 py-1 rounded-full border border-[#E7F2EF]/20">
            {status}
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-[#E7F2EF] mb-3 line-clamp-2">
        {title}
      </h2>

      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center font-semibold w-10 h-10 bg-gradient-to-br from-[#19183B] to-[#708993] text-[#E7F2EF] rounded-full text-lg border border-[#E7F2EF]/20">
          {author.name.substring(0, 1)}
        </div>
        <div>
          <p className="text-[#E7F2EF] font-medium">{author.name}</p>
          <p className="text-[#E7F2EF]/70 text-sm">{author.email}</p>
        </div>
      </div>

      {/* Meta Information */}
      <div className="flex items-center gap-4 text-[#E7F2EF]/70 text-sm mt-auto">
        <div className="flex items-center gap-1">
          <FiClock className="text-[#A1C2BD]" />
          <span>{new Date(publishedAt || updatedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <FiEye className="text-[#A1C2BD]" />
          <span>{viewCount} views</span>
        </div>
      </div>

      {/* Action Button */}
      {status === "published" ? (
        <Link
          to={`/blog/${slug}`}
          className="mt-4 inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#19183B]/80 to-[#708993]/80 hover:from-[#19183B] hover:to-[#708993] text-[#E7F2EF] rounded-lg font-medium backdrop-blur-md border border-[#E7F2EF]/20 transition-all duration-200 hover:shadow-lg"
        >
          Read More
        </Link>
      ) : (
        <Link
          to={`/edit/${slug}`}
          className="mt-4 inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#19183B]/80 to-[#708993]/80 hover:from-[#19183B] hover:to-[#708993] text-[#E7F2EF] rounded-lg font-medium backdrop-blur-md border border-[#E7F2EF]/20 transition-all duration-200 hover:shadow-lg gap-2"
        >
          <FiEdit3 />
          Edit Blog
        </Link>
      )}
    </motion.div>
  );
}

export default BlogCard;