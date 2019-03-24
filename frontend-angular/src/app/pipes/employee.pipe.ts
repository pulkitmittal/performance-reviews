import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'index';

@Pipe({
  name: 'employee'
})
export class EmployeePipe implements PipeTransform {

  transform(empId: number, employees: Employee[], key: keyof Employee): any {
    // console.log('transform:', empId, employees, key);
    return ((employees || []).find(e => e.id === empId) || {})[key];
  }

}
