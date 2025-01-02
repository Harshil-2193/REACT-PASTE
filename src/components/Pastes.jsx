import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Pastes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste.pastes); // Name of slice and state
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    console.log("Deleting paste with ID:", pasteId);
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(paste) {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        })
        .then(() => toast.success("Paste shared successfully"))
        .catch((error) => toast.error("Error sharing paste: " + error));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-2xl from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">My Pastes</h1>

        {/* Search Input */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search for a paste..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md p-4 bg-gray-900 text-gray-200 rounded-2xl shadow-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => (
              <div
                key={paste._id}
                className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-gray-200"
              >
                <h2 className="text-xl font-semibold mb-2 truncate text-indigo-400">
                  {paste.title}
                </h2>

                <p className="text-gray-400 text-sm mb-4">{paste.content}</p>

                <div className="text-gray-500 text-xs mb-4">
                  Created on: {new Date(paste.createdAt).toLocaleString()}
                </div>

                <div className="flex justify-center gap-2 flex-wrap mt-4">
                  <button className="bg-indigo-400 hover:bg-indigo-500 text-gray-800 py-1 px-3 text-sm rounded-md shadow-md transition-transform hover:scale-105">
                    <NavLink to={`/?pasteId=${paste._id}`}>Edit</NavLink>
                  </button>
                  <button 
                    className="bg-teal-400 hover:bg-teal-500 text-gray-800 py-1 px-3 text-sm rounded-md shadow-md transition-transform hover:scale-105">
                    <NavLink to={`/pastes/${paste._id}`}>View</NavLink>
                  </button>
                  <button
                    className="bg-rose-400 hover:bg-rose-500 text-gray-800 py-1 px-3 text-sm rounded-md shadow-md transition-transform hover:scale-105"
                    onClick={() => {
                      handleDelete(paste?._id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="bg-blue-400 hover:bg-blue-500 text-gray-800 py-1 px-3 text-sm rounded-md shadow-md transition-transform hover:scale-105"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleShare(paste)}
                    className="bg-purple-400 hover:bg-purple-500 text-gray-800 py-1 px-3 text-sm rounded-md shadow-md transition-transform hover:scale-105"
                  >
                    Share
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 text-lg">No pastes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pastes;
