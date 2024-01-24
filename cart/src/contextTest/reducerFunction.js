export const reducerFunc = (state, action) => {
    switch (action.type) {
        case "addData":
            let { addData } = action.payload;
            return [
                ...state,
                addData
            ]

        default:
            return console.log("Error came: Invalid type");
    }
}