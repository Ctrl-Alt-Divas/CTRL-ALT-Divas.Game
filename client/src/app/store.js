import { configureStore } from '@reduxjs/toolkit';
import { divasApi } from '../../api/divasApi';
import slice from './slice';

const store = configureStore({
    reducer: {
        state: slice,
        [divasApi.reducerPath]: divasApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(divasApi.middleware),
});

export default store;