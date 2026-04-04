"use client";

import { useState } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface UploadWidgetProps {
  onUpload: (url: string) => void;
  folder?: string;
  defaultImage?: string;
  label?: string;
}

export default function UploadWidget({ onUpload, folder = 'equipment', defaultImage, label = "Şəkil Yüklə" }: UploadWidgetProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: add validation (size, type)
    if (file.size > 10 * 1024 * 1024) {
      setError("Fayl ölçüsü 10MB-dan çox ola bilməz.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Yüklənmə xətası');
      }

      const data = await res.json();
      setPreview(data.secure_url);
      onUpload(data.secure_url);
    } catch (err) {
      setError("Şəkil yüklənərkən xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUpload('');
  };

  return (
    <div className="w-full">
      <label className="block text-white/70 text-xs font-bold mb-2 uppercase tracking-widest">{label}</label>
      
      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

      {preview ? (
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 group">
          <Image src={preview} alt="Preview" fill className="object-cover opacity-80" />
          <button 
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {loading ? (
              <Loader2 className="w-8 h-8 text-[#f59e0b] animate-spin mb-2" />
            ) : (
              <UploadCloud className="w-8 h-8 text-white/50 mb-2" />
            )}
            <p className="text-xs text-white/50 font-bold uppercase tracking-widest">
              {loading ? 'Yüklənir...' : 'Bura klikləyin və ya faylı sürüşdürün'}
            </p>
          </div>
          <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} disabled={loading} />
        </label>
      )}
    </div>
  );
}