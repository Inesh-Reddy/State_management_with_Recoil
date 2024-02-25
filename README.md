## State management using Recoil

- what is State Management ?

    A cleaner way to store the state of your app.
    Until now we are using `ContextAPI`, which causes problem of re-renders.

    The better solution to get rid of the problem is state management libraries.
    {Recoil, Redux, Zustand.}

    #### Good to know that Components and state should be defines in different  places.


## Recoil

- A state management Library for React.

        * Recoil has a concept of an "atom {Smallest uit of state}" to store the state. (90% of the recoil work happens in creating atoms).
        * An atom can be defined outside the component.
        * It can be teleported to any component.

- For reference : `Atom = useState hook`


## Things to look for in Recoil :

        RecoilRoot
        atom
        useRecoilState
        useRecoilValue
        useSetRecoilState
        selector

## Creatig an Atom(state variable) :

    - path : `store/atoms/count.jsx`
    - defining atom: 
                    export const countAtom = atom({
                        key:"countAtom",
                        default:0
                    })

    - Using atom : Depending on our usecase we use `useRecoilState, useRecoilValue, useSetRecoilState.`

    - useRecoilValue :
                function CountRenderer(){
                // if we only need state value {ie; only count in const[count, setCount]=useState(0);}
                const count = useRecoilValue(countAtom);
                return <div>
                    {count}
                </div>
                }

    - useRecoilState :
                function Buttons(){
                const [count, setCount] = useRecoilState(countAtom);
                return <div>
                    <button onClick={()=>{
                    setCount(count+1)
                    }} >Increase</button>
                    <button onClick={()=>{
                    setCount(count-1)
                    }} >Decrease</button>
                </div>
                }



- useSetRecoilState : 

    This is beneficial for performance reasons. When a component subscribes to a piece of state (for example, by using useRecoilState or useRecoilValue), it will re-render whenever that state changes. If a component only needs to set state and doesn’t care about when it changes, using useSetRecoilState prevents unnecessary re-renders because it does not subscribe the component to the state.


            - useSetRecoilState :
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

- Recoil Root:
  
                This needs to be use in the App component{can be use in lower the order also...but general practice} to wrap the components that need atom/s.

                
                function App() {
                    return (
                        <div>
                        <RecoilRoot>
                            <Count />
                        </RecoilRoot>
                        </div>
                    )
                }

 - Selector :
                In Recoil, a selector represents a piece of derived state. You can think of derived state as the output of passing state to a pure function {not a component} that derives a new value from the said state. Derived state is a powerful concept because it lets us build dynamic data that depends on other data.

                    import { atom, selector } from "recoil";
                    //state
                    export const countAtom = atom({
                        key:"countAtom",
                        default:0
                    })

                    //derived state from countAtom state.
                    export const evenSelector = selector({
                        key: "evenSelector",
                        get: ({get})=>{
                            const count = get(countAtom);
                            return count%2===0;
                        }
                    })

