import { Component, inject } from '@angular/core';
import {
  heroBookOpen,
  heroPencil,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { Store } from '@ngrx/store';
import { ColumnDef } from '@tanstack/angular-table';
import { TableComponent } from '../../../components/table';
import {
  deleteTodoFormData,
  editTodoForm,
  TodoForm,
  TodoState,
} from '../../../store/todo/todo.actions';
import { IconComponent } from '../../../components/icon';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-list',
  imports: [CommonModule, TableComponent],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.css',
  providers: [
    provideIcons({
      heroPencil,
      heroTrash,
      // Add the specific icons you want to use
    }),
  ],
  standalone: true,
})
export class DataListComponent {
  private store: Store<{ todo: TodoState }> = inject(
    Store<{ todo: TodoState }>
  );

  // heroTrash = heroTrash;
  // heroPencil = heroPencil;

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
    {
      accessorFn: (row) => row.name,
      id: 'Full Name',
      cell: (info) => ({
        component: IconComponent, // Specify the component
        props: {
          icons: [
            {
              size: '18',
              iconName: 'heroPencil',
              onIconClick: this.handleEdit.bind(this, info.row.original),
            },
            {
              size: '18',
              iconName: 'heroTrash',
              onIconClick: this.handleDelete.bind(this, info.row.original),
            },
          ],
        },
      }),
      header: () => `<span>Full Name</span>`,
      footer: (info) => info.column.id,
    },
  ];

  handleEdit(row: TodoForm) {
    this.store.dispatch(editTodoForm({ id: row?.id }));
  }
  handleDelete(row: TodoForm) {
    this.store.dispatch(deleteTodoFormData({ id: row?.id }));
    console.log('Edit', row);
  }
}
