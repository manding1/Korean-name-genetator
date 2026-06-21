export interface NameCharacter {
  char: string;
  romanized: string;
  meaning: string;
}

export interface PlaceRecommendation {
  name: string;
  name_ko: string;
  description: string;
  lat: number;
  lng: number;
  keywords: string[];
}

export interface MediaRecommendation {
  title: string;
  title_en: string;
  year: string;
  genre: string;
  reason: string;
  platform: string;
  match_score: number;
}

export interface AlternativeName {
  name_korean: string;
  name_romanized: string;
  compatibility_score: number;
  name_meaning: string;
}

export interface KoreanNameResult {
  surname_korean: string;
  surname_romanized: string;
  surname_origin?: string;
  name_korean: string;
  name_romanized: string;
  compatibility_score: number;
  name_meaning: string;
  name_characters: NameCharacter[];
  alternative_names: AlternativeName[];
  your_korea: PlaceRecommendation[];
  kdrama_recommendations: MediaRecommendation[];
  movie_recommendations: MediaRecommendation[];
}
