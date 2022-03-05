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

      const param = { 
        data:{
          usuario: this.loginForm.value.user, 
          password: this.loginForm.value.pass,
          idApp:"AMCO"
      }};

      this.loader = true;

      this.AuthService.loginUser(param).subscribe(res => {
        if(res.response == "SUCCESS"){
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('username', this.loginForm.value.user);
          this.router.navigate(['/dashboard']);
        }else{
          const dialogRef = this.dialog.open(DialogComponent, { 
            width: '250px',
            data: {text: "Usuario o contraseña incorrectos" },
          });
          dialogRef.afterClosed();
        }
        this.loader = false;
      });
    }
    
  }
}
