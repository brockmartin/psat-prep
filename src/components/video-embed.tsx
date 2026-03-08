"use client"

interface VideoEmbedProps {
  videoId: string
  title: string
}

export function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
