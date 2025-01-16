import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {ItemService} from "../services/item.service";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit {
  title = "s";
  item: any;
  errorMessage: any;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        const titleId = params['id'];
        if (titleId) {
          // Fetch item details using the ItemService
          this.itemService.getItemDetails(Number(titleId)).subscribe({
            next: (data) => {
              this.item = data;
              this.errorMessage = null;
            },
            error: (error) => {
              if (error.status === 404) {
                this.errorMessage = 'Item not found.';
              } else {
                this.errorMessage = 'An unexpected error occurred.';
              }
              console.error('Error fetching item details:', error);
            },
          });
        } else {
          this.errorMessage = 'Invalid title ID.';
        }
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while retrieving the query parameters.';
        console.error('Error retrieving query parameters:', error);
      },
    });
  }

}
