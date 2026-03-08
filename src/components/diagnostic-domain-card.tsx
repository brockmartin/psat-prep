"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DiagnosticDomainCardProps {
  domainName: string;
  score: number;
  total: number;
  recommendation: string;
}

function getScoreTier(score: number): {
  label: string;
  bgClass: string;
  borderClass: string;
  badgeClass: string;
} {
  if (score <= 1) {
    return {
      label: "Needs Work",
      bgClass: "bg-red-500/10 dark:bg-red-500/15",
      borderClass: "border-red-500/30",
      badgeClass:
        "bg-red-500/20 text-red-700 dark:text-red-400 hover:bg-red-500/20",
    };
  }
  if (score <= 3) {
    return {
      label: "Getting There",
      bgClass: "bg-amber-500/10 dark:bg-amber-500/15",
      borderClass: "border-amber-500/30",
      badgeClass:
        "bg-amber-500/20 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20",
    };
  }
  return {
    label: "Strong",
    bgClass: "bg-green-500/10 dark:bg-green-500/15",
    borderClass: "border-green-500/30",
    badgeClass:
      "bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500/20",
  };
}

export function DiagnosticDomainCard({
  domainName,
  score,
  total,
  recommendation,
}: DiagnosticDomainCardProps) {
  const tier = getScoreTier(score);

  return (
    <Card className={cn("overflow-hidden", tier.borderClass)}>
      <CardContent className={cn("space-y-3 pt-4", tier.bgClass)}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">{domainName}</h3>
          <Badge className={tier.badgeClass}>{tier.label}</Badge>
        </div>
        <p className="text-3xl font-bold tabular-nums">
          {score}{" "}
          <span className="text-base font-normal text-muted-foreground">
            / {total}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">{recommendation}</p>
      </CardContent>
    </Card>
  );
}
