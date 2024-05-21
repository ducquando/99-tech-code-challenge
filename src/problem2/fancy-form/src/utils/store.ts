import { configureStore } from '@reduxjs/toolkit'
import updateReducer from './update'

export const store = configureStore({
    reducer: {
        states: updateReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch