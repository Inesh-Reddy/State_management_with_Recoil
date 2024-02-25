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
                function CountRenderer(){
                // if we only need state value {ie; only count in const[count, setCount]=useState(0);}
                const count = useRecoilValue(countAtom);
                return <div>
                    {count}
                </div>
                }

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

