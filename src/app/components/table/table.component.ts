import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import {
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
} from '@tanstack/angular-table';

@Component({
  selector: 'app-table',
  imports: [FlexRenderDirective, NgComponentOutlet],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TableComponent {
  @Input({ required: true }) set data(value: any[]) {
    this.updatedData.set(value);
  }
  @Input({ required: true }) columns: any = [];

  updatedData = signal<any>(this.data);

  table = createAngularTable(() => ({
    data: this.updatedData(),
    columns: this.columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  }));

  rerender() {
    this.updatedData.set([...this.data.sort(() => -1)]);
  }
}
