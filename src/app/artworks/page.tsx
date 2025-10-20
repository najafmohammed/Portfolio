'use client';

import ArtworkGrid from '@/components/ui/ArtworkGrid';

export default function ArtworksPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="container mx-auto px-6">

        <div className="mb-2">
          <ArtworkGrid />
        </div>
      </div>
    </div>
  );
}