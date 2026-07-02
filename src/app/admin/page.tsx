"use client";

import { useState, useEffect } from "react";
import { Database, ArrowLeft, Trash2, Edit3, PlusCircle } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // State Form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("TOURISM");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

  async function fetchProducts() {
    const { data } = await supabase.from("products").select("*").order("id", { ascending: false });
    if (data) setProducts(data);
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "adminskena123") setIsAuthenticated(true);
    else alert("Password salah!");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const { error } = await supabase
        .from("products")
        .update({ title, category, description, price })
        .eq("id", editingId);
      
      if (error) alert("Gagal update: " + error.message);
      setEditingId(null);
    } else {
      const { error } = await supabase
        .from("products")
        .insert([{ title, category, description, price }]);
      
      if (error) alert("Gagal simpan: " + error.message);
    }
    
    // Reset form & Refresh data
    setTitle(""); setDescription(""); setPrice(""); setCategory("TOURISM");
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      await supabase.from("products").delete().eq("id", id);
      fetchProducts();
    }
  };

  const startEdit = (p: any) => {
    setEditingId(p.id);
    setTitle(p.title);
    setCategory(p.category);
    setDescription(p.description);
    setPrice(p.price);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFFDF6] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-[#FFD1DC] border-4 border-black rounded-3xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full max-w-sm">
          <h1 className="text-xl font-black mb-4 uppercase">Login Admin</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-2 border-black p-2 rounded-xl mb-4 font-bold" placeholder="Password..." />
          <button className="w-full bg-[#9BF6FF] border-2 border-black font-black py-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Masuk</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF6] p-6 text-black">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-black bg-white border-2 border-black px-4 py-1 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm">← Web</Link>
          <h1 className="font-black text-lg uppercase">Panel Kontrol Cloud</h1>
        </div>

        <div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="font-black mb-4 flex items-center gap-2"><Database size={18}/> {editingId ? "Edit Data" : "Tambah Produk"}</h2>
          <form onSubmit={handleSave} className="space-y-3">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul Produk" className="w-full border-2 border-black p-2 rounded-xl font-bold" required />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border-2 border-black p-2 rounded-xl font-bold">
              <option value="TOURISM">TOURISM</option>
              <option value="DESIGN">DESIGN</option>
              <option value="BUSINESS">BUSINESS</option>
            </select>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Deskripsi" className="w-full border-2 border-black p-2 rounded-xl font-bold" required />
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Harga (Contoh: Rp 50.000)" className="w-full border-2 border-black p-2 rounded-xl font-bold" required />
            <button className="w-full bg-[#CAFFBF] border-2 border-black font-black py-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2">
              <PlusCircle size={16}/> {editingId ? "Update Produk" : "Simpan ke Cloud"}
            </button>
            {editingId && <button type="button" onClick={() => {setEditingId(null); setTitle("");}} className="w-full font-bold underline text-xs">Batal Edit</button>}
          </form>
        </div>

        <div className="space-y-3">
          <h2 className="font-black">Produk Tersimpan</h2>
          {products.map((p) => (
            <div key={p.id} className="bg-white border-2 border-black p-4 rounded-2xl flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <p className="font-black">{p.title}</p>
                <p className="text-[10px] font-bold uppercase text-black/60">{p.category} • {p.price}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(p)} className="p-2 bg-[#FFD1DC] border-2 border-black rounded-lg"><Edit3 size={16} /></button>
                <button onClick={() => handleDelete(p.id)} className="p-2 bg-[#FF9B9B] border-2 border-black rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}