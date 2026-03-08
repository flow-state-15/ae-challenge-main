export type ReducerActionType = "SELECT_LEFT" | "SELECT_CENTER" | "SELECT_RIGHT" | "INPUT_NUMBER" | "CLEAR" | "ENTER";

export type KeypadAction = {
	type: ReducerActionType
	payload: string;
}

export type ServerAction = {
	type: "SERVER_MESSAGE"
	payload: string
}

export type MachineAction = {
	type: ReducerActionType
	payload: 
}

export type MachineState = {
	screen: Screen;
	select: "SELECT_LEFT" | "SELECT_RIGHT" | "SELECT_CENTER"
	input: string;
}

export enum Screen {
	LoggedOut = "LOGGED_OUT",
	Menu = "MENU",
	Withdraw = "WITHDRAW",
	Deposit = "DEPOSIT",
	ServerMessage = "SERVER_MESSAGE"
}

export type RenderProps = {
	header1: string
	header2: string
	body: string
	selectLeft: string
	selectRight: string
	selectCenter: string
}