# Task 011: Visual Aids and Animations

**depends-on:** none
**phase:** 4 — Rich Interactive Content

## Goal

Create visual components that make abstract math concepts concrete: animated equation solving, SVG geometry diagrams, color-coded steps, and interactive number lines.

## What to Do

1. Create `src/components/visual/equation-animator.tsx`:
   - Shows an equation being solved step by step with animation
   - Each operation animates: number slides across the equals sign, changes color
   - "Play" button to start, pause/step controls
   - Used in lessons to demonstrate solving techniques

2. Create `src/components/visual/number-line.tsx`:
   - Interactive SVG number line
   - Can show: points, ranges, inequalities
   - Draggable point for student interaction
   - Used for inequality problems

3. Create `src/components/visual/coordinate-plane.tsx`:
   - SVG coordinate grid
   - Can plot points, draw lines, show intersections
   - Click-to-plot mode for student interaction
   - Used for graphing lessons

4. Create `src/components/visual/geometry-diagram.tsx`:
   - SVG diagrams for: triangles (with angle labels), circles (with radius/diameter), rectangles, right triangles
   - Props-driven: pass measurements, angles, labels
   - Highlights relevant parts based on the problem

5. Create `src/components/visual/color-coded-steps.tsx`:
   - Renders a math solution with each operation in a different color
   - Matching colors between the operation and the result
   - Makes it easy to track what happened at each step

6. Install framer-motion for smooth animations

## Verification

- Equation animator plays smoothly at 60fps
- Number line is draggable and responsive
- Coordinate plane correctly plots given points/lines
- Geometry diagrams render accurately with correct proportions
- Color coding is distinguishable in both dark and light mode
- All components are responsive on mobile
