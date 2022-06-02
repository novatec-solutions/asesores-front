import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserRole } from 'src/app/shared/enumText';

@Directive({
  selector: '[appRoleStyle]'
})
export class RoleStyleDirective implements OnInit {

  constructor(private renderer: Renderer2, private elmRef: ElementRef) {}

  ngOnInit(): void {
    const role = localStorage.getItem('userRole');

    if(role === UserRole.VISUALIZER){
      this.renderer.setStyle(this.elmRef.nativeElement, 'display', 'none');
    }    
  }

}
