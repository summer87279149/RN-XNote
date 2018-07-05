import { AsyncStorage} from 'react-native';

 export const saveState = (state) => {
    const serializedState = JSON.stringify(state);
    console.log("存贮的redux是:",serializedState)
    AsyncStorage.setItem('state', serializedState,(err)=>{
    })
};
export const loadState = () => {
  return  new Promise((resolve,reject)=>{
      AsyncStorage.getItem('state',(err,result)=>{
        if (err||result === null) {
          reject();
        } else {
          resolve (JSON.parse(result));
        }
      });
  }) 
}