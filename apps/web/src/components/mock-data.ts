export interface Laureate {
  id: number
  name: string
  year: number
  category: string
  country: string
  countryCode: string
  motivation: string
  birthYear?: number
}

export const categories = [
  "Physics",
  "Chemistry",
  "Medicine",
  "Literature",
  "Peace",
  "Economics"
] as const

export type Category = (typeof categories)[number]

export const laureates: Laureate[] = [
  {
    id: 1,
    name: "Albert Einstein",
    year: 1921,
    category: "Physics",
    country: "Germany",
    countryCode: "DE",
    motivation:
      "For his services to Theoretical Physics, and especially for his discovery of the law of the photoelectric effect",
    birthYear: 1879
  },
  {
    id: 2,
    name: "Marie Curie",
    year: 1911,
    category: "Chemistry",
    country: "Poland",
    countryCode: "PL",
    motivation:
      "In recognition of her services to the advancement of chemistry by the discovery of the elements radium and polonium",
    birthYear: 1867
  },
  {
    id: 3,
    name: "Martin Luther King Jr.",
    year: 1964,
    category: "Peace",
    country: "United States",
    countryCode: "US",
    motivation: "For his non-violent struggle for civil rights for the Afro-American population",
    birthYear: 1929
  },
  {
    id: 4,
    name: "Malala Yousafzai",
    year: 2014,
    category: "Peace",
    country: "Pakistan",
    countryCode: "PK",
    motivation:
      "For their struggle against the suppression of children and young people and for the right of all children to education",
    birthYear: 1997
  },
  {
    id: 5,
    name: "Ernest Hemingway",
    year: 1954,
    category: "Literature",
    country: "United States",
    countryCode: "US",
    motivation:
      "For his mastery of the art of narrative, most recently demonstrated in The Old Man and the Sea",
    birthYear: 1899
  },
  {
    id: 6,
    name: "Richard Feynman",
    year: 1965,
    category: "Physics",
    country: "United States",
    countryCode: "US",
    motivation:
      "For their fundamental work in quantum electrodynamics, with deep-ploughing consequences for the physics of elementary particles",
    birthYear: 1918
  },
  {
    id: 7,
    name: "Niels Bohr",
    year: 1922,
    category: "Physics",
    country: "Denmark",
    countryCode: "DK",
    motivation:
      "For his services in the investigation of the structure of atoms and of the radiation emanating from them",
    birthYear: 1885
  },
  {
    id: 8,
    name: "Gabriel García Márquez",
    year: 1982,
    category: "Literature",
    country: "Colombia",
    countryCode: "CO",
    motivation:
      "For his novels and short stories, in which the fantastic and the realistic are combined in a richly composed world of imagination",
    birthYear: 1927
  },
  {
    id: 9,
    name: "Nelson Mandela",
    year: 1993,
    category: "Peace",
    country: "South Africa",
    countryCode: "ZA",
    motivation:
      "For their work for the peaceful termination of the apartheid regime, and for laying the foundations for a new democratic South Africa",
    birthYear: 1918
  },
  {
    id: 10,
    name: "Paul Krugman",
    year: 2008,
    category: "Economics",
    country: "United States",
    countryCode: "US",
    motivation: "For his analysis of trade patterns and location of economic activity",
    birthYear: 1953
  },
  {
    id: 11,
    name: "Tu Youyou",
    year: 2015,
    category: "Medicine",
    country: "China",
    countryCode: "CN",
    motivation: "For her discoveries concerning a novel therapy against Malaria",
    birthYear: 1930
  },
  {
    id: 12,
    name: "Werner Heisenberg",
    year: 1932,
    category: "Physics",
    country: "Germany",
    countryCode: "DE",
    motivation:
      "For the creation of quantum mechanics, the application of which has led to the discovery of the allotropic forms of hydrogen",
    birthYear: 1901
  },
  {
    id: 13,
    name: "Alexander Fleming",
    year: 1945,
    category: "Medicine",
    country: "United Kingdom",
    countryCode: "GB",
    motivation:
      "For the discovery of penicillin and its curative effect in various infectious diseases",
    birthYear: 1881
  },
  {
    id: 14,
    name: "Mother Teresa",
    year: 1979,
    category: "Peace",
    country: "Albania",
    countryCode: "AL",
    motivation:
      "For work undertaken in the struggle to overcome poverty and distress, which also constitute a threat to peace",
    birthYear: 1910
  },
  {
    id: 15,
    name: "Kazuo Ishiguro",
    year: 2017,
    category: "Literature",
    country: "Japan",
    countryCode: "JP",
    motivation:
      "Who, in novels of great emotional force, has uncovered the abyss beneath our illusory sense of connection with the world",
    birthYear: 1954
  },
  {
    id: 16,
    name: "Jennifer Doudna",
    year: 2020,
    category: "Chemistry",
    country: "United States",
    countryCode: "US",
    motivation: "For the development of a method for genome editing",
    birthYear: 1964
  }
]

export interface CountryStats {
  country: string
  countryCode: string
  count: number
  categories: Record<string, number>
  coordinates: [number, number]
}

export const countryStats: CountryStats[] = [
  {
    country: "United States",
    countryCode: "US",
    count: 400,
    categories: {
      Physics: 96,
      Chemistry: 77,
      Medicine: 105,
      Literature: 13,
      Peace: 22,
      Economics: 87
    },
    coordinates: [37.0902, -95.7129]
  },
  {
    country: "United Kingdom",
    countryCode: "GB",
    count: 137,
    categories: {
      Physics: 29,
      Chemistry: 31,
      Medicine: 33,
      Literature: 13,
      Peace: 11,
      Economics: 20
    },
    coordinates: [55.3781, -3.436]
  },
  {
    country: "Germany",
    countryCode: "DE",
    count: 111,
    categories: {
      Physics: 28,
      Chemistry: 31,
      Medicine: 19,
      Literature: 9,
      Peace: 5,
      Economics: 19
    },
    coordinates: [51.1657, 10.4515]
  },
  {
    country: "France",
    countryCode: "FR",
    count: 72,
    categories: {
      Physics: 15,
      Chemistry: 10,
      Medicine: 13,
      Literature: 16,
      Peace: 10,
      Economics: 8
    },
    coordinates: [46.2276, 2.2137]
  },
  {
    country: "Sweden",
    countryCode: "SE",
    count: 33,
    categories: { Physics: 8, Chemistry: 5, Medicine: 8, Literature: 8, Peace: 5, Economics: 5 },
    coordinates: [60.1282, 18.6435]
  },
  {
    country: "Japan",
    countryCode: "JP",
    count: 29,
    categories: { Physics: 12, Chemistry: 8, Medicine: 5, Literature: 3, Peace: 1, Economics: 0 },
    coordinates: [36.2048, 138.2529]
  },
  {
    country: "Russia",
    countryCode: "RU",
    count: 32,
    categories: { Physics: 11, Chemistry: 2, Medicine: 2, Literature: 6, Peace: 3, Economics: 8 },
    coordinates: [61.524, 105.3188]
  },
  {
    country: "Switzerland",
    countryCode: "CH",
    count: 28,
    categories: { Physics: 6, Chemistry: 8, Medicine: 6, Literature: 2, Peace: 3, Economics: 3 },
    coordinates: [46.8182, 8.2275]
  },
  {
    country: "Canada",
    countryCode: "CA",
    count: 27,
    categories: { Physics: 5, Chemistry: 5, Medicine: 6, Literature: 2, Peace: 2, Economics: 7 },
    coordinates: [56.1304, -106.3468]
  },
  {
    country: "Poland",
    countryCode: "PL",
    count: 18,
    categories: { Physics: 2, Chemistry: 3, Medicine: 1, Literature: 5, Peace: 3, Economics: 4 },
    coordinates: [51.9194, 19.1451]
  }
]

export const categoryColors: Record<Category, string> = {
  Physics: "hsl(45, 90%, 55%)",
  Chemistry: "hsl(200, 70%, 50%)",
  Medicine: "hsl(150, 60%, 45%)",
  Literature: "hsl(30, 80%, 55%)",
  Peace: "hsl(280, 50%, 55%)",
  Economics: "hsl(0, 0%, 60%)"
}

export const yearlyStats = [
  {
    year: "1901-1920",
    Physics: 20,
    Chemistry: 18,
    Medicine: 19,
    Literature: 18,
    Peace: 16,
    Economics: 0
  },
  {
    year: "1921-1940",
    Physics: 19,
    Chemistry: 18,
    Medicine: 20,
    Literature: 18,
    Peace: 14,
    Economics: 0
  },
  {
    year: "1941-1960",
    Physics: 18,
    Chemistry: 17,
    Medicine: 19,
    Literature: 15,
    Peace: 10,
    Economics: 0
  },
  {
    year: "1961-1980",
    Physics: 38,
    Chemistry: 35,
    Medicine: 40,
    Literature: 20,
    Peace: 19,
    Economics: 13
  },
  {
    year: "1981-2000",
    Physics: 42,
    Chemistry: 40,
    Medicine: 44,
    Literature: 20,
    Peace: 23,
    Economics: 20
  },
  {
    year: "2001-2023",
    Physics: 56,
    Chemistry: 52,
    Medicine: 55,
    Literature: 23,
    Peace: 28,
    Economics: 23
  }
]

export const categoryStats = [
  { category: "Physics", count: 225 },
  { category: "Chemistry", count: 192 },
  { category: "Medicine", count: 227 },
  { category: "Literature", count: 120 },
  { category: "Peace", count: 111 },
  { category: "Economics", count: 93 }
]
