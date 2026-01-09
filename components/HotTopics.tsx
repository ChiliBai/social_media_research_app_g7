import React from 'react';
import { HotTopic } from '../types';

const MOCK_TOPICS: HotTopic[] = [
  { id: 1, title: 'React 19 发布', volume: 5201314, tag: '爆' },
  { id: 2, title: 'Gemini AI 模型更新', volume: 3456789, tag: 'hot' },
  { id: 3, title: '周末去哪儿玩', volume: 2345678, tag: 'new' },
  { id: 4, title: '这周工作总结', volume: 1234567 },
  { id: 5, title: '此时此刻的天空', volume: 987654 },
  { id: 6, title: '程序员的养生指南', volume: 876543, tag: 'new' },
  { id: 7, title: '如何高效摸鱼', volume: 765432 },
];

export const HotTopics: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-800">微博热搜</h3>
        <a href="#" className="text-xs text-orange-500 hover:underline">查看完整榜单 &gt;</a>
      </div>
      <div className="divide-y divide-gray-50">
        {MOCK_TOPICS.map((topic, index) => (
          <a key={topic.id} href="#" className="block px-4 py-2.5 hover:bg-gray-50 transition-colors group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className={`text-sm font-medium w-4 text-center ${index < 3 ? 'text-orange-500' : 'text-gray-400'}`}>
                  {index + 1}
                </span>
                <span className="text-sm text-gray-700 group-hover:text-orange-500 truncate">
                  {topic.title}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-400">{(topic.volume / 10000).toFixed(1)}万</span>
                {topic.tag && (
                  <span className={`text-xs px-1 rounded text-white ${
                    topic.tag === '爆' ? 'bg-red-600' : 
                    topic.tag === 'hot' ? 'bg-orange-500' : 'bg-blue-400'
                  }`}>
                    {topic.tag}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export const FooterLinks: React.FC = () => (
  <div className="px-4 text-xs text-gray-400 space-y-1">
    <div className="flex flex-wrap gap-2">
      <a href="#" className="hover:text-orange-500">关于我们</a>
      <a href="#" className="hover:text-orange-500">联系我们</a>
      <a href="#" className="hover:text-orange-500">加入我们</a>
      <a href="#" className="hover:text-orange-500">隐私政策</a>
    </div>
    <p>© 2024 WeiBuzz Corporation. All Rights Reserved.</p>
  </div>
);