import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'

const useMetaMask = () => {
    const [isConnected, setIsConnected] = useState(false)
    const [account, setAccount] = useState('')
    const [provider, setProvider] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        checkConnection()
    }, [])

    const checkConnection = async () => {
        try {
            const ethereum = await detectEthereumProvider()
            if (ethereum) {
                const provider = new ethers.BrowserProvider(ethereum)
                setProvider(provider)
                
                // Check if already connected
                const accounts = await ethereum.request({ method: 'eth_accounts' })
                if (accounts.length > 0) {
                    setAccount(accounts[0])
                    setIsConnected(true)
                }
            }
        } catch (err) {
            console.error('Error checking MetaMask connection:', err)
        }
    }

    const connectWallet = async () => {
        setLoading(true)
        setError('')
        
        try {
            const ethereum = await detectEthereumProvider()
            
            if (!ethereum) {
                throw new Error('MetaMask is not installed. Please install MetaMask to continue.')
            }

            if (ethereum !== window.ethereum) {
                throw new Error('Multiple wallets detected. Please use MetaMask.')
            }

            const accounts = await ethereum.request({ 
                method: 'eth_requestAccounts' 
            })
            
            if (accounts.length > 0) {
                setAccount(accounts[0])
                setIsConnected(true)
                const provider = new ethers.BrowserProvider(ethereum)
                setProvider(provider)
                return accounts[0]
            }
        } catch (err) {
            setError(err.message)
            console.error('Error connecting to MetaMask:', err)
        } finally {
            setLoading(false)
        }
    }

    const disconnectWallet = () => {
        setAccount('')
        setIsConnected(false)
        setProvider(null)
    }

    const signMessage = async (message) => {
        if (!provider || !account) {
            throw new Error('Wallet not connected')
        }

        try {
            const signer = await provider.getSigner()
            const signature = await signer.signMessage(message)
            return signature
        } catch (err) {
            console.error('Error signing message:', err)
            throw err
        }
    }

    return {
        isConnected,
        account,
        provider,
        loading,
        error,
        connectWallet,
        disconnectWallet,
        signMessage
    }
}

export default useMetaMask 