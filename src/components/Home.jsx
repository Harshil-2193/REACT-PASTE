import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaClipboard } from 'react-icons/fa';



const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    console.log("Paste ID:", pasteId);
    if (pasteId) {
      console.log("Page Found");
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    console.log("Paste ID END:", pasteId);

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  function handleCopy() {
    navigator.clipboard.writeText(`${title}\n\n${value}`);
    toast.success("Copied to clipboard!");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 rounded-2xl">
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 shadow-2xl rounded-3xl p-8 w-full max-w-3xl border border-gray-600 relative">
        <div className="flex flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 bg-gray-900 border border-gray-600 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-gray-200 placeholder-gray-400"
          />
          <button
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
            onClick={createPaste}
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>

        <div className="relative">
          <textarea
            value={value}
            placeholder="Enter content here..."
            onChange={(e) => setValue(e.target.value)}
            rows={15}
            className="w-full p-4 bg-gray-900 border border-gray-600 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all duration-300 text-gray-200 placeholder-gray-400"
          />
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-transform duration-300 text-lg"
          >
            <FaClipboard />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
