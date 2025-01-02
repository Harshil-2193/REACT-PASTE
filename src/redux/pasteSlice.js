import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? (() => {
        try {
          return JSON.parse(localStorage.getItem("pastes"));
        } catch (error) {
          console.error("Invalid JSON in localStorage for 'pastes':", error);
          localStorage.removeItem("pastes"); // Clear the invalid data
          return [];
        }
      })()
    : [],
};


export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {

      // Check for Already Exists
      const paste = action.payload
      state.pastes.push(paste) // In centralized storeage
      localStorage.setItem("pastes",JSON.stringify( state.pastes)) // In local storage
      toast.success("Paste added successfully")
    },
    updateToPastes: (state,action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if(index>=0){
        state.pastes[index] = paste
        localStorage.setItem("pastes",JSON.stringify( state.pastes)) // In local storage
        toast.success("Paste updated successfully")
      }

    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
    
      const index = state.pastes.findIndex((item) => item._id === pasteId);
    
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes)); // In local storage
        toast.success("Paste removed successfully");
      }
    },
  },
})

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer