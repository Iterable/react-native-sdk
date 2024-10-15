import { Api } from '../../types';

export const LIST_DATA = Object.entries(Api).map(([key, value]) => {
  return { id: key, value };
});
