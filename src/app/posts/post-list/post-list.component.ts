import { Component } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  posts = [
    {
      title: 'First Post',
      content: 'First Post Content',
    },
    {
      title: 'Second Post',
      content: 'Second Post Content',
    },
    {
      title: 'Third Post',
      content: 'Third Post Content',
    },
  ];
}
