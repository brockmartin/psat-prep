import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getQuiz, getWeek } from "@/lib/content";
import { QuizPageWrapper } from "@/components/quiz/quiz-page-wrapper";

interface WeekQuizPageProps {
  params: Promise<{ weekNumber: string }>;
}

export async function generateMetadata({ params }: WeekQuizPageProps) {
  const { weekNumber } = await params;
  const num = parseInt(weekNumber, 10);
  if (isNaN(num)) return { title: "Quiz Not Found" };
  return { title: `Week ${num} Quiz` };
}

export default async function WeekQuizPage({ params }: WeekQuizPageProps) {
  const { weekNumber: weekNumberParam } = await params;
  const weekNumber = parseInt(weekNumberParam, 10);

  if (isNaN(weekNumber)) {
    notFound();
  }

  const week = getWeek(weekNumber);
  if (!week) {
    notFound();
  }

  const questions = getQuiz(weekNumber);
  if (questions.length === 0) {
    notFound();
  }

  const title = `Week ${weekNumber} Quiz`;

  return (
    <div className="space-y-6">
      <Link
        href={`/week/${weekNumber}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Week {weekNumber}
      </Link>

      <QuizPageWrapper
        questions={questions}
        title={title}
        quizId={`week_${weekNumber}_quiz`}
        backHref={`/week/${weekNumber}`}
        showExplanationImmediately={true}
        allowReview={true}
      />
    </div>
  );
}
