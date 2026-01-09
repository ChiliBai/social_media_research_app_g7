import React from 'react';
import { Icons } from './Icons';

export const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: Icons.Home, label: '首页', active: true },
    { icon: Icons.Flame, label: '热门' },
    { icon: Icons.Search, label: '发现' },
    { icon: Icons.Bell, label: '消息通知' },
    { icon: Icons.Mail, label: '私信' },
    { icon: Icons.User, label: '个人主页' },
    { icon: Icons.More, label: '更多' },
  ];

  return (
    <div className="hidden md:flex flex-col w-60 py-4 sticky top-14 h-[calc(100vh-3.5rem)]">
      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
              item.active 
                ? 'text-gray-900 font-bold' 
                : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
            }`}
          >
            <item.icon size={26} strokeWidth={item.active ? 2.5 : 2} />
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};