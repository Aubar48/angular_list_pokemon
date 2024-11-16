import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from './services/pokemon.service';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { forkJoin } from 'rxjs';
import { Pokemon } from './interfaces/pokemon.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, PokemonCardComponent],
  template: `
    <div class="container">
      <h1>Pokemon Gallery</h1>
      
      <div class="pagination">
        <button
          (click)="loadPrevious()"
          [disabled]="currentOffset === 0">
          Previous
        </button>
        <span class="page-info">
          Showing {{ currentOffset + 1 }}-{{ currentOffset + pokemonList.length }}
        </span>
        <button
          (click)="loadNext()"
          [disabled]="!hasMore">
          Next
        </button>
      </div>

      <div class="loading" *ngIf="loading">
        <div class="spinner"></div>
        <p>Loading Pokemon...</p>
      </div>
      
      <div class="pokemon-grid" *ngIf="!loading">
        <app-pokemon-card
          *ngFor="let pokemon of pokemonList"
          [pokemon]="pokemon">
        </app-pokemon-card>
      </div>
      
      <div class="pagination">
        <button
          (click)="loadPrevious()"
          [disabled]="currentOffset === 0">
          Previous
        </button>
        <span class="page-info">
          Showing {{ currentOffset + 1 }}-{{ currentOffset + pokemonList.length }}
        </span>
        <button
          (click)="loadNext()"
          [disabled]="!hasMore">
          Next
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }

    h1 {
      text-align: center;
      color: #2c3e50;
      margin: 2rem 0;
      font-size: 2.5rem;
    }

    .pokemon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
      padding: 1rem;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin: 2rem 0;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      background-color: #3498db;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s;
    }

    button:hover:not(:disabled) {
      background-color: #2980b9;
    }

    button:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }

    .page-info {
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .loading {
      text-align: center;
      padding: 2rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid #f3f3f3;
      border-top: 5px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class AppComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  currentOffset = 0;
  limit = 100;
  loading = true;
  hasMore = true;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.loading = true;
    this.pokemonService.getPokemonList(this.currentOffset, this.limit)
      .subscribe(response => {
        const detailRequests = response.results.map(pokemon =>
          this.pokemonService.getPokemonDetails(pokemon.url)
        );

        forkJoin(detailRequests).subscribe(pokemonDetails => {
          this.pokemonList = pokemonDetails;
          this.loading = false;
          this.hasMore = !!response.next;
        });
      });
  }

  loadNext() {
    this.currentOffset += this.limit;
    this.loadPokemon();
  }

  loadPrevious() {
    this.currentOffset = Math.max(0, this.currentOffset - this.limit);
    this.loadPokemon();
  }
}