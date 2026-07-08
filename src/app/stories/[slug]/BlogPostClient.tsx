'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Clock, ArrowUpRight, ArrowLeft } from 'lucide-react';
import type { BlogPost } from '../blogData';

interface Props {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

function renderMarkdown(content: string) {
  // Simple markdown-to-HTML renderer for blog content
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-2 mb-6 ml-1">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={i} className="text-xl font-black text-slate-800 mt-10 mb-4">
          {trimmed.replace('## ', '')}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={i} className="text-lg font-black text-slate-700 mt-8 mb-3">
          {trimmed.replace('### ', '')}
        </h3>
      );
    } else if (trimmed.match(/^[0-9]+\.\s\*\*/)) {
      flushList();
      const text = trimmed.replace(/^[0-9]+\.\s/, '');
      elements.push(
        <div key={i} className="flex gap-3 items-start mb-3">
          <span className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 text-[10px] font-black text-indigo-600 mt-0.5">
            {trimmed.match(/^([0-9]+)/)?.[1]}
          </span>
          <p className="text-sm text-slate-600 leading-relaxed font-medium"
            dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800">$1</strong>') }}
          />
        </div>
      );
    } else if (trimmed.startsWith('- **') || trimmed.startsWith('- ❌') || trimmed.startsWith('- ✅')) {
      inList = true;
      listItems.push(
        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 font-medium leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
          <span dangerouslySetInnerHTML={{ __html: trimmed.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800">$1</strong>') }} />
        </li>
      );
    } else if (trimmed === '') {
      flushList();
    } else if (trimmed.length > 0) {
      flushList();
      elements.push(
        <p key={i} className="text-sm text-slate-600 leading-relaxed font-medium mb-4"
          dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800">$1</strong>') }}
        />
      );
    }
  });

  flushList();
  return elements;
}

export default function BlogPostClient({ post, relatedPosts }: Props) {
  return (
    <main className="flex-grow overflow-x-hidden">
      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-6 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <li><Link href="/" className="hover:text-indigo-500 transition-colors">Home</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li><Link href="/stories" className="hover:text-indigo-500 transition-colors">Stories</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li className="text-indigo-600 truncate max-w-[200px]">{post.category}</li>
        </ol>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pb-20" itemScope itemType="https://schema.org/Article">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="clay-badge bg-indigo-50 text-indigo-600 !text-[9px]">{post.category}</span>
            <span className="text-[10px] text-slate-400 font-bold">
              {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime} read
            </span>
          </div>

          <h1 itemProp="headline" className="text-[clamp(1.6rem,4vw,2.8rem)] font-black text-slate-800 tracking-tight leading-[1.1] mb-6">
            {post.title}
          </h1>

          <p itemProp="description" className="text-base text-slate-500 font-semibold leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 sm:h-80 md:h-96 rounded-[24px] overflow-hidden mb-10 shadow-[8px_8px_24px_rgba(166,160,200,0.3),-4px_-4px_12px_rgba(255,255,255,0.8)]">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
            itemProp="image"
          />
        </div>

        {/* Article Body */}
        <div className="clay-panel bg-white/50 p-6 sm:p-10 mb-10" itemProp="articleBody">
          {renderMarkdown(post.content)}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {post.keywords.map((kw) => (
            <span key={kw} className="clay-badge bg-slate-50 text-slate-500 !text-[9px]">
              #{kw.replace(/ /g, '')}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="clay-panel bg-gradient-to-br from-indigo-50 to-violet-50 p-8 text-center mb-12">
          <h3 className="text-xl font-black text-slate-800 mb-2">Ready to Start Your Journey?</h3>
          <p className="text-sm text-slate-500 font-medium mb-5">
            Join Ikigai School of AI, Ludhiana — the best institute for AI, Data Science, and Digital Marketing courses in Punjab.
          </p>
          <Link href="/#contact" className="clay-btn-primary shine !text-sm !py-3 !px-8 inline-flex items-center gap-2">
            Apply Now <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-xl font-black text-slate-800 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/stories/${rp.slug}`} className="group">
                  <div className="clay-card overflow-hidden h-full flex flex-col">
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={rp.image}
                        alt={rp.imageAlt}
                        fill
                        sizes="(min-width: 768px) 20rem, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <span className="text-[10px] text-slate-400 font-bold mb-2">{rp.readTime} read</span>
                      <h3 className="text-xs font-black text-slate-800 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                        {rp.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Stories */}
        <div className="mt-10 text-center">
          <Link href="/stories" className="inline-flex items-center gap-2 text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Stories
          </Link>
        </div>
      </article>
    </main>
  );
}
