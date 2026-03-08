/**
 * Maps every question ID in the system to its corresponding skill ID.
 * Covers: diagnostic.ts, weeks.ts (topics, quizzes, worksheets), practice-tests.ts
 */
export const questionSkillMap: Record<string, string> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // DIAGNOSTIC TEST (diag-q1 through diag-q20)
  // ═══════════════════════════════════════════════════════════════════════════
  'diag-q1': 'two-step-equations', // Solve 4x - 8 = 20
  'diag-q2': 'slope-intercept-form', // Slope of y = -3x + 7
  'diag-q3': 'systems-elimination', // System: x+y=10, 2x-y=5
  'diag-q4': 'multi-step-equations', // 3(x+4) = 2x+15
  'diag-q5': 'multi-step-equations', // Word problem: phone plans equal cost
  'diag-q6': 'percent-of-number', // 25% of 120
  'diag-q7': 'ratios', // Ratio cats to dogs, find count
  'diag-q8': 'percent-change', // Shirt on sale 20% off
  'diag-q9': 'mean-median-mode', // Median of test scores
  'diag-q10': 'probability-compound', // Two marbles without replacement
  'diag-q11': 'exponent-rules', // x^3 * x^2
  'diag-q12': 'function-evaluation', // f(x) = 3x - 2, find f(4)
  'diag-q13': 'factoring-trinomials', // Factor x^2 + 7x + 12
  'diag-q14': 'foil-method', // Expand (2x-3)(x+5)
  'diag-q15': 'factoring-trinomials', // Solve x^2 - 5x + 6 = 0
  'diag-q16': 'perimeter-area-rectangles', // Rectangle area
  'diag-q17': 'triangle-properties', // Third angle of a triangle
  'diag-q18': 'pythagorean-theorem', // Right triangle 5-12-?
  'diag-q19': 'area-circles', // Area of circle radius 6
  'diag-q20': 'soh-cah-toa', // sin(theta) = 0.6, find opposite

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 1 - Topic 1: Fractions, Decimals, Percentages
  // ═══════════════════════════════════════════════════════════════════════════
  'w1-t1-q1': 'fraction-operations', // 1/2 + 1/3
  'w1-t1-q2': 'decimal-operations', // 0.6 as fraction
  'w1-t1-q3': 'fraction-operations', // 2/5 * 3/7
  'w1-t1-q4': 'percent-of-number', // 40% of 250
  'w1-t1-q5': 'percent-of-number', // 42 out of 56 as percentage

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 1 - Topic 2: Ratios and Proportions
  // ═══════════════════════════════════════════════════════════════════════════
  'w1-t2-q1': 'proportions', // Ratio 2:7, 14 blue, how many red?
  'w1-t2-q2': 'unit-rates', // 3 apples cost $2.25, 12 cost?
  'w1-t2-q3': 'proportions', // Map scale problem
  'w1-t2-q4': 'ratios', // Ratio cats:dogs in shelter
  'w1-t2-q5': 'unit-rates', // Car travels 180 mi on 6 gal

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 1 - Quiz
  // ═══════════════════════════════════════════════════════════════════════════
  'w1-quiz-q1': 'fraction-operations', // 2/3 + 1/6
  'w1-quiz-q2': 'fraction-operations', // 5/8 - 1/4
  'w1-quiz-q3': 'decimal-operations', // 0.6 to fraction
  'w1-quiz-q4': 'percent-of-number', // 40% of 250
  'w1-quiz-q5': 'percent-change', // Jacket $80, 20% off
  'w1-quiz-q6': 'proportions', // 6/9 = x/15
  'w1-quiz-q7': 'ratios', // Red and green marbles ratio
  'w1-quiz-q8': 'fraction-operations', // 3/5 * 10/9
  'w1-quiz-q9': 'percent-of-number', // 21 out of 28 as %
  'w1-quiz-q10': 'percent-change', // $50 item, 8% increase

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 1 - Worksheet
  // ═══════════════════════════════════════════════════════════════════════════
  'w1-ws-q1': 'fraction-operations', // 3/4 + 2/3
  'w1-ws-q2': 'fraction-operations', // 7/8 - 1/4
  'w1-ws-q3': 'fraction-operations', // 2/5 * 3/7
  'w1-ws-q4': 'fraction-operations', // 5/6 / 2/3
  'w1-ws-q5': 'fraction-operations', // 4/12 + 5/6 - 1/3
  'w1-ws-q6': 'decimal-operations', // 3/8 to decimal
  'w1-ws-q7': 'percent-of-number', // 25% of 180
  'w1-ws-q8': 'decimal-operations', // 0.045 to percentage
  'w1-ws-q9': 'percent-change', // Shirt $40, 15% off
  'w1-ws-q10': 'percent-of-number', // 18/24 as percentage
  'w1-ws-q11': 'ratios', // 12 to 18 simplest form
  'w1-ws-q12': 'proportions', // 4/x = 8/14
  'w1-ws-q13': 'proportions', // Recipe flour/sugar proportion
  'w1-ws-q14': 'proportions', // Map scale 1 in = 25 mi
  'w1-ws-q15': 'ratios', // Boys to girls ratio
  'w1-ws-q16': 'fraction-operations', // Pizza slices left
  'w1-ws-q17': 'ratios', // Red/blue marble ratio, total
  'w1-ws-q18': 'decimal-operations', // Sum of mixed decimals/fractions
  'w1-ws-q19': 'percent-change', // Price raise then discount
  'w1-ws-q20': 'ratios', // Band, sport, both, neither

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 2 - Topic 1: Solving Linear Equations
  // ═══════════════════════════════════════════════════════════════════════════
  'w2-t1-q1': 'one-step-equations', // x - 9 = 12
  'w2-t1-q2': 'one-step-equations', // 5x = 45
  'w2-t1-q3': 'two-step-equations', // 4x + 7 = 31
  'w2-t1-q4': 'multi-step-equations', // 2x + 5 = x + 12
  'w2-t1-q5': 'multi-step-equations', // 3(2x-1) = 4x + 9

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 2 - Topic 2: Graphing Linear Equations
  // ═══════════════════════════════════════════════════════════════════════════
  'w2-t2-q1': 'slope-intercept-form', // Slope of y = -3x + 7
  'w2-t2-q2': 'slope-intercept-form', // Y-intercept of y = 4x - 2
  'w2-t2-q3': 'slope-concept', // Slope from two points
  'w2-t2-q4': 'slope-intercept-form', // Line equation from slope + point
  'w2-t2-q5': 'graphing-lines', // Line equation from two points

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 2 - Quiz
  // ═══════════════════════════════════════════════════════════════════════════
  'w2-quiz-q1': 'combining-like-terms', // 4x + 3 - 2x + 7
  'w2-quiz-q2': 'one-step-equations', // x - 5 = 12
  'w2-quiz-q3': 'combining-like-terms', // 3(2a-4) + a
  'w2-quiz-q4': 'two-step-equations', // 4y + 6 = 30
  'w2-quiz-q5': 'two-step-equations', // 2(x+3) = 20
  'w2-quiz-q6': 'multi-step-equations', // 5n - 3 = 2n + 12
  'w2-quiz-q7': 'slope-intercept-form', // Slope of y = -4x + 9
  'w2-quiz-q8': 'slope-concept', // Slope from (1,2) and (4,8)
  'w2-quiz-q9': 'slope-intercept-form', // Equation with slope 5, b=-3
  'w2-quiz-q10': 'multi-step-equations', // 3(x-1) = 2(x+4)

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 2 - Worksheet
  // ═══════════════════════════════════════════════════════════════════════════
  'w2-ws-q1': 'combining-like-terms', // 3x + 7x
  'w2-ws-q2': 'combining-like-terms', // 5a - 2a + 4
  'w2-ws-q3': 'combining-like-terms', // 2(3x+4) - 5x
  'w2-ws-q4': 'combining-like-terms', // 4(2y-1) + 3(y+5)
  'w2-ws-q5': 'combining-like-terms', // 6m - 2(m+3) + 8
  'w2-ws-q6': 'one-step-equations', // x + 9 = 17
  'w2-ws-q7': 'one-step-equations', // 3y = 21
  'w2-ws-q8': 'two-step-equations', // 2x + 5 = 19
  'w2-ws-q9': 'two-step-equations', // n/4 - 3 = 2
  'w2-ws-q10': 'two-step-equations', // 5w - 8 = 22
  'w2-ws-q11': 'two-step-equations', // 3(x+2) = 24
  'w2-ws-q12': 'multi-step-equations', // 4a - 7 = 2a + 9
  'w2-ws-q13': 'multi-step-equations', // 2(x-3)+4 = 3x-8
  'w2-ws-q14': 'multi-step-equations', // 5(y+1) = 3(y+3)+2
  'w2-ws-q15': 'multi-step-equations', // (m+6)/3 = (2m-1)/4
  'w2-ws-q16': 'slope-intercept-form', // Identify slope and y-intercept
  'w2-ws-q17': 'slope-concept', // Slope from two points
  'w2-ws-q18': 'slope-intercept-form', // Equation from slope and point
  'w2-ws-q19': 'graphing-lines', // Equation from two points
  'w2-ws-q20': 'slope-intercept-form', // Convert standard to slope-intercept

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 3 - Quiz (Systems, Inequalities)
  // ═══════════════════════════════════════════════════════════════════════════
  'w3-quiz-q1': 'systems-substitution', // y=3x; x+y=16
  'w3-quiz-q2': 'systems-elimination', // x+y=14; x-y=2
  'w3-quiz-q3': 'linear-inequalities', // 5x - 3 > 17
  'w3-quiz-q4': 'systems-substitution', // y=x-2; 2x+y=13
  'w3-quiz-q5': 'linear-inequalities', // -3x + 6 >= 18
  'w3-quiz-q6': 'two-step-equations', // 3n - 7 = 17
  'w3-quiz-q7': 'systems-elimination', // 3x+2y=19; x+2y=9
  'w3-quiz-q8': 'systems-elimination', // Coin word problem (quarters+dimes)
  'w3-quiz-q9': 'linear-inequalities', // 4 - 3(x-2) <= 16
  'w3-quiz-q10': 'systems-elimination', // 2x+5y=30; 3x-5y=-5

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 4 - Quiz (Data Analysis)
  // ═══════════════════════════════════════════════════════════════════════════
  'w4-quiz-q1': 'mean-median-mode', // Mean of 10,15,20,25,30
  'w4-quiz-q2': 'probability-basics', // P(red) from bag
  'w4-quiz-q3': 'mean-median-mode', // Median of study hours
  'w4-quiz-q4': 'percent-change', // Jacket 30% off
  'w4-quiz-q5': 'percent-of-number', // 45% of 400
  'w4-quiz-q6': 'mean-median-mode', // Range of data set
  'w4-quiz-q7': 'ratios', // Cheese:pepperoni ratio of 60
  'w4-quiz-q8': 'percent-change', // Car value $20k to $17k
  'w4-quiz-q9': 'mean-median-mode', // What score for average 82
  'w4-quiz-q10': 'percent-change', // Markup then discount

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 5 - Quiz (Geometry & Advanced Math)
  // ═══════════════════════════════════════════════════════════════════════════
  'w5-quiz-q1': 'perimeter-area-rectangles', // Rectangle area 9x4
  'w5-quiz-q2': 'pythagorean-theorem', // Right triangle 5-12-?
  'w5-quiz-q3': 'volume-prisms', // Rectangular box volume
  'w5-quiz-q4': 'triangle-properties', // Triangle angles x, 2x, 3x
  'w5-quiz-q5': 'factoring-trinomials', // x^2 - 16 = 0 (diff of squares)
  'w5-quiz-q6': 'function-evaluation', // f(x) = 5x - 3, f(6)
  'w5-quiz-q7': 'simplifying-radicals', // sqrt(50)
  'w5-quiz-q8': 'factoring-trinomials', // x^2 + 3x - 10 = 0
  'w5-quiz-q9': 'area-circles', // Circle diameter 14
  'w5-quiz-q10': 'function-evaluation', // g(x) = x^2+2x-8, g(-3)

  // ═══════════════════════════════════════════════════════════════════════════
  // PRACTICE TEST 1 - Module 1
  // ═══════════════════════════════════════════════════════════════════════════
  'pt1-m1-q1': 'two-step-equations', // 2x + 6 = 18
  'pt1-m1-q2': 'variables-expressions', // Expression for n notebooks at $3
  'pt1-m1-q3': 'perimeter-area-rectangles', // Perimeter of square side 9
  'pt1-m1-q4': 'reading-tables', // Books read table, total students
  'pt1-m1-q5': 'function-evaluation', // f(x)=x+9, f(3)
  'pt1-m1-q6': 'fraction-operations', // Pizza slices left
  'pt1-m1-q7': 'exponent-rules', // 3^4
  'pt1-m1-q8': 'linear-inequalities', // 5x - 3 > 22
  'pt1-m1-q9': 'percent-of-number', // 45% of 200, dogs
  'pt1-m1-q10': 'slope-concept', // Slope from (1,3) and (4,9)
  'pt1-m1-q11': 'exponent-rules', // (4x^2)(3x^3)
  'pt1-m1-q12': 'variables-expressions', // Perimeter expression with width w
  'pt1-m1-q13': 'mean-median-mode', // Mean of 5 numbers, find 5th
  'pt1-m1-q14': 'slope-intercept-form', // Parallel line (same slope)
  'pt1-m1-q15': 'pythagorean-theorem', // Right triangle 8-?-17
  'pt1-m1-q16': 'multi-step-equations', // Car rental budget word problem
  'pt1-m1-q17': 'factoring-trinomials', // Factor 2x^2+10x+12
  'pt1-m1-q18': 'area-circles', // Circle area, diameter 14
  'pt1-m1-q19': 'line-of-best-fit', // Line of best fit prediction
  'pt1-m1-q20': 'systems-substitution', // System 3x+2y=16; x-y=2
  'pt1-m1-q21': 'exponential-growth', // Bacteria doubling expression
  'pt1-m1-q22': 'pythagorean-theorem', // Right triangle PQR

  // ═══════════════════════════════════════════════════════════════════════════
  // PRACTICE TEST 1 - Module 2
  // ═══════════════════════════════════════════════════════════════════════════
  'pt1-m2-q23': 'combining-like-terms', // (5x-3)-(2x+7)
  'pt1-m2-q24': 'probability-basics', // P(red) from bag
  'pt1-m2-q25': 'factoring-trinomials', // x^2-4 crosses x-axis
  'pt1-m2-q26': 'unit-rates', // Train 60 mph, 2.5 hours
  'pt1-m2-q27': 'multi-step-equations', // 2(3x-1) = 4x+6
  'pt1-m2-q28': 'volume-prisms', // Rectangular prism V=360
  'pt1-m2-q29': 'mean-median-mode', // Same mean, different range
  'pt1-m2-q30': 'percent-change', // Ticket $40 to $52
  'pt1-m2-q31': 'foil-method', // (x+3)^2
  'pt1-m2-q32': 'fraction-operations', // 3/5 * 1/4 = 3/20
  'pt1-m2-q33': 'slope-intercept-form', // y-intercept of 2x+3y=12
  'pt1-m2-q34': 'volume-prisms', // Cylinder volume
  'pt1-m2-q35': 'function-evaluation', // g(x) = -2x^2+8x-3, g(2)
  'pt1-m2-q36': 'systems-elimination', // Gift card word problem
  'pt1-m2-q37': 'soh-cah-toa', // cos=5/13, find sin
  'pt1-m2-q38': 'quadratic-formula', // Discriminant equals zero
  'pt1-m2-q39': 'multi-step-equations', // Two companies same cost
  'pt1-m2-q40': 'factoring-trinomials', // 3x^2 - 12 = 0
  'pt1-m2-q41': 'area-triangles', // Triangle with vertices
  'pt1-m2-q42': 'reading-tables', // Survey table, % of girls
  'pt1-m2-q43': 'quadratic-formula', // Ball height max (vertex)
  'pt1-m2-q44': 'angle-relationships', // Parallel lines transversal

  // ═══════════════════════════════════════════════════════════════════════════
  // PRACTICE TEST 2 - Module 1
  // ═══════════════════════════════════════════════════════════════════════════
  'pt2-m1-q1': 'combining-like-terms', // 8x - 3x + 2
  'pt2-m1-q2': 'one-step-equations', // y - 7 = 15
  'pt2-m1-q3': 'percent-of-number', // 30% of 90
  'pt2-m1-q4': 'slope-intercept-form', // Equation with slope 4, b=-1
  'pt2-m1-q5': 'probability-basics', // P(blue) from bag
  'pt2-m1-q6': 'perimeter-area-rectangles', // Square perimeter 9
  'pt2-m1-q7': 'two-step-equations', // 3(x-4)=18
  'pt2-m1-q8': 'multi-step-equations', // 2x+7=5x-8
  'pt2-m1-q9': 'exponent-rules', // (4x^2)(3x^3)
  'pt2-m1-q10': 'proportions', // 3/8 of 240 students
  'pt2-m1-q11': 'slope-intercept-form', // Table to equation y=3x+2
  'pt2-m1-q12': 'factoring-trinomials', // x^2-5x+6=0
  'pt2-m1-q13': 'pythagorean-theorem', // 9-12-?
  'pt2-m1-q14': 'two-step-equations', // (x+3)/2 = 7
  'pt2-m1-q15': 'function-evaluation', // f(x)=4x-7, f(5)
  'pt2-m1-q16': 'mean-median-mode', // Mean of sales
  'pt2-m1-q17': 'linear-inequalities', // -2x+5 > 11
  'pt2-m1-q18': 'systems-substitution', // y=3x-1; 2x+y=14
  'pt2-m1-q19': 'simplifying-radicals', // sqrt(48)+sqrt(27)
  'pt2-m1-q20': 'area-circles', // Circle area 49pi, diameter
  'pt2-m1-q21': 'multi-step-equations', // Cell phone bill word problem
  'pt2-m1-q22': 'factoring-trinomials', // g(x)=x^2-6x+8=0

  // ═══════════════════════════════════════════════════════════════════════════
  // PRACTICE TEST 2 - Module 2
  // ═══════════════════════════════════════════════════════════════════════════
  'pt2-m2-q23': 'decimal-operations', // 7/8 to decimal
  'pt2-m2-q24': 'one-step-equations', // 5n = 45
  'pt2-m2-q25': 'reading-tables', // Favorite sport table
  'pt2-m2-q26': 'area-triangles', // Triangle base 14, height 6
  'pt2-m2-q27': 'slope-concept', // Slope from (0,3) and (2,9)
  'pt2-m2-q28': 'percent-change', // Sweater $55 + 8% tax
  'pt2-m2-q29': 'systems-elimination', // 3x+y=17; x+y=7
  'pt2-m2-q30': 'exponent-rules', // 3^2 * 3^3
  'pt2-m2-q31': 'mean-median-mode', // Median of test scores
  'pt2-m2-q32': 'perimeter-area-rectangles', // Rectangle area 15x12
  'pt2-m2-q33': 'multi-step-equations', // Gym membership total cost
  'pt2-m2-q34': 'proportions', // Flour:sugar ratio 5:2
  'pt2-m2-q35': 'factoring-trinomials', // x^2+2x-15=0
  'pt2-m2-q36': 'pythagorean-theorem', // Hypotenuse 10, leg 6
  'pt2-m2-q37': 'percent-change', // Gym 250 to 300 members
  'pt2-m2-q38': 'graphing-lines', // Line from two points, equation
  'pt2-m2-q39': 'function-evaluation', // h(x)=2x^2-x+3, h(-1)
  'pt2-m2-q40': 'scatterplots', // Temp vs cones trend prediction
  'pt2-m2-q41': 'volume-prisms', // Cone volume
  'pt2-m2-q42': 'multi-step-equations', // Two trains meet word problem
  'pt2-m2-q43': 'quadratic-formula', // Quadratic formula 2x^2-3x-2=0
  'pt2-m2-q44': 'mean-median-mode', // Weighted mean from frequency table
};

/**
 * Returns the skill ID for a given question ID, or undefined if not mapped.
 */
export function getQuestionSkill(questionId: string): string | undefined {
  return questionSkillMap[questionId];
}
