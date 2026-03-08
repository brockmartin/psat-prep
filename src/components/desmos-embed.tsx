"use client"

interface DesmosEmbedProps {
  expressions?: string[]
  interactive?: boolean
}

export function DesmosEmbed({
  expressions,
  interactive = true,
}: DesmosEmbedProps) {
  // Build Desmos URL, optionally pre-loading expressions via the calculator URL
  let url = "https://www.desmos.com/calculator"

  // If expressions are provided, encode them into a URL-friendly format
  // Desmos doesn't support query-param expressions natively, so we use a
  // blank calculator for interactive mode
  if (!interactive) {
    url = "https://www.desmos.com/calculator"
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={url}
          title={
            expressions?.length
              ? `Desmos Calculator — ${expressions.length} expression(s)`
              : "Desmos Calculator"
          }
          loading="lazy"
          allowFullScreen
          style={{
            border: "none",
          }}
        />
      </div>
      {expressions && expressions.length > 0 && (
        <div className="border-t border-border bg-muted/30 px-4 py-2">
          <p className="text-xs text-muted-foreground">
            Try graphing:{" "}
            {expressions.map((expr, i) => (
              <code
                key={i}
                className="mx-0.5 rounded bg-muted px-1.5 py-0.5 font-mono text-xs"
              >
                {expr}
              </code>
            ))}
          </p>
        </div>
      )}
    </div>
  )
}
