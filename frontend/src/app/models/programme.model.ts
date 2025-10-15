/**
 * Modèle représentant un Programme Nota
 */
export interface Programme {
  ID: number;
  ID_FORMAT?: number;
  NAME?: string;
  YEAR?: number;
  ID_SUBGENRE?: number;
  ID_IMDB?: string;
  ORIGINAL_TITLE?: string;
  ORIGINAL_TITLE_NOACCENT?: string;
  EXECUTIVE_PRODUCER?: string;
  HOST_CAST?: string;
  DIRECTOR?: string;
  SUMMARY?: string;
  DESCRIPTION?: string;
  FORMAT_TITLE?: string;
  GENRE_TITLE?: string;
  SUBGENRE_TITLE?: string;
  PRODUCERS_NAMES?: string;
}

/**
 * Modèle représentant un Launch Nota
 */
export interface Launch {
  ID: number;
  LOCAL_TITLE?: string;
  TRANSLATED_TITLE?: string;
  ID_CHANNEL?: number;
  LAUNCH_DATE?: string;
  FIRST_BROADCAST_DURATION?: number;
  NUMBER_OF_EPISODES?: number;
  TYPICAL_DURATION?: number;
  ID_PROGRAMME?: number;
  ID_PUBLICATION_STATUS?: number;
}

/**
 * Modèle représentant un Broadcast MyETV
 */
export interface Broadcast {
  ID_BROADCAST: number;
  BROADCAST_DATE?: string;
  BEGIN_TIME?: number;
  DURATION?: number;
  ID_REGION?: number;
  ID_CHANNEL?: number;
  RAT_PERCENTAGE?: number;
  TVR_PERCENTAGE?: number;
  RCH_PERCENTAGE?: number;
  SHR_PERCENTAGE?: number;
}

/**
 * Modèle pour les données Simply
 */
export interface SimplyData {
  programmes: SimplyProgramme[];
  broadcasts: SimplyBroadcast[];
}

export interface SimplyProgramme {
  ID: number;
  ID_SIMPLY?: string;
  ID_IMDB?: string;
  ID_TMDB?: string;
  TITLE?: string;
  EPISODE_TITLE?: string;
  CATEGORY?: string;
  GENRE_1_NAME?: string;
  GENRE_2_NAME?: string;
  RELEASE_YEAR?: number;
  PRODUCTION_COUNTRIES?: string;
  PRODUCTION_COMPANY?: string;
  CREDITS?: string;
  DESCRIPTION?: string;
}

export interface SimplyBroadcast {
  ID: number;
  ID_SIMPLY?: number;
  BROADCAST_TITLE?: string;
  START_TIME?: string;
  END_TIME?: string;
  DURATION?: number;
  DURATION_SIMPLY?: string;
  ACCURATE_START_TIME?: string;
  ACCURATE_END_TIME?: string;
  CHANNEL_NAME?: string;
  CHANNEL_COUNTRY?: string;
  CHANNEL_NAME_MYETV?: string;
}

/**
 * Réponse de l'API pour la recherche
 */
export interface SearchResponse {
  query: string;
  count: number;
  results: Array<{
    programme: Programme;
    launches: Launch[];
    simplyDataStatus?: string; // "Linked" or "Not Linked"
  }>;
}

/**
 * Réponse de l'API pour les détails d'un programme
 */
export interface ProgrammeDetailsResponse {
  programme: Programme;
  launches: Launch[];
  availableCountries: string[];
  simply: SimplyData | null;
}

/**
 * Réponse de l'API pour les broadcasts d'un pays
 */
export interface BroadcastsByCountryResponse {
  programmeId: number;
  country: string;
  count: number;
  broadcasts: Broadcast[];
}

