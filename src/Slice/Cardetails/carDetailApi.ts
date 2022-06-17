//RTK imports
import { createAsyncThunk } from "@reduxjs/toolkit";
//API imports
import { JSON_API } from "../../API/CarApi";
//third part imports
import axios from "axios";
//type imports
import {CarDetail} from '../../Pages/Types'

//generate pending, fulfilled and rejected action types
export const fetchCarDetail = createAsyncThunk('carDetail/fetchCarDetail', async () => {
  const res = await axios
      .get<CarDetail[]>(`${JSON_API}cardetails`);  // to get the desire type from axios response, use generic in get function
  return res.data;
})
