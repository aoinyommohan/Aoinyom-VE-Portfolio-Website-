import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Film, Smartphone, Settings, Maximize, Minimize } from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Project {
  id: number;
  title: string;
  category: 'short' | 'long';
  videoSrc: string;
  description: string;
}

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[1]) ? match[1] : null;
};

interface VideoPlayerProps {
  videoId: string;
  title: string;
  isActive: boolean;
  onPlay: () => void;
  category: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, title, isActive, onPlay, category }) => {
  const [imgError, setImgError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [quality, setQuality] = useState('auto');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const playerRef = useRef<any>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null); // New wrapper ref
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const isShort = category === 'short';
  const aspectRatio = isShort ? 'aspect-[9/16]' : 'aspect-video';

  // Load API once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Initialize Custom Player
  const initPlayer = useCallback(() => {
    if (playerRef.current || !window.YT || !playerWrapperRef.current) return;

    // Create a dedicated div for YT to replace, ensuring React doesn't lose track of the parent
    const placeholder = document.createElement('div');
    placeholder.id = `player-${videoId}`;
    playerWrapperRef.current.appendChild(placeholder);

    playerRef.current = new window.YT.Player(placeholder.id, {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        iv_load_policy: 3,
        showinfo: 0,
        disablekb: 1,
        fs: 0,
        cc_load_policy: 0,   // disable captions
        cc_lang_pref: 'en',  // suppress auto-caption language
        hl: 'en',            // UI language
        hd: 1,               // prefer HD
      },
      events: {
        onReady: (event: any) => {
          setDuration(event.target.getDuration());
          // Force highest quality
          event.target.setPlaybackQuality('hd1080');
          if (event.target.setPlaybackQualityRange) {
            event.target.setPlaybackQualityRange('hd720', 'hd1080');
          }
          // Ensure captions are off
          event.target.unloadModule('captions');
          event.target.playVideo();
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setVideoLoaded(true);
            setIsPlaying(true);
            startProgressLoop();
            // Re-enforce quality each time playback starts (YouTube can downgrade)
            event.target.setPlaybackQuality('hd1080');
          } else {
            setIsPlaying(false);
            stopProgressLoop();
          }
        }
      }
    });
  }, [videoId]);

  // Clean up
  useEffect(() => {
    if (!isActive) {
      // Destroy player when not active to save resources
      // playerRef.current.destroy(); // REMOVED: Causes React NodeError crash
      if (playerRef.current) {
        playerRef.current = null;
      }
      setIsPlaying(false);
      setVideoLoaded(false);
    }
  }, [isActive]);

  // Check for API ready
  useEffect(() => {
    if (isActive && !playerRef.current) {
      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        window.onYouTubeIframeAPIReady = () => {
          initPlayer();
        };
      }
    }
  }, [isActive, initPlayer]);

  const startProgressLoop = () => {
    stopProgressLoop();
    progressInterval.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 500);
  };

  const stopProgressLoop = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
  };

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [isPlaying]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  }, [isMuted]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
    }
  };

  const toggleFullscreen = useCallback(async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
        // Push state for back button handling
        window.history.pushState({ fullscreen: true }, '');
      } catch (err) {
        console.error(err);
      }
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Handle Double Click
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFullscreen();
  };

  // Back button listener
  useEffect(() => {
    const handlePopState = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle external play (when clicking thumbnail)
  useEffect(() => {
    if (isActive) {
      setIsPlaying(true);
      setShowControls(false); // Start HIDDEN for clean look
      // No initial fade timeout needed if we start hidden
    } else {
      setIsPlaying(false);
      setVideoLoaded(false);
      setShowControls(true);
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isActive]);

  // Mouse Move Control Logic
  const handleMouseMove = useCallback(() => {
    if (!isActive) return;
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 1000); // 1s Fade
  }, [isActive, isPlaying]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) setShowControls(false);
  }, [isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full bg-black overflow-hidden rounded-2xl ${aspectRatio} group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); handleMouseLeave(); }}
      onMouseMove={handleMouseMove}
      onDoubleClick={handleDoubleClick}
    >
      {/* Thumbnail */}
      <div
        className={`absolute inset-0 w-full h-full cursor-pointer z-10 transition-opacity duration-700 ${isActive && videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onClick={onPlay}
        role="button"
      >
        <img
          src={imgError ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : thumbnailUrl}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-105`}
          onError={() => setImgError(true)}
        />
        {/* Helper text for double tap feature? Optional. */}
        {(!isActive || !videoLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-premium-orange group-hover:border-premium-orange transition-all duration-300 shadow-2xl">
              <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current ml-1" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
      </div>

      {/* Video Container for API */}
      {isActive && (
        <>
          {/* React controls this wrapper. YT manipulates DOM *inside* it, safely hidden from React. */}
          <div ref={playerWrapperRef} className="absolute inset-0 w-full h-full z-10 bg-black" />

          {/* Custom Controls */}
          {(!isShort || showControls) && (
            <div
              className={`absolute inset-0 z-30 transition-opacity duration-500 flex flex-col justify-between p-4 md:p-6 pointer-events-none ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Top Gradient */}
              <div className="h-24 bg-gradient-to-b from-black/60 to-transparent absolute top-0 left-0 right-0 pointer-events-none" />

              {/* Big Play Button Overlay */}
              <div
                className="flex-1 w-full flex items-center justify-center cursor-pointer pointer-events-auto"
                onClick={togglePlay}
              >
                {!isPlaying && (
                  <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                  </div>
                )}
              </div>

              {/* Bottom Control Bar */}
              <div className="w-full pointer-events-auto bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-col gap-2">

                {/* Scrubber (Not for shorts) */}
                {!isShort && (
                  <div className="w-full flex items-center gap-3">
                    <span className="text-xs text-white/70 font-mono min-w-[35px]">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={duration}
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-premium-orange [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                    />
                    <span className="text-xs text-white/70 font-mono min-w-[35px]">{formatTime(duration)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={togglePlay} className="text-white hover:text-premium-orange transition-colors">
                      {isPlaying ? <div className="flex gap-1"><div className="w-1.5 h-5 bg-current rounded-full" /><div className="w-1.5 h-5 bg-current rounded-full" /></div> : <Play className="w-5 h-5 fill-current" />}
                    </button>
                    <button onClick={toggleMute} className="text-white hover:text-premium-orange transition-colors">
                      {isMuted ? <Mic className="w-5 h-5 opacity-50 relative"><div className="absolute inset-0 w-[120%] h-[2px] bg-red-500 rotate-45 top-1/2 left-[-10%]" /></Mic> : <div className="text-xs font-bold border-2 border-current rounded-full w-5 h-5 flex items-center justify-center">V</div>}
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Quality Mock (Functionality limited by iframe API without quirks mode) */}
                    {!isShort && (
                      <button className="text-white/70 hover:text-white transition-colors" title="Quality: Auto">
                        <Settings className="w-5 h-5" />
                      </button>
                    )}

                    <button onClick={toggleFullscreen} className="text-white hover:text-premium-orange transition-colors">
                      {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const projects: Project[] = [
  // Short Form (5 new + 3 kept)
  { id: 1, title: "Short Edit 1", category: "short", videoSrc: "https://youtube.com/shorts/F4mPkY2xgLI", description: "Dynamic Transitions" },
  { id: 2, title: "Short Edit 2", category: "short", videoSrc: "https://youtube.com/shorts/nYVg2TMoebw", description: "Color Grading" },
  { id: 3, title: "Short Edit 3", category: "short", videoSrc: "https://youtube.com/shorts/C2mWGoS5aUg", description: "Sound Design" },
  { id: 4, title: "Short Edit 4", category: "short", videoSrc: "https://youtube.com/shorts/v-55QQCuXXc", description: "Fast Paced" },
  { id: 5, title: "Short Edit 5", category: "short", videoSrc: "https://youtube.com/shorts/uL5IDVFKuRg", description: "High Energy" },
  { id: 6, title: "Event Highlights", category: "short", videoSrc: "https://youtube.com/shorts/jdCXM72aZrM", description: "Fast Paced" },
  { id: 7, title: "Tech Review", category: "short", videoSrc: "https://youtube.com/shorts/OCZmle2T9oA", description: "Clean Cuts" },
  { id: 8, title: "Behind The Scenes", category: "short", videoSrc: "https://youtube.com/shorts/GUWDrZTvp5s", description: "Documentary Style" },

  // Long Form (4 videos from YT Studio)
  { id: 101, title: "AI Typography", category: "long", videoSrc: "https://youtu.be/m2i6PAxodTI", description: "Motion Graphics" },
  { id: 102, title: "VOX Style Documentary", category: "long", videoSrc: "https://youtu.be/_REQ7uy2hvM", description: "Documentary Edit" },
  { id: 104, title: "Portfolio Showreel", category: "long", videoSrc: "https://youtu.be/Aux5nWuktko", description: "Portfolio Compilation" },
  { id: 105, title: "Instagram Showreel", category: "long", videoSrc: "https://youtu.be/bBIPQf5DqMU", description: "Social Media" },
];

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onPlay: () => void;
  isActive: boolean;
  onPlay: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive, onPlay }) => {
  const videoId = getYoutubeId(project.videoSrc);
  if (!videoId) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 ${project.category === 'short' ? 'row-span-2' : 'row-span-1'}`}
    >
      <VideoPlayer
        videoId={videoId}
        title={project.title}
        isActive={isActive}
        onPlay={onPlay}
        category={project.category}
      />
    </motion.div>
  );
};

type FilterType = 'long' | 'short';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('short');
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  const filteredProjects = projects.filter((p) => p.category === filter);

  // Switching videos handles pause automatically via component unmount
  const handlePlay = useCallback((projectId: number) => {
    setActiveVideoId(projectId);
  }, []);

  const filterTabs: { id: FilterType; label: string; icon?: React.ReactNode }[] = [
    { id: 'short', label: 'Short Form', icon: <Smartphone size={14} /> },
    { id: 'long', label: 'Long Form', icon: <Film size={14} /> },
  ];

  return (
    <section id="work" className="py-32 bg-premium-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-hand text-premium-orange text-2xl rotate-[-2deg] block mb-2"
            >
              Selected Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold text-white font-display"
            >
              Latest <span className="text-premium-silver">Edits</span>
            </motion.h2>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white/5 p-1 rounded-full border border-white/10 flex items-center overflow-x-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setFilter(tab.id); setActiveVideoId(null); }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative whitespace-nowrap ${filter === tab.id ? 'text-black' : 'text-premium-silver hover:text-white'}`}
              >
                {filter === tab.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-white rounded-full shadow-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.icon}
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-[240px] grid-flow-row-dense">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={activeVideoId === project.id}
                onPlay={() => handlePlay(project.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Portfolio;