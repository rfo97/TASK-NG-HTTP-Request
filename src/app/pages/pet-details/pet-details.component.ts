import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet, pets } from '../../../data/pets';
import { PetService } from '../../shared/services/pet.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css',
})
export class PetDetailsComponent {
  pet = signal<Pet | undefined>(undefined);

  private petService = inject(PetService);
  pets = signal<Pet[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    effect(() => {
      this.petService.getPetById(id).subscribe((response: Pet) => {
        console.log(response); // log the response
        this.pet.set(response); // ✅ Update signal
      });
    });

    // if (!foundPet) {
    //   this.router.navigate(['/pets']);
    // } else {
    //   this.pet = foundPet;
    // }
  }
}
