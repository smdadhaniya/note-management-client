import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  createNoteAsync,
  fetchNoteByIdAsync,
  updateNoteAsync,
} from "../../redux/slices/notes";

export interface INote {
  _id?: string;
  title: string;
  description: string;
  time: string;
  status: string;
  is_expired: boolean;
}
const AddNote = () => {
  const statusOptions = ["Active", "In-active"];
  const dispatch = useAppDispatch();
  const { noteInfo } = useAppSelector((state) => state.notes);
  const [noteInformation, setNoteInformation] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    is_expired: false,
  });
  const [status, setStatus] = useState("active");

  useEffect(() => {
    if (window.location.pathname !== "/add-note") {
      const noteId = window.location.pathname.replace("/update-note/", "");
      if (noteId) {
        dispatch(fetchNoteByIdAsync(noteId));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (noteInfo && Object.values(noteInfo).length > 0) {
      const outputDate = noteInfo.date.split("T")[0];
      setNoteInformation((prev) => ({
        ...prev,
        title: noteInfo.title,
        description: noteInfo.description,
        date: outputDate,
        time: noteInfo.time,
      }));
      setStatus(noteInfo.status);
    }
  }, [noteInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: INote = {
        ...noteInformation,
        status: status.toLowerCase(),
      };
      let response;
      if (noteInfo._id) {
        payload._id  = noteInfo._id
        response = await dispatch(updateNoteAsync(payload));
      } else {
        response = await dispatch(createNoteAsync(payload));
      }
      if (response.payload.success) {
        window.location.href = "/notes";
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">
        {noteInfo._id ? "Edit" : "Add"} Note
      </h2>
      <form onSubmit={handleSubmit}>
        {noteInfo._id ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
              disabled
              type="text"
              name="author"
              value={noteInfo.author}
            />
          </div>
        ) : null}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg "
            placeholder="Enter your note title"
            required
            name={"title"}
            value={noteInformation.title}
            onChange={(event) =>
              setNoteInformation((prev) => ({
                ...prev,
                title: event.target.value,
              }))
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg "
            placeholder="Enter your description title"
            required
            name="description"
            value={noteInformation.description}
            onChange={(event) =>
              setNoteInformation((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg "
            required
            type="date"
            name="date"
            value={noteInformation.date}
            onChange={(event) => {
              console.log("date", event.target.value);
              setNoteInformation((prev) => ({
                ...prev,
                date: event.target.value,
              }));
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            name="time"
            value={noteInformation.time}
            onChange={(event) =>
              setNoteInformation((prev) => ({
                ...prev,
                time: event.target.value,
              }))
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg "
            placeholder="Enter your note title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Status
          </label>
          <div className={`flex items-center mt-2`}>
            {statusOptions.map((option, index) => (
              <label
                key={`option${index}`}
                className={`flex items-center text-sm font-medium text-gray-700 `}
              >
                <input
                  type="radio"
                  name={option}
                  className={`mr-1`}
                  value={status.toLowerCase()}
                  checked={status.toLowerCase() === option.toLowerCase()}
                  onChange={(e) => setStatus(e.target.name)}
                />
                <span
                  className={`font-medium mr-3 ${
                    option === "In-active" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md"
        >
          {noteInfo._id ? "Edit" : "Add"} Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
