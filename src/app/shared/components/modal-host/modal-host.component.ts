import {
  Component,
  ViewContainerRef,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  Type,
  Injector,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-host',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #backdrop
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      (click)="onBackdropClick()"
      (keydown.esc)="close()"
      tabindex="0"
    >
      <div
        class="bg-white p-6 rounded shadow-lg z-10 border-[3px] border-black relative w-1/2 min-w-[300px] min-h-[200px]"
        (click)="$event.stopPropagation()"
      >
        <button
          type="button"
          class="absolute right-3 top-3 w-[70px] border border-black rounded-md hover:bg-red-400"
          (click)="close()"
        >
          Close
        </button>

        <div class="mt-4">
          <ng-template #container></ng-template>
        </div>
      </div>
    </div>
  `,
})
export class ModalHostComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  @ViewChild('backdrop', { static: true })
  backdropRef!: ElementRef<HTMLDivElement>;

  @Output() closed = new EventEmitter<void>();

  private injector = inject(Injector);

  ngAfterViewInit() {
    this.backdropRef.nativeElement.focus();
  }

  attachContent<T>(component: Type<T>) {
    this.container.clear();
    this.container.createComponent(component, {
      injector: this.injector,
    });
  }

  onBackdropClick() {
    this.close();
  }

  close() {
    this.closed.emit();
  }
}
