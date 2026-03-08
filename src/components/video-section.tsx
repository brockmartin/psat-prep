"use client"

import { useState } from "react"
import { ChevronDown, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VideoEmbed } from "@/components/video-embed"
import type { VideoResource } from "@/data/video-library"

interface VideoSectionProps {
  videos: VideoResource[]
}

export function VideoSection({ videos }: VideoSectionProps) {
  const [open, setOpen] = useState(false)

  if (videos.length === 0) return null

  // Show at most 2 videos
  const displayVideos = videos.slice(0, 2)

  return (
    <Card className="border-blue-500/30 bg-blue-500/5 dark:bg-blue-500/10">
      <Button
        variant="ghost"
        className="w-full justify-between px-4 py-3"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex items-center gap-2">
          <PlayCircle className="size-5 text-blue-500" />
          <span className="font-medium">Watch a video on this topic</span>
        </span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </Button>
      <div
        className={`grid transition-all duration-200 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <CardContent className="space-y-4 pb-4 pt-0">
            {displayVideos.map((video) => (
              <div key={video.videoId} className="space-y-1">
                <p className="text-sm font-medium">{video.title}</p>
                <p className="text-xs text-muted-foreground">
                  {video.channel} &middot; {video.durationMinutes} min
                </p>
                <VideoEmbed videoId={video.videoId} title={video.title} />
              </div>
            ))}
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
