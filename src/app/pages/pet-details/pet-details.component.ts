import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet, pets } from '../../../data/pets';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css'
})
export class PetDetailsComponent {
  pet: Pet | null = null;
  pets = pets;

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const foundPet = pets.find((p) => p.id === id);

    if (!foundPet) {
      this.router.navigate(['/pets']);
    } else {
      this.pet = foundPet;
    }
  }
}
