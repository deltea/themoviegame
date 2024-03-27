import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export const NumberFormatter = new Intl.NumberFormat();
export const DateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long"
});

export const genreIcons: {
  [name: string]: string
} = {
  "Action": "material-symbols:bomb-rounded",
  "Adventure": "mingcute:compass-fill",
  "Animation": "mingcute:movie-fill",
  "Comedy": "ri:emotion-laugh-fill",
  "Crime": "mdi:handcuffs",
  "Documentary": "material-symbols:android-camera",
  "Drama": "material-symbols:comedy-mask-rounded",
  "Family": "material-symbols:family-restroom-rounded",
  "Fantasy": "mingcute:crystal-ball-fill",
  "History": "material-symbols:history-rounded",
  "Horror": "mingcute:skull-fill",
  "Music": "mingcute:music-2-fill",
  "Mystery": "mingcute:search-2-fill",
  "Romance": "material-symbols:heart-broken-rounded",
  "Science Fiction": "material-symbols:science",
  "Thriller": "material-symbols:knife",
  "War": "mingcute:tank-fill",
  "Western": "mdi:account-cowboy-hat",
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genres: Genre[];

  rating: number;
}

export interface Genre {
  id: number;
  name: string;
}

export type GameMode = "budget" | "time" | "rating";
