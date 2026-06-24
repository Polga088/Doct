# Design System Specification: Neural Light Editorial

## 1. Overview & Creative North Star
**Creative North Star: The Synaptic Flow**

This design system moves away from the rigid, boxy nature of traditional ERPs and adopts a philosophy of "Synaptic Flow." In an environment as complex as TexTa Technology, the UI must act as a living organism—intelligent, interconnected, and weightless. We avoid the "industrial" look of typical enterprise software in favor of an **Editorial Tech** aesthetic. 

The system breaks the "template" feel through intentional asymmetry, fluid organic shapes, and a rejection of structural rigidity. By utilizing tonal depth and light-based hierarchy, we create an interface that feels like it is breathing, with information "surfacing" rather than being "contained."

---

## 2. Colors & Surface Philosophy

### The "No-Line" Rule
**Borders are forbidden.** Traditional 1px solid lines create visual noise and "trap" data. In this system, boundaries are defined exclusively through background shifts (using the `surface-container` scale) or subtle tonal transitions. If a section needs to end, it simply transitions from `surface-container-low` to `surface`.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of frosted glass. 
- **Base Layer:** `surface` (#f5f7f9) for the primary application canvas.
- **Structural Nesting:** Use `surface-container-low` for large sidebar areas and `surface-container-lowest` (#ffffff) for primary content cards. This creates a "natural lift" where the most important data literally sits "higher" and "brighter" than the rest.

### The Glass & Gradient Rule
To achieve the "Neural" feel, use **Glassmorphism** for all floating elements (modals, dropdowns, tooltips). Use semi-transparent versions of `surface` with a `backdrop-blur` of 20px–40px. 
- **Signature Glow:** Hero actions and primary CTAs should utilize a linear gradient: `primary` (#006571) to `primary-container` (#00e3fd). This mimics the energy of a firing synapse.

---

### Color Token Reference
| Token | Hex | Role |
| :--- | :--- | :--- |
| `primary` | #006571 | Synaptic Core (Cyan) |
| `secondary` | #7a23dc | Neural Impulse (Electric Purple) |
| `surface` | #f5f7f9 | The Canvas (Zinc 50) |
| `surface-container-lowest` | #ffffff | Active Elevated Content |
| `on-surface` | #2c2f31 | Technical Text (Deep Zinc) |
| `inverse-primary` | #00e3fd | Electric Highlight |

---

## 3. Typography: Technical Elegance

We pair the geometric precision of **Space Grotesk** with the ergonomic clarity of **Manrope**.

- **Display & Headlines (Space Grotesk):** Used for data visualization titles and dashboard headers. The monolinear strokes and technical terminals of Space Grotesk communicate the "Technology" aspect of TexTa.
- **Body & Titles (Manrope):** Used for all functional ERP data. Manrope’s warmth balances the technicality of the display face, ensuring long-term readability in complex tables.

**Hierarchy Note:** Use wide letter-spacing (0.05em) for `label-sm` and `label-md` in Space Grotesk to evoke an "architectural drawing" feel.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved by stacking the `surface-container` tiers. 
1. **Background:** `surface`
2. **Sectioning:** `surface-container-low` (no shadows)
3. **Interactive Objects:** `surface-container-lowest` (with Ambient Shadows)

### Ambient Shadows
Forget dark grey dropshadows. For this system, shadows must be "Light-Based."
- **Cyan Glow:** For primary interactive elements, use a shadow: `0px 20px 40px rgba(0, 227, 253, 0.08)`.
- **Purple Glow:** For secondary "Neural" triggers: `0px 20px 40px rgba(122, 35, 220, 0.06)`.
- **Standard Lift:** Use a tint of the `on-surface` color at 4% opacity with a 60px blur.

### The "Ghost Border" Fallback
If accessibility requirements demand a container edge (e.g., in high-contrast modes), use a **Ghost Border**: `outline-variant` at 15% opacity. Never use a 100% opaque border.

---

## 5. Components

### Buttons
- **Primary:** Gradient from `primary` to `primary-container`. `Round-Full` (9999px) shape. Subtle `primary-fixed` inner-glow.
- **Secondary:** Transparent background with a `backdrop-blur`. Text in `secondary`.
- **Tertiary:** Ghost style. No background until hover. On hover, use `surface-container-high`.

### Input Fields
- **Style:** Pill-shaped (`Round-Full`).
- **Background:** `surface-container-highest` at low opacity.
- **State:** On focus, the field should not show a heavy border, but rather a soft "Neural Glow" (`primary` shadow) and a text color shift to `primary`.

### Cards & Data Lists
- **Rule:** **No Divider Lines.** 
- Separate data rows using vertical white space (use the `md` or `lg` spacing tokens). 
- For lists, use alternating background tints: Row A is transparent; Row B is `surface-container-low` at 40% opacity.

### The "Synapse" Path (Custom Component)
For ERP workflows, use a "Synapse Path" instead of a traditional breadcrumb. A thin, glowing line (1px, `primary-fixed`) that connects active nodes/steps, using `backdrop-blur` nodes to signify progress.

---

## 6. Do’s and Don’ts

### Do:
- **Embrace White Space:** High-end editorial design requires "breathing room." If the data feels cramped, increase the container roundness and padding.
- **Use Soft Transitions:** All hover states should have a 300ms–500ms ease-out duration to feel "organic."
- **Leverage Tonal Shifts:** Use `surface-bright` for highlights instead of adding more colors.

### Don’t:
- **Don’t use 90-degree corners:** Everything must be `Round-Full` or at least `xl` (3rem) to maintain the fluid, organic feel.
- **Don’t use "Black":** Use `on-surface` (#2c2f31) for text. True black kills the "light-based" illusion.
- **Don’t use standard grids:** Occasionally break the grid by overlapping a "Glass" card over two sections to create a sense of depth and interconnectivity.

---

## 7. Interaction Design (The Neural Touch)
When a user clicks an action, a "Pulse" should radiate from the point of contact using the `secondary` (Electric Purple) color at 10% opacity. This reinforces the "Neural Network" theme—every action sends a signal through the system.