export type Account = {
  account_number: number;
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
}

export enum InputActions {
	AppendInput = "APPEND_INPUT",
	SetInput = "SET_INPUT",
}

export type MachineState = {
	screen: Screen;
	input: string;
}

export type ReducerAction = {
	type: Screen | InputActions,
	payload: string
}
