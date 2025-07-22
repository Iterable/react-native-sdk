import nativeApi from './NativeRNIterableAPI';
import { OldApiMock } from './OldApiMock';

export default nativeApi;
export const api = nativeApi;
export const oldApi = OldApiMock;
