import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

enum OriginalLanguage {
  En = "en",
  ID = "id",
  Pt = "pt",
  Zh = "zh",
}
