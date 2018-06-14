import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BlockModel } from '../../shared/models/block-model';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css']
})
export class BlockListComponent implements OnInit, OnChanges {

  @Input()
  data: BlockModel[];

  @Input()
  loading: boolean;

  displayData: BlockModel[];
  position: number;

  constructor() { }

  ngOnInit() {
    this.position = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['data']) {
      this.changePosition();
    }
  }

  nextItem() {
    this.position++;
    this.changePosition();
  }

  previousItem() {
    this.position--;
    this.changePosition();
  }

  private changePosition() {
    this.displayData = this.data && this.data.length ? this.data.slice(this.position, this.position + 2) : [];
  }

}
