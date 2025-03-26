import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { initialState } from './todo.actions';

export const todoReducer = createReducer(
  initialState,
  //   on(TodoActions.updateTodoForm, (state, { field, value }) => ({
  //     ...state,
  //     formData: { ...state.formData, [field]: value },
  //   })),
  on(TodoActions.submitTodoForm, (state: any, formData) => ({
    formData: [...state.formData, formData],
    isSubmitting: true,
    submitError: '',
  })),
  on(TodoActions.submitSuccess, (state) => ({
    ...state,
    // formData: { name: '', email: '', message: '' },
    isSubmitting: false,
  })),
  on(TodoActions.submitServiceForm, (state, payload: any) => ({
    ...state,
    formData: payload,
    isSubmitting: false,
  }))
);
