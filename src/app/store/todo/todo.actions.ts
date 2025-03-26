import { createAction, props } from '@ngrx/store';

// export const updateTodoForm = createAction(
//   '[Todo Form] Update Form',
//   props<{ field: string; value: string }>()
// );
export const submitTodoForm = createAction(
  '[Todo Form] Submit Form',
  props<TodoState>()
);

export const editTodoForm = createAction(
  '[Todo Form] Edit Form',
  props<{ id: number }>()
);

export const updateTodoForm = createAction(
  '[Todo Form] Update Form',
  props<TodoForm>()
);

export const deleteTodoFormData = createAction(
  '[Todo Form] Delete Form',
  props<{ id: number }>()
);

export const submitServiceForm = createAction(
  '[Todo Form] Submit Service Form',
  props<any>()
);
export const submitSuccess = createAction('[Todo Form] Submit Success');

export interface TodoForm {
  id: number;
  name: string;
  email: string;
  message: string;
}

// Todo.state.ts
export interface TodoState {
  formData: TodoForm[];
  isEditing?: boolean;
  isSubmitting: boolean;
  submitError: string;
  editDataId?: number;
}

export const initialState: TodoState = {
  formData: [],
  isSubmitting: false,
  isEditing: false,
  submitError: '',
  editDataId: 0,
};
