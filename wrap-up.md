## Questions



### What issues, if any, did you find with the existing code?

I started in the API. What immediately stood out was the db connection in the starter. Creating cold tcp connections on every request was not only extremely underperformant, but the way it was being used was breaking the db's concurrency model and ACID guarantees.

### What issues, if any, did you find with the request to add functionality?

None

### Would you modify the structure of this project if you were to start it over? If so, how?

I'm pretty happy with the direction I built from the start. The core idea behind the starter is ATM functionality. Since Advisors Excel is a financial company and this was a financial themed starter, I created architecture that makes sense from the financial perspective and for the UI built a finite state machine to emulate the ATM. 

### Were there any pieces of this project that you were not able to complete that you'd like to mention?

I need to disable enter button functionality if an error is present. As is, when it errors the enter button will submit the error message back to the server as a payload. This doesn't crash the app and just returns another error, but it's low hanging fruit. My approach to solving this would be first to determine how built out the UI error system was going to be. A refined solution that fits the app's layering would be to manage error state with tanstack and read that state in handlers. A quicker solution would be to just sanitize the request more than it is now, or disable the button on non-numeric input data. 

### If you were to continue building this out, what would you like to add next?

This was a fun project. I focused on the architecture of the app first and foremost and was not able to spend much time on the UI. My next goals would be to refine the UI into a more believable ATM machine, with page background, better colors, fonts, Advisors Excel branding, and cash animations. I also want to refine the error experience with dedicated screen space for alerts. Screen transitions were high on my list to try to implement, but I ran out of time. 

But, honestly, if I had more days I'd build out a solid error architecture first. I'd create an error wrapper and error table for internal and customer facing errors. I want to segregate error messages by class of viewer and location they are thrown. For example, an error thrown in the controller would be distinguishable from one thrown in a service. They would be paired with a wider range of HTTP status codes. As someone very aware that most of our time is spent reading and maintaining code, error clarity is important to me. 

Another thing I'd do is serve the build folder from the api and isolate db instructions into a repository layer just in case we build in more features. I think it's a good idea to keep the service layer owning connection management while the repository layer owned just the sql commands used in various places. 

### If you have any other comments or info you'd like the reviewers to know, please add them below.

I created a snazzy docs site for the documentation for this project. Please visit https://advisors-excel-atm-challenge.snazzydocs.com/.