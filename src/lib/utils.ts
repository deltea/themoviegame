import { browser } from "$app/environment";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function formatLeaderboard(data: unknown[]): Leaderboard {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (i % 2 === 0) {
      // Element is username
      result.push({ username: element, score: data[i + 1] });
    } else {
      // Element is score
      continue;
    }
  }

  return result as Leaderboard;
}

export function localUsername(newUsername: string = "") {
  if (!browser) return;
  if (newUsername) localStorage.setItem("username", newUsername);
  return localStorage.getItem("username") || "";
}

export function localScore(newScore: number = 0) {
  if (!browser) return;
  if (newScore) localStorage.setItem("score", newScore.toString());
  return localStorage.getItem("score") || "";
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

export type AnswerState = "correct" | "incorrect" | null;

export type Leaderboard = {
  username: string,
  score: number,
}[];

export type Leaderboards = {
  rating_leaderboard: Leaderboard,
  budget_leaderboard: Leaderboard,
  time_leaderboard: Leaderboard,
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
  release_date: string;
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
