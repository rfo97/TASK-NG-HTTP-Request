import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../shared/services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-pet-form.component.html',
  styleUrl: './add-pet-form.component.css',
})
export class AddPetFormComponent {
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);

  petForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    image: ['', Validators.required],
    adopted: [0],
  });

  handleSubmit() {
    if (this.petForm.valid) {
      console.log('Submitted pet:', this.petForm.value);
      this.modalService.close();
    } else {
      console.log('Form is invalid');
    }
  }
}
