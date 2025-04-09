import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Pet } from '../../../data/pets';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pet-card.component.html',
  styleUrl: './pet-card.component.css'
})
export class PetCardComponent {
  @Input() pet!: Pet;
}
