import { createAction, props } from '@ngrx/store';

// export const updateTodoForm = createAction(
//   '[Todo Form] Update Form',
//   props<{ field: string; value: string }>()
// );
export const submitTodoForm = createAction(
  '[Todo Form] Submit Form',
  props<TodoState>()
);
export const submitServiceForm = createAction(
  '[Todo Form] Submit Service Form',
  props<any>()
);
export const submitSuccess = createAction('[Todo Form] Submit Success');

export interface TodoForm {
  name: string;
  email: string;
  message: string;
}

// Todo.state.ts
export interface TodoState {
  formData: TodoForm[];
  isSubmitting: boolean;
  submitError: string;
}

export const initialState: TodoState = {
  formData: [],
  isSubmitting: false,
  submitError: '',
};
