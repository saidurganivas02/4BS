import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Tag, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Eye
} from 'lucide-react';
import { BlogPost, BusinessDivisionType } from '../types';
import { api } from '../services/api';

export const BlogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDivision = searchParams.get('division') || 'all';
  const initialCategory = searchParams.get('category') || 'all';

  const [divisionFilter, setDivisionFilter] = useState<string>(initialDivision);
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await api.getBlogs(divisionFilter !== 'all' ? divisionFilter : undefined);
        setBlogs(data);
      } catch (e) {
        console.error('Failed to load blogs', e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [divisionFilter]);

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = searchQuery === '' || 
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.tags && b.tags.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const getDivisionBadge = (division: BusinessDivisionType) => {
    switch (division) {
      case 'insurance':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'nutrition':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'kangen':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'solar':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const featuredPost = filteredBlogs[0];
  const regularPosts = filteredBlogs.slice(1);

  return (
    <div className="space-y-12 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Knowledge & Insights Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Articles & Expert Analysis
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          In-depth guides on life insurance HLV, cellular nutrition, molecular hydrogen water science, and rooftop solar subsidies.
        </p>

        {/* Search Bar & Filters */}
        <div className="max-w-2xl mx-auto pt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              placeholder="Search articles by keyword, tag, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto justify-center sm:justify-start">
            {[
              { id: 'all', label: 'All' },
              { id: 'insurance', label: 'Insurance' },
              { id: 'nutrition', label: 'Nutrition' },
              { id: 'kangen', label: 'Kangen Water' },
              { id: 'solar', label: 'Solar Energy' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setDivisionFilter(f.id);
                  setSearchParams(f.id !== 'all' ? { division: f.id } : {});
                }}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap ${
                  divisionFilter === f.id
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article Hero */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="group block bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 h-64 lg:h-96 relative overflow-hidden bg-slate-900">
              <img 
                src={featuredPost.cover_image || 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80'} 
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${getDivisionBadge(featuredPost.division)}`}>
                  {featuredPost.category}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.read_time}
                  </span>
                  <span>•</span>
                  <span>{new Date(featuredPost.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {featuredPost.views_count} reads
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">
                  By {featuredPost.author_name}
                </span>
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Grid of Remaining Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative bg-slate-900">
                  <img 
                    src={post.cover_image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-sm ${getDivisionBadge(post.division)}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.read_time}
                    </span>
                    <span>•</span>
                    <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{post.author_name}</span>
                <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredBlogs.length === 0 && !loading && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No Articles Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting a different category filter.</p>
          </div>
        )}
      </section>
    </div>
  );
};
