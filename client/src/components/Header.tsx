import { FAQ_DATA } from '@/data/faqData';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ArrowUpRight, HelpCircle, FileSpreadsheet } from 'lucide-react';

export default function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location !== '/') {
      setActiveAnchor('');
      return;
    }

    const sectionIds = ['about', 'support', 'solutions', 'notices'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const updateActiveSection = () => {
      const headerOffset = 100;
      const current = sections.reduce<HTMLElement | null>((closest, section) => {
        if (section.getBoundingClientRect().top <= headerOffset) return section;
        return closest;
      }, null);
      setActiveAnchor(current?.id ?? sections[0].id);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [location]);

  const navLinks = [
    { label: '사업 소개', href: '/#about', isAnchor: true },
    { label: '지원 금액', href: '/#support', isAnchor: true },
    { label: 'AI 솔루션', href: '/#solutions', isAnchor: true },
    { label: '모집 공고', href: '/#notices', isAnchor: true },
    { label: '정산 이용 가이드', href: '/guide/settlement/', isAnchor: false, icon: FileSpreadsheet },
    { label: 'QnA', href: '/faq/', isAnchor: false, icon: HelpCircle, isBadge: true },
  ];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      setActiveAnchor(targetId);
      if (location === '/') {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setMobileMenuOpen(false);
        }
      } else {
        // Navigating back to home anchor
        setMobileMenuOpen(false);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-white/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link 
          href="/" 
          className="flex items-center gap-3.5 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-600 rounded-lg p-1"
        >
          <div className="relative flex items-center justify-center w-[142px] sm:w-[164px] h-11 overflow-hidden">
            <img
              src="/KAIGA.png"
              alt="KAIGA 로고"
              className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isFaq = link.href === '/faq/';
            const isGuide = link.href === '/guide/settlement/';
            const isActive = link.isAnchor
              ? location === '/' && activeAnchor === link.href.replace('/#', '')
              : location === link.href;

            if (isFaq) {
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all shadow-xs ${
                    isActive
                      ? 'bg-purple-700 text-white shadow-purple-200'
                      : 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-purple-100'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>QnA ({FAQ_DATA.length}개)</span>
                </Link>
              );
            }

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-purple-700 font-semibold bg-purple-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-slate-700 hover:text-purple-700 hover:bg-purple-50 border border-slate-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-600"
            aria-expanded={mobileMenuOpen}
            aria-label="메뉴 열기/닫기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isFaq = link.href === '/faq/';
              const isActive = location === link.href;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleAnchorClick(e, link.href);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isFaq
                      ? 'bg-purple-600 text-white font-semibold'
                      : isActive
                      ? 'bg-purple-50 text-purple-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.isAnchor ? (
                    <span className="text-xs text-slate-400">#</span>
                  ) : (
                    <ArrowUpRight className="w-4 h-4 opacity-70" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
