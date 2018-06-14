import { Component, OnInit, Input } from '@angular/core';
import { BlockListService } from '../block-list.service';
import { BlockModel } from '../../shared/models/block-model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-block-list-item',
  templateUrl: './block-list-item.component.html',
  styleUrls: ['./block-list-item.component.css']
})
export class BlockListItemComponent implements OnInit {

  @Input()
  item: BlockModel;

  constructor(
    private blockListService: BlockListService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  showDetail(): void {
    this.router.navigate(['../block/', this.item.height], {relativeTo: this.route});
  }
}
