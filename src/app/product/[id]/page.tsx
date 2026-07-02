"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, ShoppingCart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("skenaspace_products");
    if (saved) {
      const allProducts: Product[] = JSON.parse(saved);
      // Cari produk yang ID-nya pas dengan URL params
      const found = allProducts.find((p) => p.id === Number(params.id));
      if (found) setProduct(found);
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#12141C] text-white flex items-center justify-center">
        <p className="text-sm text-[#4A4E69] animate-pulse">Memuat detail produk estetik...</p>
      </div>
    );
  }

  const handleBeli = () => {
    const nomorWA = "6281818833633";
    const teksPesan = `Halo SkenaSpace! Saya mau beli produk premium ini:\n\n*ID:* ${product.id}\n*Produk:* ${product.title}\n*Harga:* ${product.price}\n\nMohon diproses kak!`;
    window.open(`https://api.whatsapp.com/send?phone=${nomorWA}&text=${encodeURIComponent(teksPesan)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#12141C] text-[#F9FAFB]">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Tombol Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#4A4E69] hover:text-[#DCD6F7] mb-8 transition-colors">
          <ArrowLeft size={14} /> Kembali ke Katalog Utama
        </Link>

        {/* Main Info Box */}
        <div className="bg-[#1A1D29] border border-[#4A4E69]/20 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#4A4E69]/10 pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black tracking-widest text-[#DCD6F7] bg-[#4A4E69]/30 px-3 py-1 rounded-full uppercase">
                {product.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">{product.title}</h1>
            </div>
            <div className="text-2xl font-mono font-black text-[#E3F6F5] bg-[#12141C] px-5 py-2 rounded-2xl border border-[#4A4E69]/20 self-start md:self-center">
              {product.price}
            </div>
          </div>

          {/* Deskripsi Menyeluruh */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#4A4E69]">Deskripsi Lengkap Produk</h2>
            <p className="text-sm md:text-base text-[#F9FAFB]/80 leading-relaxed bg-[#12141C]/50 p-6 rounded-2xl border border-[#4A4E69]/5">
              {product.description}
            </p>
          </div>

          {/* Jaminan Fitur Keamanan */}
          <div className="flex items-center gap-3 text-xs text-[#4A4E69] bg-[#4A4E69]/10 p-4 rounded-xl w-fit">
            <ShieldCheck size={16} className="text-[#E3F6F5]" />
            <span>Akses instan aman & bergaransi penuh lewat ekosistem enkripsi SkenaSpace.</span>
          </div>

          {/* Tombol Eksekusi */}
          <button
            onClick={handleBeli}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#DCD6F7] to-[#E3F6F5] text-[#12141C] font-black px-8 py-4 rounded-2xl text-sm shadow-lg hover:opacity-90 transition-all cursor-pointer"
          >
            <ShoppingCart size={16} />
            Amankan Produk via WhatsApp Sekarang
          </button>
        </div>
      </main>
    </div>
  );
}