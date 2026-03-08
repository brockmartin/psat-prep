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
    title: 'Addition, Subtraction, Multiplication, Division',
    channel: 'Math Antics',
    durationMinutes: 10,
  },
  {
    skillId: 'basic-arithmetic',
    videoId: 'dAgfnK528RA',
    title: 'Basic Math Operations',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 14,
  },

  // order-of-operations
  {
    skillId: 'order-of-operations',
    videoId: 'dAgfnK528RA',
    title: 'Order of Operations - PEMDAS',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 14,
  },
  {
    skillId: 'order-of-operations',
    videoId: 'GiSpGFKXgbU',
    title: 'Order of Operations Introduction',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },

  // integer-operations
  {
    skillId: 'integer-operations',
    videoId: 'Ry0FTBkVMhA',
    title: 'Adding & Subtracting Negative Numbers',
    channel: 'Khan Academy',
    durationMinutes: 6,
  },
  {
    skillId: 'integer-operations',
    videoId: 'bQ-KR3clFgs',
    title: 'Multiplying and Dividing Negative Numbers',
    channel: 'Math Antics',
    durationMinutes: 9,
  },

  // fraction-operations
  {
    skillId: 'fraction-operations',
    videoId: 'qmfXyR7Z6Lk',
    title: 'Fractions - Adding, Subtracting, Multiplying and Dividing',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 15,
  },
  {
    skillId: 'fraction-operations',
    videoId: '52ZlXsJCRLk',
    title: 'Adding and Subtracting Fractions',
    channel: 'Math Antics',
    durationMinutes: 8,
  },

  // decimal-operations
  {
    skillId: 'decimal-operations',
    videoId: 'do_IbHId2Os',
    title: 'Decimals - Adding, Subtracting, Multiplying and Dividing',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 12,
  },
  {
    skillId: 'decimal-operations',
    videoId: 'aMjJbAGtERQ',
    title: 'Converting Fractions, Decimals, and Percentages',
    channel: 'Math Antics',
    durationMinutes: 10,
  },

  // variables-expressions
  {
    skillId: 'variables-expressions',
    videoId: 'Tm98lnrlbMA',
    title: 'Introduction to Variables and Expressions',
    channel: 'Khan Academy',
    durationMinutes: 4,
  },
  {
    skillId: 'variables-expressions',
    videoId: 'VjMCbMnHbFg',
    title: 'Evaluating Algebraic Expressions',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 11,
  },

  // combining-like-terms
  {
    skillId: 'combining-like-terms',
    videoId: 'NS6hxfHylRQ',
    title: 'Combining Like Terms',
    channel: 'Khan Academy',
    durationMinutes: 3,
  },
  {
    skillId: 'combining-like-terms',
    videoId: 'FAqSNMJxBto',
    title: 'Combining Like Terms and Simplifying Expressions',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },

  // one-step-equations
  {
    skillId: 'one-step-equations',
    videoId: 'l3XzepN03KQ',
    title: 'One Step Equations',
    channel: 'Math Antics',
    durationMinutes: 8,
  },
  {
    skillId: 'one-step-equations',
    videoId: 'UFhGSaDAM6E',
    title: 'Solving One Step Equations',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },

  // two-step-equations
  {
    skillId: 'two-step-equations',
    videoId: 'LDIiYKYvvdA',
    title: 'Two Step Equations',
    channel: 'Math Antics',
    durationMinutes: 9,
  },
  {
    skillId: 'two-step-equations',
    videoId: 'Qyd_v3DGzTM',
    title: 'Solving Two Step Equations',
    channel: 'Khan Academy',
    durationMinutes: 4,
  },

  // multi-step-equations
  {
    skillId: 'multi-step-equations',
    videoId: 'TRbE3xCGy_E',
    title: 'Multi-Step Equations',
    channel: 'Math Antics',
    durationMinutes: 10,
  },
  {
    skillId: 'multi-step-equations',
    videoId: 'Zn-GbH2S0Dk',
    title: 'Multi-Step Equations With Variables on Both Sides',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 12,
  },

  // slope-concept
  {
    skillId: 'slope-concept',
    videoId: 'R948Tsyq4vA',
    title: 'Intro to Slope',
    channel: 'Khan Academy',
    durationMinutes: 6,
  },
  {
    skillId: 'slope-concept',
    videoId: 'MnMpEQ-bZOU',
    title: 'How to Find Slope from Two Points',
    channel: "Mario's Math Tutoring",
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
    videoId: 'wvEBOBYRDCQ',
    title: 'Writing Linear Equations in Slope-Intercept Form',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 14,
  },

  // graphing-lines
  {
    skillId: 'graphing-lines',
    videoId: '2LkMzJFIlVQ',
    title: 'Graphing Lines Using Slope-Intercept Form',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },
  {
    skillId: 'graphing-lines',
    videoId: 'ONo2w0MoGIA',
    title: 'Graphing Linear Equations',
    channel: "Mario's Math Tutoring",
    durationMinutes: 8,
  },

  // systems-substitution
  {
    skillId: 'systems-substitution',
    videoId: 'nok99JOhcjo',
    title: 'Systems of Equations - Substitution Method',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 12,
  },
  {
    skillId: 'systems-substitution',
    videoId: 'oKqtgz2xo2o',
    title: 'Systems of Equations with Substitution',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },

  // systems-elimination
  {
    skillId: 'systems-elimination',
    videoId: 'tGW2pMFBam4',
    title: 'Systems of Equations - Elimination Method',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 14,
  },
  {
    skillId: 'systems-elimination',
    videoId: 'vA-55wZtLeE',
    title: 'Systems of Equations with Elimination',
    channel: 'Khan Academy',
    durationMinutes: 6,
  },

  // linear-inequalities
  {
    skillId: 'linear-inequalities',
    videoId: 'xOxvyeSl0uA',
    title: 'Solving Linear Inequalities',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 11,
  },
  {
    skillId: 'linear-inequalities',
    videoId: 'Hzxpo9M4tYc',
    title: 'Multi-Step Inequalities',
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
    title: 'Exponent Rules - All You Need to Know',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 15,
  },
  {
    skillId: 'exponent-rules',
    videoId: '8htcZca0JIA',
    title: 'Introduction to Exponents',
    channel: 'Math Antics',
    durationMinutes: 7,
  },

  // negative-exponents
  {
    skillId: 'negative-exponents',
    videoId: 'JnpqlXN9Whw',
    title: 'Negative Exponents Explained',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },
  {
    skillId: 'negative-exponents',
    videoId: 'Tqpcku0hrPU',
    title: 'Negative Exponents',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },

  // simplifying-radicals
  {
    skillId: 'simplifying-radicals',
    videoId: 'BpBh8gvMifs',
    title: 'Simplifying Radicals',
    channel: 'The Organic Chemistry Tutor',
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
    videoId: 'jAMHGEn2PN4',
    title: 'Adding and Subtracting Polynomials',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },

  // polynomial-multiplication
  {
    skillId: 'polynomial-multiplication',
    videoId: 'kqGFz4dMlsM',
    title: 'Multiplying Polynomials',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 11,
  },

  // foil-method
  {
    skillId: 'foil-method',
    videoId: 'Z5MyanVs5dE',
    title: 'FOIL Method for Multiplying Binomials',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 8,
  },
  {
    skillId: 'foil-method',
    videoId: 'Axv7cUhFPEI',
    title: 'Multiplying Binomials with FOIL',
    channel: "Mario's Math Tutoring",
    durationMinutes: 6,
  },

  // factoring-gcf
  {
    skillId: 'factoring-gcf',
    videoId: '-VKAYqzRp4o',
    title: 'Factoring Greatest Common Factor',
    channel: 'Khan Academy',
    durationMinutes: 4,
  },
  {
    skillId: 'factoring-gcf',
    videoId: 'WLXO0Rtz_rQ',
    title: 'Factoring GCF from Polynomials',
    channel: 'Brian McLogan',
    durationMinutes: 7,
  },

  // factoring-trinomials
  {
    skillId: 'factoring-trinomials',
    videoId: 'Z5myJ8dg_rM',
    title: 'Factoring Trinomials the Easy Way',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 14,
  },
  {
    skillId: 'factoring-trinomials',
    videoId: 'eF6zYNzlZKQ',
    title: 'Factoring Trinomials',
    channel: 'Khan Academy',
    durationMinutes: 6,
  },

  // quadratic-formula
  {
    skillId: 'quadratic-formula',
    videoId: 'IlNAJl36-10',
    title: 'The Quadratic Formula',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 12,
  },
  {
    skillId: 'quadratic-formula',
    videoId: 'i7idZfS8t8w',
    title: 'Using the Quadratic Formula',
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
    videoId: 'GY6Q2f2kvY0',
    title: 'Function Notation',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },

  // function-evaluation
  {
    skillId: 'function-evaluation',
    videoId: 'GY6Q2f2kvY0',
    title: 'Evaluating Functions',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },
  {
    skillId: 'function-evaluation',
    videoId: '1EGFSefe5II',
    title: 'Evaluate a Function',
    channel: 'Brian McLogan',
    durationMinutes: 5,
  },

  // exponential-growth
  {
    skillId: 'exponential-growth',
    videoId: '6WMZ7J0wwMI',
    title: 'Exponential Growth and Decay',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 13,
  },
  {
    skillId: 'exponential-growth',
    videoId: 'lMByAfiJNCQ',
    title: 'Intro to Exponential Functions',
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
    title: 'Ratios Introduction',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },
  {
    skillId: 'ratios',
    videoId: 'Uo8vJaENGjI',
    title: 'Ratios and Proportions',
    channel: 'Math Antics',
    durationMinutes: 8,
  },

  // proportions
  {
    skillId: 'proportions',
    videoId: 'USmit5zUGas',
    title: 'Solving Proportions',
    channel: 'Khan Academy',
    durationMinutes: 4,
  },
  {
    skillId: 'proportions',
    videoId: 'yb7lVnY_VCY',
    title: 'Proportions - Solving Using Cross Multiplication',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },

  // unit-rates
  {
    skillId: 'unit-rates',
    videoId: 'RQ2nYUBVvqI',
    title: 'Unit Rates',
    channel: 'Khan Academy',
    durationMinutes: 3,
  },
  {
    skillId: 'unit-rates',
    videoId: 'QGDoMz_giAQ',
    title: 'Finding Unit Rates',
    channel: 'Math Antics',
    durationMinutes: 9,
  },

  // percent-of-number
  {
    skillId: 'percent-of-number',
    videoId: 'Lp7E973zozc',
    title: 'Finding a Percent of a Number',
    channel: 'Khan Academy',
    durationMinutes: 4,
  },
  {
    skillId: 'percent-of-number',
    videoId: 'rR95Cbcjzus',
    title: 'Percentages Made Easy',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 12,
  },

  // percent-change
  {
    skillId: 'percent-change',
    videoId: 'Gn2W3X_pGh4',
    title: 'Percent Change - Increase and Decrease',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },
  {
    skillId: 'percent-change',
    videoId: 'RtMSCDJMCwM',
    title: 'Percent Increase and Decrease',
    channel: 'Math Antics',
    durationMinutes: 9,
  },

  // reading-tables
  {
    skillId: 'reading-tables',
    videoId: 'UI7lnXAOtAo',
    title: 'Reading Data from Tables',
    channel: 'Khan Academy',
    durationMinutes: 3,
  },

  // reading-graphs
  {
    skillId: 'reading-graphs',
    videoId: 'kiQ2gLm_hPo',
    title: 'Reading Bar Graphs and Line Graphs',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },
  {
    skillId: 'reading-graphs',
    videoId: 'B2YOaeY3c2M',
    title: 'How to Read Graphs',
    channel: 'Math Antics',
    durationMinutes: 8,
  },

  // scatterplots
  {
    skillId: 'scatterplots',
    videoId: 'PE_BUvleXWA',
    title: 'Intro to Scatterplots',
    channel: 'Khan Academy',
    durationMinutes: 3,
  },
  {
    skillId: 'scatterplots',
    videoId: 'WIqMkTPCxjQ',
    title: 'Scatterplots and Correlation',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },

  // line-of-best-fit
  {
    skillId: 'line-of-best-fit',
    videoId: 'yMgFHbjbAW8',
    title: 'Line of Best Fit',
    channel: 'Khan Academy',
    durationMinutes: 6,
  },
  {
    skillId: 'line-of-best-fit',
    videoId: 'ithcg51XiI4',
    title: 'Line of Best Fit and Making Predictions',
    channel: "Mario's Math Tutoring",
    durationMinutes: 7,
  },

  // mean-median-mode
  {
    skillId: 'mean-median-mode',
    videoId: 'B1HEzNTGeZ4',
    title: 'Mean, Median, and Mode',
    channel: 'Khan Academy',
    durationMinutes: 6,
  },
  {
    skillId: 'mean-median-mode',
    videoId: 'k3aKKasOmIw',
    title: 'Mean, Median, Mode, and Range',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },

  // probability-basics
  {
    skillId: 'probability-basics',
    videoId: 'KzfWUEJjG18',
    title: 'Basic Probability',
    channel: 'Khan Academy',
    durationMinutes: 6,
  },
  {
    skillId: 'probability-basics',
    videoId: 'SkidyDQuupA',
    title: 'Introduction to Probability',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 12,
  },

  // probability-compound
  {
    skillId: 'probability-compound',
    videoId: 'xSc4oLA9e8o',
    title: 'Compound Probability',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },
  {
    skillId: 'probability-compound',
    videoId: 'TKr68614Ydk',
    title: 'Compound Probability - Independent and Dependent Events',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 11,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GEOMETRY
  // ═══════════════════════════════════════════════════════════════════════════

  // perimeter-area-rectangles
  {
    skillId: 'perimeter-area-rectangles',
    videoId: 'vp3RmJ0Xf4k',
    title: 'Area and Perimeter',
    channel: 'Math Antics',
    durationMinutes: 9,
  },
  {
    skillId: 'perimeter-area-rectangles',
    videoId: 'CDvPPsB3nEM',
    title: 'Area and Perimeter of Rectangles',
    channel: 'Khan Academy',
    durationMinutes: 3,
  },

  // area-triangles
  {
    skillId: 'area-triangles',
    videoId: 'QyDjsji5jHo',
    title: 'Area of Triangles',
    channel: 'Khan Academy',
    durationMinutes: 4,
  },
  {
    skillId: 'area-triangles',
    videoId: 'xz60RnFfkRo',
    title: 'Area of a Triangle',
    channel: 'Math Antics',
    durationMinutes: 7,
  },

  // area-circles
  {
    skillId: 'area-circles',
    videoId: 'YokKp3pwVFc',
    title: 'Area of a Circle',
    channel: 'Khan Academy',
    durationMinutes: 3,
  },
  {
    skillId: 'area-circles',
    videoId: 'O-cawByg2aA',
    title: 'Circles - Area and Circumference',
    channel: 'Math Antics',
    durationMinutes: 9,
  },

  // volume-prisms
  {
    skillId: 'volume-prisms',
    videoId: 'qJwecTgce6c',
    title: 'Volume of Rectangular Prisms and Cylinders',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 10,
  },
  {
    skillId: 'volume-prisms',
    videoId: 'k15m3Q06LCA',
    title: 'Volume of a Rectangular Prism',
    channel: 'Math Antics',
    durationMinutes: 8,
  },

  // angle-relationships
  {
    skillId: 'angle-relationships',
    videoId: 'H-E99clfW7Q',
    title: 'Angle Relationships',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },
  {
    skillId: 'angle-relationships',
    videoId: 'SQaD_rrEp20',
    title: 'Complementary and Supplementary Angles',
    channel: 'Math Antics',
    durationMinutes: 9,
  },

  // triangle-properties
  {
    skillId: 'triangle-properties',
    videoId: 'hmj3_zbz2eg',
    title: 'Triangle Angle Sum Property',
    channel: 'Khan Academy',
    durationMinutes: 4,
  },
  {
    skillId: 'triangle-properties',
    videoId: 'mLeNaj2A1c0',
    title: 'Types of Triangles and Their Properties',
    channel: 'Math Antics',
    durationMinutes: 10,
  },

  // pythagorean-theorem
  {
    skillId: 'pythagorean-theorem',
    videoId: 'AA6RfgP-AHU',
    title: 'Pythagorean Theorem',
    channel: 'Khan Academy',
    durationMinutes: 7,
  },
  {
    skillId: 'pythagorean-theorem',
    videoId: 'tOvRM68l6_g',
    title: 'Pythagorean Theorem - How to Use It',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 13,
  },

  // soh-cah-toa
  {
    skillId: 'soh-cah-toa',
    videoId: 'F21S9Wpi0y8',
    title: 'Basic Trigonometry - Sin, Cos, Tan',
    channel: 'The Organic Chemistry Tutor',
    durationMinutes: 14,
  },
  {
    skillId: 'soh-cah-toa',
    videoId: 'Jsiy4TxgIME',
    title: 'Intro to Trigonometric Ratios',
    channel: 'Khan Academy',
    durationMinutes: 5,
  },
];
