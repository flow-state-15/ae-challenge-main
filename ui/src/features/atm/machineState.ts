/*
state machine logic and transitions

Machine component owns state reducer and async hooks
views set display values -> either hard coded or from server
Machine component passes down setters to keypad component
Display component is read only
server state like account object is in tanstack query cache

Display Views
all display transitions are fast fade-out css transitions

display header1 gets these values:
- "Welcome to Advisors Excel ATM"
- "Your [account type] account balance is $[balance]"

display header2 gets these values:
- "Please enter your account number"
- "Enter deposit amount"
- "Enter withdrawal amount"
- "Your <account type> balance is $<balance>"
- "Deposit successful"
- "Withdrawal successful"

display body gets these values:
- nothing
- [input string]
- [server error message]
- "Deposit successful"
- "Withdrawal successful"

select buttons get these values: 
- SELECT_LEFT: deposit, cancel
- SELECT_RIGHT: withdraw
- SELECT_CENTER: log out

machine states:
LOGGED OUT (initial state)
views and actions available
- Display header1 - view
	- value: "Welcome to Advisors Excel ATM"
- Display header2 - view
	- value: "Please enter your account number"
- Display body - view
	- value: nothing
- Select buttons - view
	- value: nothing
- Login - action
	- keypad input
		- Display body - view
			- value: [input string] (stateful)
	- Enter - action
		- Login - sends request
			- if success, change machine state to LOGGED IN
			- if error, change display body to [server error message] || "Account not found"

LOGGED IN
views and actions available
- Display header1 - view
	- value: "Your [account type] account balance is $[balance]"
- Display header2 - view
	- value: "What would you like to do?"
- Display body - view
	- value: nothing

	
logged in select buttons:
- logout - action
	- reset reducer to initial state
- deposit - action
	- change display header2 to "Enter deposit amount"
	- change SELECT_LEFT to "Cancel"
- withdraw - action
	- change display header to "Enter withdrawal amount"
	- change SELECT_RIGHT to "Cancel"
	- keypad input - action
		- button press - action
			- adds to input string
		- Display body - view
			- value: [input string] (stateful)
		- Enter - action
			- Deposit - sends request
				- if success, change display body to "Deposit successful"
				- if error, change display body to [server error message] || "Deposit failed"
*/

import { Account, MachineState, ReducerAction, RenderProps, Screen } from "../../types/AppTypes";

export const initialMachineState: MachineState = {
    screen: Screen.LoggedOut,
    selection: "NONE",
    input: "",
};

export function machineReducer(state = initialMachineState, action: ReducerAction): MachineState {
    switch (action.type) {
        case "SELECT_LEFT":
            return {
                ...state,
                selection: "SELECT_LEFT",
            };
        case "SELECT_RIGHT":
            return {
                ...state,
                selection: "SELECT_RIGHT",
            };
        case "SELECT_CENTER":
            return {
                ...state,
                selection: "SELECT_CENTER",
            };
        case "ENTER":
            return {
                ...state,
                selection: "ENTER",
				screen: Screen.Enter,
				input: "",
            };
        case "CANCEL":
            return {
                ...state,
                selection: "CANCEL",
				input: "",
				screen: Screen.Menu,
            };
        case "CLEAR":
            return {
                ...state,
                input: "",
            };
        case "INPUT":
            return {
                ...state,
                input: state.input + action.payload,
            };
        case "SERVER_MESSAGE":
            return {
                ...state,
                input: action.payload,
            };
		case "RESET":
			return initialMachineState;
        default:
            return state;
    }
}

export const initialRenderProps: RenderProps = {
    header1: "Welcome to Advisors Excel ATM",
    header2: "Please enter your account number",
    body: "",
    selectLeft: "",
    selectRight: "",
    selectCenter: "",
};

export function deriveRenderProps(
	currentState: MachineState,
    currentRenderProps: RenderProps,
    account: Account,
    serverMessage?: string,
): RenderProps {
    switch (currentState.screen) {
        case Screen.LoggedOut:
            return initialRenderProps;
        case Screen.Menu:
            return {
                ...currentRenderProps,
                header1: `Your ${account.type} account balance is $${account.amount}`,
                header2: "What would you like to do?",
                selectLeft: "Deposit",
                selectRight: "Withdraw",
                selectCenter: "Logout",
            };
        case Screen.Withdraw:
            return {
				...currentRenderProps,
                header2: "Enter withdrawal amount",
                selectRight: "Cancel",
            };
        case Screen.Deposit:
            return {
				...currentRenderProps,
                header2: "Enter deposit amount",
                selectLeft: "Cancel",
            };
		case Screen.Input:
			return {
				...currentRenderProps,
				body: currentState.input,
			}
		case Screen.Clear:
			return {
				...currentRenderProps,
				body: "",
			}
		case Screen.Enter:
			return {
				...currentRenderProps,
				body: "Sending request...",
			}
        case Screen.ServerMessage:
            return {
                ...currentRenderProps,
                body: serverMessage || "",
            };
        default:
            return initialRenderProps;
    }
}
