import { Component, OnInit } from '@angular/core';
import { PortafolioservicesService } from '../../services/portafolioservices.service';
import { Persona } from '../../Models/Persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

    persona!: Persona;

    formPersona: FormGroup;

    constructor(private formBuilder: FormBuilder, private portServ: PortafolioservicesService) { 
      this.formPersona = formBuilder.group({
        nombres:'',
        apellido:'',
        titulo:'',      
        email:'',
        telfono:'',
        domicilio:'',
        pais:'',
        sobremi:'',
        linkfoto:''   
      });
    }

  ngOnInit(): void {
    this.portServ.getPersonaData().subscribe((response) => 
      this.persona = response[0]);
   }

   displayStyle = "none";

   openEditPopup() {
    this.displayStyle = "block";
  }
  closeEditPopup() {
    this.displayStyle = "none";
  }

  Actualizar(){
    console.log("actualizando....");
    this.portServ.editPersonaData(this.persona.id, this.persona).subscribe((response)=>this.displayStyle = "none");
  }

}


