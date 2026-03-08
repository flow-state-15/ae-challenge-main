export type Account = {
  accountNumber: number;
  name: string;
  amount: number;
  type: string;
  creditLimit: number;
}

export type RenderProps = {
	header1: string
	header2: string
	body: string
	selectLeft: string
	selectRight: string
	selectCenter: string
}

export enum Screen {
	LoggedOut = "LOGGED_OUT",
	Menu = "MENU",
	Withdraw = "WITHDRAW",
	Deposit = "DEPOSIT",
	ServerMessage = "SERVER_MESSAGE",
	Input = "INPUT",
	Clear = "CLEAR",
	Enter = "ENTER",
}

export type MachineState = {
	screen: Screen;
	selection: "SELECT_LEFT" | "SELECT_RIGHT" | "SELECT_CENTER" | "ENTER" | "CANCEL" | "CLEAR" | "NONE";
	input: string;
}

export type SelectionType = Screen | "SELECT_LEFT" | "SELECT_RIGHT" | "SELECT_CENTER" | "CANCEL" | "NONE" | "RESET";

export type KeypadAction = {
	type: SelectionType
	payload: string;
}

export type ServerAction = {
	type: "SERVER_MESSAGE"
	payload: string
}

export type ReducerAction = KeypadAction | ServerAction;