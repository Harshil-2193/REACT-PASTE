import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 flex justify-center items-center">
        <h2 className="text-white text-2xl">Paste not found!</h2>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-br rounded-xl from-gray-900 via-gray-800 to-black p-8 flex justify-center items-center">
      <div className="max-w-9xl w-full bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-gray-200">
        <h1 className="text-2xl font-semibold mb-6 truncate text-indigo-400">
          {paste.title}
        </h1>

        <textarea
          value={paste.content}
          rows={20}
          disabled
          className="w-full text-base p-6 bg-gray-900 border border-gray-600 rounded-2xl shadow-lg focus:outline-none resize-none text-gray-200 placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default ViewPaste;
