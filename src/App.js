import './App.css';
// import {useEffect} from 'react'
// import axios from 'axios'
import IndexRouter from './router/IndexRouter'
import { Divider } from 'rc-menu';

function App() {

  // useEffect(() => {
  //   axios.get("/association/getAllAssociationList").then((res)=>{
  //     console.log(res.data);
  //   })
  // }, [])

  return (
      <IndexRouter />
  );
}

export default App;
