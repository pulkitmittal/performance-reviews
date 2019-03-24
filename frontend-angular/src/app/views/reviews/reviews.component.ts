import { Component, OnInit } from '@angular/core';
import { AddReviewRequest, Employee, PerformanceReview, ReviewResponse } from 'index';
import { ApiService } from 'src/app/services/api.service';

import Utils from '../../../../../shared/utils';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: ReviewResponse[];
  employees: Employee[];
  loadError = '';

  editRevData: AddReviewRequest & {
    id: number,
    mode: 'edit' | 'add'
  } = null;
  delRevData: PerformanceReview;

  errorMsg = '';
  saving = false;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.loadReviews();
    this.loadEmployees();
  }

  loadReviews() {
    this.api.fetchReviews()
      .then(data => {
        this.reviews = data;
      })
      .catch(err => {
        console.log('Error:', err);
        this.reviews = [];
        this.loadError = 'Error while fetching reviews data';
      });
  }

  loadEmployees() {
    this.api.fetchEmployees()
      .then(data => {
        this.employees = data.sort((a, b) => a.name > b.name ? 1 : -1);
      })
      .catch(err => {
        console.log('Error:', err);
        this.employees = [];
      });
  }

  openAddRevModal() {
    this.editRevData = {
      id: null,
      emp_id: null,
      due_date: null,
      reviewer_ids: [],
      mode: 'add'
    };
  }

  openEditRevModal(rev: ReviewResponse) {
    this.editRevData = {
      ...Utils.pluck(rev, 'id', 'emp_id', 'due_date'),
      reviewer_ids: rev.feedbacks.map(f => f.reviewer_id),
      mode: 'edit'
    };
    console.log('this.editRevData', this.editRevData);
  }

  updateRevData(key: 'emp_id' | 'due_date' | 'reviewer_ids', value: any) {
    console.log('Updating Review:', key, value);
    if (this.editRevData) {
      if (key === 'emp_id' || key === 'due_date') {
        this.editRevData[key] = value;
      } else if (key === 'reviewer_ids') {
        const reviewers = Array.from(value.selectedOptions)
          .map((o: HTMLOptionElement) => +o.value);
        this.editRevData.reviewer_ids = reviewers;
      }
    }
    // Array.from($0.selectedOptions).map(o => o.value)
  }

  saveRev() {
    console.log('Saving Review:', this.editRevData);
    if (this.editRevData) {
      let request: Promise<any>;
      if (this.editRevData.mode === 'add') {
        request = this.api.addReview(this.editRevData);
      } else if (this.editRevData.mode === 'edit') {
        request = this.api.updateReview(this.editRevData.id, this.editRevData);
      }
      if (request) {
        this.saving = true;
        request.then(() => {
          this.editRevData = null;
          this.saving = false;
          this.loadReviews();
        }).catch(err => {
          console.log('Error:', err);
          this.errorMsg = err && err.error || '';
          this.saving = false;
        });
      }
    }
  }

  openDelRevModal(rev: ReviewResponse) {
    this.delRevData = rev;
  }

  delRev() {
    console.log('Deleting Review:', this.delRevData);
    if (this.delRevData) {
      this.saving = true;
      this.api.deleteReview(this.delRevData.id)
        .then(() => {
          this.delRevData = null;
          this.saving = false;
          this.loadReviews();
        }).catch(err => {
          console.log('Error:', err);
          this.errorMsg = err && err.error || '';
          this.saving = false;
        });
    }
  }

  closeRevModal() {
    this.editRevData = null;
    this.delRevData = null;
    this.errorMsg = '';
  }

}
