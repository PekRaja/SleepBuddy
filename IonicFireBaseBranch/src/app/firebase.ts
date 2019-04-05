export const firebaseconfig = {
  apiKey: 'AIzaSyA5O5DyX_Tt_dzGRhzcIdSZBSANLT3T0q8',
  authDomain: 'sleepbuddy-27d52.firebaseapp.com',
  databaseURL: 'https://sleepbuddy-27d52.firebaseio.com',
  projectId: 'sleepbuddy-27d52',
  storageBucket: 'sleepbuddy-27d52.appspot.com',
  messagingSenderId: '527839070930'
};
export const snapshotToArray = snapshot => {
  const returnArr = [];
  snapshot.forEach(childSnapshot => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });
  return returnArr;
};

export interface IFirebaseUser {
  mail: string;
  username: string;
}
