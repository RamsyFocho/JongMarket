"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

export default function AnimatedVideo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const controls = useAnimation()

  // YouTube embed URL
  const youtubeEmbedUrl = "https://www.youtube-nocookie.com/embed/MH5dXk3Kjb0?enablejsapi=1&playlist=MH5dXk3Kjb0&loop=1&rel=0&origin=http://localhost:3000"
  const posterSrc = "/images/video-poster.png"

  // YouTube Player API reference
  const [player, setPlayer] = useState<any>(null)

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    // Create YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (!iframeRef.current) return
      
      const newPlayer = new window.YT.Player(iframeRef.current, {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      })
      
      setPlayer(newPlayer)
    }

    return () => {
      // Clean up
      window.onYouTubeIframeAPIReady = null
      if (player && player.destroy) {
        player.destroy()
      }
    }
  }, [])

  // Handle player ready
  const onPlayerReady = (event: any) => {
    // Player is ready
    if (isMuted) {
      event.target.mute()
    } else {
      event.target.unMute()
    }
    
    // If in view, maybe start playing
    if (isInView && !isPlaying) {
      event.target.playVideo()
      setIsPlaying(true)
    }
  }

  // Handle player state changes
  const onPlayerStateChange = (event: any) => {
    // Update playing state based on YouTube state
    // YT.PlayerState.PLAYING = 1
    // YT.PlayerState.PAUSED = 2
    // YT.PlayerState.ENDED = 0
    if (event.data === 1) {
      setIsPlaying(true)
    } else if (event.data === 2) {
      setIsPlaying(false)
    } else if (event.data === 0) {
      setIsPlaying(false)
    }
    
    // Update progress if playing
    if (event.data === 1) {
      updateProgressInterval()
    }
  }

  // Update progress bar
  const updateProgressInterval = () => {
    if (!player) return

    const progressInterval = setInterval(() => {
      if (player && player.getCurrentTime && player.getDuration) {
        try {
          const currentTime = player.getCurrentTime()
          const duration = player.getDuration()
          const currentProgress = (currentTime / duration) * 100
          setProgress(currentProgress)
          
          // Clear interval when video ends or is paused
          if (player.getPlayerState() !== 1) {
            clearInterval(progressInterval)
          }
        } catch (error) {
          console.error("Error updating progress:", error)
          clearInterval(progressInterval)
        }
      }
    }, 1000)

    return () => clearInterval(progressInterval)
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")

      // Auto-play when in view if we have a player
      if (player && player.playVideo && !isPlaying) {
        try {
          player.playVideo()
        } catch (error) {
          console.log("Auto-play was prevented:", error)
        }
      }
    }
  }, [isInView, controls, isPlaying, player])

  const togglePlay = () => {
    if (!player) return

    if (isPlaying) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
  }

  const toggleMute = () => {
    if (!player) return

    if (isMuted) {
      player.unMute()
      setIsMuted(false)
    } else {
      player.mute()
      setIsMuted(true)
    }
  }

  const handleProgressChange = (value: number[]) => {
    if (!player || !player.getDuration) return

    try {
      const duration = player.getDuration()
      const newTime = (value[0] / 100) * duration
      player.seekTo(newTime, true)
      setProgress(value[0])
    } catch (error) {
      console.error("Error seeking video:", error)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            Experience Premium Quality
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            Immerse yourself in the world of exceptional drinks and discover the craftsmanship behind our premium
            selections.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl"
        >
          {/* YouTube Video */}
          <div className="aspect-video bg-black relative">
            <div className="w-full h-full">
              <iframe
                ref={iframeRef}
                className="w-full h-full"
                src={youtubeEmbedUrl}
                title="The Art of Crafting Premium Spirits"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Play/Pause Overlay */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity",
                isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100",
              )}
              onClick={togglePlay}
            >
              <Button
                size="icon"
                className="h-16 w-16 rounded-full bg-amber-600/90 hover:bg-amber-600 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  togglePlay()
                }}
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <div className="flex-1">
                  <Slider
                    value={[progress]}
                    min={0}
                    max={100}
                    step={0.1}
                    onValueChange={handleProgressChange}
                    className="cursor-pointer"
                  />
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Video Caption */}
          <div className="bg-amber-900 p-4 text-center">
            <h3 className="font-medium">The Art of Crafting Premium Spirits</h3>
            <p className="text-sm text-amber-200">Discover the passion and expertise behind every bottle</p>
          </div>
        </motion.div>

        {/* Video Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-amber-600 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Curated Selection</h3>
            <p className="text-gray-300">Handpicked by our experts for exceptional quality and taste</p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-amber-600 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Timely Delivery</h3>
            <p className="text-gray-300">Fast and reliable shipping to ensure freshness and quality</p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-amber-600 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
            <p className="text-gray-300">We stand behind every product with our satisfaction guarantee</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}