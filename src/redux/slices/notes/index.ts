import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createNote,
  deleteNoteById,
  fetchNoteById,
  fetchNotes,
  updateNoteById,
} from "../../services";
import { INotes } from "../../../components/notes/NotesList";
import { INote } from "../../../components/notes/AddNote";

export const fetchNotesAsync = createAsyncThunk("notes", async (value:string) => {
  const notes = await fetchNotes(value);
  return notes;
});

export const fetchNoteByIdAsync = createAsyncThunk(
  "note/id",
  async (id: string) => {
    const note = await fetchNoteById(id);
    return note;
  }
);

export const createNoteAsync = createAsyncThunk(
  "note/create",
  async (payload: INote, { dispatch }) => {
    const note = await createNote(payload);
    dispatch(fetchNotesAsync(null));
    return note;
  }
);

export const updateNoteAsync = createAsyncThunk(
  "note/update",
  async (payload: INote, { dispatch }) => {
    const note = await updateNoteById(payload);
    dispatch(fetchNotesAsync(null));
    return note;
  }
);

export const deleteNoteAsync = createAsyncThunk(
  "note/delete",
  async (id: string, { dispatch }) => {
    const note = await deleteNoteById(id);
    dispatch(fetchNotesAsync(null));
    return note;
  }
);

interface InitialState {
  notes: INotes[];
  noteInfo: INotes;
  loading: boolean;
  error: null;
}
export const initialState: InitialState = {
  notes: [],
  noteInfo: {
    _id: "",
    title: "",
    description: "",
    date: "",
    time: "",
    status: "",
    is_expire: false,
    author: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
  loading: false,
  error: null,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotesAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchNotesAsync.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchNotesAsync.fulfilled, (state, action: any) => {
      state.loading = true;
      state.notes = action.payload.notes;
    });
    builder.addCase(fetchNoteByIdAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchNoteByIdAsync.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchNoteByIdAsync.fulfilled, (state, action: any) => {
      state.loading = true;
      state.noteInfo = action.payload.note;
    });
    builder.addCase(createNoteAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createNoteAsync.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createNoteAsync.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateNoteAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateNoteAsync.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload.data;
    });
    builder.addCase(updateNoteAsync.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteNoteAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteNoteAsync.rejected, (state, action: any) => {
      state.loading = true;
      state.error = action.payload.data;
    });
    builder.addCase(deleteNoteAsync.fulfilled, (state, action: any) => {
      state.loading = false;
    });
  },
});

export default notesSlice.reducer;
