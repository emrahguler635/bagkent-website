'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isKurumsalOpen, setIsKurumsalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    {
      label: 'Kurumsal',
      subLinks: [
        { href: '/kurumsal/hakkimizda', label: 'Hakkımızda' },
        { href: '/kurumsal/misyon-vizyon', label: 'Misyon - Vizyon' },
        { href: '/kurumsal/yonetim', label: 'Yönetim' },
      ],
    },
    { href: '/projeler', label: 'Projelerimiz' },
    { href: '/iletisim', label: 'İletişim' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-5 group">
            <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="https://cdn.abacus.ai/images/6b80fa56-8729-4a3f-a473-0e58c6d010bf.png"
                alt="BağKent A.Ş."
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            <div>
              <h1
                className={`text-3xl md:text-5xl font-extrabold tracking-tight transition-all duration-300 ${
                  isScrolled 
                    ? 'text-blue-900' 
                    : 'text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]'
                }`}
              >
                BağKent A.Ş.
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link?.subLinks ? (
                  <>
                    <button
                      className={`flex items-center space-x-1 font-medium transition-colors hover:text-blue-600 ${
                        isScrolled ? 'text-gray-700' : 'text-white'
                      }`}
                      onMouseEnter={() => setIsKurumsalOpen(true)}
                      onMouseLeave={() => setIsKurumsalOpen(false)}
                    >
                      <span>{link?.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {isKurumsalOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden"
                          onMouseEnter={() => setIsKurumsalOpen(true)}
                          onMouseLeave={() => setIsKurumsalOpen(false)}
                        >
                          {link?.subLinks?.map?.((subLink, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subLink?.href ?? '#'}
                              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              {subLink?.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={link?.href ?? '#'}
                    className={`font-medium transition-colors hover:text-blue-600 ${
                      isScrolled ? 'text-gray-700' : 'text-white'
                    }`}
                  >
                    {link?.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="/iletisim"
            className="hidden lg:block px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Bize Ulaşın
          </Link>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menü"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <nav className="container-custom py-4 space-y-2">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link?.subLinks ? (
                    <>
                      <div className="px-4 py-2 text-gray-500 font-semibold text-sm uppercase">
                        {link?.label}
                      </div>
                      {link?.subLinks?.map?.((subLink, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subLink?.href ?? '#'}
                          className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors ml-4"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subLink?.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      href={link?.href ?? '#'}
                      className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link?.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/iletisim"
                className="block mx-4 mt-4 px-6 py-3 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bize Ulaşın
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
