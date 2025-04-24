import {
  ApplicationRef,
  Injectable,
  Type,
  createComponent,
  EnvironmentInjector,
  ComponentRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ModalHostComponent } from '../components/modal-host/modal-host.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private hostRef?: ComponentRef<ModalHostComponent>;
  private containerRef?: ViewContainerRef;
  private readonly _http = inject(HttpClient);
  constructor(
    private appRef: ApplicationRef,
    private envInjector: EnvironmentInjector
  ) {}

  registerContainer(container: ViewContainerRef) {
    this.containerRef = container;
  }

  open<T>(component: Type<T>) {
    if (this.hostRef) return; // prevent multiple modals

    // Create the ModalHostComponent
    this.hostRef = createComponent(ModalHostComponent, {
      environmentInjector: this.envInjector,
    });

    // Attach to DOM
    this.appRef.attachView(this.hostRef.hostView);
    document.body.appendChild(this.hostRef.location.nativeElement);

    // Create modal content inside ModalHostComponent
    this.hostRef.instance.attachContent(component);

    // Listen to close event
    this.hostRef.instance.closed.subscribe(() => this.close());
  }

  close() {
    if (this.hostRef) {
      this.appRef.detachView(this.hostRef.hostView);
      this.hostRef.destroy();
      this.hostRef = undefined;
    }
  }

  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders) {
    return this._http.get<T>(url, { params, headers });
  }

  /**
   * Generic POST method to add new data
   */
  post<T>(url: string, body: T, headers?: HttpHeaders) {
    return this._http.post<T>(url, body, { headers });
  }

  /**
   * Generic PUT method to update data
   */
  put<T>(url: string, body: T, headers?: HttpHeaders) {
    return this._http.put<T>(url, body, { headers });
  }

  /**
   * Generic DELETE method to remove data
   */
  delete<T>(url: string, params?: HttpParams, headers?: HttpHeaders) {
    return this._http.delete<T>(url, { params, headers });
  }
}
