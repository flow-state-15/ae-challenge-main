## App Documentation and Overview

#### Full Documentation is published on Snazzy Docs. Please visit https://advisors-excel-atm-challenge.snazzydocs.com/

### Architecture Summary

This app models a bank backend with an ATM frontend built on Typescript, Node, Postgres, Docker, React, MUI and Tanstack Query. My intent is to simulate a financial engine and physical ATM. Both of those goals have non-trivial complexity and required me to dive deep and determine a north star for the project.

### My Guiding Principles:

#### 1) Treat money movement as ledger events

In real life money is not created out of thin air; it always comes from somewhere - at least from a transaction perspective. I modeled transactions as double-entry between user accounts and a system account so that money is moved, not created. I also considered the business requirements of a bank and created a ledger system that provides an audit trail of every transaction. From the start of the app this ledger is balanced and when audited will be zeroed out. Double-entry bookkeeping is foundational in finance and I tried to reflect that.

#### 2) Keep database operations ACID

My goal was to allow Postgres' ACID properties to do their job and not fight it. Network trips take longer than cpu cycles so I kept calculations close to the data when possible. Deposit/withdraw operations run in transactions with rollback on failure. Responsible movement of money is the heartbeat of a financial firm and I took that seriously.

#### 3) Isolation of responsibility

In the API, route file isolate routes, methods, middleware and controllers. The controllers validate input and orchestrate calls while the service layer owns business operations and DB transaction flow. Validations are organized into stateful and stateless utilities for easier testing in the future. In the frontend, state distribution is intentional and orchestrated. Every component has a specific job to do and does it well. React makes it easy to spaghettify state logic and inflate render cycles, but I tried to keep that to a minimum and did not want "too many cooks in the kitchen".

#### 4) Make UI behavior deterministic

An ATM is a physical machine with defined limitations. I felt the way to model this was by building a finite state machine. I tried to understand the architecture and outcomes that were appropriate for the API connected so I created a spec and built from there. The Reducer manages screen and input orchestration. The Display is stateless and only reads derived render props. The Keypad is also stateless and only invokes event handlers. The Machine component orchestrates control flow and provides meaning to state and events.

As you may notice, a flashy UI design is not in the list and this is intentional. With limited time I needed to make sure that core principles were executed. The app is not perfect by any stretch - there are many opportunities for feature and architecture enhancement. But the foundation of a solid financial app has been laid, and I believe it's worth it.
