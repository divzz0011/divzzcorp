"use client";

import { useState, useEffect } from "react";
import { LayoutGrid, Filter, ShieldCheck, Zap, Award, Sparkles, Send, Globe, Mail, MessageSquare, HelpCircle, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal mengambil data database:", error.message);
      } else if (data) {
        setProducts(data);
      }
    };

    fetchProducts();

    const channel = supabase
      .channel("realtime-products")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => {
        fetchProducts();
      })
      .subscribe();

    return () => {
      clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredProducts = selectedCategory === "ALL" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // KARTUN PASTEL LOADING PRELOADER
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFDF6] flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16 animate-bounce">
          <div className="absolute inset-0 border-4 border-black bg-[#FFD1DC] rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-xl font-black tracking-tight text-black uppercase">DivzzCorp</h2>
          <p className="text-xs font-bold text-black/60 tracking-wider uppercase">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-black font-sans antialiased flex flex-col selection:bg-[#FFD1DC]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full space-y-24">
        
        {/* 1. HERO SECTION & STATISTIK (Cartoon Pop Style) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center border-b-4 border-black pb-16">
          <div className="lg:col-span-2 space-y-6">
            <span className="text-xs font-black tracking-wider text-black uppercase bg-[#BFFCC6] border-2 border-black px-4 py-1.5 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              ✨ Creative Media Digital Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black leading-tight">
              Eksplorasi Kreativitas <br />
              <span className="bg-[#FFD1DC] border-2 border-black px-2 inline-block rounded-xl transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Tanpa Batas Digital.</span>
            </h1>
            <p className="text-black/80 max-w-xl text-sm md:text-base font-bold leading-relaxed">
              Platform modern penyedia solusi digital seperti web developer, fotografi, dan guide.
            </p>
          </div>
          
          {/* Box Angka Statistik Ala Kartun */}
          <div className="grid grid-cols-2 gap-4 bg-[#FFC6FF] p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-3xl font-black text-black">12K+</h3>
              <p className="text-[10px] text-black/70 font-black uppercase tracking-wider">Assets Get</p>
            </div>
            <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-3xl font-black text-black">99%</h3>
              <p className="text-[10px] text-black/70 font-black uppercase tracking-wider">Happy Fans</p>
            </div>
            <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-3xl font-black text-black">45+</h3>
              <p className="text-[10px] text-black/70 font-black uppercase tracking-wider">Guides</p>
            </div>
            <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-3xl font-black text-black">24h</h3>
              <p className="text-[10px] text-black/70 font-black uppercase tracking-wider">Delivery</p>
            </div>
          </div>
        </section>

        {/* 2. WHY CHOOSE US SECTION */}
        <section className="space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-black text-[#FF9EE2] uppercase tracking-widest flex items-center gap-1">
              <Sparkles size={14} /> Our Powers
            </span>
            <h2 className="text-3xl font-black tracking-tight text-black">Kenapa Memilih DivzzCorp?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#CAFFBF] border-4 border-black rounded-3xl p-6 space-y-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"><Zap size={24} fill="#FFD1DC" /></div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-black">Akses Super Instan</h3>
                <p className="text-xs text-black/80 font-medium leading-relaxed">Semua produk digital dan modul manajemen dapat diunduh langsung secepat kilat kartun!</p>
              </div>
            </div>

            <div className="bg-[#9BF6FF] border-4 border-black rounded-3xl p-6 space-y-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"><Award size={24} fill="#FFC6FF" /></div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-black">Kualitas Bintang Lima</h3>
                <p className="text-xs text-black/80 font-medium leading-relaxed">Dikembangkan secara profesional agar relevan dan langsung mantap diaplikasikan ke bisnis nyata.</p>
              </div>
            </div>

            <div className="bg-[#FFD1DC] border-4 border-black rounded-3xl p-6 space-y-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"><ShieldCheck size={24} fill="#CAFFBF" /></div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-black">100% Aman & Damai</h3>
                <p className="text-xs text-black/80 font-medium leading-relaxed">Sistem pesanan aman terintegrasi langsung ke WhatsApp bikin hatimu tenang berkendara digital.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PRODUCT CATALOGUE SECTION (Kartun Filter) */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-black text-black/60 uppercase tracking-widest flex items-center gap-1">
                <LayoutGrid size={14} /> Curated Booth
              </span>
              <h2 className="text-3xl font-black tracking-tight text-black">Pasar Produk Premium</h2>
            </div>
            
            {/* Filter Tab Berbentuk Tombol Kartun */}
            <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-fit">
              {["ALL", "TOURISM", "DESIGN", "BUSINESS"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#FFD1DC] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black"
                      : "text-black/60 hover:text-black hover:bg-[#FFFDF6]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Katalog */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                category={product.category}
                description={product.description}
                price={product.price}
              />
            ))}
          </div>
        </section>

        {/* 4. CLIENT TESTIMONIALS SECTION */}
        <section className="space-y-8">
          <div className="space-y-1 text-center">
            <span className="text-xs font-black text-[#BFFCC6] uppercase tracking-widest flex items-center justify-center gap-1">
              <MessageSquare size={14} /> Kartun Diary
            </span>
            <h2 className="text-3xl font-black tracking-tight text-black">Apa Kata Sahabat DivzzCorp?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Aris Setiawan", role: "Web Builder", bg: "#FFC6FF", text: "Website yang di buat oleh DivzzCorp memiliki desain yang futuristik dan fungsional." },
              { name: "Rania Putri", role: "Content Creator", bg: "#E8AEFF", text: "Branding kit miliknya punya estetika pastel yang ceria banget. Cocok buat menyasar audiens kekinian di media sosial." },
              { name: "Deni Ramdani", role: "Tourism Owner", bg: "#BFFCC6", text: "Panduan virtual tour sejarahnya sangat interaktif, menyajikan petualangan edukasi era modern yang seru abis!" }
            ].map((t, idx) => (
              <div key={idx} style={{ backgroundColor: t.bg }} className="border-4 border-black rounded-3xl p-6 space-y-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-xs font-bold text-black/90 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-2 pt-3 border-t-2 border-black/20">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center text-xs font-black text-black">{t.name[0]}</div>
                  <div>
                    <h4 className="text-xs font-black text-black">{t.name}</h4>
                    <p className="text-[10px] font-bold text-black/60">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. FAQ SECTION (Accordion) */}
        <section className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-1 text-center">
            <span className="text-xs font-black text-black/60 uppercase tracking-widest flex items-center justify-center gap-1">
              <HelpCircle size={14} /> Bubble Help
            </span>
            <h2 className="text-3xl font-black tracking-tight text-black">Sering Ditanyakan</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Bagaimana cara menerima file produk setelah memesan?", a: "Begitu klik tombol order via WhatsApp, kurir kartun kami akan langsung memvalidasi pesanan Anda secara instan dan mengirim tautan cloud premium aman!" },
              { q: "Apakah produk digital ini aman untuk komersil?", a: "Tentu saja aman! Semua lisensi produk di DivzzCorp mendukung penuh Commercial Use untuk proyek agensi maupun bisnis pribadimu." },
              { q: "Apakah ada pembaruan berkala untuk produk?", a: "Ada banget! Jika admin melakukan pembaruan materi atau desain teranyar, kamu akan mendapatkan notifikasi link file versi terbarunya secara gratis." }
            ].map((f, idx) => (
              <div key={idx} className="bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-xs font-black text-black focus:outline-none cursor-pointer hover:bg-[#FFFDF6]"
                >
                  <span>{f.q}</span>
                  <ChevronDown size={16} className={`text-black transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-[#FF9EE2]" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-40 border-t-2 border-black p-5 bg-[#CAFFBF]/30" : "max-h-0"}`}>
                  <p className="text-xs font-bold text-black/80 leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 6. FOOTER SECTION */}
      <footer className="w-full bg-[#9BF6FF] border-t-4 border-black mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-2xl font-black tracking-tight text-black">
              Divzz<span className="bg-white border-2 border-black px-1.5 py-0.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ml-1">Corp</span>
            </h3>
            <p className="text-xs font-bold text-black/80 max-w-sm leading-relaxed">
              Ekosistem platform digital pastel penyedia aset kreatif imut dan solusi bisnis modern terintegrasi berkekuatan cloud!
            </p>
            <div className="flex items-center gap-3 text-black">
              <a href="#" className="w-8 h-8 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px]"><Globe size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px]"><Mail size={16} /></a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-black">Kompas Navigasi</h4>
            <ul className="space-y-2 text-xs font-bold text-black/70">
              <li><a href="#" className="hover:text-black hover:underline">Beranda Utama</a></li>
              <li><a href="#" className="hover:text-black hover:underline">Katalog Produk</a></li>
              <li><a href="#" className="hover:text-black hover:underline">Klub Admin</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-black">Surat Rahasia</h4>
            <p className="text-[11px] font-bold text-black/70">Langganan info rilis item terbaru di kotak masukmu.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email imutmu..." className="w-full bg-white border-2 border-black rounded-xl px-3 py-1.5 text-xs font-bold text-black focus:outline-none" />
              <button className="bg-white border-2 border-black text-black px-3 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] transition-all"><Send size={12} /></button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6 border-t-2 border-black/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-black/60">
          <p>© {new Date().getFullYear()} DivzzCorp. Cloud Connected and Colorful.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}