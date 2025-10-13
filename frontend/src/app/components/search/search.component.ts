import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogueService } from '../../services/catalogue.service';
import { Programme, Launch } from '../../models/programme.model';

/**
 * Réponse de l'API pour la recherche
 */
export interface SearchResponse {
  query: string;
  count: number;
  results: Array<{
    programme: Programme;
    launches: Launch[];
    hasSimplyData?: boolean;
  }>;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  // Search term
  searchTerm: string = '';

  // Search results
  results: Array<{
    programme: Programme;
    launches: Launch[];
    simplyDataStatus?: string;
  }> = [];

  // Application state
  loading: boolean = false;
  searched: boolean = false;
  error: string | null = null;

  constructor(
    private catalogueService: CatalogueService,
    private router: Router
  ) {}

  /**
   * Performs program search with limit of 20 results
   */
  search(): void {
    // Validation
    if (!this.searchTerm || this.searchTerm.trim().length < 2) {
      this.error = 'Please enter at least 2 characters';
      return;
    }

    this.loading = true;
    this.searched = true;
    this.error = null;

    // API call
    this.catalogueService.searchProgrammes(this.searchTerm).subscribe({
      next: (response) => {
        // Limit to 20 results
        this.results = response.results.slice(0, 20);
        console.log('Search results:', this.results);
        this.loading = false;
      },
      error: (err) => {
        console.error('Search error:', err);
        this.error = 'An error occurred during the search';
        this.loading = false;
      },
    });
  }

  /**
   * Navigates to program details page
   */
  viewProgramme(programmeId: number): void {
    this.router.navigate(['/programme', programmeId]);
  }

  /**
   * Handles form submission (Enter key)
   */
  onSubmit(event: Event): void {
    event.preventDefault();
    this.search();
  }

  /**
   * Truncates text to specified length with ellipsis
   */
  truncateText(text: string | undefined, maxLength: number): string {
    if (!text) return '-';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  /**
   * Checks if format =/= original title
   * Returns true if =/=
   */
  isFormatDifferentFromTitle(programme: Programme): boolean {
    const format = programme.FORMAT_TITLE?.trim() || '';
    const originalTitle = programme.ORIGINAL_TITLE?.trim() || '';
    return format !== '' && originalTitle !== '' && format !== originalTitle;
  }
}

