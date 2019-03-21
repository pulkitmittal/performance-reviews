import { Request, Response } from 'express';

import Errors from '../../shared/errors';
import { Employee } from '../../shared/models/employee.model';
import queries from './queries';

const getEmployee = (request: Request, response: Response) => {
  const id = +request.params.id;
  if (!id) {
    const { code, message } = Errors.missing('id');
    response.status(code).send(message);
    return;
  }
  queries.getEmployee(id).then(employee => {
    response.status(200).json(employee);
  });
};

const getEmployees = (request: Request, response: Response) => {
  queries.getEmployees().then(employees => {
    response.status(200).json(employees);
  });
};

const addEmployee = (request: Request, response: Response) => {
  const { name, post, department, location }: Employee = (request.body || {});
  if (!name) {
    const { code, message } = Errors.missing('name');
    response.status(code).send(message);
    return;
  }
  queries.addEmployee({ name, post, department, location })
    .then(id => {
      response.status(201).send(`Employee added with ID: ${id}`);
    });
};

const updateEmployee = (request: Request, response: Response) => {
  const id = +request.params.id;
  const { name, post, department, location }: Employee = (request.body || {});
  if (!id || !name) {
    const { code, message } = Errors.missing(!id ? 'id' : 'name');
    response.status(code).send(message);
    return;
  }
  queries.updateEmployee({ id, name, post, department, location })
    .then(rows => {
      if (rows === 1) {
        response.status(200).send(`Employee updated with ID: ${id}`);
      } else {
        response.status(200).send(`Employee not updated with ID: ${id}`);
      }
    });
};

const deleteEmployee = (request: Request, response: Response) => {
  const id = +request.params.id;
  if (!id) {
    const { code, message } = Errors.missing('id');
    response.status(code).send(message);
    return;
  }
  queries.deleteEmployee(id)
    .then(rows => {
      if (rows === 1) {
        response.status(200).send(`Employee deleted with ID: ${id}`);
      } else {
        response.status(200).send(`Employee not deleted with ID: ${id}`);
      }
    });
};

export default {
  getEmployee,
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
};
