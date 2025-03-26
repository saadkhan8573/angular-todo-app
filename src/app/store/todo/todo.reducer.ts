import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { initialState } from './todo.actions';
import { stat } from 'node:fs';

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
  on(TodoActions.editTodoForm, (state: any, formData) => ({
    ...state,
    isEditing: true,
    editDataId: formData.id,
  })),
  on(TodoActions.updateTodoForm, (state: any, formData) => ({
    formData: state.formData?.map((data: any) =>
      data?.id === formData?.id ? formData : data
    ),
    isEditing: false,
    editDataId: 0,
    isSubmitting: false,
    submitError: '',
  })),
  on(TodoActions.deleteTodoFormData, (state, formData) => ({
    ...state,
    formData: state.formData?.filter((data: any) => data?.id !== formData.id),
  })),
  on(TodoActions.submitServiceForm, (state, payload: any) => ({
    ...state,
    formData: payload,
    isSubmitting: false,
  }))
);
