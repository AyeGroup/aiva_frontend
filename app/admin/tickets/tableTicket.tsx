import React, { useMemo, useState } from "react";
import { Edit, Eye, ChevronUp, ChevronDown } from "lucide-react";
import { convertToPersian, formatDateTime } from "@/utils/common";
import { StatusBadge } from "@/app/dashboard/widgets/status-badge";
import { getCategoryLabel, getPriorityLabel } from "@/constants/common";
import { useRouter } from "next/navigation";
import { ProfileModal } from "../users/ProfileModal";

interface CodesTableProps {
  data: any[];
  showUserCol?:boolean;
}

type SortConfig = {
  key: string;
  direction: "ascending" | "descending";
};

const TableTicket: React.FC<CodesTableProps> = ({ data,showUserCol=true }) => {
  const router = useRouter();
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: "ascending",
  });

  const sortedCodes = useMemo(() => {
    const sortableItems = [...data];

    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: SortConfig["direction"] = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronUp size={16} className="text-primary mr-1" />
    ) : (
      <ChevronDown size={16} className="text-secondary mr-1" />
    );
  };

  return (
    <div className="">
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b border-grey-200 bg-grey-50">
            <th
              className="px-3 py-2 text-center text-grey-600 cursor-pointer border-l border-gray-100 "
              onClick={() => requestSort("id")}
            >
              <div className="flex items-center">
                کد {getSortIndicator("id")}
              </div>
            </th>
            <th
              className=" px-3 py-2 text-center text-grey-600 cursor-pointer border-l border-gray-100 "
              onClick={() => requestSort("title")}
            >
              <div className="flex items-center">
                عنوان {getSortIndicator("title")}
              </div>
            </th>
            <th
              className="px-3 py-2 text-center text-grey-600 cursor-pointer border-l border-gray-100 "
              onClick={() => requestSort("status")}
            >
              <div className="flex items-center">
                وضعیت
                {getSortIndicator("status")}
              </div>
            </th>
            <th
              className="px-3 py-2 text-center text-grey-600 cursor-pointer border-l border-gray-100 "
              onClick={() => requestSort("priority")}
            >
              <div className="flex items-center">
                اولویت
                {getSortIndicator("priority")}
              </div>
            </th>
            <th
              className=" px-3 py-2 text-center text-grey-600 cursor-pointer border-l border-gray-100 "
              onClick={() => requestSort("category")}
            >
              <div className="flex items-center">
                دسته
                {getSortIndicator("category")}
              </div>
            </th>
            <th
              className=" px-3 py-2 text-center text-grey-600 cursor-pointer border-l border-gray-100 "
              onClick={() => requestSort("created_at")}
            >
              <div className="flex items-center">
                <span>زمان ایجاد</span>
                {getSortIndicator("created_at")}
              </div>
            </th>
            {showUserCol&&
            <th
            className=" px-3 py-2 text-center text-grey-600 cursor-pointer border-l border-gray-100 "
            onClick={() => requestSort("user.phone")}
            >
              <div className="flex items-center">
                کاربر {getSortIndicator("user.phone")}
              </div>
            </th>
            }
            <th className="px-3 py-2 text-center text-grey-600">مشاهده</th>
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
                  {convertToPersian(code?.id)}
                </span>
              </td>
              <td className="px-3 py-2 text-sm border-l border-gray-100 ">
                {code?.title}
              </td>
              <td className="px-3 py-2 text-sm border-l border-gray-100 ">
                <StatusBadge status={code.status} />
              </td>
              <td className="px-3 py-2 text-sm border-l border-gray-100 ">
                {getPriorityLabel(code.priority)}
              </td>
              <td className="px-3 py-2 border-l border-gray-100 ">
                {getCategoryLabel(code.category)}
              </td>
              <td className="px-3 py-2 border-l border-gray-100 ">
                {formatDateTime(code.updated_at)}
              </td>
            {showUserCol&&

              <td className="px-3 py-2 border-l border-gray-100 ">
                <div className="flex items-center gap-2">
                  <span className=" px-2 py-1 rounded">
                    {convertToPersian(code.user?.phone)}
                  </span>
                  <Eye
                    size={20}
                    className="cursor-pointer text-primary"
                    onClick={() => {
                      setOpenProfile(true);
                      setUser(code.user);
                    }}
                  />
                </div>
              </td>
}

              <td className="px-3 py-2">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => router.push(`/admin/tickets/${code.id}`)}
                    className="inline-flex cursor-pointer items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                    type="button"
                  >
                    <Edit size={20} className="text-primary cursor-pointer" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProfileModal
        open={openProfile}
        data={user}
        onClose={() => setOpenProfile(false)}
      />
    </div>
  );
};

export default TableTicket;
