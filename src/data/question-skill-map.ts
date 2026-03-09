/**
 * Maps every question ID in the system to its corresponding skill ID.
 * Covers: diagnostic.ts, weeks-1-3.ts (topics, quizzes, worksheets),
 *         weeks-4-5.ts (topics, quizzes), practice-tests.ts
 *
 * Total: 294 questions mapped to 48 skills.
 */
export const questionSkillMap: Record<string, string> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // DIAGNOSTIC TEST (diag-q1 through diag-q20)
  // ═══════════════════════════════════════════════════════════════════════════
  'diag-q1': 'one-step-equations', // Solve for x: x + 14 = 23
  'diag-q2': 'two-step-equations', // Solve for x: 3x + 9 = 24
  'diag-q3': 'slope-concept', // Slope through (1,2) and (5,10)
  'diag-q4': 'systems-elimination', // System: 2x + y = 13, x - y = 2
  'diag-q5': 'two-step-equations', // Maria saved $42, earns $8/hr, need $90
  'diag-q6': 'percent-of-number', // 15% of 80
  'diag-q7': 'mean-median-mode', // Mean of 78,85,92,71,94
  'diag-q8': 'proportions', // Printer 24 pages in 6 min, 15 min?
  'diag-q9': 'line-of-best-fit', // Line of best fit y = 5x + 60, predict
  'diag-q10': 'percent-change', // Markup 40% then discount 25%
  'diag-q11': 'exponent-rules', // (2^3)^2
  'diag-q12': 'function-evaluation', // f(x) = 2x^2 - 3x + 1, f(3)
  'diag-q13': 'foil-method', // Expand (x + 4)(x - 3)
  'diag-q14': 'factoring-trinomials', // x^2 - 7x + 10 = 0
  'diag-q15': 'exponential-growth', // Bacteria doubles every 3 hours
  'diag-q16': 'perimeter-area-rectangles', // Rectangle 9x4 area
  'diag-q17': 'triangle-properties', // Third angle: 35, 85, ?
  'diag-q18': 'pythagorean-theorem', // Right triangle legs 6 and 8
  'diag-q19': 'area-circles', // Circle diameter 10, area
  'diag-q20': 'perimeter-area-rectangles', // Room 12x9, rug 6x6, uncovered area

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 1 — Topic 1: Fractions, Decimals, Percentages
  // ═══════════════════════════════════════════════════════════════════════════
  'w1-t1-q1': 'fraction-operations', // 3/4 * 1/3 for recipe
  'w1-t1-q2': 'decimal-operations', // 0.35 as percentage
  'w1-t1-q3': 'percent-of-number', // 18% tip on $24.50
  'w1-t1-q4': 'percent-change', // 25% discount then 8% tax on $80
  'w1-t1-q5': 'fraction-operations', // 1/4 cake eaten Mon, 1/3 remainder Tue

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 1 — Topic 2: Ratios and Proportions
  // ═══════════════════════════════════════════════════════════════════════════
  'w1-t2-q1': 'ratios', // Ratio boys:girls 2:3, 30 students
  'w1-t2-q2': 'unit-rates', // 6 apples $4.50, price per apple
  'w1-t2-q3': 'proportions', // Map 1 inch = 50 miles, 4.5 inches
  'w1-t2-q4': 'proportions', // Recipe 2.5 cups flour/24 cookies, 60 cookies
  'w1-t2-q5': 'unit-rates', // Two cars, compare mph

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 1 — Quiz
  // ═══════════════════════════════════════════════════════════════════════════
  'w1-quiz-q1': 'fraction-operations', // 3/8 + 1/4
  'w1-quiz-q2': 'decimal-operations', // 7/20 as percentage
  'w1-quiz-q3': 'decimal-operations', // $3.60 * 5 notebooks, change from $20
  'w1-quiz-q4': 'percent-change', // Shirt $45, 20% off
  'w1-quiz-q5': 'fraction-operations', // 5/6 / 2/3
  'w1-quiz-q6': 'ratios', // Fiction:non-fiction 5:3, 40 books
  'w1-quiz-q7': 'proportions', // 8/12 = x/21
  'w1-quiz-q8': 'proportions', // 3 laps in 5.4 min, 10 laps
  'w1-quiz-q9': 'percent-change', // $60, +15%, -15%
  'w1-quiz-q10': 'proportions', // 12 muffins need 2/3 cup milk, 30 muffins

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 1 — Worksheet
  // ═══════════════════════════════════════════════════════════════════════════
  'w1-ws-q1': 'fraction-operations', // 3/4 + 2/3
  'w1-ws-q2': 'fraction-operations', // 7/8 - 1/4
  'w1-ws-q3': 'fraction-operations', // 2/5 x 3/7
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
  'w1-ws-q14': 'proportions', // Map 1 in = 25 mi
  'w1-ws-q15': 'ratios', // Boys:girls 5:7, 35 boys
  'w1-ws-q16': 'fraction-operations', // Pizza 8 slices, 5 eaten
  'w1-ws-q17': 'ratios', // Red:blue 3:5, 24 red, total
  'w1-ws-q18': 'decimal-operations', // 2.5 + 3.75 + 0.5
  'w1-ws-q19': 'percent-change', // $60, +10%, -10%
  'w1-ws-q20': 'probability-basics', // Band, sport, both, neither (set problem)

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 2 — Topic 1: Solving Linear Equations
  // ═══════════════════════════════════════════════════════════════════════════
  'w2-t1-q1': 'one-step-equations', // x + 17 = 42
  'w2-t1-q2': 'two-step-equations', // 12h + 20 = 68
  'w2-t1-q3': 'multi-step-equations', // 4(x - 3) = 2x + 10
  'w2-t1-q4': 'multi-step-equations', // 7x - 5 = 3x + 19
  'w2-t1-q5': 'two-step-equations', // (2x + 1)/3 = 5

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 2 — Topic 2: Graphing Linear Equations
  // ═══════════════════════════════════════════════════════════════════════════
  'w2-t2-q1': 'slope-intercept-form', // y = 3x - 2, slope and y-intercept
  'w2-t2-q2': 'slope-concept', // Slope through (1,4) and (5,12)
  'w2-t2-q3': 'slope-intercept-form', // Plumber C = 30h + 50, what does 30 mean
  'w2-t2-q4': 'slope-intercept-form', // Line through (0,5), slope -2
  'w2-t2-q5': 'graphing-lines', // Perpendicular to y = 4x + 1

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 2 — Quiz
  // ═══════════════════════════════════════════════════════════════════════════
  'w2-quiz-q1': 'one-step-equations', // x - 14 = 23
  'w2-quiz-q2': 'two-step-equations', // 3y + 8 = 29
  'w2-quiz-q3': 'two-step-equations', // Gym: 25m + 40 = 215
  'w2-quiz-q4': 'multi-step-equations', // 5(x - 2) = 3x + 6
  'w2-quiz-q5': 'slope-intercept-form', // Slope of y = -5x + 3
  'w2-quiz-q6': 'slope-concept', // Slope through (-2,3) and (4,-9)
  'w2-quiz-q7': 'slope-intercept-form', // Slope 2/3, y-int -4
  'w2-quiz-q8': 'two-step-equations', // (x + 4)/2 = 9
  'w2-quiz-q9': 'two-step-equations', // Taxi: 2.50m + 3 = 15.50
  'w2-quiz-q10': 'graphing-lines', // Line through (2,1) and (6,9), equation

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 2 — Worksheet
  // ═══════════════════════════════════════════════════════════════════════════
  'w2-ws-q1': 'combining-like-terms', // 3x + 7x
  'w2-ws-q2': 'combining-like-terms', // 5a - 2a + 4
  'w2-ws-q3': 'combining-like-terms', // 2(3x + 4) - 5x
  'w2-ws-q4': 'combining-like-terms', // 4(2y - 1) + 3(y + 5)
  'w2-ws-q5': 'combining-like-terms', // 6m - 2(m + 3) + 8
  'w2-ws-q6': 'one-step-equations', // x + 9 = 17
  'w2-ws-q7': 'one-step-equations', // 3y = 21
  'w2-ws-q8': 'two-step-equations', // 2x + 5 = 19
  'w2-ws-q9': 'two-step-equations', // n/4 - 3 = 2
  'w2-ws-q10': 'two-step-equations', // 5w - 8 = 22
  'w2-ws-q11': 'two-step-equations', // 3(x + 2) = 24
  'w2-ws-q12': 'multi-step-equations', // 4a - 7 = 2a + 9
  'w2-ws-q13': 'multi-step-equations', // 2(x - 3) + 4 = 3x - 8
  'w2-ws-q14': 'multi-step-equations', // 5(y + 1) = 3(y + 3) + 2
  'w2-ws-q15': 'multi-step-equations', // (m + 6)/3 = (2m - 1)/4
  'w2-ws-q16': 'slope-intercept-form', // Slope and y-int of y = 3x - 5
  'w2-ws-q17': 'slope-concept', // Slope through (2,3) and (6,11)
  'w2-ws-q18': 'slope-intercept-form', // Equation: slope 2, through (0,-4)
  'w2-ws-q19': 'graphing-lines', // Line through (1,5) and (3,11)
  'w2-ws-q20': 'slope-intercept-form', // Convert 2x + 3y = 12 to slope-int form

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 3 — Topic 1: Systems of Equations
  // ═══════════════════════════════════════════════════════════════════════════
  'w3-t1-q1': 'systems-substitution', // y = x + 3, x + y = 11
  'w3-t1-q2': 'systems-elimination', // 3x + y = 14, 3x - y = 10
  'w3-t1-q3': 'systems-substitution', // Phone plans equal cost
  'w3-t1-q4': 'systems-elimination', // 2x + 3y = 16, 5x + 3y = 25
  'w3-t1-q5': 'systems-elimination', // Adult $8 student $5, 200 tickets, $1180

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 3 — Topic 2: Inequalities
  // ═══════════════════════════════════════════════════════════════════════════
  'w3-t2-q1': 'linear-inequalities', // 2x + 5 > 13
  'w3-t2-q2': 'linear-inequalities', // -3x <= 12
  'w3-t2-q3': 'linear-inequalities', // $50, books $7 each, $8 lunch, max books
  'w3-t2-q4': 'linear-inequalities', // Compound: -1 <= 2x - 5 < 7
  'w3-t2-q5': 'linear-inequalities', // -2(x + 4) >= 3x + 7

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 3 — Quiz
  // ═══════════════════════════════════════════════════════════════════════════
  'w3-quiz-q1': 'systems-substitution', // y = 2x, x + y = 15
  'w3-quiz-q2': 'linear-inequalities', // 4x - 1 > 11
  'w3-quiz-q3': 'systems-elimination', // x + y = 20, x - y = 6
  'w3-quiz-q4': 'linear-inequalities', // -5x + 2 >= 22
  'w3-quiz-q5': 'systems-substitution', // y = 3x - 1, 2x + y = 14
  'w3-quiz-q6': 'systems-elimination', // Child $6, adult $10, 150 tickets, $1260
  'w3-quiz-q7': 'linear-inequalities', // Minimum score: 2x - 15 >= 80
  'w3-quiz-q8': 'systems-elimination', // 4x + 2y = 22, 3x + 2y = 17
  'w3-quiz-q9': 'linear-inequalities', // Compound: 3 < 2x + 1 <= 11
  'w3-quiz-q10': 'systems-elimination', // 3x + 4y = 32, 2x - 4y = -12

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 4 — Topic 1: Percentages in Real Life
  // ═══════════════════════════════════════════════════════════════════════════
  'w4-t1-q1': 'percent-change', // Shirt $45, 20% off
  'w4-t1-q2': 'percent-change', // Population 8000 to 9200
  'w4-t1-q3': 'percent-change', // Shoes $80, 15% discount + 8% tax
  'w4-t1-q4': 'percent-change', // Stock +25% then -20%
  'w4-t1-q5': 'percent-change', // 30% off, laptop costs $490, original?

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 4 — Topic 2: Reading Charts, Tables, Graphs
  // ═══════════════════════════════════════════════════════════════════════════
  'w4-t2-q1': 'reading-tables', // Highest score from a table
  'w4-t2-q2': 'reading-tables', // Survey 200 students, sandwiches count
  'w4-t2-q3': 'scatterplots', // Scatterplot trend upward, association
  'w4-t2-q4': 'probability-basics', // Two-way table, probability girl plays sport
  'w4-t2-q5': 'reading-graphs', // Bar graph, store sales increase comparison

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 4 — Topic 3: Mean, Median, Mode, Range
  // ═══════════════════════════════════════════════════════════════════════════
  'w4-t3-q1': 'mean-median-mode', // Mean of 12,15,18,21,24
  'w4-t3-q2': 'mean-median-mode', // Median of 7,3,9,1,5,8,2
  'w4-t3-q3': 'mean-median-mode', // Score needed for avg 85
  'w4-t3-q4': 'mean-median-mode', // Adding 7 to {3,5,7,9,11}, effect
  'w4-t3-q5': 'mean-median-mode', // Outlier 100, which changes most

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 4 — Topic 4: Probability Basics
  // ═══════════════════════════════════════════════════════════════════════════
  'w4-t4-q1': 'probability-basics', // P(blue) from bag
  'w4-t4-q2': 'probability-compound', // P(heads twice) = 1/4
  'w4-t4-q3': 'probability-basics', // P(not red) complement
  'w4-t4-q4': 'probability-compound', // P(6 and heads) = 1/12
  'w4-t4-q5': 'probability-compound', // P(both black socks) with replacement

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 4 — Quiz
  // ═══════════════════════════════════════════════════════════════════════════
  'w4-quiz-q1': 'percent-of-number', // 18% tip on $65
  'w4-quiz-q2': 'mean-median-mode', // Median of 14,22,9,17,31,22,11
  'w4-quiz-q3': 'probability-basics', // P(>5) on spinner 1-8
  'w4-quiz-q4': 'reading-tables', // Survey 250 students, English count
  'w4-quiz-q5': 'percent-change', // Car $25k to $20k
  'w4-quiz-q6': 'mean-median-mode', // Mean of 18,22,15,25,20
  'w4-quiz-q7': 'probability-compound', // P(even or >7) from tiles 1-10
  'w4-quiz-q8': 'percent-change', // TV $450 after 25% off, original
  'w4-quiz-q9': 'mean-median-mode', // Score needed for mean 84
  'w4-quiz-q10': 'percent-change', // Markup 60% then 25% off

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 5 — Topic 1: Area, Perimeter, Volume
  // ═══════════════════════════════════════════════════════════════════════════
  'w5-t1-q1': 'perimeter-area-rectangles', // Rectangle 15x8 area
  'w5-t1-q2': 'area-triangles', // Triangle base 12, height 9
  'w5-t1-q3': 'area-circles', // Circle diameter 10, area
  'w5-t1-q4': 'volume-prisms', // Box 4x3x5 volume
  'w5-t1-q5': 'perimeter-area-rectangles', // L-shaped room, two rectangles

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 5 — Topic 2: Angles and Triangles
  // ═══════════════════════════════════════════════════════════════════════════
  'w5-t2-q1': 'triangle-properties', // Third angle: 55, 80, ?
  'w5-t2-q2': 'angle-relationships', // Supplementary: 132, ?
  'w5-t2-q3': 'angle-relationships', // Parallel lines transversal, alt int angle
  'w5-t2-q4': 'proportions', // Similar triangles AB=6 BC=10 DE=9 EF=?
  'w5-t2-q5': 'triangle-properties', // Angles ratio 2:3:4, largest

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 5 — Topic 3: Pythagorean Theorem
  // ═══════════════════════════════════════════════════════════════════════════
  'w5-t3-q1': 'pythagorean-theorem', // Legs 6 and 8, hypotenuse
  'w5-t3-q2': 'pythagorean-theorem', // Hypotenuse 13, leg 5, other leg
  'w5-t3-q3': 'pythagorean-theorem', // Ladder 15ft, 9ft from wall
  'w5-t3-q4': 'pythagorean-theorem', // Rectangle diagonal 12x5
  'w5-t3-q5': 'pythagorean-theorem', // Distance (1,2) to (4,6)

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 5 — Topic 4: Quadratic Equations
  // ═══════════════════════════════════════════════════════════════════════════
  'w5-t4-q1': 'factoring-trinomials', // x^2 + 7x + 12 = 0
  'w5-t4-q2': 'factoring-trinomials', // x^2 - 5x - 14 = 0
  'w5-t4-q3': 'quadratic-formula', // 2x^2 - 3x - 5 = 0
  'w5-t4-q4': 'quadratic-formula', // Ball h = -16t^2 + 48t + 5, ground
  'w5-t4-q5': 'quadratic-formula', // Vertex of y = x^2 - 6x + 5

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 5 — Topic 5: Functions
  // ═══════════════════════════════════════════════════════════════════════════
  'w5-t5-q1': 'function-evaluation', // f(x) = 4x - 7, f(5)
  'w5-t5-q2': 'function-evaluation', // g(x) = x^2 + 1, g(-3)
  'w5-t5-q3': 'function-evaluation', // f(x) = 2x + 3, f(x) = 15
  'w5-t5-q4': 'function-notation', // Table: rule for f(x)
  'w5-t5-q5': 'function-evaluation', // f(g(2)): composition

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 5 — Topic 6: Exponents and Radicals
  // ═══════════════════════════════════════════════════════════════════════════
  'w5-t6-q1': 'exponent-rules', // x^4 * x^3
  'w5-t6-q2': 'exponent-rules', // (2x^3)^2
  'w5-t6-q3': 'simplifying-radicals', // sqrt(48)
  'w5-t6-q4': 'negative-exponents', // 5^(-2)
  'w5-t6-q5': 'simplifying-radicals', // 6 / sqrt(3), rationalize

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 5 — Quiz
  // ═══════════════════════════════════════════════════════════════════════════
  'w5-quiz-q1': 'perimeter-area-rectangles', // Perimeter 14x9
  'w5-quiz-q2': 'pythagorean-theorem', // Legs 5 and 12, hypotenuse
  'w5-quiz-q3': 'triangle-properties', // Angles x, 2x, 3x
  'w5-quiz-q4': 'volume-prisms', // Box 6x3x5 volume
  'w5-quiz-q5': 'factoring-trinomials', // x^2 - 16 = 0
  'w5-quiz-q6': 'function-evaluation', // f(x) = 5x - 3, f(6)
  'w5-quiz-q7': 'simplifying-radicals', // sqrt(50)
  'w5-quiz-q8': 'factoring-trinomials', // x^2 + 3x - 10 = 0
  'w5-quiz-q9': 'area-circles', // Circle diameter 14, area
  'w5-quiz-q10': 'function-evaluation', // g(x) = x^2 + 2x - 8, g(-3)

  // ═══════════════════════════════════════════════════════════════════════════
  // PRACTICE TEST 1 — Module 1 (pt1-m1-q1 through pt1-m1-q22)
  // ═══════════════════════════════════════════════════════════════════════════
  'pt1-m1-q1': 'fraction-operations', // 3/4 + 1/8
  'pt1-m1-q2': 'one-step-equations', // 5x = 45
  'pt1-m1-q3': 'reading-tables', // Laps table, total
  'pt1-m1-q4': 'perimeter-area-rectangles', // Rectangle 12x7 area
  'pt1-m1-q5': 'percent-change', // Shirt $40, 25% off
  'pt1-m1-q6': 'ratios', // Red:blue 3:5, 15 red, blue?
  'pt1-m1-q7': 'order-of-operations', // 4(3 + 2) - 7
  'pt1-m1-q8': 'multi-step-equations', // 3(y - 4) + 2 = 17
  'pt1-m1-q9': 'slope-concept', // Slope through (2,3) and (6,11)
  'pt1-m1-q10': 'percent-of-number', // Bicycle $120 + 8% tax
  'pt1-m1-q11': 'mean-median-mode', // Median of 78,85,90,85,92
  'pt1-m1-q12': 'probability-basics', // P(green) from jar
  'pt1-m1-q13': 'systems-elimination', // x + y = 10, x - y = 4
  'pt1-m1-q14': 'area-circles', // Circle radius 5, area
  'pt1-m1-q15': 'scatterplots', // Scatterplot positive linear association
  'pt1-m1-q16': 'slope-intercept-form', // Plumber: 35h + 50 = 225
  'pt1-m1-q17': 'function-evaluation', // f(g(3)): f(x)=2x+1, g(x)=x^2
  'pt1-m1-q18': 'factoring-trinomials', // x^2 - 5x + 6 = 0
  'pt1-m1-q19': 'systems-substitution', // Cupcakes $3, cookies $2, 50 items, $130
  'pt1-m1-q20': 'reading-tables', // Survey 400, smartphone/tablet overlap
  'pt1-m1-q21': 'pythagorean-theorem', // Legs 5,12, square on hypotenuse area
  'pt1-m1-q22': 'multi-step-equations', // Car rental: 25 + 0.15m = 0.40m

  // ═══════════════════════════════════════════════════════════════════════════
  // PRACTICE TEST 1 — Module 2 (pt1-m2-q1 through pt1-m2-q22)
  // ═══════════════════════════════════════════════════════════════════════════
  'pt1-m2-q1': 'mean-median-mode', // Range of temperatures
  'pt1-m2-q2': 'slope-intercept-form', // y-intercept of y = 3x - 7
  'pt1-m2-q3': 'unit-rates', // Bus 12 mi * 8 trips * 6 days
  'pt1-m2-q4': 'multi-step-equations', // 2(x + 3) = 5x - 9
  'pt1-m2-q5': 'area-triangles', // Triangle (0,0),(8,0),(0,6) area
  'pt1-m2-q6': 'factoring-gcf', // 3x^2 - 12 = 3(x-2)(x+2)
  'pt1-m2-q7': 'reading-tables', // Cafeteria survey, % pizza or chicken
  'pt1-m2-q8': 'multi-step-equations', // Train 80mph, car 100mph 1hr later
  'pt1-m2-q9': 'function-evaluation', // f(x) = x^2 - 4x + 3, f(5)
  'pt1-m2-q10': 'percent-change', // Jacket $80 to $100
  'pt1-m2-q11': 'volume-prisms', // V = lwh, find height
  'pt1-m2-q12': 'multi-step-equations', // No-solution equation 3x+5=3x-2
  'pt1-m2-q13': 'percent-of-number', // 500 employees, 60% drive, 40% >30min
  'pt1-m2-q14': 'foil-method', // (2x + 3)(x - 4)
  'pt1-m2-q15': 'linear-inequalities', // 500 - 15t < 50
  'pt1-m2-q16': 'multi-step-equations', // 2x + k = 6x - 12, x = 5, find k
  'pt1-m2-q17': 'quadratic-formula', // h(t) = -16t^2 + 48t, max height time
  'pt1-m2-q18': 'slope-intercept-form', // Perpendicular to 3x + 4y = 12
  'pt1-m2-q19': 'linear-inequalities', // 50h + 150 <= 600
  'pt1-m2-q20': 'exponential-growth', // f(x) = 2^x, graph properties
  'pt1-m2-q21': 'volume-prisms', // Cylinder r=3 h=20 volume
  'pt1-m2-q22': 'exponential-growth', // Bacteria doubles every 3hr, expression

  // ═══════════════════════════════════════════════════════════════════════════
  // PRACTICE TEST 2 — Module 1 (pt2-m1-q1 through pt2-m1-q22)
  // ═══════════════════════════════════════════════════════════════════════════
  'pt2-m1-q1': 'decimal-operations', // 2.5 + 0.75
  'pt2-m1-q2': 'one-step-equations', // n - 8 = 15
  'pt2-m1-q3': 'reading-graphs', // Bar graph, students with >= 2 pets
  'pt2-m1-q4': 'perimeter-area-rectangles', // Rectangle 30x24 area
  'pt2-m1-q5': 'percent-of-number', // 36/48 as percentage
  'pt2-m1-q6': 'ratios', // Flour:sugar 4:1, 3 cups sugar
  'pt2-m1-q7': 'order-of-operations', // 2(6) - 3(2) + 1
  'pt2-m1-q8': 'two-step-equations', // x/4 + 3 = 7
  'pt2-m1-q9': 'slope-concept', // Slope through (-1,4) and (3,-8)
  'pt2-m1-q10': 'percent-change', // School 800 to 920 students
  'pt2-m1-q11': 'mean-median-mode', // Mean of 12,15,15,18,20,22,25
  'pt2-m1-q12': 'probability-basics', // P(blue or green) from deck
  'pt2-m1-q13': 'systems-elimination', // 2x+y=11, x-y=1
  'pt2-m1-q14': 'area-circles', // Circumference 31.4, find radius
  'pt2-m1-q15': 'scatterplots', // Temp vs birds, negative association
  'pt2-m1-q16': 'slope-intercept-form', // Gym: C = 30m + 75
  'pt2-m1-q17': 'function-evaluation', // g(f(4)): f(x)=3x-2, g(x)=x+5
  'pt2-m1-q18': 'factoring-trinomials', // x^2 + 2x - 15 = 0
  'pt2-m1-q19': 'systems-substitution', // Adult $12, child $8, 150 tickets $1560
  'pt2-m1-q20': 'probability-basics', // Soccer/basketball/both/neither
  'pt2-m1-q21': 'pythagorean-theorem', // Ladder 13ft, 5ft from wall
  'pt2-m1-q22': 'multi-step-equations', // Phone plan: 45(3) + 55(m-3)

  // ═══════════════════════════════════════════════════════════════════════════
  // PRACTICE TEST 2 — Module 2 (pt2-m2-q1 through pt2-m2-q22)
  // ═══════════════════════════════════════════════════════════════════════════
  'pt2-m2-q1': 'mean-median-mode', // Mean of laptop sales
  'pt2-m2-q2': 'graphing-lines', // Line through (0,4) and (3,13)
  'pt2-m2-q3': 'unit-rates', // Factory 240/shift, 3 shifts, 5 days
  'pt2-m2-q4': 'multi-step-equations', // 4(2x-1) = 3(x+6)
  'pt2-m2-q5': 'area-triangles', // Trapezoid 10,14 bases, height 6
  'pt2-m2-q6': 'foil-method', // (x + 4)^2
  'pt2-m2-q7': 'reading-tables', // Library survey, fraction mystery+sci-fi
  'pt2-m2-q8': 'pythagorean-theorem', // Two hikers, N and E, distance after 2hr
  'pt2-m2-q9': 'quadratic-formula', // h(x)=-x^2+6x-5, max value (vertex)
  'pt2-m2-q10': 'exponential-growth', // Pop 12000, -5%/yr, expression
  'pt2-m2-q11': 'pythagorean-theorem', // Square area 196, diagonal
  'pt2-m2-q12': 'multi-step-equations', // 3x + b = 7x - 20, x=8, find b
  'pt2-m2-q13': 'percent-of-number', // 600 parents, 70% support, 60% Plan A
  'pt2-m2-q14': 'foil-method', // (3x - 2)(2x + 5)
  'pt2-m2-q15': 'slope-intercept-form', // Gas: g(d) = 16 - 0.04d
  'pt2-m2-q16': 'line-of-best-fit', // y = 5x + 60, score 85, hours?
  'pt2-m2-q17': 'quadratic-formula', // Rock h=-16t^2+32t+48, ground
  'pt2-m2-q18': 'slope-intercept-form', // Slope 2/3, point (6,1), y-intercept
  'pt2-m2-q19': 'linear-inequalities', // 75f + 50(1200-f) >= 70000
  'pt2-m2-q20': 'exponent-rules', // 27^(2/3)
  'pt2-m2-q21': 'pythagorean-theorem', // Cone r=6, slant=10, height
  'pt2-m2-q22': 'exponential-growth', // Savings $500, 4% compound yearly
};

/**
 * Returns the skill ID for a given question ID, or undefined if not mapped.
 */
export function getQuestionSkill(questionId: string): string | undefined {
  return questionSkillMap[questionId];
}
