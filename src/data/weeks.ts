import type { Week, Topic, Question } from '@/types/content';

// ═══════════════════════════════════════════════════════════════════════════════
// WEEK 1: Foundations — Fractions, Decimals, Percentages, Ratios
// ═══════════════════════════════════════════════════════════════════════════════

const w1Topic1: Topic = {
  id: 'w1-t1',
  weekNumber: 1,
  slug: 'fractions-decimals-percentages',
  title: 'Fractions, Decimals, and Percentages',
  videoLink: 'https://www.khanacademy.org/math/arithmetic/arith-review-decimals',
  content: `A **fraction** is just a way of showing a part of something. Think of a pizza cut into 8 slices. If you eat 3 slices, you ate 3/8 of the pizza. The top number (numerator) tells you how many pieces you have. The bottom number (denominator) tells you how many equal pieces the whole thing was cut into.

**Adding and subtracting fractions** is easy once you know the trick: the bottom numbers (denominators) have to be the same. If they are not the same, you have to find a "common denominator" -- a number that both denominators divide into evenly. Once the bottoms match, just add or subtract the tops. For **multiplying fractions**, just multiply straight across -- tops times tops, bottoms times bottoms. For **dividing fractions**, flip the second fraction upside down and then multiply.

A **decimal** is another way to write a fraction. To turn a fraction into a decimal, divide the top by the bottom. For example, 1/4 = 1 divided by 4 = 0.25. A **percentage** means "out of 100." So 25% means 25 out of 100, which is the same as 0.25 or 1/4.

To turn a decimal into a percentage, multiply by 100. To turn a percentage into a decimal, divide by 100.

These conversions show up all over the PSAT. If you are comfortable moving between fractions, decimals, and percentages, many problems become much easier.`,
  questions: [
    {
      id: 'w1-t1-q1', text: 'What is 1/2 + 1/3?', type: 'multiple_choice',
      options: [{ label: 'A', text: '2/5' }, { label: 'B', text: '5/6' }, { label: 'C', text: '1/6' }, { label: 'D', text: '2/3' }],
      correctAnswer: 'B', explanation: 'Common denominator 6. 3/6 + 2/6 = 5/6.', difficulty: 1, domain: 'problem_solving',
    },
    {
      id: 'w1-t1-q2', text: 'What is 0.6 as a fraction in simplest form?', type: 'multiple_choice',
      options: [{ label: 'A', text: '6/100' }, { label: 'B', text: '6/10' }, { label: 'C', text: '3/5' }, { label: 'D', text: '2/3' }],
      correctAnswer: 'C', explanation: '0.6 = 6/10. Simplify: 3/5.', difficulty: 1, domain: 'problem_solving',
    },
    {
      id: 'w1-t1-q3', text: 'What is 2/5 x 3/7?', type: 'multiple_choice',
      options: [{ label: 'A', text: '5/12' }, { label: 'B', text: '6/35' }, { label: 'C', text: '6/12' }, { label: 'D', text: '5/35' }],
      correctAnswer: 'B', explanation: 'Multiply across: (2*3)/(5*7) = 6/35.', difficulty: 2, domain: 'problem_solving',
    },
    {
      id: 'w1-t1-q4', text: 'What is 40% of 250?', type: 'multiple_choice',
      options: [{ label: 'A', text: '90' }, { label: 'B', text: '100' }, { label: 'C', text: '110' }, { label: 'D', text: '80' }],
      correctAnswer: 'B', explanation: '0.40 * 250 = 100.', difficulty: 2, domain: 'problem_solving',
    },
    {
      id: 'w1-t1-q5', text: 'A student answered 42 out of 56 questions correctly on a test. What percentage did the student get correct?', type: 'multiple_choice',
      options: [{ label: 'A', text: '72%' }, { label: 'B', text: '75%' }, { label: 'C', text: '78%' }, { label: 'D', text: '80%' }],
      correctAnswer: 'B', explanation: '42/56 = 0.75 = 75%.', difficulty: 3, domain: 'problem_solving',
    },
  ],
};

const w1Topic2: Topic = {
  id: 'w1-t2',
  weekNumber: 1,
  slug: 'ratios-and-proportions',
  title: 'Ratios and Proportions',
  videoLink: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-ratios-prop-topic',
  content: `A **ratio** compares two quantities. If there are 3 cats and 5 dogs, the ratio of cats to dogs is 3:5. You can also write it as a fraction: 3/5. A ratio tells you how the two quantities relate to each other, but it does not tell you the actual numbers.

A **proportion** is an equation that says two ratios are equal. For example, 3/5 = 6/10 is a proportion. Proportions are super useful because if you know three of the four numbers, you can find the missing one.

The trick to solving a proportion is **cross-multiplying**. If you have a/b = c/d, then a * d = b * c. This turns the proportion into a regular equation that you can solve.

Ratios and proportions show up in word problems about recipes, maps, scale drawings, speed, and unit rates. Once you get comfortable setting up the proportion, the math is usually pretty simple.`,
  questions: [
    {
      id: 'w1-t2-q1', text: 'The ratio of red marbles to blue marbles is 2:7. If there are 14 blue marbles, how many red marbles are there?', type: 'multiple_choice',
      options: [{ label: 'A', text: '2' }, { label: 'B', text: '4' }, { label: 'C', text: '6' }, { label: 'D', text: '7' }],
      correctAnswer: 'B', explanation: '2/7 = x/14. Cross multiply: 28 = 7x. x = 4.', difficulty: 1, domain: 'problem_solving',
    },
    {
      id: 'w1-t2-q2', text: 'If 3 apples cost $2.25, how much do 12 apples cost?', type: 'multiple_choice',
      options: [{ label: 'A', text: '$6.75' }, { label: 'B', text: '$8.00' }, { label: 'C', text: '$9.00' }, { label: 'D', text: '$10.00' }],
      correctAnswer: 'C', explanation: 'Cost per apple: $2.25/3 = $0.75. 12 * $0.75 = $9.00.', difficulty: 1, domain: 'problem_solving',
    },
    {
      id: 'w1-t2-q3', text: 'A map has a scale of 1 inch = 25 miles. Two cities are 3.5 inches apart on the map. How far apart are they in real life?', type: 'multiple_choice',
      options: [{ label: 'A', text: '75 miles' }, { label: 'B', text: '82.5 miles' }, { label: 'C', text: '87.5 miles' }, { label: 'D', text: '90 miles' }],
      correctAnswer: 'C', explanation: '3.5 * 25 = 87.5 miles.', difficulty: 2, domain: 'problem_solving',
    },
    {
      id: 'w1-t2-q4', text: 'The ratio of cats to dogs in a shelter is 5:3. If there are 48 animals total, how many cats are there?', type: 'multiple_choice',
      options: [{ label: 'A', text: '18' }, { label: 'B', text: '24' }, { label: 'C', text: '28' }, { label: 'D', text: '30' }],
      correctAnswer: 'D', explanation: 'Total parts = 8. Each part = 48/8 = 6. Cats = 5*6 = 30.', difficulty: 2, domain: 'problem_solving',
    },
    {
      id: 'w1-t2-q5', text: 'A car travels 180 miles on 6 gallons of gas. At that rate, how many gallons does it need to travel 510 miles?', type: 'multiple_choice',
      options: [{ label: 'A', text: '15' }, { label: 'B', text: '16' }, { label: 'C', text: '17' }, { label: 'D', text: '18' }],
      correctAnswer: 'C', explanation: '180/6 = 30 mpg. 510/30 = 17 gallons.', difficulty: 3, domain: 'problem_solving',
    },
  ],
};

const w1QuizQuestions: Question[] = [
  { id: 'w1-quiz-q1', text: 'What is 2/3 + 1/6?', type: 'multiple_choice', options: [{ label: 'A', text: '3/6' }, { label: 'B', text: '3/9' }, { label: 'C', text: '5/6' }, { label: 'D', text: '1/2' }], correctAnswer: 'C', explanation: 'Common denominator 6. 4/6 + 1/6 = 5/6.', difficulty: 1, domain: 'problem_solving' },
  { id: 'w1-quiz-q2', text: 'What is 5/8 - 1/4?', type: 'multiple_choice', options: [{ label: 'A', text: '4/4' }, { label: 'B', text: '3/8' }, { label: 'C', text: '1/2' }, { label: 'D', text: '4/8' }], correctAnswer: 'B', explanation: '1/4 = 2/8. 5/8 - 2/8 = 3/8.', difficulty: 1, domain: 'problem_solving' },
  { id: 'w1-quiz-q3', text: 'Convert 0.6 to a fraction in simplest form.', type: 'multiple_choice', options: [{ label: 'A', text: '6/100' }, { label: 'B', text: '6/10' }, { label: 'C', text: '3/5' }, { label: 'D', text: '2/3' }], correctAnswer: 'C', explanation: '0.6 = 6/10 = 3/5.', difficulty: 1, domain: 'problem_solving' },
  { id: 'w1-quiz-q4', text: 'What is 40% of 250?', type: 'multiple_choice', options: [{ label: 'A', text: '90' }, { label: 'B', text: '100' }, { label: 'C', text: '110' }, { label: 'D', text: '125' }], correctAnswer: 'B', explanation: '0.40 * 250 = 100.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-quiz-q5', text: 'A jacket originally costs $80. It is marked down 20%. What is the sale price?', type: 'multiple_choice', options: [{ label: 'A', text: '$16' }, { label: 'B', text: '$60' }, { label: 'C', text: '$64' }, { label: 'D', text: '$76' }], correctAnswer: 'C', explanation: '20% of $80 = $16. Sale price = $80 - $16 = $64.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-quiz-q6', text: 'Solve the proportion: 6/9 = x/15', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 6' }, { label: 'B', text: 'x = 9' }, { label: 'C', text: 'x = 10' }, { label: 'D', text: 'x = 12' }], correctAnswer: 'C', explanation: 'Cross multiply: 6*15 = 9x. 90 = 9x. x = 10.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-quiz-q7', text: 'A bag contains red and green marbles in a ratio of 2:3. If there are 12 red marbles, how many green marbles are there?', type: 'multiple_choice', options: [{ label: 'A', text: '8' }, { label: 'B', text: '15' }, { label: 'C', text: '18' }, { label: 'D', text: '20' }], correctAnswer: 'C', explanation: '2 parts = 12, so 1 part = 6. Green = 3*6 = 18.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-quiz-q8', text: 'What is 3/5 x 10/9?', type: 'multiple_choice', options: [{ label: 'A', text: '30/45' }, { label: 'B', text: '1/3' }, { label: 'C', text: '2/3' }, { label: 'D', text: '13/14' }], correctAnswer: 'C', explanation: '(3*10)/(5*9) = 30/45 = 2/3.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-quiz-q9', text: 'A student answered 21 out of 28 questions correctly on a test. What percentage is that?', type: 'multiple_choice', options: [{ label: 'A', text: '70%' }, { label: 'B', text: '72%' }, { label: 'C', text: '75%' }, { label: 'D', text: '80%' }], correctAnswer: 'C', explanation: '21/28 = 3/4 = 0.75 = 75%.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-quiz-q10', text: 'A store increases the price of a $50 item by 8%. What is the new price?', type: 'multiple_choice', options: [{ label: 'A', text: '$54.00' }, { label: 'B', text: '$58.00' }, { label: 'C', text: '$52.50' }, { label: 'D', text: '$54.50' }], correctAnswer: 'A', explanation: '8% of $50 = $4. New price = $54.', difficulty: 2, domain: 'problem_solving' },
];

const w1WorksheetQuestions: Question[] = [
  { id: 'w1-ws-q1', text: 'What is 3/4 + 2/3?', type: 'student_produced', correctAnswer: '17/12', explanation: 'LCD = 12. 9/12 + 8/12 = 17/12 = 1 5/12.', difficulty: 1, domain: 'problem_solving' },
  { id: 'w1-ws-q2', text: 'Subtract: 7/8 - 1/4', type: 'student_produced', correctAnswer: '5/8', explanation: '1/4 = 2/8. 7/8 - 2/8 = 5/8.', difficulty: 1, domain: 'problem_solving' },
  { id: 'w1-ws-q3', text: 'Multiply: 2/5 x 3/7', type: 'student_produced', correctAnswer: '6/35', explanation: '(2*3)/(5*7) = 6/35.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-ws-q4', text: 'Divide: 5/6 by 2/3', type: 'student_produced', correctAnswer: '5/4', explanation: 'Flip and multiply: 5/6 * 3/2 = 15/12 = 5/4.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-ws-q5', text: 'Simplify: 4/12 + 5/6 - 1/3', type: 'student_produced', correctAnswer: '5/6', explanation: 'All to sixths: 2/6 + 5/6 - 2/6 = 5/6.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-ws-q6', text: 'Convert 3/8 to a decimal.', type: 'student_produced', correctAnswer: '0.375', explanation: '3 / 8 = 0.375.', difficulty: 1, domain: 'problem_solving' },
  { id: 'w1-ws-q7', text: 'What is 25% of 180?', type: 'student_produced', correctAnswer: '45', explanation: '0.25 * 180 = 45.', difficulty: 1, domain: 'problem_solving' },
  { id: 'w1-ws-q8', text: 'Convert 0.045 to a percentage.', type: 'student_produced', correctAnswer: '4.5%', explanation: '0.045 * 100 = 4.5%.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-ws-q9', text: 'A shirt costs $40. It is on sale for 15% off. What is the sale price?', type: 'student_produced', correctAnswer: '$34', explanation: '15% of $40 = $6. Sale price = $40 - $6 = $34.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-ws-q10', text: 'A student scored 18 out of 24 on a quiz. What percentage did the student score?', type: 'student_produced', correctAnswer: '75%', explanation: '18/24 = 0.75 = 75%.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-ws-q11', text: 'Write the ratio of 12 to 18 in simplest form.', type: 'student_produced', correctAnswer: '2:3', explanation: 'Divide both by 6: 2:3.', difficulty: 1, domain: 'problem_solving' },
  { id: 'w1-ws-q12', text: 'Solve the proportion: 4/x = 8/14', type: 'student_produced', correctAnswer: '7', explanation: 'Cross multiply: 8x = 56. x = 7.', difficulty: 1, domain: 'problem_solving' },
  { id: 'w1-ws-q13', text: 'A recipe calls for 3 cups of flour for every 2 cups of sugar. If you use 9 cups of flour, how many cups of sugar do you need?', type: 'student_produced', correctAnswer: '6', explanation: '3/2 = 9/x. 3x = 18. x = 6.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-ws-q14', text: 'On a map, 1 inch represents 25 miles. Two cities are 3.5 inches apart. How many miles apart are they?', type: 'student_produced', correctAnswer: '87.5', explanation: '3.5 * 25 = 87.5 miles.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-ws-q15', text: 'The ratio of boys to girls in a class is 5:7. If there are 35 boys, how many girls are in the class?', type: 'student_produced', correctAnswer: '49', explanation: '5 parts = 35, 1 part = 7. Girls = 7*7 = 49.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-ws-q16', text: 'A pizza is cut into 8 equal slices. Marcus eats 3 slices and Sarah eats 2 slices. What fraction of the pizza is left?', type: 'student_produced', correctAnswer: '3/8', explanation: '5 eaten, 3 left. 3/8 = 0.375 = 37.5%.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-ws-q17', text: 'A bag has red and blue marbles in a ratio of 3:5. If there are 24 red marbles, how many total marbles are in the bag?', type: 'student_produced', correctAnswer: '64', explanation: '3 parts = 24, 1 part = 8. Total = 8*8 = 64.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-ws-q18', text: 'Carlos ran 2.5 miles on Monday, 3.75 miles on Wednesday, and 1/2 mile on Friday. How many total miles did he run?', type: 'student_produced', correctAnswer: '6.75', explanation: '2.5 + 3.75 + 0.5 = 6.75.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-ws-q19', text: 'A store raises the price of a $60 jacket by 10%, then puts it on sale for 10% off the new price. What is the final price?', type: 'student_produced', correctAnswer: '$59.40', explanation: 'New price = $66. 10% of $66 = $6.60. Final = $59.40.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w1-ws-q20', text: 'In a class of 30 students, 2/5 are in the band and 40% play a sport. If 3 students do both, how many students do neither band nor a sport?', type: 'student_produced', correctAnswer: '9', explanation: 'Band = 12, Sports = 12, Both = 3. Union = 12+12-3 = 21. Neither = 30-21 = 9.', difficulty: 3, domain: 'problem_solving' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// WEEK 2: Algebra Basics
// ═══════════════════════════════════════════════════════════════════════════════

const w2Topic1: Topic = {
  id: 'w2-t1', weekNumber: 2, slug: 'solving-linear-equations', title: 'Solving Linear Equations',
  videoLink: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:solve-equations-inequalities',
  content: `An **equation** is like a balance scale. Whatever is on the left side equals whatever is on the right side. **Solving for x** means figuring out what x equals.

The big rule: **whatever you do to one side, you must do to the other side.** Your goal is to get x all by itself.

For **one-step equations**, you only need one operation. For **two-step equations**, usually undo the addition/subtraction first, then undo the multiplication/division. For **multi-step equations**, you might need to distribute or combine like terms first.`,
  questions: [
    { id: 'w2-t1-q1', text: 'Solve: x - 9 = 12', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 3' }, { label: 'B', text: 'x = 21' }, { label: 'C', text: 'x = 18' }, { label: 'D', text: 'x = 108' }], correctAnswer: 'B', explanation: 'Add 9: x = 21.', difficulty: 1, domain: 'algebra' },
    { id: 'w2-t1-q2', text: 'Solve: 5x = 45', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 5' }, { label: 'B', text: 'x = 9' }, { label: 'C', text: 'x = 40' }, { label: 'D', text: 'x = 225' }], correctAnswer: 'B', explanation: 'Divide by 5: x = 9.', difficulty: 1, domain: 'algebra' },
    { id: 'w2-t1-q3', text: 'Solve: 4x + 7 = 31', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 4' }, { label: 'B', text: 'x = 5' }, { label: 'C', text: 'x = 6' }, { label: 'D', text: 'x = 9.5' }], correctAnswer: 'C', explanation: 'Subtract 7: 4x = 24. Divide by 4: x = 6.', difficulty: 2, domain: 'algebra' },
    { id: 'w2-t1-q4', text: 'Solve: 2x + 5 = x + 12', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 5' }, { label: 'B', text: 'x = 7' }, { label: 'C', text: 'x = 12' }, { label: 'D', text: 'x = 17' }], correctAnswer: 'B', explanation: 'Subtract x: x + 5 = 12. Subtract 5: x = 7.', difficulty: 2, domain: 'algebra' },
    { id: 'w2-t1-q5', text: 'Solve: 3(2x - 1) = 4x + 9', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 3' }, { label: 'B', text: 'x = 4' }, { label: 'C', text: 'x = 5' }, { label: 'D', text: 'x = 6' }], correctAnswer: 'D', explanation: 'Distribute: 6x - 3 = 4x + 9. Subtract 4x: 2x - 3 = 9. Add 3: 2x = 12. x = 6.', difficulty: 3, domain: 'algebra' },
  ],
};

const w2Topic2: Topic = {
  id: 'w2-t2', weekNumber: 2, slug: 'graphing-linear-equations', title: 'Graphing Linear Equations (Slope and Y-Intercept)',
  videoLink: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations-graphs',
  content: `A **linear equation** makes a straight line when you graph it. The most common form is **y = mx + b** (slope-intercept form). **m** is the slope and **b** is the y-intercept.

The **slope** tells you how steep the line is: "rise over run." A positive slope goes uphill left to right. A negative slope goes downhill.

The **y-intercept** is where the line crosses the y-axis (the value of y when x = 0).

To **find the slope** between two points (x1, y1) and (x2, y2): slope = (y2 - y1) / (x2 - x1).`,
  questions: [
    { id: 'w2-t2-q1', text: 'What is the slope of the equation y = -3x + 7?', type: 'multiple_choice', options: [{ label: 'A', text: '7' }, { label: 'B', text: '3' }, { label: 'C', text: '-3' }, { label: 'D', text: '-7' }], correctAnswer: 'C', explanation: 'In y = mx + b, slope m = -3.', difficulty: 1, domain: 'algebra' },
    { id: 'w2-t2-q2', text: 'What is the y-intercept of y = 4x - 2?', type: 'multiple_choice', options: [{ label: 'A', text: '4' }, { label: 'B', text: '-4' }, { label: 'C', text: '2' }, { label: 'D', text: '-2' }], correctAnswer: 'D', explanation: 'In y = mx + b, y-intercept b = -2.', difficulty: 1, domain: 'algebra' },
    { id: 'w2-t2-q3', text: 'What is the slope of the line passing through (2, 5) and (6, 13)?', type: 'multiple_choice', options: [{ label: 'A', text: '1' }, { label: 'B', text: '2' }, { label: 'C', text: '3' }, { label: 'D', text: '4' }], correctAnswer: 'B', explanation: '(13-5)/(6-2) = 8/4 = 2.', difficulty: 2, domain: 'algebra' },
    { id: 'w2-t2-q4', text: 'A line has slope 1/2 and passes through (0, -3). What is the equation?', type: 'multiple_choice', options: [{ label: 'A', text: 'y = -3x + 1/2' }, { label: 'B', text: 'y = 1/2x + 3' }, { label: 'C', text: 'y = 1/2x - 3' }, { label: 'D', text: 'y = 2x - 3' }], correctAnswer: 'C', explanation: 'Slope = 1/2, y-intercept = -3. y = 1/2x - 3.', difficulty: 2, domain: 'algebra' },
    { id: 'w2-t2-q5', text: 'A line passes through (-1, 2) and (3, -6). What is the equation in slope-intercept form?', type: 'multiple_choice', options: [{ label: 'A', text: 'y = -2x' }, { label: 'B', text: 'y = 2x + 4' }, { label: 'C', text: 'y = -2x + 4' }, { label: 'D', text: 'y = -2x - 4' }], correctAnswer: 'A', explanation: 'Slope = (-6-2)/(3-(-1)) = -8/4 = -2. Using (-1,2): 2 = -2(-1)+b, b=0. y = -2x.', difficulty: 3, domain: 'algebra' },
  ],
};

const w2QuizQuestions: Question[] = [
  { id: 'w2-quiz-q1', text: 'Simplify: 4x + 3 - 2x + 7', type: 'multiple_choice', options: [{ label: 'A', text: '6x + 10' }, { label: 'B', text: '2x + 10' }, { label: 'C', text: '2x - 4' }, { label: 'D', text: '6x - 4' }], correctAnswer: 'B', explanation: '4x - 2x = 2x. 3 + 7 = 10. Answer: 2x + 10.', difficulty: 1, domain: 'algebra' },
  { id: 'w2-quiz-q2', text: 'Solve for x: x - 5 = 12', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 7' }, { label: 'B', text: 'x = 17' }, { label: 'C', text: 'x = -7' }, { label: 'D', text: 'x = 60' }], correctAnswer: 'B', explanation: 'Add 5: x = 17.', difficulty: 1, domain: 'algebra' },
  { id: 'w2-quiz-q3', text: 'Simplify: 3(2a - 4) + a', type: 'multiple_choice', options: [{ label: 'A', text: '7a - 12' }, { label: 'B', text: '6a - 4' }, { label: 'C', text: '7a - 4' }, { label: 'D', text: '6a - 12' }], correctAnswer: 'A', explanation: 'Distribute: 6a - 12 + a = 7a - 12.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-quiz-q4', text: 'Solve for y: 4y + 6 = 30', type: 'multiple_choice', options: [{ label: 'A', text: 'y = 9' }, { label: 'B', text: 'y = 6' }, { label: 'C', text: 'y = 8' }, { label: 'D', text: 'y = 4' }], correctAnswer: 'B', explanation: 'Subtract 6: 4y = 24. Divide by 4: y = 6.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-quiz-q5', text: 'Solve for x: 2(x + 3) = 20', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 7' }, { label: 'B', text: 'x = 10' }, { label: 'C', text: 'x = 8.5' }, { label: 'D', text: 'x = 5' }], correctAnswer: 'A', explanation: 'Distribute: 2x + 6 = 20. 2x = 14. x = 7.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-quiz-q6', text: 'Solve for n: 5n - 3 = 2n + 12', type: 'multiple_choice', options: [{ label: 'A', text: 'n = 3' }, { label: 'B', text: 'n = 5' }, { label: 'C', text: 'n = 9' }, { label: 'D', text: 'n = 15' }], correctAnswer: 'B', explanation: 'Subtract 2n: 3n - 3 = 12. Add 3: 3n = 15. n = 5.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-quiz-q7', text: 'What is the slope of the line y = -4x + 9?', type: 'multiple_choice', options: [{ label: 'A', text: '9' }, { label: 'B', text: '-4' }, { label: 'C', text: '4' }, { label: 'D', text: '-9' }], correctAnswer: 'B', explanation: 'm = -4.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-quiz-q8', text: 'Find the slope of the line passing through (1, 2) and (4, 8).', type: 'multiple_choice', options: [{ label: 'A', text: '1' }, { label: 'B', text: '3' }, { label: 'C', text: '2' }, { label: 'D', text: '6' }], correctAnswer: 'C', explanation: '(8-2)/(4-1) = 6/3 = 2.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-quiz-q9', text: 'Which equation represents a line with slope 5 and y-intercept -3?', type: 'multiple_choice', options: [{ label: 'A', text: 'y = -3x + 5' }, { label: 'B', text: 'y = 5x - 3' }, { label: 'C', text: 'y = 3x - 5' }, { label: 'D', text: 'y = -5x + 3' }], correctAnswer: 'B', explanation: 'y = mx + b = 5x - 3.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-quiz-q10', text: 'Solve for x: 3(x - 1) = 2(x + 4)', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 11' }, { label: 'B', text: 'x = 7' }, { label: 'C', text: 'x = 5' }, { label: 'D', text: 'x = 1' }], correctAnswer: 'A', explanation: '3x - 3 = 2x + 8. x - 3 = 8. x = 11.', difficulty: 3, domain: 'algebra' },
];

const w2WorksheetQuestions: Question[] = [
  { id: 'w2-ws-q1', text: 'Simplify: 3x + 7x', type: 'student_produced', correctAnswer: '10x', explanation: 'Combine like terms: 10x.', difficulty: 1, domain: 'algebra' },
  { id: 'w2-ws-q2', text: 'Simplify: 5a - 2a + 4', type: 'student_produced', correctAnswer: '3a + 4', explanation: '5a - 2a = 3a. Result: 3a + 4.', difficulty: 1, domain: 'algebra' },
  { id: 'w2-ws-q3', text: 'Simplify: 2(3x + 4) - 5x', type: 'student_produced', correctAnswer: 'x + 8', explanation: 'Distribute: 6x + 8 - 5x = x + 8.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-ws-q4', text: 'Simplify: 4(2y - 1) + 3(y + 5)', type: 'student_produced', correctAnswer: '11y + 11', explanation: '8y - 4 + 3y + 15 = 11y + 11.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-ws-q5', text: 'Simplify: 6m - 2(m + 3) + 8', type: 'student_produced', correctAnswer: '4m + 2', explanation: '6m - 2m - 6 + 8 = 4m + 2.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-ws-q6', text: 'Solve for x: x + 9 = 17', type: 'student_produced', correctAnswer: '8', explanation: 'x = 17 - 9 = 8.', difficulty: 1, domain: 'algebra' },
  { id: 'w2-ws-q7', text: 'Solve for y: 3y = 21', type: 'student_produced', correctAnswer: '7', explanation: 'y = 21/3 = 7.', difficulty: 1, domain: 'algebra' },
  { id: 'w2-ws-q8', text: 'Solve for x: 2x + 5 = 19', type: 'student_produced', correctAnswer: '7', explanation: '2x = 14. x = 7.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-ws-q9', text: 'Solve for n: n/4 - 3 = 2', type: 'student_produced', correctAnswer: '20', explanation: 'n/4 = 5. n = 20.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-ws-q10', text: 'Solve for w: 5w - 8 = 22', type: 'student_produced', correctAnswer: '6', explanation: '5w = 30. w = 6.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-ws-q11', text: 'Solve for x: 3(x + 2) = 24', type: 'student_produced', correctAnswer: '6', explanation: '3x + 6 = 24. 3x = 18. x = 6.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-ws-q12', text: 'Solve for a: 4a - 7 = 2a + 9', type: 'student_produced', correctAnswer: '8', explanation: '2a = 16. a = 8.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-ws-q13', text: 'Solve for x: 2(x - 3) + 4 = 3x - 8', type: 'student_produced', correctAnswer: '6', explanation: '2x - 2 = 3x - 8. 6 = x.', difficulty: 3, domain: 'algebra' },
  { id: 'w2-ws-q14', text: 'Solve for y: 5(y + 1) = 3(y + 3) + 2', type: 'student_produced', correctAnswer: '3', explanation: '5y + 5 = 3y + 11. 2y = 6. y = 3.', difficulty: 3, domain: 'algebra' },
  { id: 'w2-ws-q15', text: 'Solve for m: (m + 6)/3 = (2m - 1)/4', type: 'student_produced', correctAnswer: '13.5', explanation: 'Cross multiply: 4m + 24 = 6m - 3. 27 = 2m. m = 13.5.', difficulty: 3, domain: 'algebra' },
  { id: 'w2-ws-q16', text: 'What is the slope and y-intercept of y = 3x - 5?', type: 'student_produced', correctAnswer: 'slope=3, y-intercept=-5', explanation: 'Slope m = 3, y-intercept b = -5.', difficulty: 1, domain: 'algebra' },
  { id: 'w2-ws-q17', text: 'Find the slope of the line through (2, 3) and (6, 11).', type: 'student_produced', correctAnswer: '2', explanation: '(11-3)/(6-2) = 8/4 = 2.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-ws-q18', text: 'Write the equation of a line with slope 2 passing through (0, -4).', type: 'student_produced', correctAnswer: 'y = 2x - 4', explanation: 'y = mx + b = 2x - 4.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-ws-q19', text: 'A line passes through (1, 5) and (3, 11). Write the equation in slope-intercept form.', type: 'student_produced', correctAnswer: 'y = 3x + 2', explanation: 'Slope = 3. Using (1,5): 5 = 3+b, b = 2. y = 3x + 2.', difficulty: 2, domain: 'algebra' },
  { id: 'w2-ws-q20', text: 'Rewrite 2x + 3y = 12 in slope-intercept form. What is the slope?', type: 'student_produced', correctAnswer: '-2/3', explanation: '3y = -2x + 12. y = -2/3 x + 4. Slope = -2/3.', difficulty: 3, domain: 'algebra' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// WEEK 3: Advanced Algebra
// ═══════════════════════════════════════════════════════════════════════════════

const w3QuizQuestions: Question[] = [
  { id: 'w3-quiz-q1', text: 'Solve the system: y = 3x; x + y = 16. What is x?', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 3' }, { label: 'B', text: 'x = 4' }, { label: 'C', text: 'x = 8' }, { label: 'D', text: 'x = 12' }], correctAnswer: 'B', explanation: 'x + 3x = 16. 4x = 16. x = 4.', difficulty: 1, domain: 'algebra' },
  { id: 'w3-quiz-q2', text: 'Solve: x + y = 14; x - y = 2. What is y?', type: 'multiple_choice', options: [{ label: 'A', text: 'y = 4' }, { label: 'B', text: 'y = 6' }, { label: 'C', text: 'y = 8' }, { label: 'D', text: 'y = 10' }], correctAnswer: 'B', explanation: 'Add: 2x = 16, x = 8. y = 14 - 8 = 6.', difficulty: 2, domain: 'algebra' },
  { id: 'w3-quiz-q3', text: 'Solve: 5x - 3 > 17', type: 'multiple_choice', options: [{ label: 'A', text: 'x > 2' }, { label: 'B', text: 'x > 4' }, { label: 'C', text: 'x > 5' }, { label: 'D', text: 'x > 20' }], correctAnswer: 'B', explanation: '5x > 20. x > 4.', difficulty: 2, domain: 'algebra' },
  { id: 'w3-quiz-q4', text: 'Solve: y = x - 2; 2x + y = 13. What is x?', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 3' }, { label: 'B', text: 'x = 5' }, { label: 'C', text: 'x = 7' }, { label: 'D', text: 'x = 11' }], correctAnswer: 'B', explanation: '2x + (x-2) = 13. 3x = 15. x = 5.', difficulty: 2, domain: 'algebra' },
  { id: 'w3-quiz-q5', text: 'Solve: -3x + 6 >= 18', type: 'multiple_choice', options: [{ label: 'A', text: 'x >= 4' }, { label: 'B', text: 'x >= -4' }, { label: 'C', text: 'x <= -4' }, { label: 'D', text: 'x <= 4' }], correctAnswer: 'C', explanation: '-3x >= 12. Divide by -3 (flip): x <= -4.', difficulty: 2, domain: 'algebra' },
  { id: 'w3-quiz-q6', text: 'A number tripled and then reduced by 7 equals 17. What is the number?', type: 'multiple_choice', options: [{ label: 'A', text: '6' }, { label: 'B', text: '7' }, { label: 'C', text: '8' }, { label: 'D', text: '10' }], correctAnswer: 'C', explanation: '3n - 7 = 17. 3n = 24. n = 8.', difficulty: 2, domain: 'algebra' },
  { id: 'w3-quiz-q7', text: 'Solve: 3x + 2y = 19; x + 2y = 9. What is x?', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 3' }, { label: 'B', text: 'x = 4' }, { label: 'C', text: 'x = 5' }, { label: 'D', text: 'x = 10' }], correctAnswer: 'C', explanation: 'Subtract: 2x = 10. x = 5.', difficulty: 2, domain: 'algebra' },
  { id: 'w3-quiz-q8', text: 'Maria has $2.50 in quarters and dimes. She has 13 coins total. How many quarters does she have?', type: 'multiple_choice', options: [{ label: 'A', text: '5' }, { label: 'B', text: '7' }, { label: 'C', text: '8' }, { label: 'D', text: '10' }], correctAnswer: 'C', explanation: 'q + d = 13; 0.25q + 0.10d = 2.50. Substitute: 0.15q = 1.20. q = 8.', difficulty: 2, domain: 'algebra' },
  { id: 'w3-quiz-q9', text: 'Solve: 4 - 3(x - 2) <= 16', type: 'multiple_choice', options: [{ label: 'A', text: 'x >= -2' }, { label: 'B', text: 'x <= -2' }, { label: 'C', text: 'x >= 2' }, { label: 'D', text: 'x <= 2' }], correctAnswer: 'A', explanation: '10 - 3x <= 16. -3x <= 6. x >= -2.', difficulty: 3, domain: 'algebra' },
  { id: 'w3-quiz-q10', text: 'Solve: 2x + 5y = 30; 3x - 5y = -5. What is y?', type: 'multiple_choice', options: [{ label: 'A', text: 'y = 1' }, { label: 'B', text: 'y = 2' }, { label: 'C', text: 'y = 4' }, { label: 'D', text: 'y = 5' }], correctAnswer: 'C', explanation: 'Add: 5x = 25. x = 5. Then 10 + 5y = 30. y = 4.', difficulty: 3, domain: 'algebra' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// WEEK 4: Data Analysis
// ═══════════════════════════════════════════════════════════════════════════════

const w4QuizQuestions: Question[] = [
  { id: 'w4-quiz-q1', text: 'Find the mean of: 10, 15, 20, 25, 30', type: 'multiple_choice', options: [{ label: 'A', text: '15' }, { label: 'B', text: '20' }, { label: 'C', text: '25' }, { label: 'D', text: '30' }], correctAnswer: 'B', explanation: '100/5 = 20.', difficulty: 1, domain: 'problem_solving' },
  { id: 'w4-quiz-q2', text: 'A bag has 4 red, 6 blue, and 2 white chips. What is the probability of picking a red chip?', type: 'multiple_choice', options: [{ label: 'A', text: '1/4' }, { label: 'B', text: '1/3' }, { label: 'C', text: '4/12' }, { label: 'D', text: 'Both B and C' }], correctAnswer: 'D', explanation: '4/12 = 1/3. Both B and C are correct.', difficulty: 1, domain: 'problem_solving' },
  { id: 'w4-quiz-q3', text: 'Five students studied these hours: Ana 6, Brian 9, Chloe 4, Derek 7, Elena 9. What is the median?', type: 'multiple_choice', options: [{ label: 'A', text: '6' }, { label: 'B', text: '7' }, { label: 'C', text: '8' }, { label: 'D', text: '9' }], correctAnswer: 'B', explanation: 'Ordered: 4, 6, 7, 9, 9. Middle = 7.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w4-quiz-q4', text: 'A jacket costs $85. It is on sale for 30% off. What is the sale price?', type: 'multiple_choice', options: [{ label: 'A', text: '$25.50' }, { label: 'B', text: '$55.00' }, { label: 'C', text: '$59.50' }, { label: 'D', text: '$65.00' }], correctAnswer: 'C', explanation: '30% of $85 = $25.50. Sale price = $59.50.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w4-quiz-q5', text: 'A school has 400 students. If 45% play a sport, how many play a sport?', type: 'multiple_choice', options: [{ label: 'A', text: '45' }, { label: 'B', text: '160' }, { label: 'C', text: '180' }, { label: 'D', text: '200' }], correctAnswer: 'C', explanation: '0.45 * 400 = 180.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w4-quiz-q6', text: 'Data set: 3, 5, 5, 7, 8, 10. What is the range?', type: 'multiple_choice', options: [{ label: 'A', text: '3' }, { label: 'B', text: '5' }, { label: 'C', text: '7' }, { label: 'D', text: '10' }], correctAnswer: 'C', explanation: '10 - 3 = 7.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w4-quiz-q7', text: 'A pizza shop sold 60 pizzas. Cheese to pepperoni ratio is 3:2. How many cheese?', type: 'multiple_choice', options: [{ label: 'A', text: '20' }, { label: 'B', text: '24' }, { label: 'C', text: '30' }, { label: 'D', text: '36' }], correctAnswer: 'D', explanation: '5 parts. Each = 12. Cheese = 3*12 = 36.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w4-quiz-q8', text: "A car's value went from $20,000 to $17,000. What is the percent decrease?", type: 'multiple_choice', options: [{ label: 'A', text: '12%' }, { label: 'B', text: '15%' }, { label: 'C', text: '17%' }, { label: 'D', text: '30%' }], correctAnswer: 'B', explanation: '3000/20000 = 0.15 = 15%.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w4-quiz-q9', text: 'A student scored 78, 84, 90, 72 on four tests. What score on the 5th test to average 82?', type: 'multiple_choice', options: [{ label: 'A', text: '82' }, { label: 'B', text: '84' }, { label: 'C', text: '86' }, { label: 'D', text: '88' }], correctAnswer: 'C', explanation: 'Need 410 total. Have 324. Need 86.', difficulty: 2, domain: 'problem_solving' },
  { id: 'w4-quiz-q10', text: 'A store buys for $40, marks up 50%, then puts on sale for 20% off. Final price?', type: 'multiple_choice', options: [{ label: 'A', text: '$44.00' }, { label: 'B', text: '$48.00' }, { label: 'C', text: '$52.00' }, { label: 'D', text: '$56.00' }], correctAnswer: 'B', explanation: 'Marked up: $60. 20% off: $12. Final: $48.', difficulty: 3, domain: 'problem_solving' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// WEEK 5: Geometry & Advanced Math
// ═══════════════════════════════════════════════════════════════════════════════

const w5QuizQuestions: Question[] = [
  { id: 'w5-quiz-q1', text: 'What is the area of a rectangle with length 9 inches and width 4 inches?', type: 'multiple_choice', options: [{ label: 'A', text: '13 square inches' }, { label: 'B', text: '26 square inches' }, { label: 'C', text: '36 square inches' }, { label: 'D', text: '72 square inches' }], correctAnswer: 'C', explanation: '9 * 4 = 36.', difficulty: 1, domain: 'geometry' },
  { id: 'w5-quiz-q2', text: 'A right triangle has legs of 5 and 12. What is the hypotenuse?', type: 'multiple_choice', options: [{ label: 'A', text: '11' }, { label: 'B', text: '13' }, { label: 'C', text: '15' }, { label: 'D', text: '17' }], correctAnswer: 'B', explanation: '25 + 144 = 169. sqrt(169) = 13.', difficulty: 1, domain: 'geometry' },
  { id: 'w5-quiz-q3', text: 'What is the volume of a rectangular box 6 cm x 3 cm x 5 cm?', type: 'multiple_choice', options: [{ label: 'A', text: '14 cubic cm' }, { label: 'B', text: '45 cubic cm' }, { label: 'C', text: '90 cubic cm' }, { label: 'D', text: '126 cubic cm' }], correctAnswer: 'C', explanation: '6 * 3 * 5 = 90.', difficulty: 2, domain: 'geometry' },
  { id: 'w5-quiz-q4', text: 'Triangle angles are x, 2x, 3x. What is x?', type: 'multiple_choice', options: [{ label: 'A', text: '20 degrees' }, { label: 'B', text: '30 degrees' }, { label: 'C', text: '45 degrees' }, { label: 'D', text: '60 degrees' }], correctAnswer: 'B', explanation: '6x = 180. x = 30.', difficulty: 2, domain: 'geometry' },
  { id: 'w5-quiz-q5', text: 'Solve: x^2 - 16 = 0', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 4 only' }, { label: 'B', text: 'x = -4 only' }, { label: 'C', text: 'x = 4 or x = -4' }, { label: 'D', text: 'x = 8 or x = -8' }], correctAnswer: 'C', explanation: '(x-4)(x+4) = 0. x = 4 or -4.', difficulty: 2, domain: 'advanced_math' },
  { id: 'w5-quiz-q6', text: 'If f(x) = 5x - 3, what is f(6)?', type: 'multiple_choice', options: [{ label: 'A', text: '27' }, { label: 'B', text: '30' }, { label: 'C', text: '33' }, { label: 'D', text: '36' }], correctAnswer: 'A', explanation: 'f(6) = 30 - 3 = 27.', difficulty: 2, domain: 'advanced_math' },
  { id: 'w5-quiz-q7', text: 'Simplify: sqrt(50)', type: 'multiple_choice', options: [{ label: 'A', text: '5 sqrt(2)' }, { label: 'B', text: '2 sqrt(5)' }, { label: 'C', text: '25' }, { label: 'D', text: '10 sqrt(5)' }], correctAnswer: 'A', explanation: '50 = 25*2. sqrt(50) = 5 sqrt(2).', difficulty: 2, domain: 'advanced_math' },
  { id: 'w5-quiz-q8', text: 'Solve: x^2 + 3x - 10 = 0', type: 'multiple_choice', options: [{ label: 'A', text: 'x = 5 or x = -2' }, { label: 'B', text: 'x = -5 or x = 2' }, { label: 'C', text: 'x = -5 or x = -2' }, { label: 'D', text: 'x = 5 or x = 2' }], correctAnswer: 'B', explanation: '(x+5)(x-2) = 0. x = -5 or 2.', difficulty: 2, domain: 'advanced_math' },
  { id: 'w5-quiz-q9', text: 'A circle has diameter 14 cm. What is its area? (pi = 3.14)', type: 'multiple_choice', options: [{ label: 'A', text: '43.96 sq cm' }, { label: 'B', text: '153.86 sq cm' }, { label: 'C', text: '196 sq cm' }, { label: 'D', text: '615.44 sq cm' }], correctAnswer: 'B', explanation: 'r = 7. Area = 3.14 * 49 = 153.86.', difficulty: 3, domain: 'geometry' },
  { id: 'w5-quiz-q10', text: 'If g(x) = x^2 + 2x - 8, what is g(-3)?', type: 'multiple_choice', options: [{ label: 'A', text: '-5' }, { label: 'B', text: '-1' }, { label: 'C', text: '1' }, { label: 'D', text: '-11' }], correctAnswer: 'A', explanation: 'g(-3) = 9 - 6 - 8 = -5.', difficulty: 3, domain: 'advanced_math' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Assemble all weeks
// ═══════════════════════════════════════════════════════════════════════════════

export const weeks: Week[] = [
  {
    weekNumber: 1,
    title: 'Foundations',
    description: 'Fractions, decimals, percentages, ratios, and proportions -- the building blocks for everything else.',
    topics: [w1Topic1, w1Topic2],
    quizQuestions: w1QuizQuestions,
    worksheetQuestions: w1WorksheetQuestions,
  },
  {
    weekNumber: 2,
    title: 'Algebra Basics',
    description: 'Variables, expressions, solving linear equations, and graphing lines -- the most important topics on the test.',
    topics: [w2Topic1, w2Topic2],
    quizQuestions: w2QuizQuestions,
    worksheetQuestions: w2WorksheetQuestions,
  },
  {
    weekNumber: 3,
    title: 'Advanced Algebra',
    description: 'Systems of equations, inequalities, and translating word problems into equations.',
    topics: [
      {
        id: 'w3-t1', weekNumber: 3, slug: 'systems-of-equations', title: 'Systems of Linear Equations',
        videoLink: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:systems-of-equations',
        content: `A **system of equations** is when you have two equations with two unknowns (usually x and y), and you need to find the values of both. The solution is the point where the two lines cross.

There are two main methods: **substitution** (plug one equation into the other) and **elimination** (add or subtract the equations to cancel a variable).

If one equation says "y = something," use substitution. If the coefficients match up nicely, use elimination.`,
        questions: [],
      },
      {
        id: 'w3-t2', weekNumber: 3, slug: 'linear-inequalities', title: 'Linear Inequalities',
        videoLink: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:inequalities-systems-graphs',
        content: `An **inequality** uses <, >, <=, or >= instead of =. Solving works like equations with one key rule: **when you multiply or divide by a negative number, flip the sign.**

"At most" means <=, "at least" means >=.`,
        questions: [],
      },
    ],
    quizQuestions: w3QuizQuestions,
    worksheetQuestions: [],
  },
  {
    weekNumber: 4,
    title: 'Problem-Solving & Data Analysis',
    description: 'Reading charts, tables, and graphs; mean, median, mode, range; percentage and probability word problems.',
    topics: [
      {
        id: 'w4-t1', weekNumber: 4, slug: 'percentages-in-real-life', title: 'Percentages in Real Life',
        videoLink: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-fractions-decimals',
        content: `Percent increase = (New - Old) / Old * 100. Percent decrease = (Old - New) / Old * 100. Always divide by the ORIGINAL amount.`,
        questions: [],
      },
      {
        id: 'w4-t2', weekNumber: 4, slug: 'reading-charts-tables-graphs', title: 'Reading Charts, Tables, and Graphs',
        videoLink: 'https://www.khanacademy.org/math/statistics-probability',
        content: `Read the title, labels, and units before answering. Look for trends in scatterplots: positive (up-right), negative (up-left), or none.`,
        questions: [],
      },
      {
        id: 'w4-t3', weekNumber: 4, slug: 'mean-median-mode-range', title: 'Mean, Median, Mode, and Range',
        videoLink: 'https://www.khanacademy.org/math/statistics-probability/summarizing-quantitative-data',
        content: `**Mean** = sum / count. **Median** = middle value when ordered. **Mode** = most frequent. **Range** = max - min.`,
        questions: [],
      },
      {
        id: 'w4-t4', weekNumber: 4, slug: 'probability-basics', title: 'Probability Basics',
        videoLink: 'https://www.khanacademy.org/math/statistics-probability/probability-library',
        content: `Probability = Favorable Outcomes / Total Outcomes. For independent events, multiply. For "or" (mutually exclusive), add.`,
        questions: [],
      },
    ],
    quizQuestions: w4QuizQuestions,
    worksheetQuestions: [],
  },
  {
    weekNumber: 5,
    title: 'Geometry & Advanced Math',
    description: 'Area, perimeter, volume, Pythagorean theorem, quadratic equations, functions, and exponents.',
    topics: [
      {
        id: 'w5-t1', weekNumber: 5, slug: 'area-perimeter-volume', title: 'Area, Perimeter, and Volume',
        videoLink: 'https://www.khanacademy.org/math/basic-geo/basic-geo-area-and-perimeter',
        content: `Rectangle: A = l*w, P = 2l+2w. Triangle: A = 1/2*b*h. Circle: A = pi*r^2, C = 2*pi*r. Cylinder: V = pi*r^2*h.`,
        questions: [],
      },
      {
        id: 'w5-t2', weekNumber: 5, slug: 'angles-and-triangles', title: 'Angles and Triangles',
        videoLink: 'https://www.khanacademy.org/math/basic-geo/basic-geo-angle',
        content: `Triangle angles sum to 180. Supplementary angles sum to 180. Complementary angles sum to 90.`,
        questions: [],
      },
      {
        id: 'w5-t3', weekNumber: 5, slug: 'pythagorean-theorem', title: 'Pythagorean Theorem',
        videoLink: 'https://www.khanacademy.org/math/basic-geo/basic-geometry-pythagorean-theorem',
        content: `a^2 + b^2 = c^2 for right triangles. Common triples: 3-4-5, 5-12-13, 8-15-17.`,
        questions: [],
      },
      {
        id: 'w5-t4', weekNumber: 5, slug: 'quadratic-equations', title: 'Quadratic Equations',
        videoLink: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratics-multiplying-factoring',
        content: `ax^2 + bx + c = 0. Solve by factoring, square root method, or quadratic formula. Vertex at x = -b/(2a).`,
        questions: [],
      },
      {
        id: 'w5-t5', weekNumber: 5, slug: 'functions', title: 'Functions',
        videoLink: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions',
        content: `f(x) notation: plug in the value for x. f(x)+k shifts up, f(x)-k shifts down. f(x-h) shifts right.`,
        questions: [],
      },
      {
        id: 'w5-t6', weekNumber: 5, slug: 'exponents-and-radicals', title: 'Exponents and Radicals',
        videoLink: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:rational-exponents-radicals',
        content: `Multiply same base: add exponents. Divide: subtract. Power of power: multiply. x^0 = 1.`,
        questions: [],
      },
    ],
    quizQuestions: w5QuizQuestions,
    worksheetQuestions: [],
  },
];
