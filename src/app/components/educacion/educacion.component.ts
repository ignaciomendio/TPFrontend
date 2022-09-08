import { Component, OnInit } from '@angular/core';
import { Educacion } from '../../Models/Educacion';
import { PortafolioservicesService } from '../../services/portafolioservices.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educaciones:Educacion[];
  educacion: Educacion = new Educacion;
  formEducacion: FormGroup;
  nuevo: boolean = false;

  constructor(private formBuilder: FormBuilder, private portServ: PortafolioservicesService) {
    this.formEducacion = formBuilder.group({
      institucion:'',
      titulo:'',
      imagen:'',      
      inicio:'',
      fin:'',
      completada:false,
      porcentaje:0 
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
    this.portServ.getEducacionData().subscribe({
      next: (response)=> this.educaciones = response,
      error: (err)=> console.log("Error: " + err)
    });
  }

  edit(ed: Educacion){
    this.nuevo = false;
    this.educacion= {...ed};
    this.openEditPopup();
  }

  addEducacion(){
    this.nuevo = true;
    this.educacion = new Educacion;
    this.openEditPopup();
  }

  eliminar(ed: Educacion){
    if (confirm("Estás seguro de eliminar? id:" + ed.id )){
      this.portServ.deleteEducacionData(ed.id).subscribe({
        next: (response) => this.educaciones=this.educaciones.filter(e => e != ed),
        error: (err) => console.log(err)
        });
    }
  }

  actualizar(){
    this.educacion.completada = this.educacion.porcentaje == 100;
    this.portServ.editEducacionData(this.educacion.id, this.educacion).subscribe({
      next: (response)=>{
          this.educaciones[this.findinArray(this.educacion.id)]=this.educacion;
          this.closeEditPopup();},
      error: (err) => {
        console.log("Error: " + err);
        this.closeEditPopup();}
    });
  }

  agregar(){
    this.educacion.completada = this.educacion.porcentaje == 100;
    this.portServ.addEducacionData(this.educacion).subscribe({
      next: (response)=> {
        this.obtener();
        console.log(this.educaciones.length);
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
    this.educaciones.forEach((element, index)=>{
      if (element.id == id) indice = index;});
    return indice;
  }

}
