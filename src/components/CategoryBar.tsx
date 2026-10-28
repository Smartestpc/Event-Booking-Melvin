import React from 'react';
import { 
  Compass, 
  Cpu, 
  Music, 
  Palette, 
  Briefcase, 
  Utensils, 
  Activity 
} from 'lucide-react';
import { EventCategory } from '../types';
import { CATEGORIES } from '../data/eventsData';

interface CategoryBarProps {
  selectedCategory: EventCategory;
  onSelectCategory: (category: EventCategory) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (name: EventCategory) => {
    switch (name) {
      case 'Technology':
        return <Cpu className="h-4 w-4" />;
      case 'Music & Concerts':
        return <Music className="h-4 w-4" />;
      case 'Arts & Culture':
        return <Palette className="h-4 w-4" />;
      case 'Business & Finance':
        return <Briefcase className="h-4 w-4" />;
      case 'Food & Culinary':
        return <Utensils className="h-4 w-4" />;
      case 'Health & Sports':
        return <Activity className="h-4 w-4" />;
      default:
        return <Compass className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full border-b border-slate-900 bg-slate-950 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {getCategoryIcon(cat.name)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
