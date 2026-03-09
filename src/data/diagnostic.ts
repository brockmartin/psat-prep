import type { DiagnosticTest, Question } from '@/types/content';

const diagnosticQuestions: Question[] = [
  // ─── Algebra (Questions 1–5, easy → hard) ───────────────────────────

  // Q1 (Easy) — One-step equation: tests whether student understands isolating a variable
  {
    id: 'diag-q1',
    text: 'Solve for x: x + 14 = 23',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '9' },
      { label: 'B', text: '37' },
      { label: 'C', text: '14' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'A',
    explanation:
      'Subtract 14 from both sides: x = 23 - 14 = 9.',
    difficulty: 1,
    domain: 'algebra',
  },

  // Q2 (Medium) — Two-step equation: tests multi-step inverse operations
  {
    id: 'diag-q2',
    text: 'Solve for x: 3x + 9 = 24',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '5' },
      { label: 'B', text: '11' },
      { label: 'C', text: '15' },
      { label: 'D', text: '1' },
    ],
    correctAnswer: 'A',
    explanation:
      'Subtract 9 from both sides: 3x = 15. Divide both sides by 3: x = 5.',
    difficulty: 2,
    domain: 'algebra',
  },
  // Distractors:
  // B (11) — divided 24 by 3 first (got 8), then subtracted 9... no, that gives -1.
  //   Actually B = student forgot to subtract 9 and just divided: 24/3 = 8... not 11.
  //   Let's reconsider: B (11) — student subtracted 9 first (24-9=15) but then forgot to divide, giving 15... that's C.
  //   B (11) — student divided 24 by 3 = 8, then added 3: 11. Represents "undo in wrong order, add instead of subtract."
  // C (15) — subtracted 9 correctly (3x = 15) but forgot to divide by 3
  // D (1) — divided 24 by 3 first (8), then subtracted 9 to get -1, wrote 1 (sign error)

  // Q3 (Medium) — Slope from two points: tests coordinate geometry understanding
  {
    id: 'diag-q3',
    text: 'What is the slope of the line that passes through the points (1, 2) and (5, 10)?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '3' },
      { label: 'B', text: '2' },
      { label: 'C', text: '4' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'B',
    explanation:
      'Slope = (y2 - y1) / (x2 - x1) = (10 - 2) / (5 - 1) = 8 / 4 = 2.',
    difficulty: 2,
    domain: 'algebra',
  },
  // Distractors:
  // A (3) — computed (10 - 2) / (5 - 1) incorrectly as 8/3 ≈ 3 (arithmetic error)
  // C (4) — swapped numerator and denominator: (5-1)/(10-2) = 4/8... no that's 0.5. Actually C (4) = just used x-difference alone
  // D (8) — used only the y-difference (10-2 = 8) without dividing by x-difference

  // Q4 (Hard) — System of equations: tests simultaneous equation solving
  {
    id: 'diag-q4',
    text: 'Solve the system of equations:\n2x + y = 13\nx - y = 2',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'x = 5, y = 3' },
      { label: 'B', text: 'x = 4, y = 5' },
      { label: 'C', text: 'x = 6, y = 1' },
      { label: 'D', text: 'x = 3, y = 7' },
    ],
    correctAnswer: 'A',
    explanation:
      'Add the two equations: (2x + y) + (x - y) = 13 + 2, so 3x = 15, x = 5. Substitute back: 5 - y = 2, so y = 3.',
    difficulty: 3,
    domain: 'algebra',
  },
  // Distractors:
  // B (x=4, y=5) — check: 2(4)+5=13 works, but 4-5=-1 ≠ 2. Student solved first eq only
  // C (x=6, y=1) — check: 2(6)+1=13 works, but 6-1=5 ≠ 2. Subtraction error in second eq
  // D (x=3, y=7) — check: 2(3)+7=13 works, but 3-7=-4 ≠ 2. Guessed from first eq only

  // Q5 (Hard) — Word problem requiring equation setup: tests translation from words to algebra
  {
    id: 'diag-q5',
    text: 'Maria has saved $42. She earns $8 per hour babysitting. How many hours must she work to have a total of $90?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '11.25 hours' },
      { label: 'B', text: '6 hours' },
      { label: 'C', text: '16.5 hours' },
      { label: 'D', text: '5.25 hours' },
    ],
    correctAnswer: 'B',
    explanation:
      'Set up the equation: 42 + 8h = 90. Subtract 42: 8h = 48. Divide by 8: h = 6 hours.',
    difficulty: 3,
    domain: 'algebra',
  },
  // Distractors:
  // A (11.25) — divided 90 by 8, ignoring the $42 already saved: 90/8 = 11.25
  // C (16.5) — added 42 + 90 = 132, then divided by 8: 132/8 = 16.5
  // D (5.25) — subtracted correctly (90-42=48) but divided by wrong number: 48/8=6... hmm
  //   D (5.25) = 42/8 = 5.25 — divided savings by rate instead of remaining amount

  // ─── Problem-Solving & Data Analysis (Questions 6–10, easy → hard) ──

  // Q6 (Easy) — Calculate a percentage of a number: tests basic percent understanding
  {
    id: 'diag-q6',
    text: 'What is 15% of 80?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '12' },
      { label: 'B', text: '15' },
      { label: 'C', text: '8' },
      { label: 'D', text: '65' },
    ],
    correctAnswer: 'A',
    explanation:
      '15% of 80 = 0.15 * 80 = 12.',
    difficulty: 1,
    domain: 'problem_solving',
  },
  // Distractors:
  // B (15) — just picked the percentage number itself
  // C (8) — confused and picked the base number's first digit, or computed 10% = 8 and stopped
  // D (65) — subtracted 15 from 80 (confused "15% of" with "subtract 15")

  // Q7 (Medium) — Find the mean of a data set: tests statistics basics
  {
    id: 'diag-q7',
    text: 'A student scored 78, 85, 92, 71, and 94 on five tests. What is the mean (average) score?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '85' },
      { label: 'B', text: '84' },
      { label: 'C', text: '92' },
      { label: 'D', text: '82' },
    ],
    correctAnswer: 'B',
    explanation:
      'Mean = (78 + 85 + 92 + 71 + 94) / 5 = 420 / 5 = 84.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  // Distractors:
  // A (85) — found the median (middle value when ordered) instead of the mean
  // C (92) — picked the highest score, or confused mean with max
  // D (82) — made an addition error (e.g., forgot one score or miscounted)

  // Q8 (Medium) — Set up a proportion from a word problem: tests ratio reasoning
  {
    id: 'diag-q8',
    text: 'A printer can print 24 pages in 6 minutes. At this rate, how many pages can it print in 15 minutes?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '60' },
      { label: 'B', text: '48' },
      { label: 'C', text: '90' },
      { label: 'D', text: '36' },
    ],
    correctAnswer: 'A',
    explanation:
      'Rate = 24 pages / 6 minutes = 4 pages per minute. In 15 minutes: 4 * 15 = 60 pages.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  // Distractors:
  // B (48) — doubled the 24 pages (thinking 15 min is double 6 min)
  // C (90) — multiplied 6 * 15 = 90, ignoring the pages entirely
  // D (36) — added 24 + 6 + 15/... or computed 24 * 15 / 10 = 36 (used 10 instead of 6)

  // Q9 (Hard) — Interpret a scatterplot trend and make a prediction: tests data analysis
  {
    id: 'diag-q9',
    text: 'A scatterplot shows the relationship between hours studied (x) and test scores (y). The line of best fit is y = 5x + 60. Based on this model, what score would a student who studied for 7 hours be predicted to earn?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '95' },
      { label: 'B', text: '67' },
      { label: 'C', text: '105' },
      { label: 'D', text: '35' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitute x = 7 into y = 5x + 60: y = 5(7) + 60 = 35 + 60 = 95.',
    difficulty: 3,
    domain: 'problem_solving',
  },
  // Distractors:
  // B (67) — added 7 to 60 instead of multiplying: 60 + 7 = 67
  // C (105) — multiplied 7 * 15 = 105 (confused the slope and intercept)
  // D (35) — only computed 5 * 7 = 35, forgot to add the y-intercept

  // Q10 (Hard) — Multi-step percentage word problem: tests combined skills
  {
    id: 'diag-q10',
    text: 'A store marks up a jacket from its $50 wholesale cost by 40%, then offers a 25% discount on the marked-up price. What is the final sale price?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '$52.50' },
      { label: 'B', text: '$57.50' },
      { label: 'C', text: '$50.00' },
      { label: 'D', text: '$47.50' },
    ],
    correctAnswer: 'A',
    explanation:
      'Step 1: 40% markup on $50 = $50 * 1.40 = $70. Step 2: 25% discount on $70 = $70 * 0.75 = $52.50.',
    difficulty: 3,
    domain: 'problem_solving',
  },
  // Distractors:
  // B ($57.50) — computed 40% of 50 = 20, then subtracted 25% of 50 (not of 70): 70 - 12.50 = 57.50
  // C ($50.00) — assumed 40% up and 25% down cancel partially, guessed original price
  // D ($47.50) — subtracted net 15% of original (40-25=15, wrong): 50 * 0.15 = 7.50 off → 42.50... actually
  //   D ($47.50) = applied 25% off then added 40% of discount amount back... various error path

  // ─── Advanced Math (Questions 11–15, easy → hard) ───────────────────

  // Q11 (Easy) — Simplify an expression with exponents: tests exponent rules
  {
    id: 'diag-q11',
    text: 'Simplify: (2^3)^2',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '64' },
      { label: 'B', text: '32' },
      { label: 'C', text: '12' },
      { label: 'D', text: '36' },
    ],
    correctAnswer: 'A',
    explanation:
      'When raising a power to a power, multiply the exponents: (2^3)^2 = 2^(3*2) = 2^6 = 64.',
    difficulty: 1,
    domain: 'advanced_math',
  },
  // Distractors:
  // B (32) — added exponents instead of multiplying: 2^(3+2) = 2^5 = 32
  // C (12) — multiplied base * exponents: 2 * 3 * 2 = 12
  // D (36) — computed 6^2 = 36 (treated 2*3 as 6, then squared)

  // Q12 (Medium) — Evaluate f(x) for a given value: tests function notation
  {
    id: 'diag-q12',
    text: 'If f(x) = 2x^2 - 3x + 1, what is f(3)?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '10' },
      { label: 'B', text: '28' },
      { label: 'C', text: '4' },
      { label: 'D', text: '16' },
    ],
    correctAnswer: 'A',
    explanation:
      'f(3) = 2(3)^2 - 3(3) + 1 = 2(9) - 9 + 1 = 18 - 9 + 1 = 10.',
    difficulty: 2,
    domain: 'advanced_math',
  },
  // Distractors:
  // B (28) — forgot to subtract 3x: 2(9) + 9 + 1 = 28
  // C (4) — computed (2*3)^2 - 3*3 + 1 = 36 - 9 + 1 = 28... no.
  //   C (4) — squared 2x instead of x: 2(3)=6, forgot exponent, did 6-3+1=4
  // D (16) — computed 2(3^2) - 3 + 1 = 18 - 3 + 1 = 16 (forgot to multiply -3 by x)

  // Q13 (Medium) — Multiply two binomials (FOIL): tests polynomial multiplication
  {
    id: 'diag-q13',
    text: 'Expand: (x + 4)(x - 3)',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'x^2 + x - 12' },
      { label: 'B', text: 'x^2 + 7x - 12' },
      { label: 'C', text: 'x^2 - x - 12' },
      { label: 'D', text: 'x^2 + x + 12' },
    ],
    correctAnswer: 'A',
    explanation:
      'FOIL: First: x*x = x^2. Outer: x*(-3) = -3x. Inner: 4*x = 4x. Last: 4*(-3) = -12. Combine: x^2 + (-3x + 4x) - 12 = x^2 + x - 12.',
    difficulty: 2,
    domain: 'advanced_math',
  },
  // Distractors:
  // B (x^2 + 7x - 12) — added 4 + 3 = 7 instead of -3 + 4 = 1
  // C (x^2 - x - 12) — sign error on inner term: got -4x + 3x = -x instead of +4x - 3x = +x
  // D (x^2 + x + 12) — wrong sign on constant: 4 * (-3) computed as +12

  // Q14 (Hard) — Solve a quadratic by factoring: tests advanced algebra
  {
    id: 'diag-q14',
    text: 'What are the solutions to x^2 - 7x + 10 = 0?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'x = 2 and x = 5' },
      { label: 'B', text: 'x = -2 and x = -5' },
      { label: 'C', text: 'x = 1 and x = 10' },
      { label: 'D', text: 'x = -2 and x = 5' },
    ],
    correctAnswer: 'A',
    explanation:
      'Factor: x^2 - 7x + 10 = (x - 2)(x - 5) = 0. Set each factor to zero: x = 2 or x = 5.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  // Distractors:
  // B (x=-2, x=-5) — found correct factor pair but used wrong signs (forgot the negatives flip)
  // C (x=1, x=10) — found numbers that multiply to 10 but don't add to -7
  // D (x=-2, x=5) — mixed up signs on one solution

  // Q15 (Hard) — Exponential growth word problem: tests function application
  {
    id: 'diag-q15',
    text: 'A colony of bacteria doubles every 3 hours. If the colony starts with 500 bacteria, how many bacteria will there be after 9 hours?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '4,000' },
      { label: 'B', text: '1,500' },
      { label: 'C', text: '4,500' },
      { label: 'D', text: '2,000' },
    ],
    correctAnswer: 'A',
    explanation:
      'In 9 hours, the bacteria double 9/3 = 3 times. After 3 doublings: 500 * 2^3 = 500 * 8 = 4,000.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  // Distractors:
  // B (1,500) — multiplied by 3 instead of doubling 3 times: 500 * 3 = 1,500
  // C (4,500) — multiplied by 9 instead: 500 * 9 = 4,500
  // D (2,000) — only doubled twice (thought 9/3=3 means 2 doublings): 500 * 4 = 2,000

  // ─── Geometry (Questions 16–20, easy → hard) ────────────────────────

  // Q16 (Easy) — Find area of a rectangle: tests basic geometry formula
  {
    id: 'diag-q16',
    text: 'A rectangle has a length of 9 cm and a width of 4 cm. What is its area?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '36 cm^2' },
      { label: 'B', text: '26 cm^2' },
      { label: 'C', text: '13 cm^2' },
      { label: 'D', text: '18 cm^2' },
    ],
    correctAnswer: 'A',
    explanation:
      'Area of a rectangle = length * width = 9 * 4 = 36 cm^2.',
    difficulty: 1,
    domain: 'geometry',
  },
  // Distractors:
  // B (26) — found perimeter instead: 2(9 + 4) = 26
  // C (13) — added length + width: 9 + 4 = 13
  // D (18) — doubled one side only: 9 * 2 = 18

  // Q17 (Medium) — Find a missing angle in a triangle: tests angle sum property
  {
    id: 'diag-q17',
    text: 'A triangle has two angles that measure 35 degrees and 85 degrees. What is the measure of the third angle?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '60 degrees' },
      { label: 'B', text: '50 degrees' },
      { label: 'C', text: '70 degrees' },
      { label: 'D', text: '120 degrees' },
    ],
    correctAnswer: 'A',
    explanation:
      'The angles of a triangle add up to 180 degrees. Third angle = 180 - 35 - 85 = 60 degrees.',
    difficulty: 2,
    domain: 'geometry',
  },
  // Distractors:
  // B (50) — subtracted from 170 instead of 180: 170 - 35 - 85 = 50
  // C (70) — subtracted only one angle: 180 - 85 = 95... no. Maybe added 35+85=120, 180-120 but arithmetic error → 70...
  //   Actually C (70) — confused with supplementary angle: student subtracted only first angle from some other total
  // D (120) — added the two given angles (35 + 85 = 120) instead of subtracting from 180

  // Q18 (Medium) — Use the Pythagorean theorem: tests right triangle skills
  {
    id: 'diag-q18',
    text: 'A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '10' },
      { label: 'B', text: '14' },
      { label: 'C', text: '48' },
      { label: 'D', text: '100' },
    ],
    correctAnswer: 'A',
    explanation:
      'Pythagorean theorem: a^2 + b^2 = c^2. 6^2 + 8^2 = 36 + 64 = 100. c = sqrt(100) = 10.',
    difficulty: 2,
    domain: 'geometry',
  },
  // Distractors:
  // B (14) — added the legs directly: 6 + 8 = 14
  // C (48) — multiplied the legs: 6 * 8 = 48
  // D (100) — found c^2 but forgot to take the square root

  // Q19 (Hard) — Find area of a circle given the diameter: tests circle formulas
  {
    id: 'diag-q19',
    text: 'A circle has a diameter of 10 inches. What is the area of the circle? (Use pi = 3.14)',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '78.5 square inches' },
      { label: 'B', text: '314 square inches' },
      { label: 'C', text: '31.4 square inches' },
      { label: 'D', text: '157 square inches' },
    ],
    correctAnswer: 'A',
    explanation:
      'The radius is half the diameter: r = 10 / 2 = 5. Area = pi * r^2 = 3.14 * 25 = 78.5 square inches.',
    difficulty: 3,
    domain: 'geometry',
  },
  // Distractors:
  // B (314) — used diameter instead of radius: 3.14 * 10^2 = 314
  // C (31.4) — computed circumference instead: 3.14 * 10 = 31.4
  // D (157) — used diameter but halved: 3.14 * 100 / 2 = 157 (half of B, a common guess)

  // Q20 (Hard) — Multi-step geometry problem: tests combined geometry skills
  {
    id: 'diag-q20',
    text: 'A rectangular room is 12 feet long and 9 feet wide. A square rug with a side length of 6 feet is placed in the center of the room. What is the area of the floor NOT covered by the rug?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '72 square feet' },
      { label: 'B', text: '108 square feet' },
      { label: 'C', text: '36 square feet' },
      { label: 'D', text: '144 square feet' },
    ],
    correctAnswer: 'A',
    explanation:
      'Room area = 12 * 9 = 108 square feet. Rug area = 6 * 6 = 36 square feet. Uncovered area = 108 - 36 = 72 square feet.',
    difficulty: 3,
    domain: 'geometry',
  },
  // Distractors:
  // B (108) — found the room area but forgot to subtract the rug
  // C (36) — found only the rug area instead of the uncovered area
  // D (144) — added room and rug areas: 108 + 36 = 144
];

export const diagnosticTest: DiagnosticTest = {
  questions: diagnosticQuestions,
};
