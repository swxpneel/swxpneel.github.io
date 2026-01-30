import React from 'react';
import { Music } from 'lucide-react';
import { nowPlaying } from '../data/profile';

const NowPlaying = () => {
  return (
    <div className="glass-card p-3 flex items-center gap-3">
      <div className="relative">
        <img
          src={nowPlaying.albumArt}
          alt={nowPlaying.album}
          className="w-10 h-10 rounded-lg object-cover"
        />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
          <Music className="w-2 h-2 text-white" />
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">Now Playing</p>
        <p className="text-sm font-medium text-foreground truncate">{nowPlaying.track}</p>
        <p className="text-xs text-muted-foreground truncate">{nowPlaying.artist}</p>
      </div>
    </div>
  );
};

export default NowPlaying;
