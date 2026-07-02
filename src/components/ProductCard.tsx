"use client";

import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
}

export default function ProductCard({ title, category, description, price }: ProductCardProps) {
  // Fungsi otomatis untuk mengarahkan orderan ke WhatsApp admin
  const handleOrder = () => {
    const text = `Halo Admin! Pesen produk ini dong:\n\n*Nama:* ${title}\n*Kategori:* ${category}\n*Harga:* ${price}\n\nMohon info tautan aksesnya ya, terima kasih!`;
    window.open(`https://wa.me/6281818833633?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="bg-white border-4 border-black rounded-3xl p-5 flex flex-col justify-between gap-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] transition-all">
      <div className="space-y-2">
        {/* Badge Kategori Imut */}
        <span className="inline-block text-[10px] font-black tracking-wider text-black uppercase bg-[#CAFFBF] border-2 border-black px-2.5 py-0.5 rounded-md shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
          {category}
        </span>
        
        {/* Judul Produk */}
        <h3 className="text-md font-black text-black leading-tight pt-1">
          {title}
        </h3>
        
        {/* Deskripsi */}
        <p className="text-xs font-bold text-black/70 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Bagian Bawah: Harga & Tombol */}
      <div className="flex items-center justify-between pt-3 border-t-2 border-black/10 mt-2">
        <span className="text-sm font-black text-black bg-[#9BF6FF] border-2 border-black px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          {price}
        </span>
        
        <button 
          onClick={handleOrder}
          className="flex items-center gap-1.5 bg-[#FFD1DC] border-2 border-black text-black font-black text-xs px-3 py-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFC6FF] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
        >
          <ShoppingBag size={12} />
          Beli
        </button>
      </div>
    </div>
  );
}