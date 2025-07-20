import React from "react";
import ReactDOM from "react-dom";
import { Star, StarHalf, StarOff } from "lucide-react";

const CommentCard = ({ stars, name, comment }) => {
  const [commentPreview, setCommentPreview] = React.useState(false);
  const [commentPreviewClosing, setCommentPreviewClosing] = React.useState(false);

  const handleToggleWithAnimation = (isOpen, setOpen, setClosing) => {
    if (isOpen) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 200);
    } else {
      setOpen(true);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1 text-yellow-500">
        {Array(fullStars).fill(0).map((_, i) => (
          <Star key={`full-${i}`} size={16} fill="currentColor" stroke="none" />
        ))}
        {halfStar && <StarHalf size={16} />}
        {Array(emptyStars).fill(0).map((_, i) => (
          <StarOff key={`empty-${i}`} size={16} />
        ))}
      </div>
    );
  };

  const popup = (
    <div className={`fixed inset-0 z-50 bg-[#0000005b] shadow-[0_0_5px_10px_#0000005b]  flex justify-center items-center transition-all duration-200 ${
        commentPreviewClosing ? "animate-fade-out" : "animate-fade-in"
      }`}
    >
      <div className="bg-white dark:bg-[var(--card-bg)] sm:w-1/2 w-[90%] p-6 rounded-xl shadow-xl relative">
        <div className="flex justify-between items-center mb-3">
          {renderStars(stars)}
          <button
            onClick={() =>
              handleToggleWithAnimation(
                commentPreview,
                setCommentPreview,
                setCommentPreviewClosing
              )
            }
            className="text-xl text-gray-500 hover:text-gray-700 font-bold"
          >
            ×
          </button>
        </div>
        <div className="font-bold flex items-center gap-1 mb-2 dark:text-white">
          {name}
          <span className="text-white py-1 px-[0.42rem] rounded-full bg-green-500 text-[0.5rem]">
            ✓
          </span>
        </div>
        <div className="text-[0.95rem] text-gray-700 dark:text-[var(--text-secondary)]">
          {comment}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Review Card */}
      <div className="border border-[#b2b2b2] p-5 rounded-lg shadow-md m-1 flex flex-col gap-2 h-[13rem] dark:bg-[var(--bg-section)]">
        <div className="flex justify-between items-center">
          {renderStars(stars)}
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() =>
              handleToggleWithAnimation(
                commentPreview,
                setCommentPreview,
                setCommentPreviewClosing
              )
            }
          >
            •••
          </button>
        </div>
        <div className="font-bold flex items-center gap-1">
          {name}
          <span className="text-white py-1 px-[0.42rem] rounded-full bg-green-500 text-[0.5rem]">
            ✓
          </span>
        </div>
        <div className="text-[#3b3b3b] text-[0.9rem] dark:text-[var(--text-secondary)]">
          {comment.length > 100 ? comment.slice(0, 100) + "..." : comment}
        </div>
        <div className="text-[#3b3b3b] text-[0.9rem] dark:text-[var(--text-secondary)] mt-auto">Posted on 10 may 2024</div>
      </div>

      {/* Render popup via portal */}
      {commentPreview &&
        ReactDOM.createPortal(popup, document.body)}
    </>
  );
};

export default CommentCard;
