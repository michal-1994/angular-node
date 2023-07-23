import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  userIsAuthenticated: boolean = false;
  posts: Post[] = [];
  isLoading: boolean = false;
  userId: string;

  totalPosts: number = 0;
  pageSize: number = 2;
  currentPage: number = 1;
  pageSizeOptions: number[] = [1, 2, 5, 10];

  private postsSub: Subscription;
  private authListenerSubs: Subscription;

  constructor(public service: PostsService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.service.getPosts(this.pageSize, 1);
    this.userId = this.authService.getUserId();
    this.postsSub = this.service
      .getPostUpdateListener()
      .subscribe((postsData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postsData.postCount;
        this.posts = postsData.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.service.getPosts(this.pageSize, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.service.deletePost(postId).subscribe(
      () => {
        this.service.getPosts(this.pageSize, this.currentPage);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }
}
