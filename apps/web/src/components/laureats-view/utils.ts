export const categories = ["physics", "chemistry", "medicine", "literature", "peace", "economics"] as const

export type Category = (typeof categories)[number]

export const categoryColors: Record<Category, string> = {
  physics: "#87CEEB",
  chemistry: "#98FB98",
  medicine: "#FFB6C1",
  literature: "#DDA0DD",
  peace: "#F0E68C",
  economics: "#D2B48C"
}

export const categoryDisplayNames: Record<Category, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  medicine: "Medicine",
  literature: "Literature",
  peace: "Peace",
  economics: "Economics"
}