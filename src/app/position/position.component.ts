import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PosapiService } from '../shared/posapi.service';

@Component({
  selector: 'app-position',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './position.component.html',
  styleUrl: './position.component.css'
})
export class PositionComponent {

  positionForm !: FormGroup
  positionList !: any
  editMode: boolean = false


  constructor(
    private builder: FormBuilder,
    private posapi: PosapiService
  ) { }

  ngOnInit() {
    this.positionForm = this.builder.group({
      id: 0,
      name: ['']
    })

    this.getPositons()
  }

  getPositons() {
    this.posapi.getPositions().subscribe({
      next: (data: any) => {
        this.positionList = data
      }
    })
  }

  savePosition() {
    console.log('mentés...')
    if(this.editMode) {
      this.updatePosition(this.positionForm.value)
    } else {
      this.addPosition()
    }
  }

  addPosition() {
    console.log('Hozzáadás...')
    this.posapi.addPosition(this.positionForm.value).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getPositons()
      }
    })
  }

  editPosition(emp: any) {
    this.editMode = true
    this.positionForm.patchValue({
      id: emp.id,
      name: emp.name
    })
  }
  updatePosition(data: any) {
    this.posapi.updatePosition(data).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getPositons()
      }
    })
  }
  deletePosition(id: any) {
    this.posapi.deletePosition(id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getPositons()
      }
    })
  }
  resetForm() {
    this.positionForm.reset()
    this.editMode = false
  }  

}
