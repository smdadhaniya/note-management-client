import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { deleteNoteAsync, fetchNotesAsync } from "../../redux/slices/notes";

export interface INotes {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  status: string;
  is_expire: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const NotesList = () => {
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector((state) => state.notes);

  const [getNotes, setNotes] = useState<INotes[]>([]);
  const [searchNote, setSearchNote] = useState<string>("");

  useEffect(() => {
      const timeOutId = setTimeout(() => {
        dispatch(fetchNotesAsync(searchNote));
      }, 1000);
      return () => {
        clearTimeout(timeOutId);
      };
  }, [dispatch, searchNote]);

  useEffect(() => {
    if (notes && Array.isArray(notes)) {
      setNotes(notes);
    }
  }, [notes]);

  const headers = ["Title", "Author", "Date", "Time", "Status", "Action"];
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end">
        <input
          type="text"
          id="search"
          name={"search"}
          onChange={(e) => setSearchNote(e.target.value)}
          placeholder="Search.."
          className="mt-6 block w-[30rem] mr-6 h-10 border border-black rounded-md p-2 px-2"
        />
        <button
          className="mr-6 mt-6 h-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => (window.location.href = "/add-note")}
        >
          Add Note
        </button>
        <button
          className="mr-6 mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-5">
        <thead className="bg-grey-50">
          <tr>
            {headers.map((col, index) => (
              <th
                scope="col"
                key={`col${index}`}
                className="px-6 py-3 text-center text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {!getNotes.length ? (
            <h2 className="text-xl  mt-3 flex justify-center text-center">
              {"No notes found!"}
            </h2>
          ) : (
            getNotes.map((note, index) => {
              return (
                <tr key={`note${index}`} className="border-2 cursor-pointer">
                  <td
                    className="px-6 py-4 text-center whitespace-nowrap"
                    onClick={() => (window.location.href = `/note/${note._id}`)}
                  >
                    <div className="text-sm text-gray-900">{note.title}</div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="text-sm text-gray-900">{note.author}</div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {note.date.split("T")[0]}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="text-sm text-gray-900">{note.time}</div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap ">
                    <div
                      className={`border capitalize px-1 py-2 text-sm ${
                        note.status === "active"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {note.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <button
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => {
                          window.location.href = `/update-note/${note._id}`;
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => {
                          if (note) {
                            dispatch(deleteNoteAsync(note._id));
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NotesList;
