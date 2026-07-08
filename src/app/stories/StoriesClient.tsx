'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Clock, ArrowUpRight, Search } from 'lucide-react';
import { blogPosts } from './blogData';

const categories = ['All', 'AI', 'Data Science', 'Digital Marketing', 'Influencer Marketing', 'Career', 'Ikigai'];

export default function StoriesClient() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="flex-grow overflow-x-hidden">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-6 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <li><Link href="/" className="hover:text-indigo-500 transition-colors">Home</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li className="text-indigo-600">Stories</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-indigo-200/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-purple-200/20 blur-[100px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <span className="clay-badge bg-indigo-50 text-indigo-600 mx-auto mb-4">
              📖 Our Stories
            </span>
            <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-black text-slate-800 tracking-tight mb-4">
              Insights & <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Stories</span>
            </h1>
            <p className="text-base text-slate-500 font-semibold max-w-xl mx-auto leading-relaxed">
              Expert articles on AI, Data Science, Digital Marketing, and Influencer Marketing — written for students and professionals in Ludhiana.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full clay-input text-sm !pl-11"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-extrabold rounded-full transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-[3px_3px_10px_rgba(99,102,241,0.3)]'
                    : 'bg-white/60 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 shadow-[3px_3px_8px_rgba(166,160,200,0.2),-2px_-2px_6px_rgba(255,255,255,0.7)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Featured Post (First Post) */}
          {filteredPosts.length > 0 && selectedCategory === 'All' && searchQuery === '' && (
            <Link href={`/stories/${filteredPosts[0].slug}`} className="block mb-10 group">
              <article className="clay-panel bg-white/60 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={filteredPosts[0].image}
                      alt={filteredPosts[0].imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="clay-badge bg-indigo-600 text-white !text-[9px]">Featured</span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="clay-badge bg-indigo-50 text-indigo-600 !text-[9px]">{filteredPosts[0].category}</span>
                      <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {filteredPosts[0].readTime} read
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-black text-indigo-600">
                      Read Article <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedCategory === 'All' && searchQuery === '' ? filteredPosts.slice(1) : filteredPosts).map((post) => (
              <Link key={post.slug} href={`/stories/${post.slug}`} className="group">
                <article className="clay-card overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 22rem, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-white text-[9px] font-black uppercase tracking-wider bg-slate-900/60 backdrop-blur px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] text-slate-400 font-bold">{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-indigo-600 uppercase tracking-wider mt-auto">
                      Read More <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 font-bold text-lg">No articles found</p>
              <p className="text-slate-300 text-sm mt-2">Try a different search or category</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
