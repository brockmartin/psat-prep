"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Bell, BookOpen, Flame, Lightbulb, FileText, Trophy, Info } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  type AppNotification,
  type NotificationType,
} from "@/lib/notifications"
import { cn } from "@/lib/utils"

const POLL_INTERVAL_MS = 60_000 // 60 seconds

const TYPE_ICONS: Record<NotificationType, typeof Bell> = {
  streak: Flame,
  review_due: BookOpen,
  ai_insight: Lightbulb,
  weekly_report: FileText,
  milestone: Trophy,
  general: Info,
}

function formatTimeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffSeconds = Math.floor((now - then) / 1000)

  if (diffSeconds < 60) return "just now"
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`
  if (diffSeconds < 604800) return `${Math.floor(diffSeconds / 86400)}d ago`
  return new Date(dateStr).toLocaleDateString()
}

export function NotificationBell() {
  const { user } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const loadNotifications = useCallback(async () => {
    if (!user) return
    try {
      const all = await getNotifications(user.id)
      setNotifications(all.slice(0, 10))
      setUnreadCount(all.filter((n) => !n.read).length)
    } catch {
      // Silently ignore
    }
  }, [user])

  // Initial load
  useEffect(() => {
    loadNotifications()
  }, [loadNotifications])

  // Poll every 60 seconds
  useEffect(() => {
    if (!user) return

    intervalRef.current = setInterval(loadNotifications, POLL_INTERVAL_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [user, loadNotifications])

  async function handleNotificationClick(notification: AppNotification) {
    if (!notification.read) {
      await markAsRead(notification.id)
      setNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
    }

    if (notification.actionUrl) {
      router.push(notification.actionUrl)
    }
  }

  async function handleMarkAllRead() {
    if (!user) return
    await markAllAsRead(user.id)
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-1.5 py-1">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-xs text-primary hover:underline px-1.5"
            >
              Mark all as read
            </button>
          )}
        </div>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">
            No notifications yet.
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon = TYPE_ICONS[notification.type] ?? Bell
            return (
              <DropdownMenuItem
                key={notification.id}
                className="flex items-start gap-3 px-3 py-2.5 cursor-pointer"
                onClick={() => handleNotificationClick(notification)}
              >
                <div
                  className={cn(
                    "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                    notification.read
                      ? "bg-muted"
                      : "bg-primary/10",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4",
                      notification.read
                        ? "text-muted-foreground"
                        : "text-primary",
                    )}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-sm leading-tight",
                      !notification.read && "font-semibold",
                    )}
                  >
                    {notification.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground/70">
                    {formatTimeAgo(notification.createdAt)}
                  </p>
                </div>
                {!notification.read && (
                  <div className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                )}
              </DropdownMenuItem>
            )
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
