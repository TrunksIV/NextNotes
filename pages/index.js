import React, { useEffect, useState } from "react";
import axios from "axios";
const HomePage = () => {
  const data = {
    id: null,
    title: "",
    description: "",
    completed: false,
  };
  const [notes, setnotes] = useState([]);
  const [newNote, setnewNote] = useState(data);

  // get All notes
  useEffect(() => {
    getNotes();
  }, []);

  // get all notes
  const getNotes = () => {
    axios
      .get("http://localhost:8080/api/notes/")
      .then((res) => {
        res.status === 200
          ? setnotes(res.data)
          : alert("There was an error setting the notes");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/notes/", newNote)
      .then((res) => {
        console.log(res.data);
        getNotes();
        clearForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/notes/${newNote.id}`, newNote)
      .then((res) => {
        console.log(res.data);
        getNotes();
        clearForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8080/api/notes/${newNote.id}`)
      .then((res) => {
        console.log(res.data);
        getNotes();
        clearForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSelected = (selected) => {
    setnewNote({
      id: selected.id,
      title: selected.title,
      description: selected.description,
      completed: selected.completed,
    });
    console.log("The selected is " + newNote.id);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewNote({
      ...newNote,
      [name]: value,
    });
  };

  const handleCompleted = (e) => {
    setnewNote({
      ...newNote,
      completed: !newNote.completed,
    });
  };

  const clearForm = () => {
    setnewNote(data);
  };
  const handleAction = () => {
    var component;
    if (!newNote.id) {
      component = (
        <div className="flex items-center justify-between w-full mb-1">
          <button className="w-full btn btn-indigo" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      );
    } else {
      component = (
        <div>
          <div className="flex items-center justify-between w-full mb-1">
            <button className="w-full btn btn-indigo" onClick={handleUpdate}>
              Update
            </button>
          </div>
          <div className="flex items-center justify-between w-full mb-1">
            <button className="w-full btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <div className="flex items-center justify-between w-full mb-1">
            <button className="w-full btn btn-secondary" onClick={clearForm}>
              Clear Form
            </button>
          </div>
        </div>
      );
    }

    return component;
  };

  return (
    <div className="min-h-full bg-gray-200">
      <header className="bg-white shadow">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Tariro Notes</h1>
          <p className="text-xl text-gray-500">
            {" "}
            Built with Frontend: Next Js & Tailwind Css and Backend: Express Js
            & Mysql Database
          </p>
        </div>
      </header>

      <main className="">
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="max-h-full p-3 bg-white border-0 border-t-4 border-indigo-600 border-solid rounded lg:col-span-2 lg:border-indigo-600 lg:pr-8">
              <div className="transition duration-300 ease-in-out">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => handleSelected(note)}
                    className="max-w-full p-2 mb-3 border-0 border-b-2 border-solid rounded cursor-pointer border-slate-200 hover:bg-slate-200"
                  >
                    <div className={note.completed ? "opacity-50" : ""}>
                      <h1 className="text-2xl font-bold">{note.title}</h1>
                      <p className="mb-2 text-xl text-gray-500">
                        {note.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-h-full p-3 mt-4 bg-white border-0 border-t-4 border-indigo-600 border-solid rounded lg:mt-0 lg:row-span-3">
              <form className="px-8 pt-4 pb-8 mb-1 ">
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="username"
                  >
                    Title
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={newNote.title}
                    placeholder="Title"
                  />
                </div>
                <div className="mb-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="Description"
                  >
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                    id="password"
                    name="description"
                    value={newNote.description}
                    onChange={handleChange}
                    placeholder="Enter Note Description"
                  ></textarea>
                </div>
                <div className="flex items-center mb-3">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    value=""
                    name="completed"
                    checked={newNote.completed}
                    onChange={handleCompleted}
                    className="w-4 h-4 text-indigo-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-black-900 dark:text-black-300"
                  >
                    Completed
                  </label>
                </div>
                {handleAction()}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
