// Color mapping for profile types and risk levels
export const profileTypeColors = {
  "Young Professional": {
    bg: "bg-blue-100",
    border: "border-blue-300",
    text: "text-blue-800",
    icon: "text-blue-600"
  },
  "Adult Content Creator": {
    bg: "bg-pink-100",
    border: "border-pink-300",
    text: "text-pink-800",
    icon: "text-pink-600"
  },
  "High-Risk Individual": {
    bg: "bg-red-100",
    border: "border-red-300",
    text: "text-red-800",
    icon: "text-red-600"
  },
  "Senior Executive": {
    bg: "bg-purple-100",
    border: "border-purple-300",
    text: "text-purple-800",
    icon: "text-purple-600"
  },
  "Creative Professional": {
    bg: "bg-green-100",
    border: "border-green-300",
    text: "text-green-800",
    icon: "text-green-600"
  },
  "Student/Young Adult": {
    bg: "bg-yellow-100",
    border: "border-yellow-300",
    text: "text-yellow-800",
    icon: "text-yellow-600"
  },
  "Senior Citizen": {
    bg: "bg-gray-100",
    border: "border-gray-300",
    text: "text-gray-800",
    icon: "text-gray-600"
  },
  "General Population": {
    bg: "bg-slate-100",
    border: "border-slate-300",
    text: "text-slate-800",
    icon: "text-slate-600"
  }
};

export const riskLevelColors = {
  "Low": {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    dot: "bg-green-400"
  },
  "Medium": {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    dot: "bg-yellow-400"
  },
  "High": {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    dot: "bg-red-400"
  }
};

export function getProfileTypeColor(profileType: string) {
  return profileTypeColors[profileType as keyof typeof profileTypeColors] || profileTypeColors["General Population"];
}

export function getRiskLevelColor(riskLevel: string) {
  return riskLevelColors[riskLevel as keyof typeof riskLevelColors] || riskLevelColors["Low"];
}