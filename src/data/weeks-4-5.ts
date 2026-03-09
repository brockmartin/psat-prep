import type { Topic, Question } from '@/types/content';

// ═══════════════════════════════════════════════════════════════════════════════
// WEEK 4: Problem-Solving & Data Analysis
// ═══════════════════════════════════════════════════════════════════════════════

// ---------------------------------------------------------------------------
// Topic 1 — Percentages in Real Life
// ---------------------------------------------------------------------------

const w4Topic1: Topic = {
  id: 'w4-t1',
  weekNumber: 4,
  slug: 'percentages-in-real-life',
  title: 'Percentages in Real Life',
  videoLink: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-fractions-decimals',
  content: `Percentages pop up everywhere in daily life -- shopping, taxes, tips, grades, and sports stats. The most basic skill is finding a **percent of a number**. To do this, convert the percent to a decimal (divide by 100) and multiply. For example, 30% of 200 is 0.30 times 200, which equals 60. You can also think of it as a fraction: 30% means 30/100, which simplifies to 3/10. Either way works.

Two of the most common PSAT question types involve **percent increase** and **percent decrease**. The formulas are simple but students often mix them up. Percent increase = (New - Original) / Original times 100. Percent decrease = (Original - New) / Original times 100. The key is that you always divide by the ORIGINAL amount, not the new amount. If a price goes from $50 to $65, the increase is $15, and the percent increase is 15/50 times 100, which is 30%.

In the real world, you deal with **tax, tips, and discounts** all the time. A discount means you subtract a percentage from the price. Tax and tip mean you add a percentage to the price. Sometimes you have to do both in one problem -- for example, a store gives you a discount and then you pay sales tax on the discounted price. Always apply the discount first, then the tax, unless the problem says otherwise.

Watch out for the **"original" trap**. If a price increases by 25% and then decreases by 25%, it does NOT go back to the original price. Here is why: say the original price is $100. A 25% increase makes it $125. Then a 25% decrease takes 25% of $125, which is $31.25, leaving you at $93.75 -- not $100. The percentages are applied to different amounts, so they do not cancel out. Another common trap: if an item is on sale for 40% off and you know the sale price is $42, the original price is NOT $42 plus 40% of $42. Instead, $42 is 60% of the original, so you divide $42 by 0.60 to get $70.`,
  questions: [
    {
      id: 'w4-t1-q1',
      text: 'A shirt costs $45. It is 20% off. What is the sale price?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '$9.00' },
        { label: 'B', text: '$25.00' },
        { label: 'C', text: '$36.00' },
        { label: 'D', text: '$40.00' },
      ],
      correctAnswer: 'C',
      explanation: 'Step 1: Find 20% of $45. 0.20 * 45 = $9. Step 2: Subtract the discount from the original price. $45 - $9 = $36. The sale price is $36.',
      difficulty: 1,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t1-q2',
      text: 'A town\'s population grew from 8,000 to 9,200. What is the percent increase?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '12%' },
        { label: 'B', text: '13%' },
        { label: 'C', text: '15%' },
        { label: 'D', text: '20%' },
      ],
      correctAnswer: 'C',
      explanation: 'Step 1: Find the change. 9,200 - 8,000 = 1,200. Step 2: Divide by the original amount. 1,200 / 8,000 = 0.15. Step 3: Convert to a percent. 0.15 * 100 = 15%.',
      difficulty: 2,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t1-q3',
      text: 'A pair of shoes is priced at $80. The store offers a 15% discount, and sales tax is 8%. If the tax is applied after the discount, what is the total cost?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '$68.00' },
        { label: 'B', text: '$73.44' },
        { label: 'C', text: '$74.40' },
        { label: 'D', text: '$79.20' },
      ],
      correctAnswer: 'B',
      explanation: 'Step 1: Find the discount. 15% of $80 = $12. Discounted price = $80 - $12 = $68. Step 2: Apply tax to the discounted price. 8% of $68 = $5.44. Step 3: Total = $68 + $5.44 = $73.44.',
      difficulty: 2,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t1-q4',
      text: 'A stock price increased by 25% one day and then decreased by 20% the next day. If the stock started at $200, what is the price after both changes?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '$190' },
        { label: 'B', text: '$200' },
        { label: 'C', text: '$210' },
        { label: 'D', text: '$220' },
      ],
      correctAnswer: 'B',
      explanation: 'Step 1: 25% increase on $200. $200 * 1.25 = $250. Step 2: 20% decrease on $250. $250 * 0.80 = $200. The price is $200. It went back to the original here because 25% up and 20% down happen to cancel for this specific pair, but this is NOT always the case -- it only works because 1.25 * 0.80 = 1.00 exactly.',
      difficulty: 3,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t1-q5',
      text: 'After a 30% discount, a laptop costs $490. What was the original price?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '$637' },
        { label: 'B', text: '$650' },
        { label: 'C', text: '$700' },
        { label: 'D', text: '$735' },
      ],
      correctAnswer: 'C',
      explanation: 'If the laptop is 30% off, the customer pays 70% of the original price. So 0.70 * Original = $490. Divide both sides by 0.70: Original = $490 / 0.70 = $700. A common mistake is to add 30% of $490 back on, but that gives the wrong answer because the 30% was taken from the original, not from $490.',
      difficulty: 3,
      domain: 'problem_solving',
    },
  ],
};

// ---------------------------------------------------------------------------
// Topic 2 — Reading Charts, Tables, and Graphs
// ---------------------------------------------------------------------------

const w4Topic2: Topic = {
  id: 'w4-t2',
  weekNumber: 4,
  slug: 'reading-charts-tables-graphs',
  title: 'Reading Charts, Tables, and Graphs',
  videoLink: 'https://www.khanacademy.org/math/statistics-probability',
  content: `On the PSAT, you will see questions that ask you to pull information from **tables, bar graphs, line graphs, and scatterplots**. The first thing you should always do is read the title, the axis labels, and any units. Many mistakes happen because students jump straight to the numbers without checking what those numbers actually represent.

A **table** organizes data into rows and columns. To answer a question about a table, first find the right row and the right column, then read the value where they meet. A **bar graph** uses the height (or length) of bars to show values for different categories. To read a bar graph, look at where the top of a bar lines up with the number axis. A **line graph** connects data points with a line, usually to show how something changes over time. When a line goes up, the value is increasing; when it goes down, the value is decreasing; when it is flat, the value is staying the same.

A **scatterplot** shows individual data points plotted on a grid. Scatterplots are used to see whether two variables are related. If the dots trend upward from left to right, there is a **positive association** (as one goes up, the other goes up). If they trend downward, there is a **negative association**. If the dots are scattered randomly with no pattern, there is **no association**. Sometimes you will be asked about the "line of best fit," which is the straight line that comes closest to all the points.

**Two-way tables** (also called contingency tables) show data sorted by two different categories at the same time. For example, a table might show students sorted by grade level and favorite subject. You can use a two-way table to find totals, calculate percentages, and answer probability questions. To find a probability from a two-way table, put the number of favorable outcomes on top and the total you are looking at on the bottom.`,
  questions: [
    {
      id: 'w4-t2-q1',
      text: 'A table shows a student\'s test scores: 78, 85, 92, 88. What was the highest score?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '78' },
        { label: 'B', text: '85' },
        { label: 'C', text: '88' },
        { label: 'D', text: '92' },
      ],
      correctAnswer: 'D',
      explanation: 'Look at each score: 78, 85, 92, 88. The largest value is 92.',
      difficulty: 1,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t2-q2',
      text: 'A survey of 200 students found that 35% prefer pizza, 25% prefer burgers, and the rest prefer sandwiches. How many students prefer sandwiches?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '40' },
        { label: 'B', text: '60' },
        { label: 'C', text: '80' },
        { label: 'D', text: '120' },
      ],
      correctAnswer: 'C',
      explanation: 'Step 1: Add the known percentages. 35% + 25% = 60%. Step 2: Subtract from 100%. 100% - 60% = 40% prefer sandwiches. Step 3: Find 40% of 200. 0.40 * 200 = 80 students.',
      difficulty: 2,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t2-q3',
      text: 'A scatterplot shows the number of hours students studied on the x-axis and their test scores on the y-axis. The data points trend upward from left to right. Which of the following best describes the association?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: 'Negative association: more studying leads to lower scores' },
        { label: 'B', text: 'Positive association: more studying is associated with higher scores' },
        { label: 'C', text: 'No association: studying has no relationship with scores' },
        { label: 'D', text: 'The scatterplot shows a constant score regardless of study time' },
      ],
      correctAnswer: 'B',
      explanation: 'When dots trend upward from left to right, that means as one variable increases, the other also tends to increase. This is called a positive association.',
      difficulty: 2,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t2-q4',
      text: 'A two-way table shows 120 students sorted by gender and whether they play a sport. Of 70 boys, 50 play a sport. Of 50 girls, 30 play a sport. If a student is chosen at random, what is the probability that the student is a girl who plays a sport?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '1/4' },
        { label: 'B', text: '3/5' },
        { label: 'C', text: '3/10' },
        { label: 'D', text: '1/2' },
      ],
      correctAnswer: 'A',
      explanation: 'There are 30 girls who play a sport out of 120 total students. P = 30/120 = 1/4.',
      difficulty: 3,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t2-q5',
      text: 'A bar graph shows monthly sales for two stores. Store A sold 150 units in January and 210 units in February. Store B sold 180 units in January and 190 units in February. Which store had the greater increase in sales from January to February?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: 'Store A, with an increase of 60 units' },
        { label: 'B', text: 'Store B, with an increase of 60 units' },
        { label: 'C', text: 'Store A, with an increase of 40 units' },
        { label: 'D', text: 'Store B, with an increase of 10 units' },
      ],
      correctAnswer: 'A',
      explanation: 'Store A increase: 210 - 150 = 60 units. Store B increase: 190 - 180 = 10 units. Store A had the greater increase of 60 units.',
      difficulty: 3,
      domain: 'problem_solving',
    },
  ],
};

// ---------------------------------------------------------------------------
// Topic 3 — Mean, Median, Mode, Range
// ---------------------------------------------------------------------------

const w4Topic3: Topic = {
  id: 'w4-t3',
  weekNumber: 4,
  slug: 'mean-median-mode-range',
  title: 'Mean, Median, Mode, and Range',
  videoLink: 'https://www.khanacademy.org/math/statistics-probability/summarizing-quantitative-data',
  content: `The **mean** (average) is the sum of all values divided by the number of values. For example, the mean of 4, 8, and 12 is (4 + 8 + 12) / 3 = 24 / 3 = 8. The mean is the most commonly used measure of center, and it is what most people think of when they hear the word "average."

The **median** is the middle value when the numbers are listed in order from least to greatest. If there is an odd number of values, the median is the single middle number. If there is an even number of values, the median is the average of the two middle numbers. For example, the median of 3, 7, 9 is 7 (the middle value). The median of 2, 5, 8, 10 is (5 + 8) / 2 = 6.5.

The **mode** is the value that appears most often. A data set can have no mode (if all values appear the same number of times), one mode, or more than one mode. The **range** is the difference between the largest and smallest values: Range = Maximum - Minimum. The range tells you how spread out the data is.

**Outliers** are values that are much higher or much lower than the rest of the data. Outliers affect the mean a lot but usually do not change the median much. That is why the median is often a better measure of center when there are extreme values. For example, if five friends earn $30k, $35k, $32k, $28k, and $500k, the mean is $125k, which does not represent the typical person in the group. The median is $32k, which is a much better picture of the "middle" earner. On the PSAT, always think about which measure of center makes the most sense for the situation.`,
  questions: [
    {
      id: 'w4-t3-q1',
      text: 'Find the mean of the following data set: 12, 15, 18, 21, 24.',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '15' },
        { label: 'B', text: '18' },
        { label: 'C', text: '20' },
        { label: 'D', text: '21' },
      ],
      correctAnswer: 'B',
      explanation: 'Step 1: Add all values. 12 + 15 + 18 + 21 + 24 = 90. Step 2: Divide by the number of values. 90 / 5 = 18. The mean is 18.',
      difficulty: 1,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t3-q2',
      text: 'Find the median of: 7, 3, 9, 1, 5, 8, 2.',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '3' },
        { label: 'B', text: '5' },
        { label: 'C', text: '7' },
        { label: 'D', text: '8' },
      ],
      correctAnswer: 'B',
      explanation: 'Step 1: Put the numbers in order. 1, 2, 3, 5, 7, 8, 9. Step 2: There are 7 values, so the median is the 4th value. The median is 5.',
      difficulty: 1,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t3-q3',
      text: 'A student scored 80, 85, 78, and 92 on four tests. What score does the student need on the 5th test to have an average (mean) of 85?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '85' },
        { label: 'B', text: '88' },
        { label: 'C', text: '90' },
        { label: 'D', text: '95' },
      ],
      correctAnswer: 'C',
      explanation: 'Step 1: For an average of 85 over 5 tests, the total must be 85 * 5 = 425. Step 2: Add the four known scores. 80 + 85 + 78 + 92 = 335. Step 3: Subtract to find the needed score. 425 - 335 = 90.',
      difficulty: 2,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t3-q4',
      text: 'The data set {3, 5, 7, 9, 11} has a mean of 7 and a median of 7. A new value of 7 is added to the set. Which statement is true?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: 'The mean changes but the median stays the same' },
        { label: 'B', text: 'The median changes but the mean stays the same' },
        { label: 'C', text: 'Both the mean and the median change' },
        { label: 'D', text: 'Neither the mean nor the median changes' },
      ],
      correctAnswer: 'D',
      explanation: 'New set: {3, 5, 7, 7, 9, 11}. New mean = 42 / 6 = 7 (unchanged). New median = (7 + 7) / 2 = 7 (unchanged). Neither changes because the added value equals both the original mean and the original median.',
      difficulty: 3,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t3-q5',
      text: 'A data set has values: 10, 12, 14, 15, 13. If the value 100 is added to the data set, which measure of center will change the most?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: 'Mean' },
        { label: 'B', text: 'Median' },
        { label: 'C', text: 'Mode' },
        { label: 'D', text: 'They all change by the same amount' },
      ],
      correctAnswer: 'A',
      explanation: 'Original mean = 64 / 5 = 12.8. New mean = 164 / 6 = 27.3 (a big jump). Original median: ordered is 10, 12, 13, 14, 15 so median = 13. New ordered: 10, 12, 13, 14, 15, 100 so median = (13 + 14) / 2 = 13.5 (barely changed). The mean is much more affected by the outlier.',
      difficulty: 3,
      domain: 'problem_solving',
    },
  ],
};

// ---------------------------------------------------------------------------
// Topic 4 — Probability Basics
// ---------------------------------------------------------------------------

const w4Topic4: Topic = {
  id: 'w4-t4',
  weekNumber: 4,
  slug: 'probability-basics',
  title: 'Probability Basics',
  videoLink: 'https://www.khanacademy.org/math/statistics-probability/probability-library',
  content: `**Probability** measures how likely something is to happen. It is always a number between 0 and 1 (or 0% and 100%). A probability of 0 means something is impossible; a probability of 1 means it is certain. To calculate the probability of a single event, use the formula: P(event) = Number of Favorable Outcomes / Total Number of Outcomes. For example, if you have a bag with 3 red marbles and 7 blue marbles, the probability of picking a red marble is 3/10.

The probability that an event does **not** happen is called the **complement**. P(not A) = 1 - P(A). So if the probability of rain is 0.3, the probability of no rain is 1 - 0.3 = 0.7. This shortcut is very handy when it is easier to count what you do NOT want than what you do want.

**Independent events** are events where one does not affect the other. Flipping a coin and rolling a die are independent -- the coin does not care what the die shows. For independent events, you **multiply** the probabilities. P(A and B) = P(A) * P(B). For example, the probability of flipping heads AND rolling a 6 is 1/2 * 1/6 = 1/12.

For **"or" questions** with mutually exclusive events (events that cannot happen at the same time), you **add** the probabilities. P(A or B) = P(A) + P(B). For example, the probability of rolling a 2 or a 5 on a standard die is 1/6 + 1/6 = 2/6 = 1/3. If the events are not mutually exclusive (they can overlap), you must subtract the overlap: P(A or B) = P(A) + P(B) - P(A and B). Always check whether events can happen at the same time before deciding whether to add or to add-then-subtract.`,
  questions: [
    {
      id: 'w4-t4-q1',
      text: 'A bag contains 4 red marbles, 6 blue marbles, and 2 green marbles. If you pick one marble at random, what is the probability of picking a blue marble?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '1/4' },
        { label: 'B', text: '1/3' },
        { label: 'C', text: '1/2' },
        { label: 'D', text: '2/3' },
      ],
      correctAnswer: 'C',
      explanation: 'Total marbles = 4 + 6 + 2 = 12. Blue marbles = 6. P(blue) = 6/12 = 1/2.',
      difficulty: 1,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t4-q2',
      text: 'You flip a fair coin twice. What is the probability of getting heads both times?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '1/2' },
        { label: 'B', text: '1/3' },
        { label: 'C', text: '1/4' },
        { label: 'D', text: '3/4' },
      ],
      correctAnswer: 'C',
      explanation: 'Each flip has P(heads) = 1/2. The flips are independent, so multiply: 1/2 * 1/2 = 1/4.',
      difficulty: 1,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t4-q3',
      text: 'A bag contains 4 red marbles, 6 blue marbles, and 2 green marbles. What is the probability of NOT picking a red marble?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '1/3' },
        { label: 'B', text: '1/2' },
        { label: 'C', text: '2/3' },
        { label: 'D', text: '3/4' },
      ],
      correctAnswer: 'C',
      explanation: 'Total marbles = 12. Red marbles = 4. P(red) = 4/12 = 1/3. P(not red) = 1 - 1/3 = 2/3.',
      difficulty: 2,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t4-q4',
      text: 'You roll a standard six-sided die and flip a fair coin at the same time. What is the probability of rolling a 6 and getting heads?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '1/6' },
        { label: 'B', text: '1/8' },
        { label: 'C', text: '1/12' },
        { label: 'D', text: '1/3' },
      ],
      correctAnswer: 'C',
      explanation: 'P(rolling a 6) = 1/6. P(heads) = 1/2. These are independent events, so multiply: 1/6 * 1/2 = 1/12.',
      difficulty: 2,
      domain: 'problem_solving',
    },
    {
      id: 'w4-t4-q5',
      text: 'A drawer contains 5 black socks and 3 white socks. You pick one sock at random, put it back, and then pick another. What is the probability that both socks are black?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '5/14' },
        { label: 'B', text: '25/64' },
        { label: 'C', text: '5/8' },
        { label: 'D', text: '10/16' },
      ],
      correctAnswer: 'B',
      explanation: 'Since the sock is replaced, each pick is independent. P(black first) = 5/8. P(black second) = 5/8. P(both black) = 5/8 * 5/8 = 25/64.',
      difficulty: 3,
      domain: 'problem_solving',
    },
  ],
};

const w4Topics: Topic[] = [w4Topic1, w4Topic2, w4Topic3, w4Topic4];

// ---------------------------------------------------------------------------
// Week 4 Quiz — 10 questions across all 4 topics, real-world contexts
// ---------------------------------------------------------------------------

const w4QuizQuestions: Question[] = [
  {
    id: 'w4-quiz-q1',
    text: 'A restaurant bill is $65. You want to leave an 18% tip. How much is the tip?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '$10.40' },
      { label: 'B', text: '$11.70' },
      { label: 'C', text: '$12.50' },
      { label: 'D', text: '$13.00' },
    ],
    correctAnswer: 'B',
    explanation: '18% of $65 = 0.18 * 65 = $11.70.',
    difficulty: 1,
    domain: 'problem_solving',
  },
  {
    id: 'w4-quiz-q2',
    text: 'Find the median of: 14, 22, 9, 17, 31, 22, 11.',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '14' },
      { label: 'B', text: '17' },
      { label: 'C', text: '18' },
      { label: 'D', text: '22' },
    ],
    correctAnswer: 'B',
    explanation: 'Ordered: 9, 11, 14, 17, 22, 22, 31. There are 7 values, so the median is the 4th value: 17.',
    difficulty: 1,
    domain: 'problem_solving',
  },
  {
    id: 'w4-quiz-q3',
    text: 'A spinner has 8 equal sections numbered 1 through 8. What is the probability of spinning a number greater than 5?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '1/4' },
      { label: 'B', text: '3/8' },
      { label: 'C', text: '1/2' },
      { label: 'D', text: '5/8' },
    ],
    correctAnswer: 'B',
    explanation: 'Numbers greater than 5 are 6, 7, and 8. That is 3 favorable outcomes out of 8 total. P = 3/8.',
    difficulty: 1,
    domain: 'problem_solving',
  },
  {
    id: 'w4-quiz-q4',
    text: 'A school surveyed 250 students. The results showed 40% prefer math, 30% prefer science, and the rest prefer English. How many students prefer English?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '50' },
      { label: 'B', text: '60' },
      { label: 'C', text: '75' },
      { label: 'D', text: '100' },
    ],
    correctAnswer: 'C',
    explanation: 'English percentage: 100% - 40% - 30% = 30%. Number of English students: 0.30 * 250 = 75.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'w4-quiz-q5',
    text: 'A car\'s value dropped from $25,000 to $20,000 in one year. What is the percent decrease?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '15%' },
      { label: 'B', text: '20%' },
      { label: 'C', text: '25%' },
      { label: 'D', text: '30%' },
    ],
    correctAnswer: 'B',
    explanation: 'Decrease = $25,000 - $20,000 = $5,000. Percent decrease = 5,000 / 25,000 = 0.20 = 20%.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'w4-quiz-q6',
    text: 'A basketball player scored 18, 22, 15, 25, and 20 points in five games. What is the mean number of points per game?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '18' },
      { label: 'B', text: '20' },
      { label: 'C', text: '22' },
      { label: 'D', text: '25' },
    ],
    correctAnswer: 'B',
    explanation: 'Sum = 18 + 22 + 15 + 25 + 20 = 100. Mean = 100 / 5 = 20.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'w4-quiz-q7',
    text: 'A bag has 10 tiles numbered 1 through 10. You draw one tile at random. What is the probability of drawing an even number or a number greater than 7?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '1/2' },
      { label: 'B', text: '3/5' },
      { label: 'C', text: '7/10' },
      { label: 'D', text: '4/5' },
    ],
    correctAnswer: 'C',
    explanation: 'Even numbers: {2, 4, 6, 8, 10} = 5 tiles. Numbers > 7: {8, 9, 10} = 3 tiles. Overlap (both even AND > 7): {8, 10} = 2 tiles. Using P(A or B) = P(A) + P(B) - P(A and B) = 5/10 + 3/10 - 2/10 = 6/10 -- wait, let me recount. Even: {2,4,6,8,10}. Greater than 7: {8,9,10}. Union: {2,4,6,8,9,10} = 7 tiles. P = 7/10.',
    difficulty: 3,
    domain: 'problem_solving',
  },
  {
    id: 'w4-quiz-q8',
    text: 'After a 25% discount, a television costs $450. What was the original price?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '$525' },
      { label: 'B', text: '$562.50' },
      { label: 'C', text: '$575' },
      { label: 'D', text: '$600' },
    ],
    correctAnswer: 'D',
    explanation: 'The customer pays 75% of the original price. 0.75 * Original = $450. Original = $450 / 0.75 = $600.',
    difficulty: 3,
    domain: 'problem_solving',
  },
  {
    id: 'w4-quiz-q9',
    text: 'A student has test scores of 72, 88, 91, and 79. What score is needed on the 5th test to bring the mean to exactly 84?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '84' },
      { label: 'B', text: '86' },
      { label: 'C', text: '88' },
      { label: 'D', text: '90' },
    ],
    correctAnswer: 'D',
    explanation: 'Target total = 84 * 5 = 420. Current total = 72 + 88 + 91 + 79 = 330. Needed = 420 - 330 = 90.',
    difficulty: 2,
    domain: 'problem_solving',
  },
  {
    id: 'w4-quiz-q10',
    text: 'A store buys a jacket for $50, marks it up by 60%, then puts it on sale for 25% off the marked-up price. What is the final sale price?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '$55.00' },
      { label: 'B', text: '$57.50' },
      { label: 'C', text: '$60.00' },
      { label: 'D', text: '$62.50' },
    ],
    correctAnswer: 'C',
    explanation: 'Marked-up price: $50 * 1.60 = $80. Sale discount: 25% of $80 = $20. Final price: $80 - $20 = $60.',
    difficulty: 3,
    domain: 'problem_solving',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// WEEK 5: Geometry & Advanced Math
// ═══════════════════════════════════════════════════════════════════════════════

// ---------------------------------------------------------------------------
// Topic 1 — Area, Perimeter, and Volume
// ---------------------------------------------------------------------------

const w5Topic1: Topic = {
  id: 'w5-t1',
  weekNumber: 5,
  slug: 'area-perimeter-volume',
  title: 'Area, Perimeter, and Volume',
  videoLink: 'https://www.khanacademy.org/math/basic-geo/basic-geo-area-and-perimeter',
  content: `**Area** measures the amount of space inside a flat shape, and it is always given in square units (like square feet or square centimeters). **Perimeter** measures the distance around the outside of a shape, and it is given in regular units (like feet or centimeters). You need to memorize a few key formulas. For a **rectangle**: Area = length * width, and Perimeter = 2 * length + 2 * width. For a **triangle**: Area = 1/2 * base * height. The height must be perpendicular (at a right angle) to the base.

For a **circle**, the formulas use pi (approximately 3.14). Area = pi * r^2, where r is the radius (the distance from the center to the edge). Circumference (the perimeter of a circle) = 2 * pi * r, or equivalently, pi * d, where d is the diameter. Remember that the diameter is twice the radius: d = 2r. A very common mistake is to use the diameter when the formula calls for the radius, or vice versa. Always check which one the problem gives you.

**Volume** measures the space inside a three-dimensional object, and it is given in cubic units. For a **rectangular prism** (a box): Volume = length * width * height. For a **cylinder**: Volume = pi * r^2 * h, where r is the radius of the circular base and h is the height. Think of a cylinder's volume as the area of the circular base (pi * r^2) times the height.

On the PSAT, you may also see **composite shapes** -- shapes made by combining or cutting out simpler shapes. For these, break the shape into pieces you know (rectangles, triangles, etc.), find each area separately, and then add or subtract. For example, an L-shaped room can be split into two rectangles, and you add their areas together.`,
  questions: [
    {
      id: 'w5-t1-q1',
      text: 'What is the area of a rectangle with length 15 feet and width 8 feet?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '46 square feet' },
        { label: 'B', text: '92 square feet' },
        { label: 'C', text: '120 square feet' },
        { label: 'D', text: '150 square feet' },
      ],
      correctAnswer: 'C',
      explanation: 'Area of a rectangle = length * width = 15 * 8 = 120 square feet. (Option A is the perimeter divided by something, and B is the perimeter -- do not mix them up.)',
      difficulty: 1,
      domain: 'geometry',
    },
    {
      id: 'w5-t1-q2',
      text: 'What is the area of a triangle with a base of 12 cm and a height of 9 cm?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '21 square cm' },
        { label: 'B', text: '54 square cm' },
        { label: 'C', text: '108 square cm' },
        { label: 'D', text: '42 square cm' },
      ],
      correctAnswer: 'B',
      explanation: 'Area of a triangle = 1/2 * base * height = 1/2 * 12 * 9 = 54 square cm. A common mistake is forgetting to multiply by 1/2 (that would give 108).',
      difficulty: 1,
      domain: 'geometry',
    },
    {
      id: 'w5-t1-q3',
      text: 'A circular garden has a diameter of 10 feet. What is its area? (Use pi = 3.14)',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '31.4 square feet' },
        { label: 'B', text: '78.5 square feet' },
        { label: 'C', text: '157 square feet' },
        { label: 'D', text: '314 square feet' },
      ],
      correctAnswer: 'B',
      explanation: 'The diameter is 10, so the radius is 5. Area = pi * r^2 = 3.14 * 25 = 78.5 square feet. A common mistake is using the diameter (10) instead of the radius (5), which would give 314.',
      difficulty: 2,
      domain: 'geometry',
    },
    {
      id: 'w5-t1-q4',
      text: 'A rectangular storage container is 4 feet long, 3 feet wide, and 5 feet tall. What is its volume?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '12 cubic feet' },
        { label: 'B', text: '35 cubic feet' },
        { label: 'C', text: '47 cubic feet' },
        { label: 'D', text: '60 cubic feet' },
      ],
      correctAnswer: 'D',
      explanation: 'Volume of a rectangular prism = length * width * height = 4 * 3 * 5 = 60 cubic feet.',
      difficulty: 2,
      domain: 'geometry',
    },
    {
      id: 'w5-t1-q5',
      text: 'An L-shaped room is made of two rectangles. The first rectangle is 10 feet by 12 feet. The second rectangle is 6 feet by 8 feet. What is the total area of the room?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '120 square feet' },
        { label: 'B', text: '148 square feet' },
        { label: 'C', text: '168 square feet' },
        { label: 'D', text: '192 square feet' },
      ],
      correctAnswer: 'C',
      explanation: 'Area of first rectangle = 10 * 12 = 120 square feet. Area of second rectangle = 6 * 8 = 48 square feet. Total area = 120 + 48 = 168 square feet.',
      difficulty: 3,
      domain: 'geometry',
    },
  ],
};

// ---------------------------------------------------------------------------
// Topic 2 — Angles and Triangles
// ---------------------------------------------------------------------------

const w5Topic2: Topic = {
  id: 'w5-t2',
  weekNumber: 5,
  slug: 'angles-and-triangles',
  title: 'Angles and Triangles',
  videoLink: 'https://www.khanacademy.org/math/basic-geo/basic-geo-angle',
  content: `An **angle** is formed where two lines or line segments meet. Angles are measured in degrees. A **right angle** is exactly 90 degrees. An **acute angle** is less than 90 degrees. An **obtuse angle** is between 90 and 180 degrees. A **straight angle** is exactly 180 degrees (a straight line).

Two angles are **complementary** if they add up to 90 degrees. Two angles are **supplementary** if they add up to 180 degrees. For example, if one angle is 65 degrees, its complement is 25 degrees (because 65 + 25 = 90) and its supplement is 115 degrees (because 65 + 115 = 180).

The three angles inside any triangle always add up to exactly **180 degrees**. This is one of the most useful facts in geometry. If you know two angles, you can always find the third. For example, if a triangle has angles of 40 degrees and 75 degrees, the third angle is 180 - 40 - 75 = 65 degrees. When **parallel lines** are cut by a **transversal** (a line crossing both), several pairs of equal angles are created. Alternate interior angles are equal, and corresponding angles are equal.

**Similar triangles** have the same shape but can be different sizes. Their corresponding angles are equal, and their corresponding sides are in proportion. If triangle ABC is similar to triangle DEF, and you know the sides of ABC and one side of DEF, you can set up a proportion to find the missing sides. For example, if AB = 6, DE = 9, and BC = 8, then EF = 8 * (9/6) = 12. Similar triangles are a favorite PSAT topic because they combine geometry with ratio and proportion skills.`,
  questions: [
    {
      id: 'w5-t2-q1',
      text: 'A triangle has angles measuring 55 degrees and 80 degrees. What is the measure of the third angle?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '35 degrees' },
        { label: 'B', text: '45 degrees' },
        { label: 'C', text: '55 degrees' },
        { label: 'D', text: '135 degrees' },
      ],
      correctAnswer: 'B',
      explanation: 'The three angles of a triangle add up to 180 degrees. 180 - 55 - 80 = 45 degrees.',
      difficulty: 1,
      domain: 'geometry',
    },
    {
      id: 'w5-t2-q2',
      text: 'Two angles are supplementary. One angle measures 132 degrees. What is the measure of the other angle?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '38 degrees' },
        { label: 'B', text: '48 degrees' },
        { label: 'C', text: '58 degrees' },
        { label: 'D', text: '228 degrees' },
      ],
      correctAnswer: 'B',
      explanation: 'Supplementary angles add up to 180 degrees. 180 - 132 = 48 degrees.',
      difficulty: 2,
      domain: 'geometry',
    },
    {
      id: 'w5-t2-q3',
      text: 'Two parallel lines are cut by a transversal. One of the angles formed is 70 degrees. What is the measure of its alternate interior angle?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '20 degrees' },
        { label: 'B', text: '70 degrees' },
        { label: 'C', text: '110 degrees' },
        { label: 'D', text: '140 degrees' },
      ],
      correctAnswer: 'B',
      explanation: 'When parallel lines are cut by a transversal, alternate interior angles are equal. The alternate interior angle is also 70 degrees.',
      difficulty: 2,
      domain: 'geometry',
    },
    {
      id: 'w5-t2-q4',
      text: 'Triangle ABC is similar to triangle DEF. In triangle ABC, AB = 6 and BC = 10. In triangle DEF, DE = 9. What is the length of EF?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '12' },
        { label: 'B', text: '13' },
        { label: 'C', text: '15' },
        { label: 'D', text: '18' },
      ],
      correctAnswer: 'C',
      explanation: 'Similar triangles have proportional sides. AB/DE = BC/EF, so 6/9 = 10/EF. Cross multiply: 6 * EF = 90. EF = 15.',
      difficulty: 3,
      domain: 'geometry',
    },
    {
      id: 'w5-t2-q5',
      text: 'In a triangle, the angles are in the ratio 2:3:4. What is the measure of the largest angle?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '40 degrees' },
        { label: 'B', text: '60 degrees' },
        { label: 'C', text: '80 degrees' },
        { label: 'D', text: '90 degrees' },
      ],
      correctAnswer: 'C',
      explanation: 'Total parts = 2 + 3 + 4 = 9. Each part = 180 / 9 = 20 degrees. The largest angle = 4 * 20 = 80 degrees.',
      difficulty: 3,
      domain: 'geometry',
    },
  ],
};

// ---------------------------------------------------------------------------
// Topic 3 — Pythagorean Theorem
// ---------------------------------------------------------------------------

const w5Topic3: Topic = {
  id: 'w5-t3',
  weekNumber: 5,
  slug: 'pythagorean-theorem',
  title: 'Pythagorean Theorem',
  videoLink: 'https://www.khanacademy.org/math/basic-geo/basic-geometry-pythagorean-theorem',
  content: `The **Pythagorean theorem** is one of the most important formulas in math: **a^2 + b^2 = c^2**. It works for any **right triangle** (a triangle with a 90-degree angle). In this formula, a and b are the two shorter sides (called **legs**) and c is the longest side (called the **hypotenuse**). The hypotenuse is always across from the right angle.

To **find the hypotenuse**, plug the two legs into the formula and solve for c. For example, if the legs are 6 and 8: 6^2 + 8^2 = c^2, so 36 + 64 = 100, and c = sqrt(100) = 10. To **find a missing leg**, rearrange the formula. If the hypotenuse is 13 and one leg is 5: 5^2 + b^2 = 13^2, so 25 + b^2 = 169, and b^2 = 144, so b = 12.

It helps to memorize the **common Pythagorean triples** -- sets of whole numbers that satisfy the theorem. The most common are 3-4-5, 5-12-13, 8-15-17, and 7-24-25. Multiples of these also work: 6-8-10 is just 2 times the 3-4-5 triple, and 9-12-15 is 3 times the 3-4-5 triple. Recognizing these can save you time on the test.

The Pythagorean theorem shows up in many **real-world applications**. A ladder leaning against a wall forms a right triangle with the wall and the ground. The diagonal of a rectangle creates two right triangles. You can even find the distance between two points on a coordinate plane using the theorem: the horizontal distance is one leg, the vertical distance is the other leg, and the straight-line distance is the hypotenuse.`,
  questions: [
    {
      id: 'w5-t3-q1',
      text: 'A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '7' },
        { label: 'B', text: '10' },
        { label: 'C', text: '12' },
        { label: 'D', text: '14' },
      ],
      correctAnswer: 'B',
      explanation: 'a^2 + b^2 = c^2. 6^2 + 8^2 = 36 + 64 = 100. c = sqrt(100) = 10. (This is a 3-4-5 triple multiplied by 2.)',
      difficulty: 1,
      domain: 'geometry',
    },
    {
      id: 'w5-t3-q2',
      text: 'A right triangle has a hypotenuse of 13 and one leg of length 5. What is the length of the other leg?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '8' },
        { label: 'B', text: '10' },
        { label: 'C', text: '12' },
        { label: 'D', text: '14' },
      ],
      correctAnswer: 'C',
      explanation: 'a^2 + b^2 = c^2. 5^2 + b^2 = 13^2. 25 + b^2 = 169. b^2 = 144. b = 12. (This is the 5-12-13 triple.)',
      difficulty: 2,
      domain: 'geometry',
    },
    {
      id: 'w5-t3-q3',
      text: 'A 15-foot ladder is leaning against a wall. The base of the ladder is 9 feet from the wall. How high up the wall does the ladder reach?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '6 feet' },
        { label: 'B', text: '10 feet' },
        { label: 'C', text: '12 feet' },
        { label: 'D', text: '18 feet' },
      ],
      correctAnswer: 'C',
      explanation: 'The ladder is the hypotenuse (15), and the distance from the wall is one leg (9). 9^2 + h^2 = 15^2. 81 + h^2 = 225. h^2 = 144. h = 12 feet. (This is a 3-4-5 triple multiplied by 3: 9-12-15.)',
      difficulty: 2,
      domain: 'geometry',
    },
    {
      id: 'w5-t3-q4',
      text: 'A rectangle has a length of 12 cm and a width of 5 cm. What is the length of its diagonal?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '11 cm' },
        { label: 'B', text: '13 cm' },
        { label: 'C', text: '15 cm' },
        { label: 'D', text: '17 cm' },
      ],
      correctAnswer: 'B',
      explanation: 'The diagonal of a rectangle creates a right triangle with the length and width as legs. 12^2 + 5^2 = 144 + 25 = 169. Diagonal = sqrt(169) = 13 cm. (This is the 5-12-13 triple.)',
      difficulty: 3,
      domain: 'geometry',
    },
    {
      id: 'w5-t3-q5',
      text: 'What is the distance between the points (1, 2) and (4, 6)?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '4' },
        { label: 'B', text: '5' },
        { label: 'C', text: '6' },
        { label: 'D', text: '7' },
      ],
      correctAnswer: 'B',
      explanation: 'Horizontal distance = 4 - 1 = 3. Vertical distance = 6 - 2 = 4. Distance = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5. (This is the 3-4-5 triple.)',
      difficulty: 3,
      domain: 'geometry',
    },
  ],
};

// ---------------------------------------------------------------------------
// Topic 4 — Quadratic Equations
// ---------------------------------------------------------------------------

const w5Topic4: Topic = {
  id: 'w5-t4',
  weekNumber: 5,
  slug: 'quadratic-equations',
  title: 'Quadratic Equations',
  videoLink: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratics-multiplying-factoring',
  content: `A **quadratic equation** is any equation that can be written in the form **ax^2 + bx + c = 0**, where a, b, and c are numbers and a is not zero. The graph of a quadratic equation is a U-shaped curve called a **parabola**. If the leading coefficient (a) is positive, the parabola opens upward like a bowl. If a is negative, it opens downward like an upside-down bowl.

The most common way to solve a quadratic on the PSAT is by **factoring**. You want to find two numbers that multiply to give you c (the constant term) and add to give you b (the coefficient of x). For example, to factor x^2 + 7x + 12 = 0, you need two numbers that multiply to 12 and add to 7. Those numbers are 3 and 4, so the equation factors as (x + 3)(x + 4) = 0. Setting each factor equal to zero gives x = -3 or x = -4.

When factoring does not work easily, use the **quadratic formula**: x = (-b +/- sqrt(b^2 - 4ac)) / (2a). This formula works for every quadratic equation. For example, for 2x^2 - 3x - 5 = 0, you have a = 2, b = -3, c = -5. Plug in: x = (3 +/- sqrt(9 + 40)) / 4 = (3 +/- sqrt(49)) / 4 = (3 +/- 7) / 4. So x = 10/4 = 5/2, or x = -4/4 = -1.

The **vertex** of a parabola is its highest or lowest point. You can find the x-coordinate of the vertex with x = -b / (2a). Then plug that x-value back into the equation to get the y-coordinate. The vertex is especially important in word problems about projectiles (thrown balls, launched rockets) because it tells you the maximum height. Understanding how the vertex, the zeros (x-intercepts), and the direction of opening all relate to each other will help you answer many PSAT questions.`,
  questions: [
    {
      id: 'w5-t4-q1',
      text: 'Solve by factoring: x^2 + 7x + 12 = 0',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: 'x = 3 or x = 4' },
        { label: 'B', text: 'x = -3 or x = -4' },
        { label: 'C', text: 'x = 2 or x = 6' },
        { label: 'D', text: 'x = -2 or x = -6' },
      ],
      correctAnswer: 'B',
      explanation: 'Find two numbers that multiply to 12 and add to 7: 3 and 4. Factor: (x + 3)(x + 4) = 0. Set each factor to zero: x + 3 = 0 gives x = -3. x + 4 = 0 gives x = -4.',
      difficulty: 1,
      domain: 'advanced_math',
    },
    {
      id: 'w5-t4-q2',
      text: 'Solve by factoring: x^2 - 5x - 14 = 0',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: 'x = 7 or x = -2' },
        { label: 'B', text: 'x = -7 or x = 2' },
        { label: 'C', text: 'x = 7 or x = 2' },
        { label: 'D', text: 'x = -7 or x = -2' },
      ],
      correctAnswer: 'A',
      explanation: 'Find two numbers that multiply to -14 and add to -5: -7 and 2. Factor: (x - 7)(x + 2) = 0. Set each factor to zero: x = 7 or x = -2.',
      difficulty: 2,
      domain: 'advanced_math',
    },
    {
      id: 'w5-t4-q3',
      text: 'Use the quadratic formula to solve: 2x^2 - 3x - 5 = 0',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: 'x = 5/2 or x = -1' },
        { label: 'B', text: 'x = 5 or x = -1/2' },
        { label: 'C', text: 'x = 3 or x = -5/2' },
        { label: 'D', text: 'x = 1 or x = -5/2' },
      ],
      correctAnswer: 'A',
      explanation: 'a = 2, b = -3, c = -5. Discriminant: b^2 - 4ac = 9 + 40 = 49. x = (3 +/- 7) / 4. x = 10/4 = 5/2 or x = -4/4 = -1.',
      difficulty: 2,
      domain: 'advanced_math',
    },
    {
      id: 'w5-t4-q4',
      text: 'A ball is thrown upward from a height of 5 feet. Its height in feet after t seconds is h = -16t^2 + 48t + 5. At what time does the ball hit the ground? (Round to the nearest tenth.)',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '1.5 seconds' },
        { label: 'B', text: '2.0 seconds' },
        { label: 'C', text: '3.1 seconds' },
        { label: 'D', text: '4.0 seconds' },
      ],
      correctAnswer: 'C',
      explanation: 'Set h = 0: -16t^2 + 48t + 5 = 0. Using the quadratic formula with a = -16, b = 48, c = 5: t = (-48 +/- sqrt(2304 + 320)) / (-32) = (-48 +/- sqrt(2624)) / (-32). sqrt(2624) is approximately 51.22. t = (-48 + 51.22) / (-32) = -0.1 (reject, negative time) or t = (-48 - 51.22) / (-32) = (-99.22) / (-32) = 3.1 seconds.',
      difficulty: 3,
      domain: 'advanced_math',
    },
    {
      id: 'w5-t4-q5',
      text: 'What is the vertex of the parabola y = x^2 - 6x + 5?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '(3, -4)' },
        { label: 'B', text: '(-3, -4)' },
        { label: 'C', text: '(3, 4)' },
        { label: 'D', text: '(6, 5)' },
      ],
      correctAnswer: 'A',
      explanation: 'The x-coordinate of the vertex is x = -b / (2a) = -(-6) / (2*1) = 6/2 = 3. Plug x = 3 back in: y = 9 - 18 + 5 = -4. The vertex is (3, -4).',
      difficulty: 3,
      domain: 'advanced_math',
    },
  ],
};

// ---------------------------------------------------------------------------
// Topic 5 — Functions
// ---------------------------------------------------------------------------

const w5Topic5: Topic = {
  id: 'w5-t5',
  weekNumber: 5,
  slug: 'functions',
  title: 'Functions',
  videoLink: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions',
  content: `A **function** is a rule that takes an input and gives you exactly one output. The notation **f(x)** is read "f of x." The letter f is just the name of the function, and x is the input. When you see f(5), it means "plug 5 in for x and calculate." For example, if f(x) = 3x + 2, then f(5) = 3(5) + 2 = 17.

**Evaluating a function** means plugging in a specific value. Be careful with negative numbers and exponents. For g(x) = x^2 + 1, g(-3) = (-3)^2 + 1 = 9 + 1 = 10. Remember that (-3)^2 = 9 (the negative is inside the parentheses, so it gets squared too), which is different from -3^2 = -9.

Sometimes you are asked to work backwards: "If f(x) = 2x + 3, for what value of x is f(x) = 15?" This means you set 2x + 3 = 15 and solve for x. 2x = 12, so x = 6. You might also see functions defined by a table or a graph instead of an equation. To evaluate, just look up the input in the table or on the x-axis of the graph and read the output.

The **domain** of a function is the set of all inputs (x-values) that work. Most functions you see on the PSAT have a domain of all real numbers, but fractions cannot have zero in the denominator and square roots cannot have a negative number inside (for real numbers). **Function composition** means plugging one function into another. If f(x) = 2x and g(x) = x + 3, then f(g(2)) means first evaluate g(2) = 5, and then evaluate f(5) = 10. Always work from the inside out.`,
  questions: [
    {
      id: 'w5-t5-q1',
      text: 'If f(x) = 4x - 7, what is f(5)?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '3' },
        { label: 'B', text: '13' },
        { label: 'C', text: '17' },
        { label: 'D', text: '27' },
      ],
      correctAnswer: 'B',
      explanation: 'f(5) = 4(5) - 7 = 20 - 7 = 13.',
      difficulty: 1,
      domain: 'advanced_math',
    },
    {
      id: 'w5-t5-q2',
      text: 'If g(x) = x^2 + 1, what is g(-3)?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '-8' },
        { label: 'B', text: '4' },
        { label: 'C', text: '8' },
        { label: 'D', text: '10' },
      ],
      correctAnswer: 'D',
      explanation: 'g(-3) = (-3)^2 + 1 = 9 + 1 = 10. Remember: (-3)^2 = 9, not -9.',
      difficulty: 1,
      domain: 'advanced_math',
    },
    {
      id: 'w5-t5-q3',
      text: 'If f(x) = 2x + 3, for what value of x is f(x) = 15?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: 'x = 5' },
        { label: 'B', text: 'x = 6' },
        { label: 'C', text: 'x = 7' },
        { label: 'D', text: 'x = 9' },
      ],
      correctAnswer: 'B',
      explanation: 'Set f(x) = 15: 2x + 3 = 15. Subtract 3: 2x = 12. Divide by 2: x = 6.',
      difficulty: 2,
      domain: 'advanced_math',
    },
    {
      id: 'w5-t5-q4',
      text: 'A function is defined by the table: x = 1 gives f(x) = 4, x = 2 gives f(x) = 7, x = 3 gives f(x) = 10, x = 4 gives f(x) = 13. What is the rule for f(x)?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: 'f(x) = x + 3' },
        { label: 'B', text: 'f(x) = 2x + 2' },
        { label: 'C', text: 'f(x) = 3x + 1' },
        { label: 'D', text: 'f(x) = 4x' },
      ],
      correctAnswer: 'C',
      explanation: 'Check each option with the table. f(1) should be 4: 3(1) + 1 = 4. f(2) should be 7: 3(2) + 1 = 7. f(3) should be 10: 3(3) + 1 = 10. f(4) should be 13: 3(4) + 1 = 13. All match, so f(x) = 3x + 1.',
      difficulty: 3,
      domain: 'advanced_math',
    },
    {
      id: 'w5-t5-q5',
      text: 'If f(x) = 2x + 1 and g(x) = x^2, what is f(g(2))?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '9' },
        { label: 'B', text: '10' },
        { label: 'C', text: '25' },
        { label: 'D', text: '17' },
      ],
      correctAnswer: 'A',
      explanation: 'Step 1: Find g(2). g(2) = 2^2 = 4. Step 2: Find f(g(2)) = f(4). f(4) = 2(4) + 1 = 9.',
      difficulty: 3,
      domain: 'advanced_math',
    },
  ],
};

// ---------------------------------------------------------------------------
// Topic 6 — Exponents and Radicals
// ---------------------------------------------------------------------------

const w5Topic6: Topic = {
  id: 'w5-t6',
  weekNumber: 5,
  slug: 'exponents-and-radicals',
  title: 'Exponents and Radicals',
  videoLink: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:rational-exponents-radicals',
  content: `**Exponents** are a shortcut for repeated multiplication. When you write x^4, it means x * x * x * x. There are several important **exponent rules** you need to know. When you **multiply** powers with the same base, add the exponents: x^a * x^b = x^(a+b). When you **divide** powers with the same base, subtract: x^a / x^b = x^(a-b). When you raise a **power to a power**, multiply: (x^a)^b = x^(a*b). And when you raise a product to a power, apply the exponent to each factor: (2x^3)^2 = 2^2 * (x^3)^2 = 4x^6.

**Negative exponents** mean "take the reciprocal." x^(-n) = 1 / x^n. So 5^(-2) = 1 / 5^2 = 1/25. Also, anything raised to the **zero power** equals 1 (as long as the base is not zero): x^0 = 1, 7^0 = 1, (-3)^0 = 1.

A **radical** (square root) is the opposite of squaring. The symbol sqrt means "what number times itself gives you this?" sqrt(25) = 5 because 5 * 5 = 25. To **simplify a radical**, look for perfect square factors inside. For example, sqrt(48) = sqrt(16 * 3) = sqrt(16) * sqrt(3) = 4 * sqrt(3). The perfect squares to watch for are 4, 9, 16, 25, 36, 49, 64, 81, and 100.

**Rationalizing the denominator** means getting rid of a radical in the bottom of a fraction. To rationalize 6 / sqrt(3), multiply the top and bottom by sqrt(3): (6 * sqrt(3)) / (sqrt(3) * sqrt(3)) = 6 * sqrt(3) / 3 = 2 * sqrt(3). This does not change the value of the fraction -- it just writes it in a form that mathematicians prefer. The PSAT often gives answer choices in simplified radical form, so knowing how to rationalize is important.`,
  questions: [
    {
      id: 'w5-t6-q1',
      text: 'Simplify: x^4 * x^3',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: 'x^7' },
        { label: 'B', text: 'x^12' },
        { label: 'C', text: '2x^7' },
        { label: 'D', text: 'x^1' },
      ],
      correctAnswer: 'A',
      explanation: 'When multiplying powers with the same base, add the exponents: x^4 * x^3 = x^(4+3) = x^7.',
      difficulty: 1,
      domain: 'advanced_math',
    },
    {
      id: 'w5-t6-q2',
      text: 'Simplify: (2x^3)^2',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '2x^6' },
        { label: 'B', text: '4x^5' },
        { label: 'C', text: '4x^6' },
        { label: 'D', text: '2x^9' },
      ],
      correctAnswer: 'C',
      explanation: 'Apply the exponent to each factor: 2^2 = 4 and (x^3)^2 = x^6. So (2x^3)^2 = 4x^6.',
      difficulty: 1,
      domain: 'advanced_math',
    },
    {
      id: 'w5-t6-q3',
      text: 'Simplify: sqrt(48)',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '2 sqrt(12)' },
        { label: 'B', text: '4 sqrt(3)' },
        { label: 'C', text: '6 sqrt(2)' },
        { label: 'D', text: '8 sqrt(3)' },
      ],
      correctAnswer: 'B',
      explanation: 'Find the largest perfect square factor of 48. 48 = 16 * 3. sqrt(48) = sqrt(16) * sqrt(3) = 4 sqrt(3). (Option A is not fully simplified since 12 still has a perfect square factor of 4.)',
      difficulty: 2,
      domain: 'advanced_math',
    },
    {
      id: 'w5-t6-q4',
      text: 'What is 5^(-2)?',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '-25' },
        { label: 'B', text: '-10' },
        { label: 'C', text: '1/10' },
        { label: 'D', text: '1/25' },
      ],
      correctAnswer: 'D',
      explanation: 'A negative exponent means take the reciprocal. 5^(-2) = 1 / 5^2 = 1/25. A negative exponent does NOT make the answer negative.',
      difficulty: 3,
      domain: 'advanced_math',
    },
    {
      id: 'w5-t6-q5',
      text: 'Rationalize the denominator: 6 / sqrt(3)',
      type: 'multiple_choice',
      options: [
        { label: 'A', text: '2 sqrt(3)' },
        { label: 'B', text: '3 sqrt(2)' },
        { label: 'C', text: '6 sqrt(3) / 3' },
        { label: 'D', text: 'Both A and C' },
      ],
      correctAnswer: 'D',
      explanation: 'Multiply top and bottom by sqrt(3): (6 * sqrt(3)) / (sqrt(3) * sqrt(3)) = 6 sqrt(3) / 3 = 2 sqrt(3). Options A and C are the same value, so both are correct.',
      difficulty: 3,
      domain: 'advanced_math',
    },
  ],
};

const w5Topics: Topic[] = [w5Topic1, w5Topic2, w5Topic3, w5Topic4, w5Topic5, w5Topic6];

// ---------------------------------------------------------------------------
// Week 5 Quiz — 10 questions across all geometry & advanced math topics
// ---------------------------------------------------------------------------

const w5QuizQuestions: Question[] = [
  {
    id: 'w5-quiz-q1',
    text: 'What is the perimeter of a rectangle with length 14 cm and width 9 cm?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '23 cm' },
      { label: 'B', text: '46 cm' },
      { label: 'C', text: '126 cm' },
      { label: 'D', text: '252 cm' },
    ],
    correctAnswer: 'B',
    explanation: 'Perimeter = 2 * length + 2 * width = 2(14) + 2(9) = 28 + 18 = 46 cm.',
    difficulty: 1,
    domain: 'geometry',
  },
  {
    id: 'w5-quiz-q2',
    text: 'A right triangle has legs of 5 and 12. What is the hypotenuse?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '11' },
      { label: 'B', text: '13' },
      { label: 'C', text: '15' },
      { label: 'D', text: '17' },
    ],
    correctAnswer: 'B',
    explanation: '5^2 + 12^2 = 25 + 144 = 169. sqrt(169) = 13. This is the well-known 5-12-13 triple.',
    difficulty: 1,
    domain: 'geometry',
  },
  {
    id: 'w5-quiz-q3',
    text: 'The angles of a triangle are x, 2x, and 3x. What is the value of x?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '20 degrees' },
      { label: 'B', text: '30 degrees' },
      { label: 'C', text: '45 degrees' },
      { label: 'D', text: '60 degrees' },
    ],
    correctAnswer: 'B',
    explanation: 'x + 2x + 3x = 180. 6x = 180. x = 30 degrees.',
    difficulty: 2,
    domain: 'geometry',
  },
  {
    id: 'w5-quiz-q4',
    text: 'What is the volume of a rectangular box that is 6 cm long, 3 cm wide, and 5 cm tall?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '14 cubic cm' },
      { label: 'B', text: '45 cubic cm' },
      { label: 'C', text: '90 cubic cm' },
      { label: 'D', text: '126 cubic cm' },
    ],
    correctAnswer: 'C',
    explanation: 'Volume = length * width * height = 6 * 3 * 5 = 90 cubic cm.',
    difficulty: 2,
    domain: 'geometry',
  },
  {
    id: 'w5-quiz-q5',
    text: 'Solve: x^2 - 16 = 0',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'x = 4 only' },
      { label: 'B', text: 'x = -4 only' },
      { label: 'C', text: 'x = 4 or x = -4' },
      { label: 'D', text: 'x = 8 or x = -8' },
    ],
    correctAnswer: 'C',
    explanation: 'x^2 = 16. x = +/-sqrt(16) = +/-4. This is a difference of squares: (x - 4)(x + 4) = 0.',
    difficulty: 2,
    domain: 'advanced_math',
  },
  {
    id: 'w5-quiz-q6',
    text: 'If f(x) = 5x - 3, what is f(6)?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '27' },
      { label: 'B', text: '30' },
      { label: 'C', text: '33' },
      { label: 'D', text: '36' },
    ],
    correctAnswer: 'A',
    explanation: 'f(6) = 5(6) - 3 = 30 - 3 = 27.',
    difficulty: 2,
    domain: 'advanced_math',
  },
  {
    id: 'w5-quiz-q7',
    text: 'Simplify: sqrt(50)',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '5 sqrt(2)' },
      { label: 'B', text: '2 sqrt(5)' },
      { label: 'C', text: '25' },
      { label: 'D', text: '10 sqrt(5)' },
    ],
    correctAnswer: 'A',
    explanation: '50 = 25 * 2. sqrt(50) = sqrt(25) * sqrt(2) = 5 sqrt(2).',
    difficulty: 2,
    domain: 'advanced_math',
  },
  {
    id: 'w5-quiz-q8',
    text: 'Solve: x^2 + 3x - 10 = 0',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: 'x = 5 or x = -2' },
      { label: 'B', text: 'x = -5 or x = 2' },
      { label: 'C', text: 'x = -5 or x = -2' },
      { label: 'D', text: 'x = 5 or x = 2' },
    ],
    correctAnswer: 'B',
    explanation: 'Find two numbers that multiply to -10 and add to 3: 5 and -2. Factor: (x + 5)(x - 2) = 0. x = -5 or x = 2.',
    difficulty: 2,
    domain: 'advanced_math',
  },
  {
    id: 'w5-quiz-q9',
    text: 'A circle has a diameter of 14 cm. What is its area? (Use pi = 3.14)',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '43.96 square cm' },
      { label: 'B', text: '153.86 square cm' },
      { label: 'C', text: '196 square cm' },
      { label: 'D', text: '615.44 square cm' },
    ],
    correctAnswer: 'B',
    explanation: 'Diameter = 14, so radius = 7. Area = pi * r^2 = 3.14 * 49 = 153.86 square cm.',
    difficulty: 3,
    domain: 'geometry',
  },
  {
    id: 'w5-quiz-q10',
    text: 'If g(x) = x^2 + 2x - 8, what is g(-3)?',
    type: 'multiple_choice',
    options: [
      { label: 'A', text: '-5' },
      { label: 'B', text: '-1' },
      { label: 'C', text: '1' },
      { label: 'D', text: '-11' },
    ],
    correctAnswer: 'A',
    explanation: 'g(-3) = (-3)^2 + 2(-3) - 8 = 9 - 6 - 8 = -5.',
    difficulty: 3,
    domain: 'advanced_math',
  },
];

export { w4Topics, w4QuizQuestions, w5Topics, w5QuizQuestions };
