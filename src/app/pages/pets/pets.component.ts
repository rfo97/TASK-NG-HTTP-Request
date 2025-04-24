import { Component, effect, Inject, inject, signal } from '@angular/core';
import { PetsHeaderComponent } from '../../components/pets-header/pets-header.component';
import { PetsListComponent } from '../../components/pets-list/pets-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PetService } from '../../shared/services/pet.service';
import { Pet } from '../../../data/pets';
// import { pets } from '../../../data/pets';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [PetsHeaderComponent, PetsListComponent, HttpClientModule],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css',
})
export class PetsComponent {
  query = '';
  private petService = inject(PetService);
  allPets = signal<Pet[]>([]);

  setQuery(query: string) {
    this.query = query;
  }

  constructor(private http: HttpClient) {
    effect(() => {
      this.petService.getPets().subscribe((response: Pet[]) => {
        console.log(response); // log the response
        this.allPets.set(response); // ✅ Update signal
      });
    });
  }

  get filteredPets() {
    return this.allPets().filter((pet: { name: string }) =>
      pet.name.toLowerCase().includes(this.query.toLowerCase())
    );
  }
}
