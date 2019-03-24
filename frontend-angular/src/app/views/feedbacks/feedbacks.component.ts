import { Component, OnInit } from '@angular/core';
import { Feedback, FeedbackResponse } from 'index';
import { ApiService, FeedbackQuestions } from 'src/app/services/api.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {

  feedbackRequests: FeedbackResponse[];
  loadError = '';

  errorMsg = '';
  saving = false;
  feedbackData: Pick<Feedback, 'id' | 'status'> & {
    response: FeedbackQuestions,
    mode: 'edit' | 'view'
  };

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.loadFeedbackRequests();
  }

  loadFeedbackRequests() {
    this.api.fetchFeedbackRequests()
      .then(data => this.feedbackRequests = data)
      .catch(err => {
        console.log('Error:', err);
        this.feedbackRequests = [];
        this.loadError = 'Error while fetching feedback requests';
      });
  }

  openFeedbackModal(item: FeedbackResponse) {
    console.log('Open modal:', item);
    this.feedbackData = {
      id: item.id,
      status: item.status,
      response: {
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        ...<FeedbackQuestions> Object.assign({}, item.response)
      },
      mode: item.status === 'done' ? 'view' : 'edit'
    };
  }

  closeFeedbackModal() {
    this.feedbackData = null;
  }

  setResponse(key: keyof FeedbackQuestions, value: string) {
    console.log('setResponse:', key, value);
    this.feedbackData.response[key] = value;
  }

  saveDraft() {
    console.log('Saving draft:', this.feedbackData);
    this.feedbackData.status = 'in-progress';
    this.save();
  }

  saveFeedback(feedback: Feedback) {
    console.log('Saving feedback:', this.feedbackData);
    this.feedbackData.status = 'done';
    this.save();
  }

  private save() {
    if (this.feedbackData) {
      this.saving = false;
      this.api.saveFeedback(this.feedbackData.id, {
        status: this.feedbackData.status,
        response: JSON.stringify(this.feedbackData.response)
      })
        .then(() => {
          this.feedbackData = null;
          this.saving = false;
          this.loadFeedbackRequests();
        }).catch(err => {
          console.log('Error:', err);
          this.errorMsg = err && err.error || '';
          this.saving = false;
        });
    }
  }

}
