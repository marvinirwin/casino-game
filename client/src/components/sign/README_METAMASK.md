# MetaMask Integration Guide

## Overview
This casino application now requires users to connect their MetaMask wallet before they can sign in or sign up. This adds an additional layer of security and enables web3 functionality.

## How It Works

### 1. User Flow
1. User visits the sign-in page
2. **MetaMask connection is required first**
3. User clicks "Connect MetaMask" button
4. MetaMask prompts user to connect their wallet
5. Once wallet is connected, traditional sign-in/sign-up forms appear
6. User can then sign in with username/password as before
7. Wallet address is included in the authentication payload

### 2. Components

#### `useMetaMask.js` Hook
- Manages MetaMask connection state
- Detects if MetaMask is installed
- Handles wallet connection/disconnection
- Provides message signing functionality

#### `MetaMaskConnect.js` Component
- UI component for wallet connection
- Shows connection status
- Displays wallet address when connected
- Handles connection errors

#### Modified `sign.js` Component
- Integrates MetaMask connection before traditional auth
- Only shows sign-in/sign-up forms after wallet connection
- Passes wallet address to server on authentication

### 3. Server Integration
- Modified `signin_send` and `signup_send` handlers
- Wallet addresses are logged on the server
- Wallet address is included in user session data

## Security Benefits

1. **Wallet Verification**: Users must own a crypto wallet to access the casino
2. **Additional Authentication Layer**: Combines traditional auth with wallet connection
3. **Future Web3 Features**: Enables crypto payments, NFTs, and blockchain functionality
4. **User Identity**: Wallet addresses provide unique user identification

## Future Enhancements

1. **Message Signing**: Use `signMessage` function for cryptographic authentication
2. **Database Storage**: Store wallet addresses in user profiles
3. **Multi-Wallet Support**: Add support for other wallets (WalletConnect, Coinbase)
4. **Crypto Payments**: Accept cryptocurrency for game bets
5. **NFT Integration**: Reward players with unique NFTs

## Development Notes

- MetaMask connection state is managed globally via the `useMetaMask` hook
- All translation strings are added to support multiple languages
- CSS styles are included for proper visual integration
- Server logs wallet connections for monitoring
- Error handling includes user-friendly messages

## Testing

1. Install MetaMask browser extension
2. Create or import a test wallet
3. Visit the sign-in page
4. Test the connection flow
5. Verify traditional authentication still works after wallet connection

## Dependencies Added

- `ethers`: Ethereum library for wallet interaction
- `@metamask/detect-provider`: Detects MetaMask provider

This integration maintains backward compatibility while adding modern web3 functionality to the casino platform. 