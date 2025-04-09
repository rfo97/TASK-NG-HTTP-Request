import {
  ApplicationRef,
  Injectable,
  Type,
  createComponent,
  EnvironmentInjector,
  ComponentRef,
  ViewContainerRef
} from '@angular/core';
import { ModalHostComponent } from '../components/modal-host/modal-host.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private hostRef?: ComponentRef<ModalHostComponent>;
  private containerRef?: ViewContainerRef;

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
}
