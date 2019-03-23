import { Component, OnInit } from '@angular/core';
import { Employee } from 'index';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  editEmpData: Employee & {
    mode: 'edit' | 'add'
  } = null;
  delEmpData: Employee;
  errorMsg = '';
  saving = false;

  perPage = 10;
  paging: {
    start: number,
    end: number,
    total: number,
    numbers: number[],
    current: number
  };

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.api.fetchEmployees()
      .then(data => {
        this.employees = data;

        const noOfPages = Math.ceil(this.employees.length / this.perPage);
        const numbers = new Array(noOfPages).fill('').map((x, i) => i + 1);
        this.paging = {
          start: 0,
          end: this.perPage,
          total: this.employees.length,
          numbers,
          current: 1
        };
      })
      .catch(err => {
        console.log('Error:', err);
        this.employees = [];
      });
  }

  showAddEmpModal() {
    this.editEmpData = {
      id: null,
      name: '',
      post: '',
      department: '',
      location: '',
      mode: 'add'
    };
  }

  showEditEmpModal(emp: Employee) {
    this.editEmpData = {
      ...emp,
      mode: 'edit'
    };
  }

  updateEmpData(key: keyof Employee, value: string) {
    if (key !== 'id') {
      this.editEmpData[key] = value;
    }
  }

  saveEmp() {
    console.log('Saving employee:', this.editEmpData);
    let request: Promise<any>;
    if (this.editEmpData.mode === 'add') {
      // TODO make add ajax call
      request = this.api.addEmployee(this.editEmpData);
    } else if (this.editEmpData.mode === 'edit') {
      // TODO make edit ajax call
      request = this.api.editEmployee(this.editEmpData);
    }
    if (request) {
      this.saving = true;
      request.then(() => {
        this.editEmpData = null;
        this.saving = false;
        this.loadEmployees();
      }).catch(err => {
        console.log('Error:', err);
        this.errorMsg = err && err.error || '';
        this.saving = false;
      });
    }
  }

  closeEmpModal() {
    this.editEmpData = null;
    this.delEmpData = null;
  }

  showDelEmpModal(emp: Employee) {
    this.delEmpData = emp;
  }

  delEmp() {
    console.log('Deleting employee:', this.delEmpData);
    this.saving = true;
    this.api.deleteEmployee(this.delEmpData)
      .then(() => {
        this.delEmpData = null;
        this.saving = false;
        this.loadEmployees();
      }).catch(err => {
        console.log('Error:', err);
        this.errorMsg = err && err.error || '';
        this.saving = false;
      });
  }

  setPage(page: number) {
    const pageIndex = Math.max(page - 1, 0);
    this.paging = {
      ...this.paging,
      start: pageIndex * this.perPage,
      end: (pageIndex + 1) * this.perPage,
      current: pageIndex + 1
    };
  }

}
