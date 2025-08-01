import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FaCalendarAlt, FaFileAlt, FaExternalLinkAlt, FaGavel, FaBuilding } from "react-icons/fa";
import { newsTickerData } from '../data/newsData';

export const LatestNewsSection = () => {
  const [latestNews, setLatestNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        // Use static data instead of API call
        const data = newsTickerData;
        
        if (data.success && data.items.length > 0) {
          // Get the Green Transition news item specifically (ID 9)
          const greenTransition = data.items.find(item => item.id === 9 && item.type === 'news');
          if (greenTransition) {
            setLatestNews(greenTransition);
          } else {
            // Fallback to most recent news item if Green Transition not found
            const latest = data.items.find(item => item.type === 'news') || data.items[0];
            setLatestNews(latest);
          }
        }
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!latestNews) {
    return null;
  }

  const getTagIcon = (category) => {
    switch (category) {
      case 'official':
        return <FaGavel className="text-blue-500 text-xs mr-1" />;
      case 'ministerial':
        return <FaBuilding className="text-green-500 text-xs mr-1" />;
      default:
        return <FaFileAlt className="text-gray-500 text-xs mr-1" />;
    }
  };

  const getTagColor = (category) => {
    switch (category) {
      case 'official':
        return 'bg-blue-100 text-blue-700';
      case 'ministerial':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 font-heading text-gray-800">Ultima Știre</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Dynamic image based on news content */}
            <div className="relative h-48 bg-gradient-to-r from-green-500 to-blue-600">
              {latestNews.id === 9 ? (
                <img 
                  src="/images/trans1.jpg"
                  alt="Tranziția Verde a Republicii Moldova"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Government Building"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              
              {/* Date badge */}
              <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                <FaCalendarAlt className="inline mr-2" />
                {latestNews.date}
              </div>
              
              {/* Category badge for Green Transition */}
              {latestNews.id === 9 && (
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  SUSTENABILITATE
                </div>
              )}
            </div>

            <div className="p-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {latestNews.id === 9 ? (
                  <>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTagColor('sustainability')}`}>
                      {getTagIcon('sustainability')}
                      Sustenabilitate
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700`}>
                      <FaBuilding className="text-green-500 text-xs mr-1" />
                      UE & PNUD
                    </span>
                  </>
                ) : (
                  <>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTagColor('official')}`}>
                      {getTagIcon('official')}
                      Oficial
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTagColor('ministerial')}`}>
                      {getTagIcon('ministerial')}
                      Ministerial
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                {latestNews.title}
              </h3>

              {/* Content */}
              <div className="text-gray-600 mb-4 leading-relaxed">
                {latestNews.id === 9 ? (
                  <p>
                    Pe 24 iunie, la Maib Park, a avut loc conferința națională "Tranziția verde a Republicii Moldova: 
                    Un motor al integrării europene și al creșterii durabile". Evenimentul a fost organizat de 
                    Uniunea Europeană și Programul Națiunilor Unite pentru Dezvoltare (PNUD), în parteneriat cu 
                    Ministerul Dezvoltării Economice și Digitalizării.
                  </p>
                ) : latestNews.title === "Ministerul Agriculturii vine cu o reacție în urma demersului scris de ANIPM" ? (
                  <p>
                    Ministerul Agriculturii și Industriei Alimentare a transmis un răspuns oficial 
                    în urma demersului scris de Asociația Națională a Industriei de Panificație din Moldova. 
                    Documentele oficiale și răspunsul oficial al ministerului sunt disponibile pentru consultare.
                  </p>
                ) : (
                  <p>Pentru informații complete despre această situație, consultați documentele oficiale disponibile.</p>
                )}
              </div>

              {/* Documents section - only for ministerial news */}
              {latestNews.hasDocuments && latestNews.id !== 9 && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <FaFileAlt className="mr-2 text-primary-500" />
                    Documente disponibile ({latestNews.hasDocuments ? '4' : '0'})
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <a 
                      href="/static/documents/minist1.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                      <FaFileAlt className="text-blue-500 mr-3" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-700 truncate">Răspuns oficial - ...</p>
                        <p className="text-xs text-blue-500">PDF Document</p>
                      </div>
                      <FaExternalLinkAlt className="text-blue-400 text-xs ml-2" />
                    </a>

                    <a 
                      href="/static/documents/minist2.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                      <FaFileAlt className="text-blue-500 mr-3" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-700 truncate">Răspuns oficial - ...</p>
                        <p className="text-xs text-blue-500">PDF Document</p>
                      </div>
                      <FaExternalLinkAlt className="text-blue-400 text-xs ml-2" />
                    </a>

                    <a 
                      href="/static/documents/minist3.docx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
                    >
                      <FaFileAlt className="text-green-500 mr-3" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-green-700 truncate">Anexă - Docume...</p>
                        <p className="text-xs text-green-500">DOCX Document</p>
                      </div>
                      <FaExternalLinkAlt className="text-green-400 text-xs ml-2" />
                    </a>

                    <a 
                      href="/static/documents/minist4.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                      <FaFileAlt className="text-blue-500 mr-3" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-700 truncate">Răspuns oficial - ...</p>
                        <p className="text-xs text-blue-500">PDF Document</p>
                      </div>
                      <FaExternalLinkAlt className="text-blue-400 text-xs ml-2" />
                    </a>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">ANIMP</p>
                    <p className="text-xs text-gray-500">Sursă oficială</p>
                  </div>
                </div>
                
                {latestNews.id === 9 ? (
                  <a 
                    href="/noutati/9"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center transition-colors duration-200"
                  >
                    Citește mai mult
                    <FaExternalLinkAlt className="ml-1 text-xs" />
                  </a>
                ) : (
                  <a 
                    href="/ultimele-stiri"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center transition-colors duration-200"
                  >
                    Vezi document
                    <FaExternalLinkAlt className="ml-1 text-xs" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};