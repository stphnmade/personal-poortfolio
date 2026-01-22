// Zone height constants in viewport heights (vh)
export const CARGO_VH = 120;
export const FREEFALL_VH = 500;
export const BEACH_VH = 140;

// Total artboard height
export const TOTAL_VH = CARGO_VH + FREEFALL_VH + BEACH_VH;

// Zone boundaries (start positions)
export const CARGO_START = 0;
export const FREEFALL_START = CARGO_VH;
export const BEACH_START = CARGO_VH + FREEFALL_VH;

// Note placement padding (normalized)
export const NOTE_PADDING = 0.05; // 5% padding from edges
