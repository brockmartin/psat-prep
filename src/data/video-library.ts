export interface VideoResource {
  skillId: string;
  videoId: string;
  title: string;
  channel: string;
  durationMinutes: number;
}

export const videoLibrary: VideoResource[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ALGEBRA
  // ═══════════════════════════════════════════════════════════════════════════

  // basic-arithmetic
  {
    skillId: 'basic-arithmetic',
    videoId: 'AuX7nPBqDts',
    title: 'Basic Addition',
    channel: 'Khan Academy',
    durationMinutes: 10,
  },
  {
    skillId: 'basic-arithmetic',
    videoId: 'GvLIEiqxS6s',
    title: 'Fractions Basic Introduction - Adding, Subtracting, Multiplying & Dividing Fractions',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 14,
  },

  // order-of-operations
  {
    skillId: 'order-of-operations',
    videoId: 'dAgfnK528RA',
    title: 'Order of Operations',
    channel: 'Math Antics',
    durationMinutes: 14,
  },
  {
    skillId: 'order-of-operations',
    videoId: 'ClYdw4d4OmA',
    title: 'Introduction to Order of Operations',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },

  // integer-operations
  {
    skillId: 'integer-operations',
    videoId: 'NQSN00zL5gg',
    title: 'Adding and Subtracting Negative Numbers',
    channel: 'Khan Academy',
    durationMinutes: 6,
  },
  {
    skillId: 'integer-operations',
    videoId: 'bQ-KR3clFgs',
    title: 'Dividing Positive and Negative Numbers',
    channel: 'Khan Academy',
    durationMinutes: 9,
  },

  // fraction-operations
  {
    skillId: 'fraction-operations',
    videoId: 'qmfXyR7Z6Lk',
    title: 'Multiplying Fractions',
    channel: 'Math Antics',
    durationMinutes: 15,
  },
  {
    skillId: 'fraction-operations',
    videoId: '5juto2ze8Lg',
    title: 'Adding and Subtracting Fractions',
    channel: 'Math Antics',
    durationMinutes: 8,
  },

  // decimal-operations
  {
    skillId: 'decimal-operations',
    videoId: 'do_IbHId2Os',
    title: 'Convert any Fraction to a Decimal',
    channel: 'Math Antics',
    durationMinutes: 12,
  },
  {
    skillId: 'decimal-operations',
    videoId: 'kwh4SD1ToFc',
    title: 'Decimal Arithmetic',
    channel: 'Math Antics',
    durationMinutes: 10,
  },

  // variables-expressions
  {
    skillId: 'variables-expressions',
    videoId: 'Tm98lnrlbMA',
    title: 'Why All the Letters in Algebra?',
    channel: 'Khan Academy',
    durationMinutes: 4,
  },
  {
    skillId: 'variables-expressions',
    videoId: '-VCUcRtQjx8',
    title: 'How To Evaluate Algebraic Expressions',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 11,
  },

  // combining-like-terms
  {
    skillId: 'combining-like-terms',
    videoId: 'CLWpkv6ccpA',
    title: 'Combining Like Terms Introduction',
    channel: 'Khan Academy',
    durationMinutes: 3,
  },
  {
    skillId: 'combining-like-terms',
    videoId: 'aR6phzMLuKM',
    title: 'Simplifying Algebraic Expressions - Combining Like Terms',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },

  // one-step-equations
  {
    skillId: 'one-step-equations',
    videoId: 'l3XzepN03KQ',
    title: 'Solving Basic Equations Part 1',
    channel: 'Math Antics',
    durationMinutes: 8,
  },
  {
    skillId: 'one-step-equations',
    videoId: 'Z-ZkmpQBIFo',
    title: 'Algebra - How To Solve Equations Quickly!',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },

  // two-step-equations
  {
    skillId: 'two-step-equations',
    videoId: 'LDIiYKYvvdA',
    title: 'Solving 2-Step Equations',
    channel: 'Math Antics',
    durationMinutes: 9,
  },
  {
    skillId: 'two-step-equations',
    videoId: 'Qyd_v3DGzTM',
    title: 'Solving Basic Equations Part 2',
    channel: 'Math Antics',
    durationMinutes: 4,
  },

  // multi-step-equations
  {
    skillId: 'multi-step-equations',
    videoId: 'RpcS-OdSut8',
    title: 'Solving Linear Equations with Variables on Both Sides',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },
  {
    skillId: 'multi-step-equations',
    videoId: 'Zn-GbH2S0Dk',
    title: 'Linear Equations 3',
    channel: 'Khan Academy',
    durationMinutes: 12,
  },

  // slope-concept
  {
    skillId: 'slope-concept',
    videoId: 'R948Tsyq4vA',
    title: 'Finding the Slope of a Line from Its Graph',
    channel: 'Khan Academy',
    durationMinutes: 6,
  },
  {
    skillId: 'slope-concept',
    videoId: 'jlkE4VCnhdE',
    title: 'How To Find The Slope of a Line',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 5,
  },

  // slope-intercept-form
  {
    skillId: 'slope-intercept-form',
    videoId: 'IL3UCuXrUzE',
    title: 'Slope-Intercept Form (y = mx + b)',
    channel: 'Khan Academy',
    durationMinutes: 7,
  },
  {
    skillId: 'slope-intercept-form',
    videoId: 'qXX47hS2KLw',
    title: 'Slope Intercept Form Y=mx+b',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 14,
  },

  // graphing-lines
  {
    skillId: 'graphing-lines',
    videoId: 'uk7gS3cZVp4',
    title: 'Graph from Slope-Intercept Equation Example',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },
  {
    skillId: 'graphing-lines',
    videoId: 'y8rNfztyoyU',
    title: 'How To Graph Linear Equations in Slope Intercept Form and Standard Form',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 8,
  },

  // systems-substitution
  {
    skillId: 'systems-substitution',
    videoId: 'nok99JOhcjo',
    title: 'Systems of Equations',
    channel: 'Khan Academy',
    durationMinutes: 12,
  },
  {
    skillId: 'systems-substitution',
    videoId: 'V7H1oUHXPkg',
    title: 'Solving Linear Systems by Substitution',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },

  // systems-elimination
  {
    skillId: 'systems-elimination',
    videoId: 'HL2fDIOMLJ0',
    title: 'Elimination Method For Solving Systems of Linear Equations',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 14,
  },
  {
    skillId: 'systems-elimination',
    videoId: 'vA-55wZtLeE',
    title: 'Solving Systems of Equations by Elimination',
    channel: 'Khan Academy',
    durationMinutes: 6,
  },

  // linear-inequalities
  {
    skillId: 'linear-inequalities',
    videoId: 'xOxvyeSl0uA',
    title: 'Multi-Step Inequalities',
    channel: 'Khan Academy',
    durationMinutes: 11,
  },
  {
    skillId: 'linear-inequalities',
    videoId: 'VgDe_D8ojxw',
    title: 'Solving Inequalities',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADVANCED MATH
  // ═══════════════════════════════════════════════════════════════════════════

  // exponent-rules
  {
    skillId: 'exponent-rules',
    videoId: 'XZRQhkii0h0',
    title: 'Introduction to Exponents',
    channel: 'Khan Academy',
    durationMinutes: 15,
  },
  {
    skillId: 'exponent-rules',
    videoId: '8htcZca0JIA',
    title: 'Level 1 Exponents',
    channel: 'Khan Academy',
    durationMinutes: 7,
  },

  // negative-exponents
  {
    skillId: 'negative-exponents',
    videoId: 'JnpqlXN9Whw',
    title: 'Negative Exponents',
    channel: 'Khan Academy',
    durationMinutes: 10,
  },
  {
    skillId: 'negative-exponents',
    videoId: 'Tqpcku0hrPU',
    title: 'Negative Exponent Intuition',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },

  // simplifying-radicals
  {
    skillId: 'simplifying-radicals',
    videoId: 'BpBh8gvMifs',
    title: 'Square Roots and Real Numbers',
    channel: 'Khan Academy',
    durationMinutes: 12,
  },
  {
    skillId: 'simplifying-radicals',
    videoId: 'cw3mp8oNASk',
    title: 'Simplifying Square Roots',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },

  // polynomial-addition
  {
    skillId: 'polynomial-addition',
    videoId: 'ZvL9aDGNHqA',
    title: 'Polynomials - Adding, Subtracting, Multiplying and Dividing',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },

  // polynomial-multiplication
  {
    skillId: 'polynomial-multiplication',
    videoId: 'nyk3UGwCAms',
    title: 'FOIL Method - Binomials, Trinomials, Polynomials, Multiplication With Exponents',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 11,
  },

  // foil-method
  {
    skillId: 'foil-method',
    videoId: 'ZMLFfTX615w',
    title: 'Multiplying a Binomial by a Binomial',
    channel: 'Khan Academy',
    durationMinutes: 8,
  },
  {
    skillId: 'foil-method',
    videoId: 'nyk3UGwCAms',
    title: 'FOIL Method - Binomials, Trinomials, Polynomials',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 6,
  },

  // factoring-gcf
  {
    skillId: 'factoring-gcf',
    videoId: '-VKAYqzRp4o',
    title: 'The Basics of Factoring',
    channel: 'Whiteboard Math',
    durationMinutes: 4,
  },
  {
    skillId: 'factoring-gcf',
    videoId: 'FvS7v6KM1ig',
    title: 'GCF to Factor a Polynomial',
    channel: 'Khan Academy',
    durationMinutes: 7,
  },

  // factoring-trinomials
  {
    skillId: 'factoring-trinomials',
    videoId: 'u1SAo2GiX8A',
    title: 'Factoring Quadratics by Grouping',
    channel: 'Khan Academy',
    durationMinutes: 14,
  },
  {
    skillId: 'factoring-trinomials',
    videoId: 'eF6zYNzlZKQ',
    title: 'Factoring Quadratics with a Leading Coefficient of 1',
    channel: 'Khan Academy',
    durationMinutes: 6,
  },

  // quadratic-formula
  {
    skillId: 'quadratic-formula',
    videoId: 'IlNAJl36-10',
    title: 'How To Solve Quadratic Equations Using The Quadratic Formula',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 12,
  },
  {
    skillId: 'quadratic-formula',
    videoId: 'i7idZfS8t8w',
    title: 'How to Use the Quadratic Formula',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },

  // function-notation
  {
    skillId: 'function-notation',
    videoId: 'kvGsIo1TmsM',
    title: 'What is a Function?',
    channel: 'Khan Academy',
    durationMinutes: 4,
  },
  {
    skillId: 'function-notation',
    videoId: 'HyNie_PYgsY',
    title: 'Evaluating Functions - Basic Introduction',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },

  // function-evaluation
  {
    skillId: 'function-evaluation',
    videoId: 'HyNie_PYgsY',
    title: 'Evaluating Functions - Basic Introduction',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },
  {
    skillId: 'function-evaluation',
    videoId: '-VCUcRtQjx8',
    title: 'How To Evaluate Algebraic Expressions',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 5,
  },

  // exponential-growth
  {
    skillId: 'exponential-growth',
    videoId: '6WMZ7J0wwMI',
    title: 'Exponential Growth Functions',
    channel: 'Khan Academy',
    durationMinutes: 13,
  },
  {
    skillId: 'exponential-growth',
    videoId: 'RVv0Jgi3Pbw',
    title: 'Graphing Exponential Growth & Decay',
    channel: 'Khan Academy',
    durationMinutes: 7,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PROBLEM-SOLVING & DATA
  // ═══════════════════════════════════════════════════════════════════════════

  // ratios
  {
    skillId: 'ratios',
    videoId: 'HpdMJaKaXXc',
    title: 'Introduction to Ratios',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },
  {
    skillId: 'ratios',
    videoId: 'RQ2nYUBVvqI',
    title: 'Ratios And Rates',
    channel: 'Math Antics',
    durationMinutes: 8,
  },

  // proportions
  {
    skillId: 'proportions',
    videoId: 'USmit5zUGas',
    title: 'Proportions',
    channel: 'Math Antics',
    durationMinutes: 4,
  },
  {
    skillId: 'proportions',
    videoId: 'yb7lVnY_VCY',
    title: 'Dividing Whole Numbers and Fractions',
    channel: 'Khan Academy',
    durationMinutes: 10,
  },

  // unit-rates
  {
    skillId: 'unit-rates',
    videoId: 'qGTYSAeLTOE',
    title: 'Introduction to Rates',
    channel: 'Khan Academy',
    durationMinutes: 3,
  },
  {
    skillId: 'unit-rates',
    videoId: 'Zm0KaIw-35k',
    title: 'Solving Unit Rates Problem',
    channel: 'Khan Academy',
    durationMinutes: 9,
  },

  // percent-of-number
  {
    skillId: 'percent-of-number',
    videoId: '-lUEWEEpmIo',
    title: 'Percentage of a Whole Number',
    channel: 'Khan Academy',
    durationMinutes: 4,
  },
  {
    skillId: 'percent-of-number',
    videoId: 'rR95Cbcjzus',
    title: 'Finding A Percent Of A Number',
    channel: 'Math Antics',
    durationMinutes: 12,
  },

  // percent-change
  {
    skillId: 'percent-change',
    videoId: 'T6-0MwmCpE8',
    title: 'Percent Increase and Decrease Word Problems',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },
  {
    skillId: 'percent-change',
    videoId: '5nZEUpZX_P0',
    title: 'Calculating Percent Change',
    channel: 'Math Antics',
    durationMinutes: 9,
  },

  // reading-tables
  {
    skillId: 'reading-tables',
    videoId: '4QX-tMRR0TE',
    title: 'Reading Tables',
    channel: 'Khan Academy',
    durationMinutes: 3,
  },

  // reading-graphs
  {
    skillId: 'reading-graphs',
    videoId: 'kiQ6MUQZHSs',
    title: 'Reading Bar Graphs',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },
  {
    skillId: 'reading-graphs',
    videoId: '36v2EXZRzUE',
    title: 'Reading Line Graphs',
    channel: 'Khan Academy',
    durationMinutes: 8,
  },

  // scatterplots
  {
    skillId: 'scatterplots',
    videoId: 'sHbX58y5D4U',
    title: 'Constructing a Scatter Plot',
    channel: 'Khan Academy',
    durationMinutes: 3,
  },
  {
    skillId: 'scatterplots',
    videoId: '11c9cs6WpJU',
    title: 'Correlation Coefficient',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },

  // line-of-best-fit
  {
    skillId: 'line-of-best-fit',
    videoId: 'yMgFHbjbAW8',
    title: 'Introduction to Residuals and Least Squares Regression',
    channel: 'Khan Academy',
    durationMinutes: 6,
  },
  {
    skillId: 'line-of-best-fit',
    videoId: 'P8hT5nDai6A',
    title: 'Linear Regression - Line of Best Fit Equation',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 7,
  },

  // mean-median-mode
  {
    skillId: 'mean-median-mode',
    videoId: 'B1HEzNTGeZ4',
    title: 'Mean, Median and Mode',
    channel: 'Math Antics',
    durationMinutes: 6,
  },
  {
    skillId: 'mean-median-mode',
    videoId: 'k3aKKasOmIw',
    title: 'Finding Mean, Median, and Mode',
    channel: 'Khan Academy',
    durationMinutes: 10,
  },

  // probability-basics
  {
    skillId: 'probability-basics',
    videoId: 'KzfWUEJjG18',
    title: 'Basic Probability',
    channel: 'Math Antics',
    durationMinutes: 6,
  },
  {
    skillId: 'probability-basics',
    videoId: 'SkidyDQuupA',
    title: 'Introduction to Probability - Sample Space & Tree Diagrams',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 12,
  },

  // probability-compound
  {
    skillId: 'probability-compound',
    videoId: 'xSc4oLA9e8o',
    title: 'Compound Probability of Independent Events',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },
  {
    skillId: 'probability-compound',
    videoId: 'lWAdPyvm400',
    title: 'Probability - Independent and Dependent Events',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 11,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GEOMETRY
  // ═══════════════════════════════════════════════════════════════════════════

  // perimeter-area-rectangles
  {
    skillId: 'perimeter-area-rectangles',
    videoId: 'AAY1bsazcgM',
    title: 'Perimeter',
    channel: 'Math Antics',
    durationMinutes: 9,
  },
  {
    skillId: 'perimeter-area-rectangles',
    videoId: 'LoaBd-sPzkU',
    title: 'Perimeter and Area: the Basics',
    channel: 'Khan Academy',
    durationMinutes: 3,
  },

  // area-triangles
  {
    skillId: 'area-triangles',
    videoId: 'rRTXKQpblEc',
    title: 'Area of Triangles Intuition',
    channel: 'Khan Academy',
    durationMinutes: 4,
  },
  {
    skillId: 'area-triangles',
    videoId: 'xCdxURXMdFY',
    title: 'Area',
    channel: 'Math Antics',
    durationMinutes: 7,
  },

  // area-circles
  {
    skillId: 'area-circles',
    videoId: 'YokKp3pwVFc',
    title: 'Area of a Circle',
    channel: 'mathematicsonline',
    durationMinutes: 3,
  },
  {
    skillId: 'area-circles',
    videoId: 'O-cawByg2aA',
    title: 'Circles, Circumference And Area',
    channel: 'Math Antics',
    durationMinutes: 9,
  },

  // volume-prisms
  {
    skillId: 'volume-prisms',
    videoId: 'qJwecTgce6c',
    title: 'Volume',
    channel: 'Math Antics',
    durationMinutes: 10,
  },
  {
    skillId: 'volume-prisms',
    videoId: 'I9efKVtLCf4',
    title: 'Volume of a Rectangular Prism',
    channel: 'Khan Academy',
    durationMinutes: 8,
  },

  // angle-relationships
  {
    skillId: 'angle-relationships',
    videoId: 'BTnAlNSgNsY',
    title: 'Complementary and Supplementary Angles',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },
  {
    skillId: 'angle-relationships',
    videoId: 'DGKwdHMiqCg',
    title: 'Angle Basics',
    channel: 'Math Antics',
    durationMinutes: 9,
  },

  // triangle-properties
  {
    skillId: 'triangle-properties',
    videoId: 'hmj3_zbz2eg',
    title: 'Triangle Angle Example',
    channel: 'Khan Academy',
    durationMinutes: 4,
  },
  {
    skillId: 'triangle-properties',
    videoId: 'mLeNaZcy-hE',
    title: 'Triangles',
    channel: 'Math Antics',
    durationMinutes: 10,
  },

  // pythagorean-theorem
  {
    skillId: 'pythagorean-theorem',
    videoId: 'AA6RfgP-AHU',
    title: 'The Pythagorean Theorem Intro',
    channel: 'Khan Academy',
    durationMinutes: 7,
  },
  {
    skillId: 'pythagorean-theorem',
    videoId: 'pbf4lcJhIfI',
    title: 'Pythagorean Theorem - Basic Introduction',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 13,
  },

  // soh-cah-toa
  {
    skillId: 'soh-cah-toa',
    videoId: 'F21S9Wpi0y8',
    title: 'Basic Trigonometry',
    channel: 'Khan Academy',
    durationMinutes: 14,
  },
  {
    skillId: 'soh-cah-toa',
    videoId: 'Jsiy4TxgIME',
    title: 'Basic Trigonometry - Trigonometric Ratios',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },
];
