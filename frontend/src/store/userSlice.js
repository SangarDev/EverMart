import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user : null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetailes : (state, action)=>{
        state.user = action.payload
        //console.log("user Details",action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetailes } = userSlice.actions

export default userSlice.reducer