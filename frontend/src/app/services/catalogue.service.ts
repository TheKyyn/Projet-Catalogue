import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SearchResponse,
  ProgrammeDetailsResponse,
  BroadcastsByCountryResponse,
} from '../models/programme.model';

/**
 * Service pour gérer les appels API vers le backend NestJS
 */
@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  // URL de base de l'API backend
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /**
   * Recherche des programmes par titre
   * @param title - Titre à rechercher (partiel)
   * @returns Observable avec les résultats de recherche
   */
  searchProgrammes(title: string): Observable<SearchResponse> {
    const params = new HttpParams().set('title', title);
    return this.http.get<SearchResponse>(`${this.apiUrl}/catalogue/search`, {
      params,
    });
  }

  /**
   * Récupère les détails complets d'un programme
   * @param id - ID du programme
   * @returns Observable avec les détails du programme
   */
  getProgrammeDetails(id: number): Observable<ProgrammeDetailsResponse> {
    return this.http.get<ProgrammeDetailsResponse>(
      `${this.apiUrl}/catalogue/programme/${id}`
    );
  }

  /**
   * Récupère les broadcasts d'un pays spécifique pour un programme
   * @param programmeId - ID du programme
   * @param country - Nom du pays
   * @returns Observable avec les broadcasts du pays
   */
  getBroadcastsByCountry(
    programmeId: number,
    country: string
  ): Observable<BroadcastsByCountryResponse> {
    const params = new HttpParams().set('country', country);
    return this.http.get<BroadcastsByCountryResponse>(
      `${this.apiUrl}/catalogue/programme/${programmeId}/broadcasts`,
      { params }
    );
  }
}

