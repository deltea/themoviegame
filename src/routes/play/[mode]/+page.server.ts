import type { GameMode } from "$lib/utils";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  return { gameMode: params.mode as GameMode };
}) satisfies PageServerLoad;
