import React, { useMemo, useState } from "react";
import { Delete } from "@/public/icons/AppIcons";
import { CodeItem } from "@/types/common";
import { Check, X, Edit, Eye, ChevronUp, ChevronDown } from "lucide-react";
import { convertToPersian } from "@/utils/common";

interface CodesTableProps {
  codes: CodeItem[];
  onEdit: (codeData: any) => void;
  onView: (codeData: any) => void;
  onDelete: (id: number) => void;
}

type SortConfig = {
  key: keyof CodeItem | null;
  direction: "ascending" | "descending";
};

const TableSort: React.FC<CodesTableProps> = ({
  codes,
  onEdit,
  onView,
  onDelete,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "ascending",
  });

  const sortedCodes = useMemo(() => {
    const sortableItems = [...codes];

    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof CodeItem];
        const bValue = b[sortConfig.key as keyof CodeItem];

        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [codes, sortConfig]);

  const requestSort = (key: keyof CodeItem) => {
    let direction: SortConfig["direction"] = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof CodeItem) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronUp size={16} className="text-primary mr-1" />
    ) : (
      <ChevronDown size={16} className="text-secondary mr-1" />
    );
  };

  const handleAction = (code: CodeItem) => {
    if (code.is_active) {
      onEdit(code);
    } else {
      onView(code);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b border-grey-200 bg-grey-50">
            <th
              className="px-3 py-2 text-right text-grey-600 cursor-pointer border-l border-gray-100 "
              onClick={() => requestSort("code")}
            >
              <div className="flex items-center">
                کد {getSortIndicator("code")}
              </div>
            </th>
            <th
              className=" px-3 py-2 text-right text-grey-600 cursor-pointer border-l border-gray-100 "
              onClick={() => requestSort("description")}
            >
              <div className="flex items-center">
                توضیحات {getSortIndicator("description")}
              </div>
            </th>
            <th
              className="px-3 py-2 text-right text-grey-600 cursor-pointer border-l border-gray-100 "
              onClick={() => requestSort("discount_type")}
            >
              <div className="flex items-center">
                نوع
                {getSortIndicator("discount_type")}
              </div>
            </th>
            <th
              className="px-3 py-2 text-right text-grey-600 cursor-pointer border-l border-gray-100 "
              onClick={() => requestSort("discount_value")}
            >
              <div className="flex items-center">
                مقدار
                {getSortIndicator("discount_value")}
              </div>
            </th>
            <th
              className=" px-3 py-2 text-right text-grey-600 cursor-pointer border-l border-gray-100 "
              onClick={() => requestSort("is_active")}
            >
              <div className="flex items-center">
                فعال
                {getSortIndicator("is_active")}
              </div>
            </th>
            <th
              className=" px-3 py-2 text-right text-grey-600 cursor-pointer border-l border-gray-100 "
              onClick={() => requestSort("created_at")}
            >
              <div className="flex items-center">
                <span>تاریخ ایجاد</span>
                {getSortIndicator("created_at")}
              </div>
            </th>
            <th
              className=" px-3 py-2 text-right text-grey-600 cursor-pointer border-l border-gray-100 "
              onClick={() => requestSort("valid_until")}
            >
              <div className="flex items-center">
                تاریخ اعتبار {getSortIndicator("valid_until")}
              </div>
            </th>
            <th className="px-3 py-2 text-center text-grey-600">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {sortedCodes.map((code) => (
            <tr
              key={code.id}
              className="border border-grey-100 hover:bg-grey-100 transition-colors"
            >
              <td className="px-3 py-2  border-l border-gray-100 ">
                <span className="rounded-full bg-gray-100 py-1 px-3">
                  {convertToPersian(code?.code)}
                </span>
              </td>
              <td className="px-3 py-2 text-sm border-l border-gray-100 ">
                {code?.description}
              </td>
              <td className="px-3 py-2 border-l border-gray-100 ">
                {code?.discount_type === "percentage" ? "درصد" : "مقدار"}
              </td>
              <td className="px-3 py-2 border-l border-gray-100 ">
                {code?.discount_value.toLocaleString("fa-IR")}
              </td>
              <td className="px-3 py-2 border-l border-gray-100  ">
                {code?.is_active ? (
                  <Check size={20} className="text-primary" />
                ) : (
                  <X size={20} className="text-red-400" />
                )}
              </td>

              <td className="px-3 py-2 border-l border-gray-100 ">
                <time dateTime={code.created_at} className="text-grey-600">
                  {new Date(code.created_at).toLocaleDateString("fa-IR")}
                </time>
              </td>
              <td className="px-3 py-2 border-l border-gray-100 ">
                <time dateTime={code.valid_until} className="text-grey-600">
                  {new Date(code.valid_until).toLocaleDateString("fa-IR")}
                </time>
              </td>

              <td className="px-3 py-2">
                {code.id && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleAction(code)}
                      className="inline-flex cursor-pointer items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                      type="button"
                    >
                      {code?.is_active ? (
                        <Edit
                          size={20}
                          className="text-primary cursor-pointer"
                        />
                      ) : (
                        <Eye
                          size={20}
                          className="text-primary cursor-pointer"
                        />
                      )}
                    </button>
                    {code?.is_active && (
                      <button
                        onClick={() => onDelete(code.id)}
                        className="inline-flex cursor-pointer items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                        type="button"
                      >
                        <div className="w-5 text-red-400 cursor-pointer">
                          <Delete />
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSort;
