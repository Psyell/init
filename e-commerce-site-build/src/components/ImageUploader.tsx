import { useState, useRef } from 'react';
import { cn } from '@/utils/cn';

interface ImageUploaderProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  className?: string;
}

export function ImageUploader({ 
  currentImage, 
  onImageChange, 
  aspectRatio = 'portrait',
  className 
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [urlInput, setUrlInput] = useState(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/9]'
  };

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onImageChange(base64);
        setIsEditing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUrlSubmit = () => {
    if (urlInput) {
      setPreview(urlInput);
      onImageChange(urlInput);
      setIsEditing(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    setUrlInput('');
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Current Image or Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative border-2 border-dashed rounded-lg overflow-hidden transition-colors",
          aspectClasses[aspectRatio],
          isDragging 
            ? "border-white bg-white/10" 
            : preview 
              ? "border-transparent" 
              : "border-white/20 hover:border-white/40",
          "group cursor-pointer"
        )}
        onClick={() => !preview && fileInputRef.current?.click()}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="p-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
                title="ویرایش"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                title="آپلود جدید"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                title="حذف"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <svg className="w-12 h-12 text-white/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-white/50 text-sm text-center mb-2">
              تصویر را اینجا رها کنید
            </p>
            <p className="text-white/30 text-xs text-center">
              یا کلیک کنید برای انتخاب
            </p>
          </div>
        )}
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
        className="hidden"
      />

      {/* URL Input Toggle */}
      {!preview && (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="mt-3 text-white/50 text-xs hover:text-white transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          یا از لینک تصویر استفاده کنید
        </button>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setIsEditing(false)} />
          
          <div className="relative bg-zinc-900 border border-white/10 rounded-lg w-full max-w-md p-6">
            <h3 className="text-white text-lg mb-4">ویرایش تصویر</h3>
            
            {/* URL Input */}
            <div className="mb-4">
              <label className="block text-white/60 text-xs mb-2">لینک تصویر</label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://..."
                className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                dir="ltr"
              />
            </div>

            {/* Preview */}
            {urlInput && (
              <div className="mb-4">
                <label className="block text-white/60 text-xs mb-2">پیش‌نمایش</label>
                <img
                  src={urlInput}
                  alt="Preview"
                  className="w-full aspect-video object-cover rounded bg-zinc-800"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">❌</text></svg>';
                  }}
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 border border-white/20 text-white py-2 text-sm rounded hover:border-white/40 transition-colors"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="flex-1 bg-white text-black py-2 text-sm rounded hover:bg-gray-100 transition-colors"
              >
                ذخیره
              </button>
            </div>

            {/* Or Upload */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  fileInputRef.current?.click();
                }}
                className="w-full flex items-center justify-center gap-2 text-white/60 text-sm hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                آپلود از دستگاه
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
