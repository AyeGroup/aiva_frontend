"use client";

import React, { useMemo, useState } from "react";
import { Transaction } from "@/types/common";
import { ProfileModal } from "../users/ProfileModal";
import { convertToPersian, formatDateTime } from "@/utils/common";
import { getTransactionTitle, TRANSACTION_TYPE } from "@/constants/plans";
import { Eye, ChevronUp, ChevronDown, ArrowDown, ArrowUp } from "lucide-react";

interface Props {
  data: Transaction[];
  showUserCol?: boolean;
}

type SortConfig = {
  key: keyof Transaction | null;
  direction: "ascending" | "descending";
};

const TableTransaction: React.FC<Props> = ({ data, showUserCol = true }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "ascending",
  });

  const sortedItems = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const key = sortConfig.key!; // ⬅️ حالا TypeScript مطمئنه

      const aVal = a[key];
      const bVal = b[key];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (aVal < bVal) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key: keyof Transaction) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortIcon = (key: keyof Transaction) =>
    sortConfig.key === key ? (
      sortConfig.direction === "ascending" ? (
        <ChevronUp size={14} />
      ) : (
        <ChevronDown size={14} />
      )
    ) : null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-grey-50 border-b">
            <th
              onClick={() => requestSort("id")}
              className="px-3 py-2 text-right text-grey-600"
            >
              کد {sortIcon("id")}
            </th>
            <th
              onClick={() => requestSort("id")}
              className="px-3 py-2 text-right text-grey-600"
            >
              کد پیگیری {sortIcon("tracking_code")}
            </th>
            <th
              onClick={() => requestSort("type")}
              className="px-3 py-2 text-right text-grey-600"
            >
              عنوان تراکنش
            </th>
            <th
              onClick={() => requestSort("direction")}
              className="px-3 py-2 text-right text-grey-600"
            >
              نوع تراکنش
            </th>
            <th
              onClick={() => requestSort("description")}
              className="px-3 py-2 text-right text-grey-600"
            >
              توضیحات
            </th>
            <th
              onClick={() => requestSort("amount")}
              className="flex gap-0.5 px-3 py-2 text-right text-grey-600"
            >
              مبلغ
              <span className="text-xs text-gray-500">تومان</span>
            </th>
            <th className="px-3 py-2 text-right text-grey-600">وضعیت</th>
            <th
              onClick={() => requestSort("created_at")}
              className="px-3 py-2 text-right text-grey-600"
            >
              تاریخ
            </th>
            {showUserCol && (
              <th className="px-3 py-2 text-right text-grey-600">کاربر</th>
            )}
          </tr>
        </thead>

        <tbody>
          {sortedItems.map((tx, index) => (
            <tr
              key={index}
              className="border-b last:border-b-0 border-gray-100 hover:bg-grey-100 transition"
            >
              <td className="px-3 py-2 text-sm">
                <span className="rounded-full bg-gray-100 py-1 px-3">
                {convertToPersian(tx.id)
                }
                </span>
                </td>
              <td className="px-3 py-2 text-sm">{tx.tracking_code}</td>
              <td className="px-3 py-2 text-sm">
                {getTransactionTitle(tx.type as TRANSACTION_TYPE)}
              </td>
              <td className="px-3 py-2 text-sm">
                {tx.direction === "income" ? (
                  <div className="flex items-center gap-1">
                    <ArrowUp className="text-primary" size={16} />
                    واریز
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <ArrowDown className="text-secondary" size={16} />
                    برداشت
                  </div>
                )}
              </td>
              <td className="px-3 py-2 text-sm">{tx.description}</td>

              <td className="px-3 py-2 text-sm font-medium">
                {convertToPersian(tx.amount.toLocaleString("fa-IR"))}
              </td>
              <td className="px-3 py-2 text-sm">
                <div
                  style={{
                    color:
                      tx.status === "success"
                        ? "#65BCB6"
                        : tx.status === "failed"
                          ? "#f59e0b"
                          : "#FFA18E",
                  }}
                >
                  {tx.status === "success"
                    ? "موفق"
                    : tx.status === "failed"
                      ? "ناموفق"
                      : tx.status === "cancelled"
                        ? "لغو شده"
                        : "نا مشخص"}
                </div>
              </td>
              <td className="px-3 py-2 text-sm">
                {formatDateTime(tx.created_at)}
              </td>
              {showUserCol && (
                <td className="px-3 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>{tx.user_name}</span>
                    <Eye
                      size={18}
                      className="cursor-pointer text-primary"
                      onClick={() => {
                        setUser(tx.user_id);
                        setOpenProfile(true);
                      }}
                    />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <ProfileModal
        open={openProfile}
        data={null}
        id={user}
        onClose={() => setOpenProfile(false)}
      />
    </div>
  );
};

export default TableTransaction;
