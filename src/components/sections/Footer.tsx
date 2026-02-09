import React from 'react';
import { Facebook, Instagram, Linkedin, Phone, Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/Button';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Benefits', href: '#' },
    { name: 'Testimonials', href: '#' },
  ];

  const usefulLinks = [
    { name: 'Partner with Us', href: '#' },
    { name: 'Become a Wholesaler', href: '#' },
    { name: 'Privacy and Policy', href: '#' },
    { name: 'Need Help?', href: '#' },
  ];

  const socials = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Top CTA Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#909090]">
              Get started <span className="italic font-playfair">today</span>
            </h2>
            <Button
              size="lg"
              className="bg-[#FF5E32] hover:bg-[#FF5E31]/90  text-white rounded-[12px] text-lg font-semibold h-[56px] px-8 w-full sm:w-auto"
            >
              Start Free Trial Now
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-end lg:gap-8">
          {/* Logo Section */}
          <div className="lg:col-span-1">
            <Image
              src="/assets/logo/Proshar White Logo.svg"
              alt="Proshar Logo"
              width={150}
              height={50}
              className="mb-4"
            />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Useful Links</h4>
            <ul className="space-y-4">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Socials</h4>
            <ul className="space-y-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      {social.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-gray-800 mt-16 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Have a question?</p>
                  <a
                    href="tel:310-437-2766"
                    className="text-lg font-medium hover:text-orange-500 transition-colors"
                  >
                    310-437-2766
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email Us</p>
                  <a
                    href="mailto:support@proshar.com"
                    className="text-lg font-medium hover:text-orange-500 transition-colors"
                  >
                    support@proshar.com
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2026. Proshar, All Right Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
