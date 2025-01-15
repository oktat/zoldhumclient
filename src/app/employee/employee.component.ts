import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpapiService } from '../shared/empapi.service';
import { PosapiService } from '../shared/posapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  employeeList !: any
  positionList !: any
  employeeForm !: FormGroup
  editMode: boolean = false

  constructor(
    private builder: FormBuilder,
    private empapi: EmpapiService,
    private posapi: PosapiService
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.builder.group({
      id: 0,
      name: '',
      city: '',
      salary: '',
      positionId: ''
    })
    this.getEmployees()
    this.getPositions()
  }

  getPositions() {
    this.posapi.getPositions().subscribe(res => {
      this.positionList = res
    })
  }

  getEmployees() {
    this.empapi.getEmployees().subscribe(res => {
      this.employeeList = res
    })
  }

  addEmployee() {
    this.empapi.addEmployee(this.employeeForm.value).subscribe({ 
      next: res => {
        this.getEmployees()
      }
    })
  }

  saveEmployee() {
    console.log('mentés...')
    if (this.editMode) {
      this.updateEmployee(this.employeeForm.value)
    } else {
      this.addEmployee()
    }
  }

  editEmployee(data: any) {
    this.employeeForm.patchValue(data)
    this.editMode = true
  }

  updateEmployee(data: any) {
    this.empapi.updateEmployee(data).subscribe({ 
      next: res => {
        this.getEmployees()
        this.editMode = false
        this.resetForm()
      }
    })
  }

  deleteEmployee(id: any) {
    this.startDelete(id)
  }

  startDelete(id: number) {
    Swal.fire({
      title: 'Biztosan tovább akarod?',
      showDenyButton: true,
      confirmButtonText: 'Igen',
      denyButtonText: `Nem`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.empapi.deleteEmployee(id).subscribe({ 
          next: res => {
            this.getEmployees()
          }
        })
      }
    })
  }

  resetForm() {
    this.employeeForm.reset()
    this.editMode = false
  }
}
