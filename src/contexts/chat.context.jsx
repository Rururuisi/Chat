import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { AuthContext } from "./auth.context";
import { combineId } from "../firebase/firebase.firestore";

const ChatContext = createContext();

const INITIAL_STATE = {
	chatId: "null",
	user: {},
};

const ActionType = {
	CHANGE_USER: "chat/change-user",
};

const ChatContextProvider = ({ children }) => {
	const { currentUser } = useContext(AuthContext);

	const chatReducer = (state, action) => {
		switch (action.type) {
			case ActionType.CHANGE_USER:
				return {
					user: action.payload,
					chatId: combineId(currentUser.uid, action.payload.uid),
				};
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

	const value = { data: state, dispatch, ActionType };
	return (
		<ChatContext.Provider value={value}>{children}</ChatContext.Provider>
	);
};

export { ChatContext, ChatContextProvider };
