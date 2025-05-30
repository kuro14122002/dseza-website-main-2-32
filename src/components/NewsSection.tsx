import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/utils/translations";

interface NewsCardProps {
  date: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  isLarge?: boolean;
}

/**
 * Individual news card component
 */
const NewsCard: React.FC<NewsCardProps> = ({ date, title, excerpt, image, isLarge }) => {
  const { theme } = useTheme();
  
  // Theme-specific styles
  const cardBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  
  return (
    <a 
      href="#" 
      className={cn(
        "block rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 h-full",
        cardBg,
        theme === "dark" ? "hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)]" : "hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
      )}
    >
      <div className="h-0 pb-[56.25%] relative">
        <img 
          src={image} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4 sm:p-5">
        <p className={cn("text-xs mb-1", secondaryTextColor)}>{date}</p>
        <h3 className={cn("font-montserrat font-semibold mb-2 line-clamp-2", textColor, isLarge ? "text-xl sm:text-2xl" : "text-base")}>
          {title}
        </h3>
        <p className={cn("text-sm line-clamp-3", secondaryTextColor)}>
          {excerpt}
        </p>
      </div>
    </a>
  );
};

/**
 * News section with category filters
 */
const NewsSection: React.FC = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("investment");
  const { t } = useTranslation();
  
  // Theme-specific styles
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const accentColor = theme === "dark" ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent";
  
  // Tab categories
  const categories = [
    { id: "investment", name: t('news.categories.investment') },
    { id: "training", name: t('news.categories.training') },
    { id: "digital", name: t('news.categories.digital') },
    { id: "management", name: t('news.categories.management') },
    { id: "other", name: t('news.categories.other') }
  ];
  
  // Dummy news data
  const newsData = [
    {
      id: 1,
      category: "investment",
      date: "14/05/2025",
      title: t('news.sampleNews.news1.title'),
      excerpt: t('news.sampleNews.news1.excerpt'),
      image: "https://via.placeholder.com/800x450/3B5998/FFFFFF?text=Khu+Công+Nghệ+Cao+Đà+Nẵng"
    },
    {
      id: 2,
      category: "investment",
      date: "12/05/2025",
      title: t('news.sampleNews.news2.title'),
      excerpt: t('news.sampleNews.news2.excerpt'),
      image: "https://via.placeholder.com/400x225/4EABF1/FFFFFF?text=Hợp+Tác+Quốc+Tế"
    },
    {
      id: 3,
      category: "investment",
      date: "10/05/2025",
      title: t('news.sampleNews.news3.title'),
      excerpt: t('news.sampleNews.news3.excerpt'),
      image: "https://via.placeholder.com/400x225/00BB6D/FFFFFF?text=Chính+Sách+Ưu+Đãi"
    }
  ];
  
  // Filter news by active category
  const filteredNews = newsData.filter(item => item.category === activeCategory);
  
  return (
    <section className={cn(
      "py-12 px-4 sm:px-6 lg:px-8",
      theme === "dark" ? "bg-[#1D262E]" : "bg-[#FFFFFF]"
    )}>
      <div className="container mx-auto">
        <h2 className={cn(
          "font-montserrat font-bold text-3xl md:text-4xl mb-4 text-center",
          textColor
        )}>
          {t('news.title')}
        </h2>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={cn(
                "px-4 py-2 rounded-md transition-colors duration-200 font-inter text-sm sm:text-base",
                activeCategory === category.id ? accentColor : secondaryTextColor,
                activeCategory === category.id ? "font-medium" : "font-normal",
                "hover:text-opacity-90"
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large news card */}
          <div className="lg:col-span-2">
            {filteredNews.length > 0 && (
              <NewsCard
                date={filteredNews[0].date}
                title={filteredNews[0].title}
                excerpt={filteredNews[0].excerpt}
                image={filteredNews[0].image}
                category={filteredNews[0].category}
                isLarge={true}
              />
            )}
          </div>
          
          {/* Smaller news cards */}
          <div className="lg:col-span-1 grid grid-cols-1 gap-6">
            {filteredNews.slice(1, 3).map(news => (
              <NewsCard
                key={news.id}
                date={news.date}
                title={news.title}
                excerpt={news.excerpt}
                image={news.image}
                category={news.category}
                isLarge={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
