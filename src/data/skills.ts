export interface Skill {
  id: string;
  name: string;
  domain: 'algebra' | 'advanced_math' | 'problem_solving' | 'geometry';
  description: string;
  prerequisites: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export const skills: Skill[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ALGEBRA DOMAIN (~16 skills)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'basic-arithmetic',
    name: 'Basic Arithmetic',
    domain: 'algebra',
    description:
      'Addition, subtraction, multiplication, and division with whole numbers. The foundation for all math.',
    prerequisites: [],
    difficulty: 1,
  },
  {
    id: 'order-of-operations',
    name: 'Order of Operations',
    domain: 'algebra',
    description:
      'Evaluating expressions using PEMDAS (Parentheses, Exponents, Multiplication/Division, Addition/Subtraction).',
    prerequisites: ['basic-arithmetic'],
    difficulty: 1,
  },
  {
    id: 'integer-operations',
    name: 'Integer Operations',
    domain: 'algebra',
    description:
      'Adding, subtracting, multiplying, and dividing positive and negative numbers.',
    prerequisites: ['basic-arithmetic'],
    difficulty: 1,
  },
  {
    id: 'fraction-operations',
    name: 'Fraction Operations',
    domain: 'algebra',
    description:
      'Adding, subtracting, multiplying, and dividing fractions. Finding common denominators and simplifying.',
    prerequisites: ['basic-arithmetic'],
    difficulty: 2,
  },
  {
    id: 'decimal-operations',
    name: 'Decimal Operations',
    domain: 'algebra',
    description:
      'Performing arithmetic with decimals and converting between fractions, decimals, and percentages.',
    prerequisites: ['basic-arithmetic', 'fraction-operations'],
    difficulty: 2,
  },
  {
    id: 'variables-expressions',
    name: 'Variables and Expressions',
    domain: 'algebra',
    description:
      'Understanding variables, writing algebraic expressions, and evaluating expressions by substitution.',
    prerequisites: ['basic-arithmetic', 'order-of-operations'],
    difficulty: 2,
  },
  {
    id: 'combining-like-terms',
    name: 'Combining Like Terms',
    domain: 'algebra',
    description:
      'Simplifying expressions by combining terms with the same variable and exponent.',
    prerequisites: ['variables-expressions', 'integer-operations'],
    difficulty: 2,
  },
  {
    id: 'one-step-equations',
    name: 'One-Step Equations',
    domain: 'algebra',
    description:
      'Solving equations that require a single operation (addition, subtraction, multiplication, or division).',
    prerequisites: ['variables-expressions', 'integer-operations'],
    difficulty: 1,
  },
  {
    id: 'two-step-equations',
    name: 'Two-Step Equations',
    domain: 'algebra',
    description:
      'Solving equations that require two operations, typically undo addition/subtraction then multiplication/division.',
    prerequisites: ['one-step-equations'],
    difficulty: 2,
  },
  {
    id: 'multi-step-equations',
    name: 'Multi-Step Equations',
    domain: 'algebra',
    description:
      'Solving equations requiring distribution, combining like terms, and variables on both sides.',
    prerequisites: ['two-step-equations', 'combining-like-terms'],
    difficulty: 3,
  },
  {
    id: 'slope-concept',
    name: 'Slope Concept',
    domain: 'algebra',
    description:
      'Understanding slope as rise over run, calculating slope between two points, and interpreting positive/negative slopes.',
    prerequisites: ['integer-operations', 'fraction-operations'],
    difficulty: 2,
  },
  {
    id: 'slope-intercept-form',
    name: 'Slope-Intercept Form',
    domain: 'algebra',
    description:
      'Writing and interpreting equations in y = mx + b form. Identifying slope and y-intercept from an equation.',
    prerequisites: ['slope-concept', 'variables-expressions'],
    difficulty: 2,
  },
  {
    id: 'graphing-lines',
    name: 'Graphing Linear Equations',
    domain: 'algebra',
    description:
      'Plotting lines on a coordinate plane using slope and y-intercept or a table of values.',
    prerequisites: ['slope-intercept-form'],
    difficulty: 3,
  },
  {
    id: 'systems-substitution',
    name: 'Systems of Equations (Substitution)',
    domain: 'algebra',
    description:
      'Solving systems of two linear equations by substituting one equation into the other.',
    prerequisites: [
      'multi-step-equations',
      'variables-expressions',
      'slope-intercept-form',
    ],
    difficulty: 3,
  },
  {
    id: 'systems-elimination',
    name: 'Systems of Equations (Elimination)',
    domain: 'algebra',
    description:
      'Solving systems of two linear equations by adding or subtracting equations to eliminate a variable.',
    prerequisites: [
      'multi-step-equations',
      'combining-like-terms',
      'integer-operations',
    ],
    difficulty: 3,
  },
  {
    id: 'linear-inequalities',
    name: 'Linear Inequalities',
    domain: 'algebra',
    description:
      'Solving and graphing inequalities. Understanding the rule for flipping the sign when multiplying/dividing by a negative.',
    prerequisites: ['two-step-equations', 'integer-operations'],
    difficulty: 3,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADVANCED MATH DOMAIN (~12 skills)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'exponent-rules',
    name: 'Exponent Rules',
    domain: 'advanced_math',
    description:
      'Product rule, quotient rule, power rule, and zero exponent. Simplifying expressions with exponents.',
    prerequisites: ['basic-arithmetic', 'variables-expressions'],
    difficulty: 2,
  },
  {
    id: 'negative-exponents',
    name: 'Negative Exponents',
    domain: 'advanced_math',
    description:
      'Understanding that a negative exponent means the reciprocal. Simplifying expressions with negative exponents.',
    prerequisites: ['exponent-rules', 'fraction-operations'],
    difficulty: 3,
  },
  {
    id: 'simplifying-radicals',
    name: 'Simplifying Radicals',
    domain: 'advanced_math',
    description:
      'Simplifying square roots by factoring out perfect squares. Adding and subtracting like radicals.',
    prerequisites: ['exponent-rules', 'basic-arithmetic'],
    difficulty: 3,
  },
  {
    id: 'polynomial-addition',
    name: 'Polynomial Addition and Subtraction',
    domain: 'advanced_math',
    description:
      'Adding and subtracting polynomials by combining like terms. Distributing negative signs across parentheses.',
    prerequisites: ['combining-like-terms', 'variables-expressions'],
    difficulty: 2,
  },
  {
    id: 'polynomial-multiplication',
    name: 'Polynomial Multiplication',
    domain: 'advanced_math',
    description:
      'Multiplying polynomials using the distributive property. Multiplying monomials and binomials.',
    prerequisites: ['polynomial-addition', 'exponent-rules'],
    difficulty: 3,
  },
  {
    id: 'foil-method',
    name: 'FOIL Method',
    domain: 'advanced_math',
    description:
      'Multiplying two binomials using First, Outer, Inner, Last. Expanding expressions like (x + 3)(x - 2).',
    prerequisites: ['polynomial-multiplication'],
    difficulty: 3,
  },
  {
    id: 'factoring-gcf',
    name: 'Factoring out the GCF',
    domain: 'advanced_math',
    description:
      'Finding and factoring out the greatest common factor from polynomial expressions.',
    prerequisites: ['polynomial-addition', 'basic-arithmetic'],
    difficulty: 2,
  },
  {
    id: 'factoring-trinomials',
    name: 'Factoring Trinomials',
    domain: 'advanced_math',
    description:
      'Factoring quadratic expressions of the form x^2 + bx + c into two binomials. Includes difference of squares.',
    prerequisites: ['foil-method', 'factoring-gcf'],
    difficulty: 3,
  },
  {
    id: 'quadratic-formula',
    name: 'Quadratic Formula',
    domain: 'advanced_math',
    description:
      'Using x = (-b +/- sqrt(b^2 - 4ac)) / (2a) to solve any quadratic equation. Understanding the discriminant.',
    prerequisites: ['factoring-trinomials', 'simplifying-radicals'],
    difficulty: 4,
  },
  {
    id: 'function-notation',
    name: 'Function Notation',
    domain: 'advanced_math',
    description:
      'Understanding f(x) notation. Identifying domain, range, and when an input maps to an output.',
    prerequisites: ['variables-expressions'],
    difficulty: 2,
  },
  {
    id: 'function-evaluation',
    name: 'Function Evaluation',
    domain: 'advanced_math',
    description:
      'Plugging values into functions to find outputs. Evaluating f(a), f(-1), f(x + h), etc.',
    prerequisites: ['function-notation', 'order-of-operations'],
    difficulty: 2,
  },
  {
    id: 'exponential-growth',
    name: 'Exponential Growth and Decay',
    domain: 'advanced_math',
    description:
      'Modeling situations with exponential functions. Understanding doubling time, half-life, and growth/decay factors.',
    prerequisites: ['exponent-rules', 'function-notation'],
    difficulty: 4,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PROBLEM-SOLVING & DATA DOMAIN (~12 skills)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'ratios',
    name: 'Ratios',
    domain: 'problem_solving',
    description:
      'Understanding and simplifying ratios. Using part-to-part and part-to-whole ratios in word problems.',
    prerequisites: ['fraction-operations', 'basic-arithmetic'],
    difficulty: 1,
  },
  {
    id: 'proportions',
    name: 'Proportions',
    domain: 'problem_solving',
    description:
      'Setting up and solving proportions using cross-multiplication. Applying to real-world problems.',
    prerequisites: ['ratios', 'one-step-equations'],
    difficulty: 2,
  },
  {
    id: 'unit-rates',
    name: 'Unit Rates',
    domain: 'problem_solving',
    description:
      'Finding and comparing unit rates (e.g., price per item, speed). Converting between units.',
    prerequisites: ['ratios', 'decimal-operations'],
    difficulty: 2,
  },
  {
    id: 'percent-of-number',
    name: 'Percent of a Number',
    domain: 'problem_solving',
    description:
      'Calculating a percentage of a given number. Converting between fractions, decimals, and percentages.',
    prerequisites: ['decimal-operations', 'fraction-operations'],
    difficulty: 1,
  },
  {
    id: 'percent-change',
    name: 'Percent Change',
    domain: 'problem_solving',
    description:
      'Calculating percent increase and percent decrease. Applying to markup, discount, and tax problems.',
    prerequisites: ['percent-of-number', 'fraction-operations'],
    difficulty: 2,
  },
  {
    id: 'reading-tables',
    name: 'Reading Tables',
    domain: 'problem_solving',
    description:
      'Interpreting data presented in tables. Finding totals, differences, and making comparisons.',
    prerequisites: ['basic-arithmetic'],
    difficulty: 1,
  },
  {
    id: 'reading-graphs',
    name: 'Reading Graphs',
    domain: 'problem_solving',
    description:
      'Interpreting bar graphs, line graphs, pie charts, and histograms. Extracting data and identifying trends.',
    prerequisites: ['reading-tables'],
    difficulty: 2,
  },
  {
    id: 'scatterplots',
    name: 'Scatterplots',
    domain: 'problem_solving',
    description:
      'Interpreting scatterplots, identifying positive/negative/no correlation, and spotting outliers.',
    prerequisites: ['reading-graphs', 'slope-concept'],
    difficulty: 3,
  },
  {
    id: 'line-of-best-fit',
    name: 'Line of Best Fit',
    domain: 'problem_solving',
    description:
      'Using a line of best fit to make predictions. Interpreting slope and y-intercept in context.',
    prerequisites: ['scatterplots', 'slope-intercept-form'],
    difficulty: 3,
  },
  {
    id: 'mean-median-mode',
    name: 'Mean, Median, and Mode',
    domain: 'problem_solving',
    description:
      'Calculating mean (average), median (middle value), and mode (most frequent). Understanding range.',
    prerequisites: ['basic-arithmetic', 'order-of-operations'],
    difficulty: 2,
  },
  {
    id: 'probability-basics',
    name: 'Probability Basics',
    domain: 'problem_solving',
    description:
      'Calculating simple probability as favorable outcomes / total outcomes. Understanding 0-to-1 scale.',
    prerequisites: ['fraction-operations', 'basic-arithmetic'],
    difficulty: 2,
  },
  {
    id: 'probability-compound',
    name: 'Compound Probability',
    domain: 'problem_solving',
    description:
      'Probability of multiple events (with/without replacement). Independent vs. dependent events.',
    prerequisites: ['probability-basics', 'fraction-operations'],
    difficulty: 3,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GEOMETRY DOMAIN (~8 skills)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'perimeter-area-rectangles',
    name: 'Perimeter and Area of Rectangles',
    domain: 'geometry',
    description:
      'Calculating perimeter (2l + 2w) and area (l * w) of rectangles and squares.',
    prerequisites: ['basic-arithmetic'],
    difficulty: 1,
  },
  {
    id: 'area-triangles',
    name: 'Area of Triangles',
    domain: 'geometry',
    description:
      'Calculating the area of a triangle using A = (1/2) * base * height.',
    prerequisites: ['fraction-operations', 'basic-arithmetic'],
    difficulty: 2,
  },
  {
    id: 'area-circles',
    name: 'Area and Circumference of Circles',
    domain: 'geometry',
    description:
      'Using A = pi * r^2 for area and C = 2 * pi * r for circumference. Working with diameter and radius.',
    prerequisites: ['exponent-rules', 'decimal-operations'],
    difficulty: 2,
  },
  {
    id: 'volume-prisms',
    name: 'Volume of Prisms and Cylinders',
    domain: 'geometry',
    description:
      'Calculating volume of rectangular prisms (l * w * h) and cylinders (pi * r^2 * h).',
    prerequisites: ['perimeter-area-rectangles', 'area-circles'],
    difficulty: 3,
  },
  {
    id: 'angle-relationships',
    name: 'Angle Relationships',
    domain: 'geometry',
    description:
      'Supplementary, complementary, vertical, and corresponding angles. Angles formed by parallel lines and transversals.',
    prerequisites: ['basic-arithmetic'],
    difficulty: 2,
  },
  {
    id: 'triangle-properties',
    name: 'Triangle Properties',
    domain: 'geometry',
    description:
      'Triangle angle sum (180 degrees), exterior angles, isosceles and equilateral triangle properties.',
    prerequisites: ['angle-relationships'],
    difficulty: 2,
  },
  {
    id: 'pythagorean-theorem',
    name: 'Pythagorean Theorem',
    domain: 'geometry',
    description:
      'Using a^2 + b^2 = c^2 to find missing sides in right triangles. Recognizing common Pythagorean triples.',
    prerequisites: [
      'exponent-rules',
      'simplifying-radicals',
      'triangle-properties',
    ],
    difficulty: 3,
  },
  {
    id: 'soh-cah-toa',
    name: 'Basic Trigonometry (SOH-CAH-TOA)',
    domain: 'geometry',
    description:
      'Using sine, cosine, and tangent ratios in right triangles to find missing sides and angles.',
    prerequisites: ['pythagorean-theorem', 'fraction-operations'],
    difficulty: 4,
  },
];
