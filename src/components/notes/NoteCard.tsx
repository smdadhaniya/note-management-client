import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { INotes } from "./NotesList";
import { fetchNoteByIdAsync } from "../../redux/slices/notes";

const NoteCard = () => {
  const dispatch = useAppDispatch();
  const { noteInfo } = useAppSelector((state) => state.notes);

  const [getNote, setNote] = useState<INotes>();

  useEffect(() => {
    const noteId = window.location.pathname.replace("/note/", "");
    dispatch(fetchNoteByIdAsync(noteId));
  }, [dispatch]);

  useEffect(() => {
    setNote(noteInfo);
  }, [noteInfo]);

  return (
    <div className="mx-w-lg mx-auto my-8 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Title: {getNote?.title}</h2>
      <div className="text-gray-600 mb-2">
        <span className="font-semibold">Author: {getNote?.author}</span>
      </div>
      <div className="text-gray-600 mb-2">
        <span className="font-semibold">Date: {getNote?.date}</span>
      </div>
      <div className="text-gray-600 mb-2">
        <span className="font-semibold">Status: {getNote?.status}</span>
      </div>
      <div className="text-gray-800">
        <h3 className="font-semibold text-lg mb-2">
          Description: {getNote?.description}
        </h3>
      </div>
    </div>
  );
};

export default NoteCard;
