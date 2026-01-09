import React, { useState, useRef } from 'react';
import { User } from '../types';
import { Icons } from './Icons';
import { polishPostContent } from '../services/geminiService';

interface ComposeBoxProps {
  currentUser: User;
  onPostCreate: (content: string, image?: string) => void;
}

export const ComposeBox: React.FC<ComposeBoxProps> = ({ currentUser, onPostCreate }) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePost = () => {
    if (!content.trim() && !selectedImage) return;
    onPostCreate(content, selectedImage || undefined);
    setContent('');
    setSelectedImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiPolish = async () => {
    if (!content.trim()) return;
    setIsPolishing(true);
    const polished = await polishPostContent(content);
    setContent(polished);
    setIsPolishing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-12 h-12 rounded-full border border-gray-200 object-cover"
          />
        </div>

        {/* Input Area */}
        <div className="flex-1">
          <div className={`relative border rounded-xl transition-all ${isFocused ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-200 hover:border-gray-300'}`}>
            <textarea
              className="w-full p-3 min-h-[100px] bg-transparent border-none focus:outline-none resize-none text-gray-800 placeholder-gray-400"
              placeholder="有什么新鲜事想告诉大家？"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            
            {/* Image Preview */}
            {selectedImage && (
              <div className="px-3 pb-3 relative inline-block">
                <img src={selectedImage} alt="Preview" className="h-32 w-auto rounded-lg object-cover border border-gray-200" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                >
                  <Icons.Close size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Tools & Action Bar */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 sm:gap-4 text-gray-500">
              <button className="flex items-center gap-1 hover:text-orange-500 px-2 py-1 rounded-full hover:bg-orange-50 transition-colors">
                <Icons.Smile size={20} />
                <span className="hidden sm:inline text-sm">表情</span>
              </button>
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 hover:text-orange-500 px-2 py-1 rounded-full hover:bg-orange-50 transition-colors"
              >
                <Icons.Image size={20} />
                <span className="hidden sm:inline text-sm">图片</span>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
              
              <button className="flex items-center gap-1 hover:text-orange-500 px-2 py-1 rounded-full hover:bg-orange-50 transition-colors">
                <Icons.Hash size={20} />
                <span className="hidden sm:inline text-sm">话题</span>
              </button>

              <div className="h-4 w-px bg-gray-200 mx-1"></div>

              {/* Gemini AI Feature */}
              <button 
                onClick={handleAiPolish}
                disabled={isPolishing || !content.trim()}
                className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all ${
                  isPolishing 
                    ? 'bg-purple-100 text-purple-600 animate-pulse' 
                    : 'text-purple-600 hover:bg-purple-50'
                }`}
                title="使用 Gemini AI 润色文案"
              >
                <Icons.Sparkles size={18} />
                <span className="text-sm font-medium">{isPolishing ? 'AI 思考中...' : 'AI 润色'}</span>
              </button>
            </div>

            <button
              onClick={handlePost}
              disabled={!content.trim() && !selectedImage}
              className={`px-6 py-1.5 rounded-full text-sm font-bold transition-all transform active:scale-95 ${
                (!content.trim() && !selectedImage)
                  ? 'bg-orange-300 text-white cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-200'
              }`}
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};