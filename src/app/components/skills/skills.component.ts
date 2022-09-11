import { Component, OnInit } from '@angular/core';
import { Skill } from '../../Models/Skill';
import { PortafolioservicesService } from '../../services/portafolioservices.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skills:Skill[];
  skill: Skill = new Skill;
  formSkills: FormGroup;

  constructor(private formBuilder: FormBuilder, private portServ: PortafolioservicesService) {
    this.formSkills = formBuilder.group({
      tecnologia:''
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
    this.portServ.getSkillData().subscribe({
      next: (response)=> this.skills = response,
      error: (err)=> console.log("Error Obteniendo Skills: " + err)
    });
  }

  addSkill(){
    this.skill.tecnologia = "";
    this.openEditPopup();
  }

  eliminar(sk: Skill){

      this.portServ.deleteSkillData(sk.id).subscribe({
        next: (response) => this.skills=this.skills.filter(e => e != sk),
        error: (err) => console.log(err)
        });
  }

  agregar(){
    this.portServ.addSkillData(this.skill).subscribe({
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
}
