'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Building2, Users, Award } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getImagePath } from '@/lib/imagePath';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      src: 'https://www.imtilak.net/storage/posts/image_1608792757_xzMoEGJbDHRYRflVyv2tzGYLCy6DhNSlaoxhOUM6.jpeg',
      alt: 'Bağcılar İstanbul Genel Görünüm',
    },
    {
      src: '/hero-bg-2.jpg',
      alt: 'BağKent A.Ş. Proje Alanı',
    },
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full"
          >
            <img
              src={getImagePath(slides[currentSlide].src)}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/80 to-blue-800/70" />
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Slayt ${index + 1}'e git`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Geleceği İnşa Eden <span className="text-blue-300">Güven</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Modern mimari çözümler ve kaliteli yapılar ile hayallerinizi gerçeğe dönüştürüyoruz.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/projeler"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl group"
            >
              Projelerimizi Keşfedin
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-xl"
            >
              Bize Ulaşın
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
              <Building2 className="w-12 h-12 text-blue-300 mx-auto mb-3" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">250+</h3>
              <p className="text-blue-200">Tamamlanan Proje</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
              <Users className="w-12 h-12 text-blue-300 mx-auto mb-3" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">30+</h3>
              <p className="text-blue-200">Yıllık Deneyim</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
              <Award className="w-12 h-12 text-blue-300 mx-auto mb-3" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">15+</h3>
              <p className="text-blue-200">Ödül ve Sertifika</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
