import { createContext, useContext, useReducer } from "react";
import { reducerFunc } from "./reducerFunction";

const DataContext = createContext();
const DataReducerContext = createContext();

export const useData = () => {
    return useContext(DataContext);
}

export const useDataReducer = () => {
    return useContext(DataReducerContext);
}

export default Context = ({ children }) => {
    const initialState = [
        {name: "alan", age: 20, country: "mexico", occupation: "banker"}
    ];
    const [state, dispatch] = useReducer(reducerFunc, initialState);
    return (
        <DataContext.Provider value={state}>
            <DataReducerContext.Provider value={dispatch}>
                {children}
            </DataReducerContext.Provider>
        </DataContext.Provider>
    )
}