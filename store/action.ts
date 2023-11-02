import { createAsyncThunk } from "@reduxjs/toolkit";
import { persistor } from './store'

export const saveStateToSessionStorage = createAsyncThunk(
    'sessionStorage/saveState',
    async (_, {getState}) => {
        const state = getState()
            persistor.persist()
    }
)