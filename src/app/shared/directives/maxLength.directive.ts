import { Directive, HostListener, Input, ElementRef } from '@angular/core'
import { NgControl } from '@angular/forms'
@Directive({
  selector: '[appMaxLength]',
})
export class MaxLengthDirective {
  @Input()
  appMaxLength!: number
  constructor(private element: ElementRef, public model: NgControl) {}
  @HostListener('input', ['$event'])
  onEvent() {
    let value: string = this.element.nativeElement.value
    let newVal: any
    if (!value) {
      newVal = undefined
    } else if (value.length > this.appMaxLength) {
      value = value.slice(0, this.appMaxLength - value.length)
    }
    newVal = value
    this.model?.control?.setValue(newVal)
  }
}