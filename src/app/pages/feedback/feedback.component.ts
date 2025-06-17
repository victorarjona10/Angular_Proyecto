import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  isDarkTheme: boolean = false;
  feedbacks: any[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.getFeedbackByUser(userId);
      } else {
        this.getAllFeedback();
      }
    });
  }
  getFeedbackByUser(userId: string) {
    this.apiService.getFeedbackByUser(userId).subscribe(
      (data) => {
        this.feedbacks = this.sortFeedbacksByStatus(data as any[]);
        console.log('Feedbacks del usuario obtenidos:', this.feedbacks);
      },
      (error) => {
        console.error('Error obteniendo feedbacks del usuario:', error);
      }
    );
  }

onStatusChange(feedback: any, event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const newStatus = selectElement.value;
  const oldStatus = feedback.status;
  feedback.status = newStatus;
  this.apiService.updateFeedbackStatus(feedback._id, newStatus).subscribe({
    next: () => {
      this.feedbacks = this.sortFeedbacksByStatus(this.feedbacks);
    },
    error: () => {
      feedback.status = oldStatus;
      alert('Error actualizando el estado');
    }
  });
}
  

    private sortFeedbacksByStatus(feedbacks: any[]): any[] {
    const order = { pending: 0, reviewed: 1, resolved: 2 };
    return feedbacks.slice().sort(
      (a, b) => (order[a.status as keyof typeof order] ?? 99) - (order[b.status as keyof typeof order] ?? 99)
    );
  }
  
  getAllFeedback() {
    this.apiService.getAllFeedback().subscribe(
      (data) => {
        this.feedbacks = this.sortFeedbacksByStatus(data);
        console.log('Feedbacks obtenidos:', data);
      },
      (error) => {
        console.error('Error obteniendo feedbacks:', error);
      }
    );
    console.log('Obtenint tots els feedbacks...');
  }
}