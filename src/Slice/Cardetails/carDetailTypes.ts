import { WritableDraft } from 'immer/dist/internal'
import { CarDetail } from '../../Pages/Types'

export type InitialState = {
  loading: boolean,
  carDetail:CarDetail[],
  error: string

}
