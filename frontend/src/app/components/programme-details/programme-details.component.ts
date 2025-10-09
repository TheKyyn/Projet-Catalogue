import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from '../../services/catalogue.service';
import {
  Programme,
  Launch,
  SimplyData,
  Broadcast,
} from '../../models/programme.model';

@Component({
  selector: 'app-programme-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programme-details.component.html',
  styleUrls: ['./programme-details.component.css'],
})
export class ProgrammeDetailsComponent implements OnInit {
  // Données du programme
  programme: Programme | null = null;
  launches: Launch[] = [];
  availableCountries: string[] = [];
  simply: SimplyData | null = null;

  // Pays sélectionné et ses broadcasts
  selectedCountry: string | null = null;
  countryBroadcasts: Broadcast[] = [];
  loadingBroadcasts: boolean = false;

  // États
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catalogueService: CatalogueService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du programme depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadProgrammeDetails(+id);
    } else {
      this.error = 'ID du programme manquant';
      this.loading = false;
    }
  }

  /**
   * Charge les détails du programme
   */
  loadProgrammeDetails(id: number): void {
    this.loading = true;
    this.error = null;

    this.catalogueService.getProgrammeDetails(id).subscribe({
      next: (response) => {
        this.programme = response.programme;
        this.launches = response.launches;
        this.availableCountries = response.availableCountries;
        this.simply = response.simply;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du programme:', err);
        this.error = 'Impossible de charger les détails du programme';
        this.loading = false;
      },
    });
  }

  /**
   * Charge les broadcasts d'un pays quand on clique dessus
   */
  loadCountryBroadcasts(country: string): void {
    if (!this.programme) return;

    // Si on clique sur le même pays, on le ferme
    if (this.selectedCountry === country) {
      this.selectedCountry = null;
      this.countryBroadcasts = [];
      return;
    }

    this.selectedCountry = country;
    this.loadingBroadcasts = true;

    this.catalogueService
      .getBroadcastsByCountry(this.programme.ID, country)
      .subscribe({
        next: (response) => {
          this.countryBroadcasts = response.broadcasts;
          this.loadingBroadcasts = false;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des broadcasts:', err);
          this.loadingBroadcasts = false;
        },
      });
  }

  /**
   * Formate une date Oracle en format lisible
   */
  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  /**
   * Formate un nombre de type time (ex: 203000 -> 20:30:00)
   */
  formatTime(time: number | undefined): string {
    if (!time) return 'N/A';
    const timeStr = time.toString().padStart(6, '0');
    return `${timeStr.substring(0, 2)}:${timeStr.substring(2, 4)}:${timeStr.substring(4, 6)}`;
  }

  /**
   * Retour à la recherche
   */
  goBack(): void {
    this.router.navigate(['/']);
  }
}

