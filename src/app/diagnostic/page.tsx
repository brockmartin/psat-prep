import type { Metadata } from "next";
import { getDiagnostic } from "@/lib/content";
import { DiagnosticWrapper } from "@/components/diagnostic-wrapper";

export const metadata: Metadata = {
  title: "Diagnostic Test",
};

export default function DiagnosticPage() {
  const diagnostic = getDiagnostic();

  return <DiagnosticWrapper questions={diagnostic.questions} />;
}
