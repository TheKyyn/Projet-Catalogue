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
  // Program data
  programme: Programme | null = null;
  launches: Launch[] = [];
  availableCountries: string[] = [];
  simply: SimplyData | null = null;

  // Selected country and its broadcasts
  selectedCountry: string | null = null;
  countryBroadcasts: Broadcast[] = [];
  loadingBroadcasts: boolean = false;

  // States
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catalogueService: CatalogueService
  ) {}

  ngOnInit(): void {
    // Get program ID from URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadProgrammeDetails(+id);
    } else {
      this.error = 'Missing program ID';
      this.loading = false;
    }
  }

  /**
   * Loads program details
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
        console.error('Error loading program:', err);
        this.error = 'Unable to load program details';
        this.loading = false;
      },
    });
  }

  /**
   * Loads broadcasts for a country when clicked
   */
  loadCountryBroadcasts(country: string): void {
    if (!this.programme) return;

    // If clicking on the same country, close it
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
          console.error('Error loading broadcasts:', err);
          this.loadingBroadcasts = false;
        },
      });
  }

  /**
   * Formats Oracle date to readable format
   */
  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  /**
   * Formats time number (e.g. 203000 -> 20:30:00)
   */
  formatTime(time: number | undefined): string {
    if (!time) return 'N/A';
    const timeStr = time.toString().padStart(6, '0');
    return `${timeStr.substring(0, 2)}:${timeStr.substring(2, 4)}:${timeStr.substring(4, 6)}`;
  }

  /**
   * Converts ISO date to time number (e.g. "2024-01-01T20:30:00" -> 203000)
   */
  convertDateToTime(dateString: string | undefined): number {
    if (!dateString) return 0;
    const date = new Date(dateString);
    return date.getHours() * 10000 + date.getMinutes() * 100;
  }

  /**
   * Returns to search
   */
  goBack(): void {
    this.router.navigate(['/']);
  }
}

