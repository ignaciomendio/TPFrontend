import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  usuario={
    email:'',
    password:''
  }

  ingresar(){
    console.log(this.usuario);
    this.authService.login(this.usuario.email, this.usuario.password).then((res) => {
            console.log("Se Logeo: ",res);
            if (res) {
              this.router.navigate(["portfolio"]);
            } else {
              window.alert("Usuario no valido");
            }
    });
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]],
    })

  }

  ngOnInit(): void {
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  


}
