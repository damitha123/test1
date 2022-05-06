import {Directive, OnDestroy, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[cdkDetailRow]'
})
export class CdkDetailRowDirective implements OnDestroy {
  private row: any;
  private tRef: TemplateRef<any>|any;
  private opened: boolean=true;

  @HostBinding('class.expanded')
  get expanded(): boolean {
    return this.opened;
  }

  @Input()
  set cdkDetailRow(value: any) {
    if (value !== this.row) {
      this.row = value;
      // this.render();
    }
  }

  @Input('cdkDetailRowTpl')
  set template(value: TemplateRef<any>) {
    if (value !== this.tRef) {
      this.tRef = value;
    }
  }

  @Output() toggleChange = new EventEmitter<CdkDetailRowDirective|any>();

  constructor(public vcRef: ViewContainerRef) { }

  @HostListener('click')
  onClick(): void {
    alert('HostListener');
    this.toggle();
  }

  toggle(): void {
    if (this.opened) {
      this.vcRef.clear();
    } else {
      this.render();
    }
    this.opened = this.vcRef.length > 0;
    this.toggleChange.emit(this);
  }

  private render(): void {
    this.vcRef.clear();
    if (this.tRef && this.row) {
      this.vcRef.createEmbeddedView(this.tRef, { $implicit: this.row });
    }
  }

  ngOnDestroy(): void {
    console.log(this.row, 'Inside onDestroy');
    this.row.close = false;
  }
}
