import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { AddPetFormComponent } from '../add-pet-form/add-pet-form.component';

@Component({
  selector: 'app-pets-header',
  standalone: true,
  imports: [],
  templateUrl: './pets-header.component.html',
  styleUrl: './pets-header.component.css'
})
export class PetsHeaderComponent {
  @Output() search = new EventEmitter<string>();
  searchQuery = '';

  private modalService = inject(ModalService);


  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.search.emit(this.searchQuery);
  }

  openModal() {
    this.modalService.open(AddPetFormComponent);
  }
}
