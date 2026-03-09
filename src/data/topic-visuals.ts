export interface TopicVisualConfig {
  slug: string
  visuals: VisualItem[]
}

export interface VisualItem {
  type:
    | "equation-animator"
    | "number-line"
    | "coordinate-plane"
    | "geometry-diagram"
    | "color-coded-steps"
  title: string
  props: Record<string, unknown>
}

export const topicVisuals: TopicVisualConfig[] = [
  // ── Week 1 ──────────────────────────────────────────────────────────────
  {
    slug: "fractions-decimals-percentages",
    visuals: [
      {
        type: "number-line",
        title: "Fractions and decimals on a number line",
        props: {
          min: 0,
          max: 4,
          points: [
            { value: 0, label: "0" },
            { value: 1, label: "1/4 = 0.25" },
            { value: 2, label: "1/2 = 0.5" },
            { value: 3, label: "3/4 = 0.75" },
            { value: 4, label: "1" },
          ],
        },
      },
      {
        type: "color-coded-steps",
        title: "Adding fractions: 1/3 + 1/4",
        props: {
          steps: [
            {
              expression: "1/3 + 1/4",
              operation: "Find a common denominator (LCD = 12)",
              color: "text-blue-500",
            },
            {
              expression: "4/12 + 3/12",
              operation: "Rewrite each fraction with denominator 12",
              color: "text-violet-500",
            },
            {
              expression: "7/12",
              operation: "Add the numerators",
              color: "text-emerald-500",
            },
          ],
        },
      },
    ],
  },
  {
    slug: "ratios-and-proportions",
    visuals: [
      {
        type: "color-coded-steps",
        title: "Solving a proportion with cross multiplication",
        props: {
          steps: [
            {
              expression: "3/5 = x/20",
              operation: "Set up the proportion",
              color: "text-blue-500",
            },
            {
              expression: "3 × 20 = 5 × x",
              operation: "Cross multiply",
              color: "text-violet-500",
            },
            {
              expression: "60 = 5x",
              operation: "Simplify each side",
              color: "text-amber-500",
            },
            {
              expression: "x = 12",
              operation: "Divide both sides by 5",
              color: "text-emerald-500",
            },
          ],
        },
      },
      {
        type: "number-line",
        title: "Ratio 3:5 scaled to a total of 40",
        props: {
          min: 0,
          max: 40,
          points: [
            { value: 0, label: "0" },
            { value: 15, label: "15 (3 parts)", color: "oklch(0.65 0.2 260)" },
            { value: 25, label: "25 (5 parts)", color: "oklch(0.65 0.2 150)" },
            { value: 40, label: "40" },
          ],
          ranges: [
            {
              from: 0,
              to: 15,
              color: "oklch(0.65 0.2 260)",
              inclusive: { from: true, to: true },
            },
            {
              from: 15,
              to: 40,
              color: "oklch(0.65 0.2 150)",
              inclusive: { from: true, to: true },
            },
          ],
        },
      },
    ],
  },

  // ── Week 2 ──────────────────────────────────────────────────────────────
  {
    slug: "solving-linear-equations",
    visuals: [
      {
        type: "equation-animator",
        title: "Watch how to solve 3x + 7 = 22",
        props: {
          steps: [
            { equation: "3x + 7 = 22", explanation: "Start with the equation" },
            {
              equation: "3x + 7 - 7 = 22 - 7",
              explanation: "Subtract 7 from both sides",
            },
            { equation: "3x = 15", explanation: "Simplify" },
            {
              equation: "3x / 3 = 15 / 3",
              explanation: "Divide both sides by 3",
            },
            { equation: "x = 5", explanation: "Solution" },
          ],
          autoPlay: false,
        },
      },
      {
        type: "color-coded-steps",
        title: "Solve 3x + 7 = 22 step by step",
        props: {
          steps: [
            {
              expression: "3x + 7 = 22",
              operation: "Original equation",
              color: "text-blue-500",
            },
            {
              expression: "3x = 15",
              operation: "Subtract 7 from both sides",
              color: "text-violet-500",
            },
            {
              expression: "x = 5",
              operation: "Divide both sides by 3",
              color: "text-emerald-500",
            },
          ],
        },
      },
    ],
  },
  {
    slug: "graphing-linear-equations",
    visuals: [
      {
        type: "coordinate-plane",
        title: "Graph of y = 2x + 1 with slope triangle",
        props: {
          xRange: [-2, 5],
          yRange: [-2, 8],
          lines: [
            { slope: 2, yIntercept: 1, color: "oklch(0.65 0.2 260)", label: "y = 2x + 1" },
          ],
          points: [
            { x: 0, y: 1, label: "(0, 1)", color: "oklch(0.65 0.2 260)" },
            { x: 1, y: 3, label: "(1, 3)", color: "oklch(0.65 0.2 260)" },
            { x: 2, y: 5, label: "(2, 5)", color: "oklch(0.65 0.2 260)" },
          ],
        },
      },
      {
        type: "coordinate-plane",
        title: "Two lines intersecting: y = x + 1 and y = -x + 5",
        props: {
          xRange: [-1, 6],
          yRange: [-1, 7],
          lines: [
            { slope: 1, yIntercept: 1, color: "oklch(0.65 0.2 260)", label: "y = x + 1" },
            { slope: -1, yIntercept: 5, color: "oklch(0.65 0.2 30)", label: "y = -x + 5" },
          ],
          points: [
            {
              x: 2,
              y: 3,
              label: "Intersection (2, 3)",
              color: "oklch(0.65 0.2 150)",
            },
          ],
        },
      },
    ],
  },

  // ── Week 3 ──────────────────────────────────────────────────────────────
  {
    slug: "systems-of-equations",
    visuals: [
      {
        type: "coordinate-plane",
        title: "Two lines intersecting at the solution point",
        props: {
          xRange: [-1, 6],
          yRange: [-1, 8],
          lines: [
            { slope: 2, yIntercept: 1, color: "oklch(0.65 0.2 260)", label: "y = 2x + 1" },
            { slope: -1, yIntercept: 7, color: "oklch(0.65 0.2 30)", label: "x + y = 7" },
          ],
          points: [
            {
              x: 2,
              y: 5,
              label: "Solution (2, 5)",
              color: "oklch(0.65 0.2 150)",
            },
          ],
        },
      },
      {
        type: "equation-animator",
        title: "Substitution method: y = 2x + 1 and x + y = 7",
        props: {
          steps: [
            {
              equation: "y = 2x + 1  and  x + y = 7",
              explanation: "Start with the system",
            },
            {
              equation: "x + (2x + 1) = 7",
              explanation: "Substitute y = 2x + 1 into the second equation",
            },
            { equation: "3x + 1 = 7", explanation: "Combine like terms" },
            {
              equation: "3x = 6",
              explanation: "Subtract 1 from both sides",
            },
            { equation: "x = 2", explanation: "Divide both sides by 3" },
            {
              equation: "y = 2(2) + 1 = 5",
              explanation: "Substitute x = 2 back into y = 2x + 1",
            },
            {
              equation: "Solution: (2, 5)",
              explanation: "The solution point",
            },
          ],
          autoPlay: false,
        },
      },
      {
        type: "color-coded-steps",
        title: "Elimination method: 2x + y = 9 and x - y = 0",
        props: {
          steps: [
            {
              expression: "2x + y = 9",
              operation: "Equation 1",
              color: "text-blue-500",
            },
            {
              expression: "x - y = 0",
              operation: "Equation 2",
              color: "text-violet-500",
            },
            {
              expression: "3x = 9",
              operation: "Add both equations (y terms cancel)",
              color: "text-amber-500",
            },
            {
              expression: "x = 3",
              operation: "Divide both sides by 3",
              color: "text-rose-500",
            },
            {
              expression: "y = 3",
              operation: "Substitute x = 3 into x - y = 0",
              color: "text-emerald-500",
            },
          ],
        },
      },
    ],
  },
  {
    slug: "linear-inequalities",
    visuals: [
      {
        type: "number-line",
        title: "Graph of x > 3 (open circle at 3, arrow right)",
        props: {
          min: 0,
          max: 8,
          ranges: [
            {
              from: 3,
              to: 8,
              color: "oklch(0.65 0.2 260)",
              inclusive: { from: false, to: true },
            },
          ],
        },
      },
      {
        type: "number-line",
        title: "Graph of -2 <= x < 5 (closed at -2, open at 5)",
        props: {
          min: -5,
          max: 8,
          ranges: [
            {
              from: -2,
              to: 5,
              color: "oklch(0.65 0.2 150)",
              inclusive: { from: true, to: false },
            },
          ],
        },
      },
      {
        type: "equation-animator",
        title: "Solve the inequality 2x - 4 > 10",
        props: {
          steps: [
            {
              equation: "2x - 4 > 10",
              explanation: "Start with the inequality",
            },
            {
              equation: "2x - 4 + 4 > 10 + 4",
              explanation: "Add 4 to both sides",
            },
            { equation: "2x > 14", explanation: "Simplify" },
            {
              equation: "2x / 2 > 14 / 2",
              explanation: "Divide both sides by 2",
            },
            { equation: "x > 7", explanation: "Solution" },
          ],
          autoPlay: false,
        },
      },
    ],
  },

  // ── Week 4 ──────────────────────────────────────────────────────────────
  {
    slug: "percentages-in-real-life",
    visuals: [
      {
        type: "color-coded-steps",
        title: "Finding 20% of 150",
        props: {
          steps: [
            {
              expression: "20% of 150",
              operation: "Convert percent to decimal",
              color: "text-blue-500",
            },
            {
              expression: "0.20 × 150",
              operation: "Multiply",
              color: "text-violet-500",
            },
            {
              expression: "= 30",
              operation: "Result: 20% of 150 is 30",
              color: "text-emerald-500",
            },
          ],
        },
      },
      {
        type: "color-coded-steps",
        title: "Percent increase from 80 to 100",
        props: {
          steps: [
            {
              expression: "Difference = 100 - 80 = 20",
              operation: "Find the amount of change",
              color: "text-blue-500",
            },
            {
              expression: "20 / 80 = 0.25",
              operation: "Divide change by original",
              color: "text-violet-500",
            },
            {
              expression: "0.25 × 100 = 25%",
              operation: "Convert to percent",
              color: "text-emerald-500",
            },
          ],
        },
      },
    ],
  },
  {
    slug: "reading-charts-tables-graphs",
    visuals: [
      {
        type: "coordinate-plane",
        title: "Scatter plot: hours studied vs. test score",
        props: {
          xRange: [0, 8],
          yRange: [50, 100],
          points: [
            { x: 1, y: 55, label: "(1, 55)" },
            { x: 2, y: 62, label: "(2, 62)" },
            { x: 3, y: 68, label: "(3, 68)" },
            { x: 4, y: 74, label: "(4, 74)" },
            { x: 5, y: 80, label: "(5, 80)" },
            { x: 6, y: 88, label: "(6, 88)" },
            { x: 7, y: 92, label: "(7, 92)" },
          ],
        },
      },
    ],
  },
  {
    slug: "mean-median-mode-range",
    visuals: [
      {
        type: "number-line",
        title: "Data set {2, 4, 5, 7, 8, 10} with mean and median",
        props: {
          min: 0,
          max: 12,
          points: [
            { value: 2, label: "2", color: "oklch(0.65 0.2 260)" },
            { value: 4, label: "4", color: "oklch(0.65 0.2 260)" },
            { value: 5, label: "5", color: "oklch(0.65 0.2 260)" },
            { value: 7, label: "7", color: "oklch(0.65 0.2 260)" },
            { value: 8, label: "8", color: "oklch(0.65 0.2 260)" },
            { value: 10, label: "10", color: "oklch(0.65 0.2 260)" },
            { value: 6, label: "Mean = 6", color: "oklch(0.65 0.2 30)" },
          ],
        },
      },
    ],
  },
  {
    slug: "probability-basics",
    visuals: [
      {
        type: "color-coded-steps",
        title: "Finding the probability of drawing a blue marble",
        props: {
          steps: [
            {
              expression: "P(blue) = favorable / total",
              operation: "Start with the probability formula",
              color: "text-blue-500",
            },
            {
              expression: "P(blue) = 5 / 12",
              operation: "5 blue marbles out of 12 total",
              color: "text-violet-500",
            },
            {
              expression: "P(blue) ≈ 0.417 or about 42%",
              operation: "Convert to decimal / percent",
              color: "text-emerald-500",
            },
          ],
        },
      },
    ],
  },

  // ── Week 5 ──────────────────────────────────────────────────────────────
  {
    slug: "area-perimeter-volume",
    visuals: [
      {
        type: "geometry-diagram",
        title: "Rectangle with length = 12 and width = 5",
        props: {
          type: "rectangle",
          measurements: { width: 12, height: 5 },
          labels: {
            width: "12",
            height: "5",
            area: "A = 60",
          },
        },
      },
      {
        type: "geometry-diagram",
        title: "Triangle with base = 10 and height = 6",
        props: {
          type: "triangle",
          measurements: { base: 10, height: 6 },
          labels: { base: "10", height: "h = 6" },
        },
      },
      {
        type: "geometry-diagram",
        title: "Circle with radius = 7",
        props: {
          type: "circle",
          measurements: { radius: 7 },
          labels: { radius: "r = 7" },
          highlightParts: ["radius"],
        },
      },
    ],
  },
  {
    slug: "angles-and-triangles",
    visuals: [
      {
        type: "geometry-diagram",
        title: "Triangle with angles 45, 65, and 70 degrees",
        props: {
          type: "triangle",
          measurements: { base: 100, height: 80 },
          angles: { A: 45, B: 65, C: 70 },
        },
      },
      {
        type: "geometry-diagram",
        title: "Right triangle with sides 3, 4, 5",
        props: {
          type: "right-triangle",
          measurements: { base: 4, height: 3 },
          labels: { base: "4", height: "3", hypotenuse: "5" },
          angles: { A: 90 },
        },
      },
    ],
  },
  {
    slug: "pythagorean-theorem",
    visuals: [
      {
        type: "geometry-diagram",
        title: "Right triangle: legs 5 and 12, hypotenuse 13",
        props: {
          type: "right-triangle",
          measurements: { base: 12, height: 5 },
          labels: { base: "12", height: "5", hypotenuse: "13" },
          highlightParts: ["hypotenuse"],
        },
      },
      {
        type: "equation-animator",
        title: "Using the Pythagorean theorem: a = 5, b = 12",
        props: {
          steps: [
            {
              equation: "a² + b² = c²",
              explanation: "Pythagorean theorem formula",
            },
            {
              equation: "5² + 12² = c²",
              explanation: "Substitute a = 5 and b = 12",
            },
            {
              equation: "25 + 144 = c²",
              explanation: "Evaluate the squares",
            },
            { equation: "169 = c²", explanation: "Add" },
            {
              equation: "c = 13",
              explanation: "Take the square root of both sides",
            },
          ],
          autoPlay: false,
        },
      },
      {
        type: "color-coded-steps",
        title: "Pythagorean theorem: find the hypotenuse (5, 12, ?)",
        props: {
          steps: [
            {
              expression: "a² + b² = c²",
              operation: "Start with the formula",
              color: "text-blue-500",
            },
            {
              expression: "5² + 12² = c²",
              operation: "Plug in a = 5 and b = 12",
              color: "text-violet-500",
            },
            {
              expression: "25 + 144 = c²",
              operation: "Square each value",
              color: "text-amber-500",
            },
            {
              expression: "169 = c²",
              operation: "Add",
              color: "text-rose-500",
            },
            {
              expression: "c = 13",
              operation: "Take the square root",
              color: "text-emerald-500",
            },
          ],
        },
      },
    ],
  },
  {
    slug: "quadratic-equations",
    visuals: [
      {
        type: "coordinate-plane",
        title: "Parabola y = x² - 4x + 3 with vertex and x-intercepts",
        props: {
          xRange: [-1, 5],
          yRange: [-2, 5],
          points: [
            {
              x: 2,
              y: -1,
              label: "Vertex (2, -1)",
              color: "oklch(0.65 0.2 30)",
            },
            {
              x: 1,
              y: 0,
              label: "(1, 0)",
              color: "oklch(0.65 0.2 150)",
            },
            {
              x: 3,
              y: 0,
              label: "(3, 0)",
              color: "oklch(0.65 0.2 150)",
            },
            { x: 0, y: 3, label: "(0, 3)", color: "oklch(0.65 0.2 260)" },
            { x: 4, y: 3, label: "(4, 3)", color: "oklch(0.65 0.2 260)" },
          ],
        },
      },
      {
        type: "equation-animator",
        title: "Factor and solve x² + 5x + 6 = 0",
        props: {
          steps: [
            {
              equation: "x² + 5x + 6 = 0",
              explanation: "Start with the quadratic equation",
            },
            {
              equation: "(x + 2)(x + 3) = 0",
              explanation: "Factor: find two numbers that multiply to 6 and add to 5",
            },
            {
              equation: "x + 2 = 0  or  x + 3 = 0",
              explanation: "Set each factor equal to zero",
            },
            {
              equation: "x = -2  or  x = -3",
              explanation: "Solve each equation",
            },
          ],
          autoPlay: false,
        },
      },
    ],
  },
  {
    slug: "functions",
    visuals: [
      {
        type: "coordinate-plane",
        title: "Graph of f(x) = 2x + 1",
        props: {
          xRange: [-2, 5],
          yRange: [-3, 10],
          lines: [
            {
              slope: 2,
              yIntercept: 1,
              color: "oklch(0.65 0.2 260)",
              label: "f(x) = 2x + 1",
            },
          ],
          points: [
            { x: 0, y: 1, label: "f(0) = 1", color: "oklch(0.65 0.2 260)" },
            { x: 1, y: 3, label: "f(1) = 3", color: "oklch(0.65 0.2 260)" },
            { x: 2, y: 5, label: "f(2) = 5", color: "oklch(0.65 0.2 260)" },
            { x: 3, y: 7, label: "f(3) = 7", color: "oklch(0.65 0.2 260)" },
          ],
        },
      },
      {
        type: "color-coded-steps",
        title: "Evaluate f(3) when f(x) = 2x + 1",
        props: {
          steps: [
            {
              expression: "f(x) = 2x + 1",
              operation: "Start with the function definition",
              color: "text-blue-500",
            },
            {
              expression: "f(3) = 2(3) + 1",
              operation: "Substitute x = 3",
              color: "text-violet-500",
            },
            {
              expression: "f(3) = 6 + 1",
              operation: "Multiply",
              color: "text-amber-500",
            },
            {
              expression: "f(3) = 7",
              operation: "Add",
              color: "text-emerald-500",
            },
          ],
        },
      },
    ],
  },
  {
    slug: "exponents-and-radicals",
    visuals: [
      {
        type: "color-coded-steps",
        title: "Simplify x³ · x⁴ using the product rule",
        props: {
          steps: [
            {
              expression: "x³ · x⁴",
              operation: "Multiply powers with the same base",
              color: "text-blue-500",
            },
            {
              expression: "x³⁺⁴",
              operation: "Add the exponents (product rule)",
              color: "text-violet-500",
            },
            {
              expression: "x⁷",
              operation: "Simplified result",
              color: "text-emerald-500",
            },
          ],
        },
      },
      {
        type: "equation-animator",
        title: "Simplify the square root of 72",
        props: {
          steps: [
            {
              equation: "√72",
              explanation: "Start with the radical",
            },
            {
              equation: "√(36 × 2)",
              explanation: "Factor 72 into a perfect square times another factor",
            },
            {
              equation: "√36 × √2",
              explanation: "Split using the product property of radicals",
            },
            {
              equation: "6√2",
              explanation: "Simplify √36 = 6",
            },
          ],
          autoPlay: false,
        },
      },
    ],
  },
]

export function getTopicVisuals(slug: string): VisualItem[] {
  return topicVisuals.find((t) => t.slug === slug)?.visuals ?? []
}
