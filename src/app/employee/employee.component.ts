import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpapiService } from '../shared/empapi.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  employeeList !: any;
  employeeForm !: FormGroup;
  editMode: boolean = false

  constructor(
    private builder: FormBuilder,
    private empapi: EmpapiService
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.builder.group({
      id: 0,
      name: '',
      city: '',
      salary: ''
    })

    this.getEmployees()
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
    this.empapi.deleteEmployee(id).subscribe({ 
      next: res => {
        this.getEmployees()
      }
    })
  }

  resetForm() {
    this.employeeForm.reset()
    this.editMode = false
  }
}
