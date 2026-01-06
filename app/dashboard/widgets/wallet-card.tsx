import React, { useState } from "react";
import PageLoader from "@/components/pageLoader";
import { useBot } from "@/providers/BotProvider";
import { useAuth } from "@/providers/AuthProvider";
import { Wallet, Plus } from "lucide-react";
import { WalletIncreaseModal } from "../components/WalletIncrease";
interface WalletCardProps {
  walletBalance: number;
  isLoading: boolean;
}
export function WalletCard({ walletBalance, isLoading }: WalletCardProps) {
  const [isUpgradeWalletOpen, setIsUpgradeWalletOpen] = useState(false);

  const handleUpgrade = () => {
    setIsUpgradeWalletOpen(true);
  };

   

  return (
    <article className="wallet-minimal-card">
      <header className="wallet-minimal-header">
        {(isLoading ) && <PageLoader />}
        <div className="wallet-header-main">
          <div className="wallet-header-balance">
            <div className="wallet-icon-circle">
              <Wallet
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#65bcb6",
                  strokeWidth: "2",
                }}
                aria-hidden="true"
              />
            </div>
            <div className="wallet-balance-info">
              <h3
                id="wallet-title"
                className="wallet-title text-right font-bold text-[20px]"
              >
                کیف پول
              </h3>
              <div className="wallet-amount" role="status" aria-live="polite">
                <span className="wallet-amount-number text-right text-[24px] font-bold">
                  {walletBalance.toLocaleString("fa-IR")}
                </span>
                <span className="wallet-amount-unit text-right text-[20px]">
                  تومان
                </span>
              </div>
            </div>
          </div>

          {/* Left Side: Actions */}
          <div className="wallet-header-actions">
            <button
              className="wallet-btn wallet-btn-primary"
              onClick={handleUpgrade}
              title="افزایش موجودی"
              type="button"
            >
              <Plus
                style={{ width: "18px", height: "18px", strokeWidth: "2.5" }}
                aria-hidden="true"
              />
              <span>افزایش موجودی</span>
            </button>
          </div>
        </div>
      </header>
      <WalletIncreaseModal
        isOpen={isUpgradeWalletOpen}
        onClose={() => setIsUpgradeWalletOpen(false)}
      />
    </article>
  );
}
