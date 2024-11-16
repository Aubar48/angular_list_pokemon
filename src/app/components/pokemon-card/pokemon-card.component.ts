import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pokemon-card">
      <img [src]="pokemon.sprites.front_default" [alt]="pokemon.name" class="pokemon-image">
      <h3 class="pokemon-name">{{ pokemon.name | titlecase }}</h3>
      <div class="types">
        <span *ngFor="let type of pokemon.types" 
              [class]="'type ' + type.type.name">
          {{ type.type.name }}
        </span>
      </div>
      <div class="stats">
        <div *ngFor="let stat of pokemon.stats" class="stat-row">
          <span class="stat-name">{{ stat.stat.name | titlecase }}:</span>
          <span class="stat-value">{{ stat.base_stat }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pokemon-card {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 1rem;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .pokemon-card:hover {
      transform: translateY(-5px);
    }

    .pokemon-image {
      width: 120px;
      height: 120px;
      margin: 0 auto;
      display: block;
    }

    .pokemon-name {
      text-align: center;
      margin: 0.5rem 0;
      color: #2c3e50;
      font-size: 1.25rem;
    }

    .types {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin: 0.5rem 0;
    }

    .type {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      color: white;
      font-size: 0.875rem;
      text-transform: capitalize;
    }

    .stats {
      margin-top: 1rem;
      font-size: 0.875rem;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      margin: 0.25rem 0;
      padding: 0.25rem 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .stat-name {
      color: #666;
    }

    .stat-value {
      font-weight: bold;
      color: #2c3e50;
    }

    /* Pokemon type colors */
    .normal { background-color: #A8A878; }
    .fire { background-color: #F08030; }
    .water { background-color: #6890F0; }
    .electric { background-color: #F8D030; }
    .grass { background-color: #78C850; }
    .ice { background-color: #98D8D8; }
    .fighting { background-color: #C03028; }
    .poison { background-color: #A040A0; }
    .ground { background-color: #E0C068; }
    .flying { background-color: #A890F0; }
    .psychic { background-color: #F85888; }
    .bug { background-color: #A8B820; }
    .rock { background-color: #B8A038; }
    .ghost { background-color: #705898; }
    .dragon { background-color: #7038F8; }
    .dark { background-color: #705848; }
    .steel { background-color: #B8B8D0; }
    .fairy { background-color: #EE99AC; }
  `]
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
}