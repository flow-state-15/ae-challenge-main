import { useState } from "react";
import { Box, Grid } from "@mui/material";
// import { SignIn } from './components/SignIn';
import { AccountDashboard } from "../components/AccountDashboard";
import { account } from "../Types/Account";
import Display from "../features/atm/Display";
import Keypad from "../features/atm/Keypad";
// import "../styles/App.css";
import Machine from "../features/atm/Machine";

export default function App() {
	return (
		<Box sx={appStyles}>
			<Machine />
		</Box>
	);
}

const appStyles = {
	border: "10px dashed orange",
	margin: "auto",
	width: "100%",
	height: "100%",
};

// export const App = () => {
// 	const [accountNumberError, setAccountNumberError] = useState(false);
// 	const [account, setAccount] = useState<account | undefined>(undefined);

// 	const signIn = async (accountNumber: number) => {
// 		const response = await fetch(`http://localhost:3000/accounts/${accountNumber}`);

// 		if (response.status !== 200) {
// 			alert("Account not found");
// 			setAccountNumberError(true);
// 			setAccount(undefined);
// 			return;
// 		}

// 		setAccountNumberError(false);
// 		const data = await response.json();
// 		console.log(data);
// 		setAccount({
// 			accountNumber: data.account_number,
// 			name: data.name,
// 			amount: data.amount,
// 			type: data.type,
// 			creditLimit: data.credit_limit,
// 		});
// 	};
// 	const signOut = async () => {
// 		setAccount(undefined);
// 	};

// 	//   const Page = () => {
// 	//     if(account) {
// 	//       return <AccountDashboard account={account} signOut={signOut}/>
// 	//     } else {
// 	//       return <SignIn
// 	//         signIn={signIn}
// 	//         accountNumberError={accountNumberError}
// 	//       />
// 	//     }
// 	//   }

// 	return (
// 		<div className="app">
// 			<Grid container>
// 				<Grid item xs={1} />
// 				<Grid item xs={10}>
// 					{/* <Page /> */}
// 					<SignIn />
// 				</Grid>
// 				<Grid item xs={1} />
// 			</Grid>
// 		</div>
// 	);
// };
