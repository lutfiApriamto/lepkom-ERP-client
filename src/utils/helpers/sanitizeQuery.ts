import _ from 'lodash';

/**
 * Menghapus properti yang bernilai undefined, null, atau string kosong dari sebuah object.
 * Sangat berguna untuk membersihkan query parameter pencarian/filter tabel.
 */
export const sanitizeQuery = (query: Record<string, any>) => {
  const copyObj = _.cloneDeep(query);
  for (const key in copyObj) {
    const value = copyObj[key];

    if (value === undefined || value === null || value === '') {
      delete copyObj[key];
    }
  }

  return copyObj;
};
