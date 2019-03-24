/* tslint:disable */

/**
 * AUTO-GENERATED FILE @ 2019-03-24 06:25:07 - DO NOT EDIT!
 *
 * This file was automatically generated by schemats v.3.0.3
 * $ schemats generate -c postgres://username:password@isilo.db.elephantsql.com:5432/qwjszpap -t users -t employees -t performance_reviews -t feedback -s public
 *
 */

export type feedback_status = 'assigned' | 'done' | 'in-progress';
export type user_role = 'admin' | 'employee';

export namespace usersFields {
    export type id = number;
    export type emp_id = number | null;
    export type username = string | null;
    export type password = string | null;
    export type role = user_role | null;

}

export interface users {
    id: usersFields.id;
    emp_id: usersFields.emp_id;
    username: usersFields.username;
    password: usersFields.password;
    role: usersFields.role;

}

export namespace employeesFields {
    export type id = number;
    export type name = string;
    export type post = string | null;
    export type department = string | null;
    export type location = string | null;

}

export interface employees {
    id: employeesFields.id;
    name: employeesFields.name;
    post: employeesFields.post;
    department: employeesFields.department;
    location: employeesFields.location;

}

export namespace performance_reviewsFields {
    export type id = number;
    export type emp_id = number | null;
    export type due_date = Date | null;

}

export interface performance_reviews {
    id: performance_reviewsFields.id;
    emp_id: performance_reviewsFields.emp_id;
    due_date: performance_reviewsFields.due_date;

}

export namespace feedbackFields {
    export type id = number | null;
    export type reviewer_id = number | null;
    export type assigned_date = Date | null;
    export type status = feedback_status | null;
    export type response = Object | null;

}

export interface feedback {
    id: feedbackFields.id;
    reviewer_id: feedbackFields.reviewer_id;
    assigned_date: feedbackFields.assigned_date;
    status: feedbackFields.status;
    response: feedbackFields.response;

}
