import { SET_NEXT_PAGE } from "../actionsTypes";
import { SET_PREV_PAGE } from "../actionsTypes";

export interface IState {
    page: number;
}

interface IAction {
    type: string;
    payload: number;
}

const initialState: IState = {
    page: 1
}

const pageUpdateReducer = (state: IState = initialState, action: IAction) => {
    switch(action.type) {
        case SET_NEXT_PAGE:
            return {
                ...state,
                page: state.page + action.payload,
            }
        case SET_PREV_PAGE:
            return {
                ...state,
                page: state.page - action.payload,
            }
        default:
            return state;
    }
}

export default pageUpdateReducer;