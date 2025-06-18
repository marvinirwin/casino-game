# 🎮 Casino Game Platform

A full-featured casino gaming application built using **Node.js/Express** for the backend, **React.js/Redux** for the frontend, and **HTML Canvas** for rendering game graphics.

### 🎲 Available Games
- Roulette  
- Blackjack  
- Slot Machines  
- Craps  
- Poker (5 Card Draw & Texas Hold’em)  
- Keno  
- Race Betting

---

## 📋 Project Requirements

### 1. Write your opinion here
    - Strengths and weaknesses of UI/UX
       - The colour scheme, and text is well put together.  Feels intentional and put together
       - The frontend code is written well, small components, hooks use is all correct, redux is by the book, css variables for colours and spacing.
       - The global websocket is clean and the handlers are wel ldone
       

    - Crypto Payment Logic Assessment & Suggest improvements
        - I used metamask connections because it's got a nice interface, but whether the user simply provides the public key of the wallet or uses metamask, playing a game would require the user to put currency into an intermediate wallet which they use to gamble with.  Their winnings get put into that wallet and their losses come out of it.  When they want to withdraw their money they request that the casino "cash them out" into their own wallet
        
### 2. Wallet Integration
- Integrate wallet connection as a **precondition** for sign-in.
- Maintain the existing sign-in flow, but ensure users can only authenticate **after a successful wallet connection**

