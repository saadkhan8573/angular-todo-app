import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoForm, TodoState } from '../../../store/todo/todo.actions';
import { TableComponent } from '../../../components/table';
import { ColumnDef } from '@tanstack/angular-table';

@Component({
  selector: 'app-data-list',
  imports: [TableComponent],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.css',
})
export class DataListComponent {
  private store: Store<{ todo: TodoState }> = inject(
    Store<{ todo: TodoState }>
  );

  contactForm: TodoForm[] = [];

  formData$ = this.store.select((state) => state.todo.formData);

  ngOnInit() {
    this.formData$.subscribe((val) => (this.contactForm = val));
  }

  defaultColumns: ColumnDef<TodoForm>[] = [
    {
      accessorKey: 'id',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.name,
      id: 'Full Name',
      cell: (info) => `<i>${info.getValue<string>()}</i>`,
      header: () => `<span>Full Name</span>`,
      footer: (info) => info.column.id,
    },

    {
      accessorFn: (row) => row.email,
      accessorKey: 'Email',
      header: () => `<span>Email</span>`,
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.message,
      accessorKey: 'Message',
      header: 'Message',
      footer: (info) => info.column.id,
    },
  ];
}
