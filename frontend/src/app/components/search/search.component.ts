import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogueService } from '../../services/catalogue.service';
import { Programme, Launch } from '../../models/programme.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  // Terme de recherche
  searchTerm: string = '';

  // Résultats de la recherche
  results: Array<{ programme: Programme; launches: Launch[] }> = [];

  // États de l'application
  loading: boolean = false;
  searched: boolean = false;
  error: string | null = null;

  constructor(
    private catalogueService: CatalogueService,
    private router: Router
  ) {}

  /**
   * Effectue la recherche de programmes
   */
  search(): void {
    // Validation
    if (!this.searchTerm || this.searchTerm.trim().length < 2) {
      this.error = 'Veuillez entrer au moins 2 caractères';
      return;
    }

    this.loading = true;
    this.searched = true;
    this.error = null;

    // Appel API
    this.catalogueService.searchProgrammes(this.searchTerm).subscribe({
      next: (response) => {
        this.results = response.results;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la recherche:', err);
        this.error = 'Une erreur est survenue lors de la recherche';
        this.loading = false;
      },
    });
  }

  /**
   * Navigue vers la page de détails d'un programme
   */
  viewProgramme(programmeId: number): void {
    this.router.navigate(['/programme', programmeId]);
  }

  /**
   * Gère la soumission du formulaire (Enter)
   */
  onSubmit(event: Event): void {
    event.preventDefault();
    this.search();
  }
}

