import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categories: any[] = [];
  @Input() showSidebar: boolean = false;
  @Output() showSidebarEvent = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    const url = 'http://localhost:5298/api/Category';
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.categories = data;
        console.log('Received categories:', this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  toggleSidebar() {
    this.showSidebarEvent.emit();
  }
}
