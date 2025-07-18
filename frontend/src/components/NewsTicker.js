import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaCalendarAlt } from 'react-icons/fa';
import { newsTickerData } from '../data/newsData';

const NewsTicker = () => {
  const [tickerItems, setTickerItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        // Use static data instead of API call
        setTickerItems(newsTickerData.items || []);
      } catch (error) {
        console.error('Error loading news data:', error);
        setTickerItems([
            {
              id: 9,
              title: "Tranziția Verde a Republicii Moldova: Motor al Integrării Europene și Dezvoltării Durabile",
              date: "24 iunie 2025",
              type: "news",
              url: "#" // NU link extern pentru aceasta
            },
            {
              id: 1,
              title: "R. Moldova exportă mai multă făină, dar la un preț mult mai mic",
              type: "news",
              url: "https://agroexpert.md/rom/novosti/r-moldova-exporta-mai-multa-faina-dar-la-un-pret-mult-mai-mic"
            },
            {
              id: 2,
              title: "Tot mai mulți pasionați de panificație descoperă farmecul pâinii cu maia",
              type: "news",
              url: "https://stiri.md/article/social/tot-mai-multi-pasionati-de-panificatie-descopera-farmecul-painii-cu-maia/"
            },
            {
              id: 3,
              title: "AGENDA TRANZIȚIEI ENERGETICE - ediția a 4-a",
              type: "event",
              url: "/noutati"
            },
            {
              id: 4,
              title: "Expoziția IPAC IMA – 27-30 mai 2025, Milano, Italia",
              type: "event",
              url: "/noutati"
            }
          ]);
      }
    };

    fetchTickerData();
  }, []);

  const handleItemClick = (item) => {
    if (item.url) {
      if (item.url.startsWith('http')) {
        window.open(item.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = item.url;
      }
    }
  };

  // Create enough items for smooth animation - duplicate items for seamless loop
  const allItems = [...tickerItems, ...tickerItems];

  return (
    <div className="news-ticker-container">
      <div className="news-ticker-label">
        <motion.div
          className="label-content"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaNewspaper className="label-icon" />
          <span className="label-text">ULTIMELE NOUTĂȚI</span>
        </motion.div>
      </div>
      
      <div 
        className="news-ticker"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          className="ticker-content"
          animate={{
            x: [`0%`, `-50%`],
          }}
          transition={{
            duration: isHovered ? 60 : 35,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {allItems.map((item, index) => (
            <motion.div 
              key={`${item.id}-${index}`}
              className="ticker-item"
              onClick={() => handleItemClick(item)}
              whileHover={{ 
                scale: 1.05,
                y: -2,
              }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <div className="item-content">
                <span className="item-icon">
                  {item.type === 'news' ? <FaNewspaper /> : <FaCalendarAlt />}
                </span>
                <span className="item-title">{item.title}</span>
                {item.date && (
                  <span className="item-date">
                    <FaCalendarAlt className="date-icon" />
                    {item.date}
                  </span>
                )}
              </div>
              <div className="item-separator">•</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NewsTicker;
