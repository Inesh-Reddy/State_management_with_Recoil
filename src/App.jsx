import { useContext } from 'react'
import { CountContext } from './context'
import { RecoilRoot, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { countAtom } from './store/atoms/count'

function App() {
  return (
    <div>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </div>
  )
}

function Count(){
  return <div>
    <CountRenderer />
    <Buttons />
  </div>
}

function CountRenderer(){
  // if we only need state value {ie; only count in const[count, setCount]=useState(0);}
  const count = useRecoilValue(countAtom);
  return <div>
    {count}
  </div>
}
//to stop button to re-render for performance
function Buttons(){
  const setCount = useSetRecoilState(countAtom);
  return <div>
    <button onClick={()=>{
      setCount(count=>count+1)
    }} >Increase</button>
    <button onClick={()=>{
      setCount(count=>count-1)
    }} >Decrease</button>
  </div>
}

//with below case the buttons are re-rendering
// function Buttons(){
//   const [count, setCount] = useRecoilState(countAtom);
//   return <div>
//     <button onClick={()=>{
//       setCount(count+1)
//     }} >Increase</button>
//     <button onClick={()=>{
//       setCount(count-1)
//     }} >Decrease</button>
//   </div>
// }

export default App
