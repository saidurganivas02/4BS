import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  Calculator, 
  Send, 
  Eye, 
  Tag,
  CheckCircle2
} from 'lucide-react';
import { BlogPost } from '../types';
import { api } from '../services/api';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await api.getBlogBySlug(slug);
        setBlog(data);
      } catch (e) {
        console.error('Failed to load blog detail', e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm text-slate-500 font-medium">Loading article analysis...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Article Not Found</h2>
        <p className="text-sm text-slate-500">The article you are looking for may have been archived or moved.</p>
        <Link to="/blog" className="inline-block px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs">
          Return to Blog Hub
        </Link>
      </div>
    );
  }

  const getCalculatorLink = () => {
    switch (blog.division) {
      case 'insurance':
        return { label: 'Calculate Your HLV & Term Cover', path: '/insurance/calculators?tab=hlv' };
      case 'nutrition':
        return { label: 'Check Your BMI & Calorie Target', path: '/nutrition/calculators?tab=bmi' };
      case 'kangen':
        return { label: 'Calculate Bottled Water vs Kangen Savings', path: '/kangen/calculators' };
      case 'solar':
        return { label: 'Calculate Solar Rooftop & Subsidy', path: '/solar/calculator' };
      default:
        return { label: 'Explore Interactive Calculators', path: '/#calculators-section' };
    }
  };

  const calcInfo = getCalculatorLink();

  return (
    <article className="py-12">
      {/* Top Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
            {blog.category}
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500 capitalize">{blog.division.replace('_', ' ')} Division</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-semibold text-slate-800">
              <User className="w-4 h-4 text-blue-600" />
              {blog.author_name}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-slate-400" />
              {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-slate-400" />
              {blog.read_time}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-400">
              <Eye className="w-4 h-4" />
              {blog.views_count} views
            </span>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: blog.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {blog.cover_image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 max-h-[480px]">
            <img 
              src={blog.cover_image} 
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Article Body Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed space-y-4">
          {blog.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-xl font-bold text-slate-900 mt-8 mb-3">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-2xl font-black text-slate-900 mt-10 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            return (
              <p key={index} className="text-sm sm:text-base leading-relaxed text-slate-700">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        {blog.tags && (
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400" />
            {blog.tags.split(',').map((tag, i) => (
              <span key={i} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Embedded Dynamic Calculator CTA */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Apply This Knowledge
            </span>
            <h4 className="text-xl font-bold">
              {calcInfo.label}
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Test your numbers in our live interactive calculator in under 30 seconds.
            </p>
          </div>

          <Link
            to={calcInfo.path}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-blue-600/30 whitespace-nowrap transition"
          >
            Launch Calculator
          </Link>
        </div>
      </div>
    </article>
  );
};
