
import React, { useState, useEffect } from 'react';
import { Post, Comment } from '../types';
import { Icons } from './Icons';
import { generateSmartComment } from '../services/geminiService';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  
  // Image Viewer State
  const [viewingImageIndex, setViewingImageIndex] = useState<number | null>(null);

  // Lock body scroll when image viewer is open
  useEffect(() => {
    if (viewingImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [viewingImageIndex]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    onLike(post.id);
  };

  const submitComment = () => {
    if(!commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        id: 'current',
        name: '我',
        handle: 'me',
        avatar: 'https://picsum.photos/seed/me/100/100', 
        following: 0,
        followers: 0
      },
      content: commentText,
      createdAt: '刚刚',
      likes: 0
    };
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewingImageIndex !== null && post.images && viewingImageIndex < post.images.length - 1) {
      setViewingImageIndex(viewingImageIndex + 1);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewingImageIndex !== null && viewingImageIndex > 0) {
      setViewingImageIndex(viewingImageIndex - 1);
    }
  };

  // Helper to parse content and render hashtags
  const renderContent = (content: string) => {
    const parts = content.split(/(#[\w\u4e00-\u9fa5]+)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <a 
            key={index} 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="text-[#4b8dc7] hover:underline hover:text-[#eb7350] mx-0.5"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <>
      <div className="bg-white rounded-none md:rounded-xl shadow-sm border-b md:border border-gray-100 mb-2 overflow-hidden">
        <div className="p-4 pb-2">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3 flex-1">
              <div className="relative inline-block">
                <img 
                  src={post.user.avatar} 
                  alt={post.user.name} 
                  className="w-10 h-10 rounded-full border border-gray-100 object-cover"
                />
                {post.user.verified && (
                  <div className="absolute bottom-0 right-0 bg-yellow-400 text-white w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm transform translate-x-1 translate-y-1">
                    <Icons.Sparkles size={8} fill="currentColor" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className={`font-bold text-[15px] ${post.user.verified ? 'text-[#f26d5f]' : 'text-gray-900'}`}>
                    {post.user.name}
                  </span>
                  {post.user.verified && (
                    <span className="text-[#f26d5f] scale-75 ml-[-2px]">
                       <Icons.Sparkles size={14} fill="#f26d5f" />
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                  <span>{post.createdAt}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-0.5 text-[#ff8200] border border-[#ff8200] px-2.5 py-1 rounded-full text-xs font-medium hover:bg-orange-50 transition-colors">
                    <Icons.Plus size={12} strokeWidth={3} />
                    <span>关注</span>
                </button>
                <button className="text-gray-300 hover:text-gray-500">
                  <Icons.ChevronDown size={20} />
                </button>
            </div>
          </div>

          {/* Content */}
          <div className="mb-2">
            <p className="text-[#333] text-[16px] leading-[1.6] whitespace-pre-wrap">
              {renderContent(post.content)}
            </p>
          </div>

          {/* Images Grid */}
          {post.images && post.images.length > 0 && (
            <div className={`grid gap-1 mb-3 ${
              post.images.length === 1 ? 'grid-cols-1 w-full max-w-full' : 
              post.images.length === 2 ? 'grid-cols-2 max-w-[80%]' : 
              post.images.length === 4 ? 'grid-cols-2 max-w-[70%]' :
              'grid-cols-3'
            }`}>
              {post.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`relative overflow-hidden rounded-lg bg-gray-100 cursor-zoom-in ${post.images && post.images.length === 1 ? 'aspect-auto max-h-[500px]' : 'aspect-square'}`}
                  onClick={() => setViewingImageIndex(idx)}
                >
                  <img 
                    src={img} 
                    alt={`Post ${idx}`} 
                    className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${post.images && post.images.length === 1 ? 'object-top' : 'object-center'}`}
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* Friendly Comment Bar Placeholder (Mobile Style) */}
          <div 
            className="flex items-center gap-2 bg-[#f8f8f8] rounded-full px-3 py-2 mb-2 cursor-pointer active:bg-gray-100 md:hidden"
            onClick={() => setShowComments(!showComments)}
          >
             <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden">
                <Icons.User className="w-full h-full text-gray-400 p-0.5" fill="currentColor" />
             </div>
             <span className="text-gray-400 text-xs">友善评论，文明发言</span>
          </div>

        </div>

        {/* Action Bar */}
        <div className="flex border-t border-gray-50 md:border-gray-100 mx-4 md:mx-0">
          <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-gray-500 hover:bg-gray-50 transition-colors">
            <Icons.Share size={19} strokeWidth={1.5} />
            <span className="text-[13px]">{post.reposts > 0 ? post.reposts : '分享'}</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-gray-500 hover:bg-gray-50 transition-colors" onClick={() => setShowComments(!showComments)}>
            <Icons.Comment size={19} strokeWidth={1.5} />
            <span className="text-[13px]">{post.commentsCount > 0 ? post.commentsCount : '评论'}</span>
          </button>
          <button 
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 transition-colors ${isLiked ? 'text-red-500 hover:bg-red-50' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={handleLike}
          >
            <Icons.Heart size={19} strokeWidth={1.5} fill={isLiked ? "currentColor" : "none"} />
            <span className="text-[13px]">{likes > 0 ? likes : '点赞'}</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="bg-gray-50 border-t border-gray-100 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
            
            {/* Comment Input */}
            <div className="flex gap-3 mb-4">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="发布你的评论..." 
                  className="w-full pl-3 pr-12 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                />
                <div className="absolute right-1 top-1 flex items-center">
                  <button 
                    onClick={submitComment}
                    disabled={!commentText.trim()}
                    className="bg-orange-500 text-white p-1.5 rounded-full hover:bg-orange-600 disabled:opacity-50 transition-colors"
                  >
                    <Icons.Send size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img src={comment.user.avatar} alt="" className="w-8 h-8 rounded-full" />
                  <div className="flex-1 bg-white p-3 rounded-r-xl rounded-bl-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-bold text-gray-800">{comment.user.name}</span>
                      <span className="text-xs text-gray-400">{comment.createdAt}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Loading Text */}
            <div className="mt-4 text-center">
              <span className="text-gray-400 text-xs animate-pulse">正在加载中...</span>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {viewingImageIndex !== null && post.images && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setViewingImageIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[101]"
            onClick={() => setViewingImageIndex(null)}
          >
            <Icons.Close size={32} />
          </button>

          {/* Prev Button */}
          {viewingImageIndex > 0 && (
            <button
              className="absolute left-4 text-white/70 hover:text-white p-3 bg-black/20 rounded-full hover:bg-black/40 transition-colors z-[101]"
              onClick={handlePrevImage}
            >
              <Icons.ChevronLeft size={40} />
            </button>
          )}

          {/* Image Container */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={post.images[viewingImageIndex]}
              alt="Full view"
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>

          {/* Next Button */}
          {viewingImageIndex < post.images.length - 1 && (
            <button
              className="absolute right-4 text-white/70 hover:text-white p-3 bg-black/20 rounded-full hover:bg-black/40 transition-colors z-[101]"
              onClick={handleNextImage}
            >
              <Icons.ChevronRight size={40} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 text-sm font-medium px-4 py-1.5 bg-gray-800/50 backdrop-blur-md rounded-full border border-white/10">
            {viewingImageIndex + 1} / {post.images.length}
          </div>
        </div>
      )}
    </>
  );
};
