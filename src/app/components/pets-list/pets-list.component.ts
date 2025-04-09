import { Component, Input } from '@angular/core';
import { Pet } from '../../../data/pets';
import { PetCardComponent } from '../pet-card/pet-card.component';

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [PetCardComponent],
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.css'
})
export class PetsListComponent {
  @Input() pets: Pet[] = [];
}
