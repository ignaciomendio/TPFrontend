import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../Models/Proyecto';
import { PortafolioservicesService } from '../../services/portafolioservices.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos:Proyecto[];
  proyecto: Proyecto = new Proyecto;
  formProyecto: FormGroup;
  nuevo: boolean = false;

  constructor(private formBuilder: FormBuilder, private portServ: PortafolioservicesService) { 
    this.formProyecto = formBuilder.group({
      nombre:'',
      descripcion:'',
      projectLink:'',      
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
    this.portServ.getProyectoData().subscribe((response)=>{
      this.proyectos = response;
      console.log("Proyectos Obtenidos");
    });
  }

  edit(pr: Proyecto){
    this.nuevo = false;
    this.proyecto= {...pr};
    this.openEditPopup();
  }

  addProyecto(){
    this.nuevo = true;
    this.proyecto = new Proyecto;
    this.openEditPopup();
  }

  eliminar(pr: Proyecto){
    if (confirm("Estás seguro de eliminar?")){
      this.portServ.deleteProyectoData(pr.id).subscribe({
        next: (response) => this.proyectos=this.proyectos.filter(e => e != pr),
        error: (err) => console.log(err)
        });
    }
  }

  actualizar(){
    this.portServ.editProyectoData(this.proyecto.id, this.proyecto).subscribe((response)=>{
        this.proyectos[this.findinArray(this.proyecto.id)]=this.proyecto;
        this.closeEditPopup();
    });
  }

  agregar(){
    this.portServ.addProyectoData(this.proyecto).subscribe({
      next: (response)=> {
        this.obtener();
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
    this.proyectos.forEach((element, index)=>{
      if (element.id == id) indice = index;});
    return indice;
  }

}
