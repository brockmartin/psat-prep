import { notFound } from "next/navigation"
import { getPracticeTest } from "@/lib/content"
import { PracticeTestWrapper } from "@/components/practice-test-wrapper"

interface PracticeTestPageProps {
  params: Promise<{ testNumber: string }>
}

export async function generateMetadata({ params }: PracticeTestPageProps) {
  const { testNumber } = await params
  const num = Number(testNumber)
  if (isNaN(num) || num < 1 || num > 2) {
    return { title: "Practice Test Not Found" }
  }
  return {
    title: `Practice Test ${num}`,
  }
}

export default async function PracticeTestPage({
  params,
}: PracticeTestPageProps) {
  const { testNumber: testNumberStr } = await params
  const testNumber = Number(testNumberStr)

  if (isNaN(testNumber) || testNumber < 1 || testNumber > 2) {
    notFound()
  }

  const test = getPracticeTest(testNumber)
  if (!test) {
    notFound()
  }

  return (
    <PracticeTestWrapper
      testNumber={test.testNumber}
      module1Questions={test.module1}
      module2Questions={test.module2}
    />
  )
}
