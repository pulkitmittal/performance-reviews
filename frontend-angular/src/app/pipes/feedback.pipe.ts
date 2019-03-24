import { Pipe, PipeTransform } from '@angular/core';
import { Feedback } from 'index';

@Pipe({
  name: 'feedback'
})
export class FeedbackPipe implements PipeTransform {

  transform(feedback: Feedback, key: keyof Feedback, need: 'icon' | 'title'): any {
    if (key === 'status') {
      switch (feedback.status) {
        case 'assigned':
          return need === 'icon' ? 'input' : 'Assigned';
        case 'in-progress':
          return need === 'icon' ? 'hourglass_empty' : 'In Progress';
        case 'done':
          return need === 'icon' ? 'assignment_turned_in' : 'Completed';
      }
    }
    return null;
  }

}
