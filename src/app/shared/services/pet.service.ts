// post.service.ts
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { ModalService } from './modal.service';
import { catchError, Observable, of } from 'rxjs';
import { Pet } from '../../../data/pets';

@Injectable({ providedIn: 'root' })
export class PetService extends ModalService {
  private apiUrl = 'https://pets-react-query-backend.eapi.joincoded.com/pets';

  // ✅ No need to inject HttpClient here — it's handled by BaseService via inject()
  // constructor(_http: HttpClient) {
  //   super(_http);
  // }

  getPets(): Observable<Pet[]> {
    return this.get<Pet[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching posts:', error); // Log the error for debugging
        return of([]); // Return an empty array to prevent the app from breaking in case of an error
      })
    );
  }

  getPetById(id: number): Observable<Pet> {
    return this.get<Pet>(this.apiUrl + `/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching posts:', error); // Log the error for debugging
        return of(); // Return an empty array to prevent the app from breaking in case of an error
      })
    );
  }
}
