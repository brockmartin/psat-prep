import type { PracticeTest, Question } from '@/types/content';

// ─── Practice Test 1, Module 1 (Questions 1-22: Easy → Hard) ─────────────────
const pt1Module1: Question[] = [
  // ── Easy (Q1-Q7) ──────────────────────────────────────────────────────────
  {
    id: 'pt1-m1-q1',
    text: 'What is the value of 3/4 + 1/8?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '4/12' },
      { label: 'B', text: '7/8' },
      { label: 'C', text: '1' },
      { label: 'D', text: '4/8' },
    ],
    correctAnswer: 'B',
    explanation:
      'Convert 3/4 to eighths: 3/4 = 6/8. Then 6/8 + 1/8 = 7/8.',
    difficulty: 1,
    domain: 'problem_solving',
  },
  {
    id: 'pt1-m1-q2',
    text: 'Solve for x: 5x = 45',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '5' },
      { label: 'B', text: '9' },
      { label: 'C', text: '40' },
      { label: 'D', text: '50' },
    ],
    correctAnswer: 'B',
    explanation:
      'Divide both sides by 5: x = 45 / 5 = 9. Option A (5) is the coefficient, not the answer. Option C (40) comes from subtracting instead of dividing.',
    difficulty: 1,
    domain: 'algebra',
  },
  {
    id: 'pt1-m1-q3',
    text: 'A coach records the number of laps each player ran during practice.\n\n| Player | Laps |\n|---|---|\n| Anna | 6 |\n| Ben | 9 |\n| Carlos | 7 |\n| Diana | 10 |\n\nWhat is the total number of laps run by all four players?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '28' },
      { label: 'B', text: '30' },
      { label: 'C', text: '32' },
      { label: 'D', text: '36' },
    ],
    correctAnswer: 'C',
    explanation:
      'Add all laps: 6 + 9 + 7 + 10 = 32. Option A (28) comes from miscounting one player. Option C is correct.',
    difficulty: 1,
    domain: 'problem_solving',
  },
  {
    id: 'pt1-m1-q4',
    text: 'A garden has the shape of a rectangle with a length of 12 feet and a width of 7 feet. What is the area of the garden, in square feet?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '38' },
      { label: 'B', text: '19' },
      { label: 'C', text: '84' },
      { label: 'D', text: '96' },
    ],
    correctAnswer: 'C',
    explanation:
      'Area of a rectangle = length times width = 12 * 7 = 84 square feet. Option A (38) is the perimeter. Option B (19) is length + width.',
    difficulty: 1,
    domain: 'geometry',
  },
  {
    id: 'pt1-m1-q5',
    text: 'A shirt originally costs $40. It is on sale for 25% off. What is the sale price of the shirt?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '$10' },
      { label: 'B', text: '$15' },
      { label: 'C', text: '$25' },
      { label: 'D', text: '$30' },
    ],
    correctAnswer: 'D',
    explanation:
      '25% of $40 = 0.25 * 40 = $10 discount. Sale price = $40 - $10 = $30. Option A ($10) is just the discount. Option C ($25) confuses 25% off with a $25 price.',
    difficulty: 1,
    domain: 'problem_solving',
  },
  {
    id: 'pt1-m1-q6',
    text: 'In a bag of marbles, the ratio of red marbles to blue marbles is 3 to 5. If there are 15 red marbles, how many blue marbles are there?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '9' },
      { label: 'B', text: '20' },
      { label: 'C', text: '25' },
      { label: 'D', text: '45' },
    ],
    correctAnswer: 'C',
    explanation:
      'The ratio is 3:5. If red = 15, the multiplier is 15/3 = 5. Blue = 5 * 5 = 25. Option B (20) adds 5 to 15. Option A (9) is 3 * 3.',
    difficulty: 1,
    domain: 'problem_solving',
  },
  {
    id: 'pt1-m1-q7',
    text: 'What is the value of 4(3 + 2) - 7?',
    type: 'student_produced',
    correctAnswer: '13',
    explanation:
      'First evaluate inside the parentheses: 3 + 2 = 5. Then multiply: 4 * 5 = 20. Finally subtract: 20 - 7 = 13.',
    difficulty: 1,
    domain: 'algebra',
  },
  // ── Medium (Q8-Q15) ───────────────────────────────────────────────────────
  {
    id: 'pt1-m1-q8',
    text: 'Solve for y: 3(y - 4) + 2 = 17',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '3' },
      { label: 'B', text: '7' },
      { label: 'C', text: '9' },
      { label: 'D', text: '11' },
    ],
    correctAnswer: 'C',
    explanation:
      'Distribute: 3y - 12 + 2 = 17. Combine: 3y - 10 = 17. Add 10: 3y = 27. Divide by 3: y = 9. Option B (7) comes from forgetting to distribute the 3. Option D (11) comes from adding 12 + 2 instead of -12 + 2.',
    difficulty: 2,
    domain: 'algebra',
  },
  {
    id: 'pt1-m1-q9',
    text: 'What is the slope of the line that passes through the points (2, 3) and (6, 11)?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '1/2' },
      { label: 'B', text: '2' },
      { label: 'C', text: '4' },
      { label: 'D', text: '8' },
    ],
    correctAnswer: 'B',
    explanation:
      'Slope = (y2 - y1) / (x2 - x1) = (11 - 3) / (6 - 2) = 8/4 = 2. Option A (1/2) is the reciprocal. Option D (8) is just the rise without dividing by the run.',
    difficulty: 2,
    domain: 'algebra',
  },
  {
    id: 'pt1-m1-q10',
    text: 'A bicycle costs $120 before tax. After an 8% sales tax is added, what is the total cost of the bicycle?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '$9.60' },
      { label: 'B', text: '$96.00' },
      { label: 'C', text: '$128.00' },
      { label: 'D', text: '$129.60' },
    ],
    correctAnswer: 'D',
    explanation:
      'Tax = 8% of $120 = 0.08 * 120 = $9.60. Total = $120 + $9.60 = $129.60. Option A ($9.60) is just the tax. Option C ($128) miscalculates by adding 8 dollars instead of 8%.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'pt1-m1-q11',
    text: 'A student records these quiz scores: 78, 85, 90, 85, 92. What is the median score?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '78' },
      { label: 'B', text: '85' },
      { label: 'C', text: '86' },
      { label: 'D', text: '90' },
    ],
    correctAnswer: 'B',
    explanation:
      'First sort the scores: 78, 85, 85, 90, 92. With 5 values, the median is the 3rd value: 85. Option C (86) is the mean. Option D (90) is the second-highest score.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'pt1-m1-q12',
    text: 'A jar contains 6 red, 4 green, and 10 yellow candies. If one candy is chosen at random, what is the probability that it is green?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '1/5' },
      { label: 'B', text: '1/4' },
      { label: 'C', text: '2/5' },
      { label: 'D', text: '1/10' },
    ],
    correctAnswer: 'A',
    explanation:
      'Total candies = 6 + 4 + 10 = 20. Probability of green = 4/20 = 1/5. Option B (1/4) uses only the non-green candies as the total. Option D (1/10) puts 4 over only the yellow count.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'pt1-m1-q13',
    text: 'What is the solution to the system of equations?\n\nx + y = 10\nx - y = 4',
    type: 'student_produced',
    correctAnswer: '7',
    explanation:
      'Add the two equations: (x + y) + (x - y) = 10 + 4, so 2x = 14, giving x = 7. Then y = 10 - 7 = 3. The value of x is 7.',
    difficulty: 2,
    domain: 'algebra',
  },
  {
    id: 'pt1-m1-q14',
    text: 'A circular swimming pool has a radius of 5 meters. What is the area of the pool? (Use pi = 3.14)',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '15.70 square meters' },
      { label: 'B', text: '31.40 square meters' },
      { label: 'C', text: '78.50 square meters' },
      { label: 'D', text: '314.00 square meters' },
    ],
    correctAnswer: 'C',
    explanation:
      'Area of a circle = pi * r^2 = 3.14 * 5^2 = 3.14 * 25 = 78.50 square meters. Option B (31.40) is the circumference (2 * pi * r). Option A (15.70) is pi * r.',
    difficulty: 2,
    domain: 'geometry',
  },
  {
    id: 'pt1-m1-q15',
    text: 'A researcher measures plant growth over 5 weeks and plots the data on a scatterplot. The points closely follow a straight line going upward from left to right. Which statement best describes the relationship between time and plant growth?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'There is a negative linear association.' },
      { label: 'B', text: 'There is a positive linear association.' },
      { label: 'C', text: 'There is no association.' },
      { label: 'D', text: 'There is a nonlinear association.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Points following a straight line going upward from left to right indicate a positive linear association. Negative would go downward. Nonlinear would curve.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  // ── Hard (Q16-Q22) ────────────────────────────────────────────────────────
  {
    id: 'pt1-m1-q16',
    text: 'A plumber charges a $50 service fee plus $35 per hour of labor. If a customer pays a total of $225, which equation can be used to find h, the number of hours of labor?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '50h + 35 = 225' },
      { label: 'B', text: '35h + 50 = 225' },
      { label: 'C', text: '85h = 225' },
      { label: 'D', text: '35h - 50 = 225' },
    ],
    correctAnswer: 'B',
    explanation:
      'Total = service fee + hourly rate * hours. So 35h + 50 = 225. Option A reverses the fee and rate. Option C adds the fee and rate together as a single rate. Solving: 35h = 175, so h = 5.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt1-m1-q17',
    text: 'If f(x) = 2x + 1 and g(x) = x^2, what is the value of f(g(3))?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '7' },
      { label: 'B', text: '13' },
      { label: 'C', text: '19' },
      { label: 'D', text: '49' },
    ],
    correctAnswer: 'C',
    explanation:
      'First find g(3) = 3^2 = 9. Then f(9) = 2(9) + 1 = 19. Option B (13) computes f(3) * 2 - 1 incorrectly. Option D (49) computes g(f(3)) instead.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  {
    id: 'pt1-m1-q18',
    text: 'What are the solutions to the equation x^2 - 5x + 6 = 0?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'x = 1 and x = 6' },
      { label: 'B', text: 'x = -2 and x = -3' },
      { label: 'C', text: 'x = 2 and x = 3' },
      { label: 'D', text: 'x = -1 and x = 6' },
    ],
    correctAnswer: 'C',
    explanation:
      'Factor: (x - 2)(x - 3) = 0. So x = 2 or x = 3. Check: 2*3 = 6 and 2+3 = 5. Option B uses the wrong signs. Option A (1 and 6) has the right product but wrong sum.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  {
    id: 'pt1-m1-q19',
    text: 'A bakery sells cupcakes and cookies. Each cupcake costs $3 and each cookie costs $2. On Monday, the bakery sold a total of 50 items and earned $130. How many cupcakes were sold?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '20' },
      { label: 'B', text: '25' },
      { label: 'C', text: '30' },
      { label: 'D', text: '35' },
    ],
    correctAnswer: 'C',
    explanation:
      'Let c = cupcakes, k = cookies. c + k = 50 and 3c + 2k = 130. From the first equation, k = 50 - c. Substitute: 3c + 2(50 - c) = 130. 3c + 100 - 2c = 130. c = 30. Check: 30 cupcakes at $3 = $90, 20 cookies at $2 = $40. Total = $130.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt1-m1-q20',
    text: 'A survey of 400 adults found that 68% own a smartphone and 45% own a tablet. If 30% own both, how many adults own a smartphone but not a tablet?',
    type: 'student_produced',
    correctAnswer: '152',
    explanation:
      'Smartphone owners = 68% of 400 = 272. Both = 30% of 400 = 120. Smartphone only = 272 - 120 = 152.',
    difficulty: 3,
    domain: 'problem_solving',
  },
  {
    id: 'pt1-m1-q21',
    text: 'A right triangle has legs of length 5 cm and 12 cm. A square is drawn on the hypotenuse. What is the area of that square, in square centimeters?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '60' },
      { label: 'B', text: '119' },
      { label: 'C', text: '144' },
      { label: 'D', text: '169' },
    ],
    correctAnswer: 'D',
    explanation:
      'By the Pythagorean theorem, hypotenuse^2 = 5^2 + 12^2 = 25 + 144 = 169. The area of the square on the hypotenuse equals hypotenuse^2 = 169. Option C (144) uses only one leg squared.',
    difficulty: 3,
    domain: 'geometry',
  },
  {
    id: 'pt1-m1-q22',
    text: 'A car rental company charges a flat fee of $25 plus $0.15 per mile driven. A competing company charges no flat fee but $0.40 per mile. After how many miles will both companies charge the same amount?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '62.5' },
      { label: 'B', text: '100' },
      { label: 'C', text: '125' },
      { label: 'D', text: '166.7' },
    ],
    correctAnswer: 'B',
    explanation:
      'Set the costs equal: 25 + 0.15m = 0.40m. Subtract 0.15m: 25 = 0.25m. Divide: m = 100. Check: Company 1 charges 25 + 15 = $40. Company 2 charges 0.40 * 100 = $40.',
    difficulty: 3,
    domain: 'algebra',
  },
];

// ─── Practice Test 1, Module 2 (Questions 23-44: Medium-Hard → Hard) ─────────
const pt1Module2: Question[] = [
  {
    id: 'pt1-m2-q1',
    text: 'A scientist collects data on the temperature (in degrees Fahrenheit) at noon for 7 consecutive days: 62, 65, 59, 71, 68, 73, 66. What is the range of the temperatures?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '11' },
      { label: 'B', text: '14' },
      { label: 'C', text: '66' },
      { label: 'D', text: '73' },
    ],
    correctAnswer: 'B',
    explanation:
      'Range = maximum - minimum = 73 - 59 = 14. Option A (11) subtracts the two highest. Option C and D are individual data values, not the range.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'pt1-m2-q2',
    text: 'The equation y = 3x - 7 represents a line. What is the y-intercept of this line?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '-7' },
      { label: 'B', text: '-3' },
      { label: 'C', text: '3' },
      { label: 'D', text: '7' },
    ],
    correctAnswer: 'A',
    explanation:
      'In slope-intercept form y = mx + b, the y-intercept is b. Here b = -7. Option C (3) is the slope. Option D (7) has the wrong sign.',
    difficulty: 2,
    domain: 'algebra',
  },
  {
    id: 'pt1-m2-q3',
    text: 'A city bus makes a 12-mile round trip 8 times per day. The bus operates 6 days per week. How many miles does the bus travel in one week?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '96' },
      { label: 'B', text: '480' },
      { label: 'C', text: '576' },
      { label: 'D', text: '672' },
    ],
    correctAnswer: 'C',
    explanation:
      'Miles per day = 12 * 8 = 96. Miles per week = 96 * 6 = 576. Option A (96) is only one day. Option B (480) miscalculates 12 * 8 * 5. Option D uses 7 days.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'pt1-m2-q4',
    text: 'If 2(x + 3) = 5x - 9, what is the value of x?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '1' },
      { label: 'B', text: '3' },
      { label: 'C', text: '5' },
      { label: 'D', text: '15' },
    ],
    correctAnswer: 'C',
    explanation:
      'Distribute: 2x + 6 = 5x - 9. Subtract 2x: 6 = 3x - 9. Add 9: 15 = 3x. Divide by 3: x = 5. Check: 2(8) = 16, 5(5) - 9 = 16.',
    difficulty: 2,
    domain: 'algebra',
  },
  {
    id: 'pt1-m2-q5',
    text: 'A triangle has vertices at (0, 0), (8, 0), and (0, 6). What is the area of the triangle?',
    type: 'student_produced',
    correctAnswer: '24',
    explanation:
      'This is a right triangle with base = 8 and height = 6. Area = (1/2) * base * height = (1/2)(8)(6) = 24.',
    difficulty: 2,
    domain: 'geometry',
  },
  {
    id: 'pt1-m2-q6',
    text: 'Which of the following is equivalent to the expression 3x^2 - 12?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '3(x^2 - 4)' },
      { label: 'B', text: '3(x - 4)(x + 4)' },
      { label: 'C', text: '3(x - 2)(x + 2)' },
      { label: 'D', text: '(3x - 12)(x + 1)' },
    ],
    correctAnswer: 'C',
    explanation:
      'Factor out 3: 3(x^2 - 4). Then recognize x^2 - 4 as a difference of squares: (x - 2)(x + 2). So 3(x - 2)(x + 2). Option A is partially factored. Option B uses 4 instead of 2.',
    difficulty: 2,
    domain: 'advanced_math',
  },
  {
    id: 'pt1-m2-q7',
    text: 'A school cafeteria surveys 300 students about their favorite lunch. The results are:\n\n| Meal | Students |\n|---|---|\n| Pizza | 105 |\n| Chicken | 75 |\n| Pasta | 60 |\n| Salad | 60 |\n\nWhat percentage of the students chose either pizza or chicken?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '35%' },
      { label: 'B', text: '50%' },
      { label: 'C', text: '55%' },
      { label: 'D', text: '60%' },
    ],
    correctAnswer: 'D',
    explanation:
      'Pizza + Chicken = 105 + 75 = 180. Percentage = 180/300 = 0.60 = 60%. Option A (35%) is pizza alone. Option B (50%) is half.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'pt1-m2-q8',
    text: 'A train travels at a constant speed of 80 miles per hour. A car leaves the same station 1 hour later traveling at 100 miles per hour in the same direction. After how many hours (from when the car leaves) will the car catch up to the train?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '3 hours' },
      { label: 'B', text: '4 hours' },
      { label: 'C', text: '5 hours' },
      { label: 'D', text: '6 hours' },
    ],
    correctAnswer: 'B',
    explanation:
      'When the car leaves, the train has already traveled 80 miles. Let t = hours after the car leaves. Train distance = 80 + 80t. Car distance = 100t. Set equal: 80 + 80t = 100t. Then 80 = 20t, so t = 4 hours.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt1-m2-q9',
    text: 'If the function f is defined by f(x) = x^2 - 4x + 3, what is the value of f(5)?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '3' },
      { label: 'B', text: '8' },
      { label: 'C', text: '12' },
      { label: 'D', text: '48' },
    ],
    correctAnswer: 'B',
    explanation:
      'f(5) = 5^2 - 4(5) + 3 = 25 - 20 + 3 = 8. Option A (3) is f(0). Option C (12) adds instead of subtracting 4(5).',
    difficulty: 2,
    domain: 'advanced_math',
  },
  {
    id: 'pt1-m2-q10',
    text: 'A store increases the price of a jacket from $80 to $100. What is the percent increase?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '20%' },
      { label: 'B', text: '25%' },
      { label: 'C', text: '80%' },
      { label: 'D', text: '125%' },
    ],
    correctAnswer: 'B',
    explanation:
      'Percent increase = (change / original) * 100 = (20/80) * 100 = 25%. Option A (20%) uses the new price as the base. Option C is the ratio of old to new.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'pt1-m2-q11',
    text: 'The volume of a rectangular box is given by V = lwh. If the box has a length of 10 cm, a width of 4 cm, and a volume of 200 cubic centimeters, what is the height of the box, in centimeters?',
    type: 'student_produced',
    correctAnswer: '5',
    explanation:
      'V = lwh. 200 = 10 * 4 * h. 200 = 40h. h = 200/40 = 5 cm.',
    difficulty: 2,
    domain: 'geometry',
  },
  {
    id: 'pt1-m2-q12',
    text: 'Which of the following equations has no solution?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '2x + 1 = 2x + 1' },
      { label: 'B', text: '3x + 5 = 3x - 2' },
      { label: 'C', text: 'x + 4 = 2x + 1' },
      { label: 'D', text: '5x = 0' },
    ],
    correctAnswer: 'B',
    explanation:
      'Subtract 3x from both sides of B: 5 = -2, which is false. This means there is no solution. Option A is an identity (all x work). Options C and D each have one solution.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt1-m2-q13',
    text: 'A company surveys 500 employees about their commute. The results show that 60% drive, 25% use public transit, and the rest walk or bike. Of those who drive, 40% drive more than 30 minutes. How many employees drive more than 30 minutes?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '80' },
      { label: 'B', text: '100' },
      { label: 'C', text: '120' },
      { label: 'D', text: '200' },
    ],
    correctAnswer: 'C',
    explanation:
      'Drivers = 60% of 500 = 300. Those who drive > 30 min = 40% of 300 = 120. Option D (200) is 40% of 500 (wrong base). Option B (100) is 20% of 500.',
    difficulty: 3,
    domain: 'problem_solving',
  },
  {
    id: 'pt1-m2-q14',
    text: 'The expression (2x + 3)(x - 4) is equivalent to which of the following?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '2x^2 - 5x - 12' },
      { label: 'B', text: '2x^2 + 5x - 12' },
      { label: 'C', text: '2x^2 - 8x - 12' },
      { label: 'D', text: '2x^2 - 5x + 12' },
    ],
    correctAnswer: 'A',
    explanation:
      'Use FOIL: (2x)(x) + (2x)(-4) + (3)(x) + (3)(-4) = 2x^2 - 8x + 3x - 12 = 2x^2 - 5x - 12. Option B has a positive middle term. Option C forgot to combine -8x + 3x.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  {
    id: 'pt1-m2-q15',
    text: 'A water tank initially holds 500 gallons and is being drained at a rate of 15 gallons per minute. Which inequality represents the time t (in minutes) until the tank has fewer than 50 gallons remaining?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '500 - 15t < 50' },
      { label: 'B', text: '500 + 15t < 50' },
      { label: 'C', text: '15t - 500 < 50' },
      { label: 'D', text: '500 - 15t > 50' },
    ],
    correctAnswer: 'A',
    explanation:
      'The tank starts at 500 and loses 15 gallons per minute, so the amount is 500 - 15t. We want this to be less than 50: 500 - 15t < 50. Solving: 450 < 15t, so t > 30 minutes.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt1-m2-q16',
    text: 'For what value of k does the equation 2x + k = 6x - 12 have the solution x = 5?',
    type: 'student_produced',
    correctAnswer: '8',
    explanation:
      'Substitute x = 5: 2(5) + k = 6(5) - 12. 10 + k = 30 - 12 = 18. So k = 18 - 10 = 8.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt1-m2-q17',
    text: 'A ball is thrown upward from the ground. Its height h, in feet, after t seconds is given by h(t) = -16t^2 + 48t. At what time does the ball reach its maximum height?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '0.5 seconds' },
      { label: 'B', text: '1 second' },
      { label: 'C', text: '1.5 seconds' },
      { label: 'D', text: '3 seconds' },
    ],
    correctAnswer: 'C',
    explanation:
      'For a parabola h = at^2 + bt + c, the vertex is at t = -b/(2a) = -48/(2 * -16) = -48 / -32 = 1.5 seconds. Option D (3) is when the ball returns to the ground.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  {
    id: 'pt1-m2-q18',
    text: 'In the xy-plane, line p passes through the origin and is perpendicular to the line 3x + 4y = 12. What is the slope of line p?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '-4/3' },
      { label: 'B', text: '-3/4' },
      { label: 'C', text: '3/4' },
      { label: 'D', text: '4/3' },
    ],
    correctAnswer: 'D',
    explanation:
      'Rewrite: 4y = -3x + 12, so y = (-3/4)x + 3. The slope is -3/4. A perpendicular line has slope = negative reciprocal = 4/3. Option B is the original slope. Option A is the negative of the original slope.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt1-m2-q19',
    text: 'A student council is planning a dance. They can spend at most $600 on decorations and music. Decorations cost $150 and the DJ charges $50 per hour. Which inequality represents the possible number of hours h the DJ can play?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '50h + 150 >= 600' },
      { label: 'B', text: '50h + 150 <= 600' },
      { label: 'C', text: '150h + 50 <= 600' },
      { label: 'D', text: '50h <= 600' },
    ],
    correctAnswer: 'B',
    explanation:
      'Total cost = DJ cost + decorations = 50h + 150. They can spend at most $600, so 50h + 150 <= 600. Solving: 50h <= 450, h <= 9. Option A uses >= instead of <=. Option C swaps coefficients.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt1-m2-q20',
    text: 'The function f(x) = 2^x is graphed in the xy-plane. Which of the following statements is true about the graph?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'The graph is a straight line with slope 2.' },
      { label: 'B', text: 'The graph passes through (0, 0) and increases.' },
      { label: 'C', text: 'The graph passes through (0, 1) and increases.' },
      { label: 'D', text: 'The graph passes through (1, 0) and decreases.' },
    ],
    correctAnswer: 'C',
    explanation:
      'When x = 0, f(0) = 2^0 = 1, so the graph passes through (0, 1). Since the base is greater than 1, the function increases. Option B confuses (0, 0) — 2^0 = 1, not 0. Option A treats it as linear.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  {
    id: 'pt1-m2-q21',
    text: 'A cylindrical water bottle has a radius of 3 cm and a height of 20 cm. What is the volume of the bottle, in cubic centimeters? (Use pi = 3.14. Round to the nearest whole number.)',
    type: 'student_produced',
    correctAnswer: '565',
    explanation:
      'Volume of a cylinder = pi * r^2 * h = 3.14 * 3^2 * 20 = 3.14 * 9 * 20 = 3.14 * 180 = 565.2, which rounds to 565.',
    difficulty: 3,
    domain: 'geometry',
  },
  {
    id: 'pt1-m2-q22',
    text: 'A population of bacteria doubles every 3 hours. If the initial population is 200, which expression gives the population after t hours?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '200 * 2^t' },
      { label: 'B', text: '200 * 2^(t/3)' },
      { label: 'C', text: '200 * 3^(t/2)' },
      { label: 'D', text: '400t' },
    ],
    correctAnswer: 'B',
    explanation:
      'The population doubles every 3 hours, so after t hours it has doubled t/3 times. Population = 200 * 2^(t/3). Check: at t = 3, pop = 200 * 2^1 = 400. At t = 6, pop = 200 * 2^2 = 800. Option A doubles every hour instead of every 3 hours.',
    difficulty: 3,
    domain: 'advanced_math',
  },
];

// ─── Practice Test 2, Module 1 (Questions 1-22: Easy → Hard) ─────────────────
const pt2Module1: Question[] = [
  // ── Easy (Q1-Q7) ──────────────────────────────────────────────────────────
  {
    id: 'pt2-m1-q1',
    text: 'What is the value of 2.5 + 0.75?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '2.75' },
      { label: 'B', text: '3.00' },
      { label: 'C', text: '3.25' },
      { label: 'D', text: '3.75' },
    ],
    correctAnswer: 'C',
    explanation:
      '2.5 + 0.75 = 3.25. Option B (3.00) rounds incorrectly. Option D (3.75) adds 1.25 instead of 0.75.',
    difficulty: 1,
    domain: 'problem_solving',
  },
  {
    id: 'pt2-m1-q2',
    text: 'Solve for n: n - 8 = 15',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '7' },
      { label: 'B', text: '13' },
      { label: 'C', text: '23' },
      { label: 'D', text: '120' },
    ],
    correctAnswer: 'C',
    explanation:
      'Add 8 to both sides: n = 15 + 8 = 23. Option A (7) subtracts instead of adding. Option D (120) multiplies.',
    difficulty: 1,
    domain: 'algebra',
  },
  {
    id: 'pt2-m1-q3',
    text: 'The bar graph shows the number of pets owned by students in a class.\n\n| Pets | Students |\n|---|---|\n| 0 | 5 |\n| 1 | 8 |\n| 2 | 6 |\n| 3 | 3 |\n| 4 | 2 |\n\nHow many students own at least 2 pets?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '6' },
      { label: 'B', text: '8' },
      { label: 'C', text: '11' },
      { label: 'D', text: '24' },
    ],
    correctAnswer: 'C',
    explanation:
      '"At least 2" means 2 or more: 6 + 3 + 2 = 11. Option A (6) counts only the "2 pets" row. Option D (24) is the total of all students.',
    difficulty: 1,
    domain: 'problem_solving',
  },
  {
    id: 'pt2-m1-q4',
    text: 'A classroom floor is a rectangle that is 30 feet long and 24 feet wide. What is the area of the floor, in square feet?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '54' },
      { label: 'B', text: '108' },
      { label: 'C', text: '540' },
      { label: 'D', text: '720' },
    ],
    correctAnswer: 'D',
    explanation:
      'Area = length * width = 30 * 24 = 720 square feet. Option B (108) is the perimeter. Option A (54) is length + width.',
    difficulty: 1,
    domain: 'geometry',
  },
  {
    id: 'pt2-m1-q5',
    text: 'A student scored 36 out of 48 questions correctly on a test. What percent of the questions did the student answer correctly?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '65%' },
      { label: 'B', text: '70%' },
      { label: 'C', text: '75%' },
      { label: 'D', text: '80%' },
    ],
    correctAnswer: 'C',
    explanation:
      '36/48 = 3/4 = 0.75 = 75%. Option B (70%) is a common guess. Option D (80%) would require 38.4 out of 48.',
    difficulty: 1,
    domain: 'problem_solving',
  },
  {
    id: 'pt2-m1-q6',
    text: 'A recipe calls for flour and sugar in a ratio of 4 to 1. If you use 3 cups of sugar, how many cups of flour do you need?',
    type: 'student_produced',
    correctAnswer: '12',
    explanation:
      'The ratio of flour to sugar is 4:1. If sugar = 3, the multiplier is 3/1 = 3. Flour = 4 * 3 = 12 cups.',
    difficulty: 1,
    domain: 'problem_solving',
  },
  {
    id: 'pt2-m1-q7',
    text: 'What is the value of 2(6) - 3(2) + 1?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '5' },
      { label: 'B', text: '7' },
      { label: 'C', text: '9' },
      { label: 'D', text: '13' },
    ],
    correctAnswer: 'B',
    explanation:
      '2(6) = 12. 3(2) = 6. 12 - 6 + 1 = 7. Option A (5) forgets the +1. Option D (13) adds 6 instead of subtracting.',
    difficulty: 1,
    domain: 'algebra',
  },
  // ── Medium (Q8-Q15) ───────────────────────────────────────────────────────
  {
    id: 'pt2-m1-q8',
    text: 'Solve for x: (x/4) + 3 = 7',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '1' },
      { label: 'B', text: '10' },
      { label: 'C', text: '16' },
      { label: 'D', text: '28' },
    ],
    correctAnswer: 'C',
    explanation:
      'Subtract 3: x/4 = 4. Multiply by 4: x = 16. Option B (10) adds 3 + 7. Option D (28) multiplies 7 * 4.',
    difficulty: 2,
    domain: 'algebra',
  },
  {
    id: 'pt2-m1-q9',
    text: 'What is the slope of the line that passes through the points (-1, 4) and (3, -8)?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '-3' },
      { label: 'B', text: '-1' },
      { label: 'C', text: '1' },
      { label: 'D', text: '3' },
    ],
    correctAnswer: 'A',
    explanation:
      'Slope = (y2 - y1) / (x2 - x1) = (-8 - 4) / (3 - (-1)) = -12 / 4 = -3. Option D (3) drops the negative sign. Option B (-1) divides -4 by 4 instead.',
    difficulty: 2,
    domain: 'algebra',
  },
  {
    id: 'pt2-m1-q10',
    text: 'A school had 800 students last year and has 920 students this year. What is the percent increase in enrollment?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '12%' },
      { label: 'B', text: '13%' },
      { label: 'C', text: '15%' },
      { label: 'D', text: '20%' },
    ],
    correctAnswer: 'C',
    explanation:
      'Increase = 920 - 800 = 120. Percent increase = (120/800) * 100 = 15%. Option A (12%) divides by the wrong base. Option D (20%) uses 120/600.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'pt2-m1-q11',
    text: 'A data set has the values: 12, 15, 15, 18, 20, 22, 25. What is the mean of this data set?',
    type: 'student_produced',
    correctAnswer: '18.14',
    explanation:
      'Sum = 12 + 15 + 15 + 18 + 20 + 22 + 25 = 127. Mean = 127/7 = 18.14 (rounded to two decimal places).',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'pt2-m1-q12',
    text: 'A deck of cards contains 10 red cards, 8 blue cards, and 6 green cards. If one card is drawn at random, what is the probability of drawing a blue or green card?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '1/3' },
      { label: 'B', text: '7/12' },
      { label: 'C', text: '3/4' },
      { label: 'D', text: '14/24' },
    ],
    correctAnswer: 'B',
    explanation:
      'Total cards = 10 + 8 + 6 = 24. Blue or green = 8 + 6 = 14. Probability = 14/24 = 7/12. Option D (14/24) is not fully simplified. Option A (1/3) is 8/24.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'pt2-m1-q13',
    text: 'What is the solution to the system of equations?\n\n2x + y = 11\nx - y = 1',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'x = 3, y = 5' },
      { label: 'B', text: 'x = 4, y = 3' },
      { label: 'C', text: 'x = 5, y = 1' },
      { label: 'D', text: 'x = 5, y = 4' },
    ],
    correctAnswer: 'B',
    explanation:
      'Add the equations: 3x = 12, so x = 4. Substitute: 4 - y = 1, so y = 3. Check: 2(4) + 3 = 11 and 4 - 3 = 1. Both equations are satisfied.',
    difficulty: 2,
    domain: 'algebra',
  },
  {
    id: 'pt2-m1-q14',
    text: 'A circle has a circumference of 31.4 centimeters. What is the radius of the circle? (Use pi = 3.14)',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '5 cm' },
      { label: 'B', text: '10 cm' },
      { label: 'C', text: '15.7 cm' },
      { label: 'D', text: '20 cm' },
    ],
    correctAnswer: 'A',
    explanation:
      'Circumference = 2 * pi * r. 31.4 = 2 * 3.14 * r = 6.28r. r = 31.4 / 6.28 = 5 cm. Option B (10) is the diameter. Option C (15.7) divides by 2 instead of 2pi.',
    difficulty: 2,
    domain: 'geometry',
  },
  {
    id: 'pt2-m1-q15',
    text: 'A biologist records the number of birds seen at a feeder each morning for a week and creates a scatterplot. The data shows that as the outdoor temperature decreases, the number of birds at the feeder increases. Which best describes this association?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'Positive linear association' },
      { label: 'B', text: 'Negative linear association' },
      { label: 'C', text: 'No association' },
      { label: 'D', text: 'Positive nonlinear association' },
    ],
    correctAnswer: 'B',
    explanation:
      'When one variable increases while the other decreases, the association is negative. Since no curving is mentioned, it is linear. Option A describes the opposite relationship.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  // ── Hard (Q16-Q22) ────────────────────────────────────────────────────────
  {
    id: 'pt2-m1-q16',
    text: 'A gym membership costs a one-time registration fee of $75 plus $30 per month. Which equation represents the total cost C, in dollars, for m months of membership?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'C = 75m + 30' },
      { label: 'B', text: 'C = 30m + 75' },
      { label: 'C', text: 'C = 105m' },
      { label: 'D', text: 'C = 30m - 75' },
    ],
    correctAnswer: 'B',
    explanation:
      'The monthly fee ($30) is multiplied by the number of months, and the registration fee ($75) is added once. C = 30m + 75. Option A reverses the fee and monthly rate. Option C combines them into one rate.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt2-m1-q17',
    text: 'If f(x) = 3x - 2 and g(x) = x + 5, what is the value of g(f(4))?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '10' },
      { label: 'B', text: '15' },
      { label: 'C', text: '17' },
      { label: 'D', text: '27' },
    ],
    correctAnswer: 'B',
    explanation:
      'First find f(4) = 3(4) - 2 = 10. Then g(10) = 10 + 5 = 15. Option A (10) stops at f(4). Option C (17) computes f(g(4)) = f(9) = 25 — wait, actually f(g(4)) = 3(9) - 2 = 25, not 17. Option D (27) is 3 * 9.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  {
    id: 'pt2-m1-q18',
    text: 'What are the solutions to the equation x^2 + 2x - 15 = 0?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'x = 3 and x = -5' },
      { label: 'B', text: 'x = -3 and x = 5' },
      { label: 'C', text: 'x = 1 and x = -15' },
      { label: 'D', text: 'x = 15 and x = -1' },
    ],
    correctAnswer: 'A',
    explanation:
      'Factor: (x + 5)(x - 3) = 0. So x = -5 or x = 3. Check: (-5)(3) = -15 and -5 + 3 = -2... wait. Let me verify: (x + 5)(x - 3) = x^2 - 3x + 5x - 15 = x^2 + 2x - 15. Correct. Option B reverses the signs.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  {
    id: 'pt2-m1-q19',
    text: 'A movie theater sells adult tickets for $12 and child tickets for $8. On Saturday, the theater sold 150 tickets and collected $1,560. How many adult tickets were sold?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '60' },
      { label: 'B', text: '75' },
      { label: 'C', text: '90' },
      { label: 'D', text: '105' },
    ],
    correctAnswer: 'C',
    explanation:
      'Let a = adult, c = child. a + c = 150 and 12a + 8c = 1560. From the first: c = 150 - a. Substitute: 12a + 8(150 - a) = 1560. 12a + 1200 - 8a = 1560. 4a = 360. a = 90. Check: 90 adults = $1080, 60 children = $480. Total = $1560.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt2-m1-q20',
    text: 'In a class of 30 students, 18 play soccer, 12 play basketball, and 5 play both. How many students play neither sport?',
    type: 'student_produced',
    correctAnswer: '5',
    explanation:
      'Using inclusion-exclusion: students who play at least one sport = 18 + 12 - 5 = 25. Students who play neither = 30 - 25 = 5.',
    difficulty: 3,
    domain: 'problem_solving',
  },
  {
    id: 'pt2-m1-q21',
    text: 'A ladder 13 feet long leans against a wall. The base of the ladder is 5 feet from the wall. How high up the wall does the ladder reach, in feet?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '8' },
      { label: 'B', text: '10' },
      { label: 'C', text: '12' },
      { label: 'D', text: '18' },
    ],
    correctAnswer: 'C',
    explanation:
      'Use the Pythagorean theorem: a^2 + b^2 = c^2. 5^2 + h^2 = 13^2. 25 + h^2 = 169. h^2 = 144. h = 12 feet. Option A (8) is 13 - 5. Option B (10) miscalculates the square root.',
    difficulty: 3,
    domain: 'geometry',
  },
  {
    id: 'pt2-m1-q22',
    text: 'A phone plan costs $45 per month for the first 3 months, then $55 per month after that. Which expression gives the total cost, in dollars, for m months of service, where m > 3?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '55m' },
      { label: 'B', text: '45(3) + 55(m - 3)' },
      { label: 'C', text: '45m + 55(m - 3)' },
      { label: 'D', text: '45(3) + 55m' },
    ],
    correctAnswer: 'B',
    explanation:
      'The first 3 months cost 45 * 3 = $135. The remaining (m - 3) months cost 55 each. Total = 45(3) + 55(m - 3) = 135 + 55m - 165 = 55m - 30. Option D charges $55 for all m months plus $135. Option A ignores the cheaper first 3 months.',
    difficulty: 3,
    domain: 'algebra',
  },
];

// ─── Practice Test 2, Module 2 (Questions 23-44: Medium-Hard → Hard) ─────────
const pt2Module2: Question[] = [
  {
    id: 'pt2-m2-q1',
    text: 'An electronics store tracked laptop sales over 6 months: 42, 38, 55, 47, 60, 52. What is the mean number of laptops sold per month?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '47' },
      { label: 'B', text: '49' },
      { label: 'C', text: '50' },
      { label: 'D', text: '52' },
    ],
    correctAnswer: 'B',
    explanation:
      'Sum = 42 + 38 + 55 + 47 + 60 + 52 = 294. Mean = 294 / 6 = 49. Option A (47) is the median of the unsorted data. Option C (50) is a rounding estimate.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'pt2-m2-q2',
    text: 'A line passes through the points (0, 4) and (3, 13). Which equation represents this line?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'y = 3x + 4' },
      { label: 'B', text: 'y = 4x + 3' },
      { label: 'C', text: 'y = 3x + 13' },
      { label: 'D', text: 'y = 9x + 4' },
    ],
    correctAnswer: 'A',
    explanation:
      'Slope = (13 - 4)/(3 - 0) = 9/3 = 3. The y-intercept is 4 (from the point (0, 4)). So y = 3x + 4. Option B swaps slope and intercept. Option D uses 9 as the slope.',
    difficulty: 2,
    domain: 'algebra',
  },
  {
    id: 'pt2-m2-q3',
    text: 'A factory produces 240 widgets per shift. Each shift is 8 hours long. The factory runs 3 shifts per day, 5 days per week. How many widgets does the factory produce in one week?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '720' },
      { label: 'B', text: '1,200' },
      { label: 'C', text: '3,600' },
      { label: 'D', text: '7,200' },
    ],
    correctAnswer: 'C',
    explanation:
      'Widgets per day = 240 * 3 = 720. Widgets per week = 720 * 5 = 3,600. Option A (720) is one day. Option D (7,200) uses 10 days or 30 shifts.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'pt2-m2-q4',
    text: 'If 4(2x - 1) = 3(x + 6), what is the value of x?',
    type: 'student_produced',
    correctAnswer: '4.4',
    explanation:
      'Distribute: 8x - 4 = 3x + 18. Subtract 3x: 5x - 4 = 18. Add 4: 5x = 22. Divide by 5: x = 4.4.',
    difficulty: 2,
    domain: 'algebra',
  },
  {
    id: 'pt2-m2-q5',
    text: 'A trapezoid has parallel bases of length 10 cm and 14 cm, and a height of 6 cm. What is the area of the trapezoid, in square centimeters?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '60' },
      { label: 'B', text: '72' },
      { label: 'C', text: '84' },
      { label: 'D', text: '144' },
    ],
    correctAnswer: 'B',
    explanation:
      'Area of a trapezoid = (1/2)(b1 + b2)(h) = (1/2)(10 + 14)(6) = (1/2)(24)(6) = 72. Option A (60) uses only one base (10 * 6). Option D (144) forgets to divide by 2.',
    difficulty: 2,
    domain: 'geometry',
  },
  {
    id: 'pt2-m2-q6',
    text: 'Which expression is equivalent to (x + 4)^2?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'x^2 + 16' },
      { label: 'B', text: 'x^2 + 4x + 16' },
      { label: 'C', text: 'x^2 + 8x + 16' },
      { label: 'D', text: '2x + 8' },
    ],
    correctAnswer: 'C',
    explanation:
      '(x + 4)^2 = (x + 4)(x + 4) = x^2 + 4x + 4x + 16 = x^2 + 8x + 16. Option A forgets the middle term. Option B uses 4x instead of 8x. Option D treats squaring as doubling.',
    difficulty: 2,
    domain: 'advanced_math',
  },
  {
    id: 'pt2-m2-q7',
    text: 'A library surveys 250 visitors about their reading preferences.\n\n| Genre | Visitors |\n|---|---|\n| Fiction | 90 |\n| Non-fiction | 70 |\n| Mystery | 55 |\n| Science Fiction | 35 |\n\nWhat fraction of visitors prefer mystery or science fiction?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '7/25' },
      { label: 'B', text: '9/25' },
      { label: 'C', text: '11/25' },
      { label: 'D', text: '16/25' },
    ],
    correctAnswer: 'B',
    explanation:
      'Mystery + Science Fiction = 55 + 35 = 90. Fraction = 90/250 = 9/25. Option A (7/25) is 70/250 = non-fiction only. Option D (16/25) is fiction + non-fiction.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'pt2-m2-q8',
    text: 'Two hikers start at the same point. Hiker A walks due north at 4 miles per hour, and Hiker B walks due east at 3 miles per hour. After 2 hours, how far apart are the two hikers, in miles?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '5' },
      { label: 'B', text: '7' },
      { label: 'C', text: '10' },
      { label: 'D', text: '14' },
    ],
    correctAnswer: 'C',
    explanation:
      'After 2 hours: Hiker A has gone 4 * 2 = 8 miles north, Hiker B has gone 3 * 2 = 6 miles east. They form a right triangle. Distance = sqrt(8^2 + 6^2) = sqrt(64 + 36) = sqrt(100) = 10 miles. Option A (5) uses 3-4-5 but forgets to multiply by 2.',
    difficulty: 3,
    domain: 'geometry',
  },
  {
    id: 'pt2-m2-q9',
    text: 'If h(x) = -x^2 + 6x - 5, what is the maximum value of h(x)?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    explanation:
      'Since a = -1 < 0, the parabola opens downward, so the vertex gives the maximum. Vertex at x = -b/(2a) = -6/(2*(-1)) = 3. h(3) = -(3)^2 + 6(3) - 5 = -9 + 18 - 5 = 4. Option A (3) is the x-coordinate of the vertex, not the maximum value.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  {
    id: 'pt2-m2-q10',
    text: 'A town has a population of 12,000. The population decreases by 5% each year. Which expression represents the population after n years?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '12000 - 0.05n' },
      { label: 'B', text: '12000(0.05)^n' },
      { label: 'C', text: '12000(0.95)^n' },
      { label: 'D', text: '12000(1.05)^n' },
    ],
    correctAnswer: 'C',
    explanation:
      'A 5% decrease means the population retains 95% each year: multiply by 0.95. After n years: 12000(0.95)^n. Option D (1.05)^n represents growth, not decline. Option A is linear, not exponential. Option B uses 0.05 instead of 0.95.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  {
    id: 'pt2-m2-q11',
    text: 'The area of a square is 196 square inches. What is the length of the diagonal of the square, in inches? (Round to the nearest tenth.)',
    type: 'student_produced',
    correctAnswer: '19.8',
    explanation:
      'Side = sqrt(196) = 14 inches. Diagonal of a square = side * sqrt(2) = 14 * 1.414 = 19.8 inches (rounded to the nearest tenth).',
    difficulty: 3,
    domain: 'geometry',
  },
  {
    id: 'pt2-m2-q12',
    text: 'For what value of b does the equation 3x + b = 7x - 20 have the solution x = 8?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '4' },
      { label: 'B', text: '12' },
      { label: 'C', text: '16' },
      { label: 'D', text: '36' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitute x = 8: 3(8) + b = 7(8) - 20. 24 + b = 56 - 20 = 36. b = 36 - 24 = 12. Option C (16) subtracts 20 from 36 again. Option A (4) is 36 - 24 - 8.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt2-m2-q13',
    text: 'A school district surveys 600 parents. Of these, 70% support a new school calendar. Of those who support it, 60% prefer Plan A over Plan B. How many parents prefer Plan A?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '168' },
      { label: 'B', text: '210' },
      { label: 'C', text: '252' },
      { label: 'D', text: '360' },
    ],
    correctAnswer: 'C',
    explanation:
      'Parents who support = 70% of 600 = 420. Those who prefer Plan A = 60% of 420 = 252. Option D (360) is 60% of 600 (wrong base). Option B (210) is half of 420.',
    difficulty: 3,
    domain: 'problem_solving',
  },
  {
    id: 'pt2-m2-q14',
    text: 'What is the product (3x - 2)(2x + 5)?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '6x^2 + 11x - 10' },
      { label: 'B', text: '6x^2 - 11x - 10' },
      { label: 'C', text: '6x^2 + 11x + 10' },
      { label: 'D', text: '6x^2 + 19x - 10' },
    ],
    correctAnswer: 'A',
    explanation:
      'FOIL: (3x)(2x) + (3x)(5) + (-2)(2x) + (-2)(5) = 6x^2 + 15x - 4x - 10 = 6x^2 + 11x - 10. Option B has the wrong sign on 11x. Option D gets 19x from adding instead of combining correctly.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  {
    id: 'pt2-m2-q15',
    text: 'A car starts with a full 16-gallon gas tank and uses gas at a rate of 0.04 gallons per mile. Which function gives the number of gallons g remaining after driving d miles?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'g(d) = 16 + 0.04d' },
      { label: 'B', text: 'g(d) = 16 - 0.04d' },
      { label: 'C', text: 'g(d) = 0.04d - 16' },
      { label: 'D', text: 'g(d) = 16d - 0.04' },
    ],
    correctAnswer: 'B',
    explanation:
      'The tank starts at 16 and decreases by 0.04 gallons per mile: g(d) = 16 - 0.04d. At d = 0, g = 16 (full tank). At d = 400, g = 0 (empty). Option A increases with distance. Option C gives negative gallons at d = 0.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt2-m2-q16',
    text: 'A researcher finds that the relationship between the number of hours a student studies (x) and their test score (y) can be modeled by y = 5x + 60. According to this model, a student who scores 85 on the test studied for how many hours?',
    type: 'student_produced',
    correctAnswer: '5',
    explanation:
      'Set y = 85: 85 = 5x + 60. Subtract 60: 25 = 5x. Divide by 5: x = 5 hours.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt2-m2-q17',
    text: 'A rock is launched straight up from a 48-foot-tall platform. Its height h, in feet, after t seconds is modeled by h(t) = -16t^2 + 32t + 48. After how many seconds does the rock hit the ground?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '1 second' },
      { label: 'B', text: '2 seconds' },
      { label: 'C', text: '3 seconds' },
      { label: 'D', text: '4 seconds' },
    ],
    correctAnswer: 'C',
    explanation:
      'Set h = 0: -16t^2 + 32t + 48 = 0. Divide by -16: t^2 - 2t - 3 = 0. Factor: (t - 3)(t + 1) = 0. t = 3 or t = -1. Since time must be positive, t = 3 seconds. Option A (1) is when the rock reaches max height. Option B (2) is incorrect factoring.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  {
    id: 'pt2-m2-q18',
    text: 'In the xy-plane, line q has a slope of 2/3 and passes through the point (6, 1). What is the y-intercept of line q?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '-3' },
      { label: 'B', text: '-1' },
      { label: 'C', text: '1' },
      { label: 'D', text: '5' },
    ],
    correctAnswer: 'A',
    explanation:
      'Use point-slope: y - 1 = (2/3)(x - 6). Simplify: y - 1 = (2/3)x - 4. y = (2/3)x - 3. The y-intercept is -3. Option C (1) is the y-value of the given point, not the intercept.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt2-m2-q19',
    text: 'A concert venue can hold at most 1,200 people. Floor seats cost $75 and balcony seats cost $50. The venue wants to earn at least $70,000 in ticket sales. If all 1,200 seats are sold, what is the minimum number of floor seats that must be sold?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '200' },
      { label: 'B', text: '400' },
      { label: 'C', text: '560' },
      { label: 'D', text: '800' },
    ],
    correctAnswer: 'B',
    explanation:
      'Let f = floor seats. Balcony = 1200 - f. Revenue: 75f + 50(1200 - f) >= 70000. 75f + 60000 - 50f >= 70000. 25f >= 10000. f >= 400. So at least 400 floor seats. Check: 400(75) + 800(50) = 30000 + 40000 = 70000.',
    difficulty: 3,
    domain: 'algebra',
  },
  {
    id: 'pt2-m2-q20',
    text: 'Which of the following is equivalent to the expression (27)^(2/3)?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '3' },
      { label: 'B', text: '9' },
      { label: 'C', text: '18' },
      { label: 'D', text: '81' },
    ],
    correctAnswer: 'B',
    explanation:
      '27^(2/3) = (27^(1/3))^2 = 3^2 = 9. The cube root of 27 is 3, and 3 squared is 9. Option A (3) is just the cube root. Option D (81) is 3^4.',
    difficulty: 3,
    domain: 'advanced_math',
  },
  {
    id: 'pt2-m2-q21',
    text: 'A cone has a radius of 6 cm and a slant height of 10 cm. What is the height of the cone, in centimeters?',
    type: 'student_produced',
    correctAnswer: '8',
    explanation:
      'The radius, height, and slant height form a right triangle. Using the Pythagorean theorem: r^2 + h^2 = l^2. 6^2 + h^2 = 10^2. 36 + h^2 = 100. h^2 = 64. h = 8 cm.',
    difficulty: 3,
    domain: 'geometry',
  },
  {
    id: 'pt2-m2-q22',
    text: 'A savings account earns 4% annual interest, compounded yearly. If $500 is deposited today, which expression gives the account balance after t years?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '500 + 20t' },
      { label: 'B', text: '500(0.04)^t' },
      { label: 'C', text: '500(1.04)^t' },
      { label: 'D', text: '500(1.4)^t' },
    ],
    correctAnswer: 'C',
    explanation:
      'Compound interest formula: A = P(1 + r)^t = 500(1.04)^t. Option A is simple interest (linear). Option B would make the balance shrink toward 0. Option D uses 1.4 instead of 1.04.',
    difficulty: 3,
    domain: 'advanced_math',
  },
];

export const practiceTests: PracticeTest[] = [
  {
    testNumber: 1,
    module1: pt1Module1,
    module2: pt1Module2,
  },
  {
    testNumber: 2,
    module1: pt2Module1,
    module2: pt2Module2,
  },
];
