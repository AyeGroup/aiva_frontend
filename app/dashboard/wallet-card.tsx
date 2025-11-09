import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  Plus, 
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
// import { Button } from '../Button/button';
// import './wallet-card-minimal.css';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  referenceId?: string;
}

interface WalletCardProps {
  balance: number;
  totalDeposit: number;
  totalWithdraw: number;
  transactions: Transaction[];
  onAddCredit: () => void;
  onWithdraw?: () => void;
  onDownloadHistory?: () => void;
  previousMonthStats?: {
    deposit: number;
    withdraw: number;
    transactions: number;
  };
  loading?: boolean;
}

type FilterType = 'all' | 'deposit' | 'withdraw';
type StatusFilter = 'all' | 'completed' | 'pending' | 'failed';
type SortType = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

export function WalletCard({
  balance,
  totalDeposit,
  totalWithdraw,
  transactions,
  onAddCredit,
  onWithdraw,
  onDownloadHistory,
  previousMonthStats,
  loading = false
}: WalletCardProps) {
  // State Management
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Utility Functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#52d4a0';
      case 'pending':
        return '#FFA18E';
      case 'failed':
        return '#EF4444';
      default:
        return '#9CA3AF';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'موفق';
      case 'pending':
        return 'در انتظار';
      case 'failed':
        return 'ناموفق';
      default:
        return 'نامشخص';
    }
  };

  // Filtered Transactions (simple - only by type)
  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // Filter by type only
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return filtered;
  }, [transactions, filterType]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  // Export Function (simplified)
  const handleExport = () => {
    if (onDownloadHistory) {
      onDownloadHistory();
    }
  };

  return (
    <article className="wallet-minimal-card" aria-labelledby="wallet-title" dir="rtl">
      {/* Simple Header */}
      <header className="wallet-minimal-header">
        {/* Main Balance Row */}
        <div className="wallet-header-main">
          {/* Right Side: Icon + Balance */}
          <div className="wallet-header-balance">
            <div className="wallet-icon-circle">
              <Wallet style={{ width: '20px', height: '20px', color: '#65bcb6', strokeWidth: '2' }} aria-hidden="true" />
            </div>
            <div className="wallet-balance-info">
              <h3 id="wallet-title" className="wallet-title text-right font-bold text-[20px]">کیف پول</h3>
              <div className="wallet-amount" role="status" aria-live="polite">
                <span className="wallet-amount-number text-right text-[24px] font-bold">{formatCurrency(balance)}</span>
                <span className="wallet-amount-unit text-right text-[20px]">تومان</span>
              </div>
            </div>
          </div>

          {/* Left Side: Actions */}
          <div className="wallet-header-actions">
            <button
              className="wallet-btn wallet-btn-primary"
              onClick={onAddCredit}
              title="افزایش موجودی"
              type="button"
            >
              <Plus style={{ width: '18px', height: '18px', strokeWidth: '2.5' }} aria-hidden="true" />
              <span>افزایش موجودی</span>
            </button>
            
            {onWithdraw && (
              <button
                className="wallet-btn wallet-btn-outline"
                onClick={onWithdraw}
                title="برداشت از کیف پول"
                type="button"
              >
                <Download style={{ width: '18px', height: '18px', strokeWidth: '2.5' }} aria-hidden="true" />
                <span>برداشت</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Row */}

      </header>


    </article>
  );
}
