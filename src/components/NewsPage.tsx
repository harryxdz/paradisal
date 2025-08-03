import React, { useState } from 'react';
import { Calendar, MapPin, Tag, Search, Filter } from 'lucide-react';

const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All News' },
    { id: 'national', label: 'National' },
    { id: 'local', label: 'Local' },
    { id: 'economy', label: 'Economy' },
    { id: 'health', label: 'Health' },
    { id: 'education', label: 'Education' },
    { id: 'technology', label: 'Technology' },
    { id: 'environment', label: 'Environment' }
  ];

  const regions = [
    { id: 'all', label: 'All Regions' },
    { id: 'capital', label: 'Capital District' },
    { id: 'northern', label: 'Northern Province' },
    { id: 'southern', label: 'Southern Province' },
    { id: 'eastern', label: 'Eastern Region' },
    { id: 'western', label: 'Western Coast' }
  ];

  const newsArticles = [
    {
      id: 1,
      title: 'Digital Government Initiative Reaches 1 Million Users',
      excerpt: 'The new online services platform has successfully processed over 1 million national requests, marking a significant milestone in digital transformation.',
      category: 'technology',
      region: 'national',
      date: '2025-01-15',
      featured: true,
      readTime: '3 min read'
    },
    {
      id: 2,
      title: 'New Hospital Opens in Northern Province',
      excerpt: 'State-of-the-art medical facility will serve 500,000 residents with advanced healthcare services and emergency care.',
      category: 'health',
      region: 'northern',
      date: '2025-01-14',
      featured: false,
      readTime: '2 min read'
    },
    {
      id: 3,
      title: 'Economic Growth Hits 5.2% This Quarter',
      excerpt: 'Strong performance across manufacturing and services sectors drives economic expansion above projected targets.',
      category: 'economy',
      region: 'national',
      date: '2025-01-13',
      featured: true,
      readTime: '4 min read'
    },
    {
      id: 4,
      title: 'Clean Energy Project Launched in Western Coast',
      excerpt: 'Major wind farm development will provide renewable energy for 200,000 households by end of 2025.',
      category: 'environment',
      region: 'western',
      date: '2025-01-12',
      featured: false,
      readTime: '3 min read'
    },
    {
      id: 5,
      title: 'Education Reform: New Curriculum Standards Approved',
      excerpt: 'Updated educational framework emphasizes STEM subjects and digital literacy for all grade levels.',
      category: 'education',
      region: 'national',
      date: '2025-01-11',
      featured: false,
      readTime: '5 min read'
    },
    {
      id: 6,
      title: 'Capital District Transportation Upgrade Complete',
      excerpt: 'New metro line and bus rapid transit system now operational, reducing commute times by 40%.',
      category: 'local',
      region: 'capital',
      date: '2025-01-10',
      featured: false,
      readTime: '2 min read'
    }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || article.region === selectedRegion;
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesRegion && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Government News</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay informed with the latest updates from the council both national and local.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {regions.map(region => (
                <option key={region.id} value={region.id}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured News</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredArticles.map(article => (
              <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full capitalize">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <span className="text-gray-500 text-sm">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="capitalize">{article.region}</span>
                    </div>
                    <button className="text-blue-600 font-medium hover:text-blue-700">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Updates</h2>
        <div className="space-y-6">
          {regularArticles.map(article => (
            <article key={article.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full capitalize">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <span className="text-gray-500 text-sm">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="capitalize">{article.region}</span>
                    </div>
                    <button className="text-blue-600 font-medium hover:text-blue-700">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Tag className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;