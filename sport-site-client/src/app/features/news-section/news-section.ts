import { Component, OnInit } from '@angular/core';
import { NewsService, NewsArticle } from '../../core/services/news-service/news.service';
import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-news',
//   imports: [CommonModule],
//   templateUrl: './news-component.html',
//   styleUrls: ['./news-component.css']
// })
// export class NewsComponent implements OnInit {
//   news: NewsArticle[] = [];
//   loading = true;
//   errorMessage = '';

//   currentPage = 1;
//   pageSize = 5;
//   totalPages = 0;

//   constructor(private newsService: NewsService) {}

//   ngOnInit(): void {
//     this.newsService.fetchCrossfitNews().subscribe({
//       next: (data: NewsArticle[]) => {
//         this.news = data;
//         console.log(this.news)
//         this.loading = false;
//       },
//       error: (err: any) => {
//         this.errorMessage = 'Failed to load news';
//         console.error('News load error:', err);
//         this.loading = false;
//       }
//     });
//   }
// }

@Component({
  selector: 'news-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-section.html',
  styleUrls: ['./news-section.css'],
})

export class NewsSection implements OnInit {
  news: NewsArticle[] = [];
  displayedNews: NewsArticle[] = [];
  loading = true;
  errorMessage = '';
  currentPage = 1;
  pageSize = 5; // Show 5 items per page
  totalPages = 1;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.fetchCrossfitNews().subscribe({
      next: (data) => {
        this.news = data;
        this.totalPages = Math.ceil(this.news.length / this.pageSize);
        this.updateDisplayedNews();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load news.';
        this.loading = false;
      }
    });
  }

  updateDisplayedNews(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedNews = this.news.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updateDisplayedNews();
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }
}
