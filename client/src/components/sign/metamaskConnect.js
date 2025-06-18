import React from 'react'
import { Button, Alert } from 'react-bootstrap'
import { translate } from '../../translations/translate'
import useMetaMask from '../../utils/useMetaMask'

function MetaMaskConnect({ lang, onWalletConnected }) {
    const { 
        isConnected, 
        account, 
        loading, 
        error, 
        connectWallet 
    } = useMetaMask()

    const handleConnectWallet = async () => {
        try {
            const walletAddress = await connectWallet()
            if (walletAddress && onWalletConnected) {
                onWalletConnected(walletAddress)
            }
        } catch (err) {
            console.error('Failed to connect wallet:', err)
        }
    }

    const formatAddress = (address) => {
        if (!address) return ''
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

    return (
        <div className="metamask_container">
            {!isConnected ? (
                <div className="wallet_connect_prompt">
                    <div className="wallet_icon">🦊</div>
                    <h4>{translate({lang: lang, info: "wallet_connection_required"})}</h4>
                    <p>{translate({lang: lang, info: "connect_wallet_description"})}</p>
                    
                    <Button 
                        variant="primary" 
                        onClick={handleConnectWallet}
                        disabled={loading}
                        size="lg"
                        className="mb-3"
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                {translate({lang: lang, info: "connecting"})}
                            </>
                        ) : (
                            <>
                                🦊 {translate({lang: lang, info: "connect_metamask"})}
                            </>
                        )}
                    </Button>
                    
                    {error && (
                        <Alert variant="danger" className="mt-3">
                            {error}
                        </Alert>
                    )}
                    
                    <div className="mt-3">
                        <small>
                            {translate({lang: lang, info: "no_metamask"})}
                            <a 
                                href="https://metamask.io/download.html" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary"
                            >
                                {translate({lang: lang, info: "install_metamask"})}
                            </a>
                        </small>
                    </div>
                </div>
            ) : (
                <div className="wallet_connected">
                    <div className="connection_status">
                        <span className="status_indicator"></span>
                        <strong>{translate({lang: lang, info: "wallet_connected"})}</strong>
                    </div>
                    <div className="wallet_address">
                        {formatAddress(account)}
                    </div>
                    <small className="text-success">
                        ✅ {translate({lang: lang, info: "metamask_signin_description"})}
                    </small>
                </div>
            )}
        </div>
    )
}

export default MetaMaskConnect 