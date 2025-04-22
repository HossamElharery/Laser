import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.scss'
})
export class SingleBlogComponent {
  // Date of the blog post
  blogDate: string = 'Jun 12, 2024';

  // Author of the blog post
  blogAuthor: string = 'Admin';
}
