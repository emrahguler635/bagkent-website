'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useImagePath } from '@/hooks/useImagePath';

const Footer = () => {
  const currentYear = 2025;
  const bagkentLogoPath = useImagePath("/bagkent-logo.png");
  const belediyeLogoPath = useImagePath("/bagcilar-belediyesi-logo.png");

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">BağKent A.Ş.</h3>
              <p className="text-sm text-blue-300">İnşaat ve Mimari</p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Kaliteli yapılar, güvenilir çözümler. Modern inşaat projeleri ile İstanbul'da
              sektörün öncü firmalarından biri olarak hizmet veriyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/kurumsal/hakkimizda"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/kurumsal/misyon-vizyon"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Misyon - Vizyon
                </Link>
              </li>
              <li>
                <Link
                  href="/projeler"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Projelerimiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim Bilgileri</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a href="tel:02124100600" className="text-gray-400 hover:text-blue-400 transition-colors">
                  0212 410 06 00
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:bagkent@bagkent.com.tr"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  bagkent@bagkent.com.tr
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Güneşli Mah. Mahmutbey Cad. No:97 Bağcılar/İSTANBUL
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media & Partners */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Bizi Takip Edin</h4>
            <div className="flex space-x-3 mb-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            
            {/* Partner Logos */}
            <div className="space-y-3">
              <div className="flex items-center justify-start space-x-4">
                <div className="relative w-20 h-20 bg-white rounded-lg p-2 hover:scale-105 transition-transform">
                  <img
                    src={bagkentLogoPath}
                    alt="BağKent Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="relative w-20 h-20 bg-white rounded-lg p-2 hover:scale-105 transition-transform">
                  <img
                    src={belediyeLogoPath}
                    alt="Bağcılar Belediyesi Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} BağKent A.Ş. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/iletisim"
                className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
              >
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
