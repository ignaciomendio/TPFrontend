import { Component, OnInit } from '@angular/core';
import { Experiencia } from '../../Models/Experiencia';
import { PortafolioservicesService } from '../../services/portafolioservices.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experiencias:Experiencia[];
  experiencia: Experiencia = new Experiencia;
  formExperiencia: FormGroup;
  nuevo: boolean = false;

  constructor(private formBuilder: FormBuilder, private portServ: PortafolioservicesService) { 
    this.formExperiencia = formBuilder.group({
      empleador:'',
      funcion:'',
      descrpcion:'',      
      inicio:'',
      fin:'',
      actual:false,
      imagen:'' 
    });
  }

  displayStyle = "none";

  openEditPopup() {
    this.displayStyle = "block";
  }
  closeEditPopup() {
    this.displayStyle = "none";
  }

  ngOnInit(): void {
    this.obtener();
  }

  obtener(){
    this.portServ.getExperienciaData().subscribe((response)=>{
      this.experiencias = response;
      console.log("Experiencia Obtenida: " + this.experiencias[0].empleador);
    });
  }

  edit(exp: Experiencia){
    this.nuevo = false;
    this.experiencia= {...exp};
    this.openEditPopup();
  }

  addExperiencia(){
    this.nuevo = true;
    this.experiencia = new Experiencia;
    this.openEditPopup();
  }

  eliminar(exp: Experiencia){
    if (confirm("Estás seguro de eliminar?")){
      this.portServ.deleteExperienciaData(exp.id).subscribe({
        next: (response) => this.experiencias=this.experiencias.filter(e => e != exp),
        error: (err) => console.log(err)
        });
    }

  }

  actualizar(){
    this.portServ.editExperienciaData(this.experiencia.id, this.experiencia).subscribe((response)=>{
        this.experiencias[this.findinArray(this.experiencia.id)]=this.experiencia;
        this.closeEditPopup();
    });
  }

  agregar(){
    this.portServ.addExperienciaData(this.experiencia).subscribe({
      next: (response)=> {
        this.obtener();
        console.log(this.experiencias.length);
        this.closeEditPopup();
      },
      error: (err) => {
        console.log("Error: " + err);
        this.closeEditPopup();
      }
    });
  }

  findinArray(id:number): number{
    let indice:number = -1;
    this.experiencias.forEach((element, index)=>{
      if (element.id == id) indice = index;});
    return indice;
  }

}
