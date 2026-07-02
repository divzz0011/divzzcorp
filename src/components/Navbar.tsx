"use client";

import { Compass, Briefcase, Info, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  // Fungsi untuk scroll otomatis ke section produk saat menu diklik
  const handleScrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 550, // Menggeser layar ke bawah menuju area katalog produk
      behavior: "smooth", // Efek geser halus ala web modern
    });
  };

  return (
    <nav className="w-full bg-[#1A1D29]/80 backdrop-blur-md border-b border-[#4A4E69]/20 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Brand */}
        <Link href="/" className="text-xl font-black tracking-tighter text-white flex items-center gap-2 hover:opacity-90 transition-all">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#DCD6F7] to-[#E3F6F5] flex items-center justify-center text-[#12141C]">
            <ShoppingBag size={16} />
          </div>
          Divzz<span className="text-[#DCD6F7]">Corp</span>
        </Link>

        {/* Menu Navigasi Atas yang Sekarang Bisa Di-klik */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A4E69]">
          <a 
            href="#discover" 
            onClick={handleScrollToProducts}
            className="flex items-center gap-1.5 hover:text-[#DCD6F7] text-white transition-colors cursor-pointer"
          >
            <Compass size={14} /> Discover
          </a>
          <a 
            href="#services" 
            onClick={handleScrollToProducts}
            className="flex items-center gap-1.5 hover:text-[#DCD6F7] transition-colors cursor-pointer"
          >
            <Briefcase size={14} /> Services
          </a>
          <a 
            href="#about" 
            onClick={(e) => {
              e.preventDefault();
              alert("DivzzCorp v1.0.0 - Ekosistem Digital Kreatif Minimalis.");
            }}
            className="flex items-center gap-1.5 hover:text-[#DCD6F7] transition-colors cursor-pointer"
          >
            <Info size={14} /> About
          </a>
        </div>

        {/* Aksi Samping */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => alert("Fitur keanggotaan premium eksklusif sedang disiapkan!")}
            className="bg-gradient-to-r from-[#DCD6F7] to-[#E3F6F5] text-[#12141C] text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-all cursor-pointer"
          >
            Join Member
          </button>
        </div>

      </div>
    </nav>
  );
}