import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../admin/dashboard/components/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loader: boolean = false;
  
  constructor(private router: Router,
    public fb: FormBuilder,
    private AuthService: AuthService,
    public dialog: MatDialog) {
    this.loginForm = this.fb.group({
      user: ['',Validators.required],
      pass: ['',Validators.required]
    });
  }

  ngOnInit() {}

  onLogin() {
    if(this.loginForm.valid){
      const data = this.loginForm.value;
      this.loader = true;
      this.AuthService.loginUser(data).subscribe(res => {
        if(!res.error){
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('username', res.data.name);
          this.router.navigate(['/dashboard']);
        }else{
          const dialogRef = this.dialog.open(DialogComponent, { 
            width: '250px',
            data: {text: res.mensaje},
          });
          dialogRef.afterClosed();
        }
        this.loader = false;
      });
    }
    
  }
}
