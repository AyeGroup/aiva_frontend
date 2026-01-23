"use client";
import React, { useEffect, useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { useAuth } from "@/providers/AuthProvider";
import { notFound } from "next/navigation";
import { Eye, User, Users } from "lucide-react";
import { ProfileModal } from "../ProfileModal";
import { DashChats } from "@/public/icons/AppIcons";

type Props = {
  params: {
    id: string;
  };
};

export default function UserPage({ params }: Props) {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (!user?.token) return;
    const fetchData = async () => {
      await getUser();
    };

    fetchData();
  }, [user?.token]);

  async function getUser() {
    try {
      setIsLoading(true);
      setUserData([]);

      const res = await axiosInstance.get(`/admin/user-chatbots/${params.id}`);
      setUserData(res.data);
    } catch (error: any) {
      if (error.response?.status === 404) {
        notFound();
      }

      console.warn("API fetch failed, using local data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCode = async (id: string) => {
    setShowCodeModal(true);
    setProfileData(id);
  };

  return (
    <div className="lg:h-screen w-full overflow-hidden">
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        {(isLoading || loading) && <PageLoader />}
        <div className="max-w-7xl mx-auto pb-8">
          {/* Page Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="text-right">
              <h1 className="text-grey-900 mb-0 mr-2 lg:mr-10 text-2xl lg:text-3xl font-bold">
                شرکت آیا{" "}
              </h1>
            </div>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
              className={`group bg-white backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105  overflow-hidden relative`}
            >
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-y-2 translate-x-2`}
              ></div>

              <div className="relative text-center">
                <div className="flex justify-center item-center mb-3">
                  <div
                    className={`w-10 h-10  rounded-xl flex items-center justify-center shadow-lg bg-primary transition-all duration-300  `}
                  >
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div
                  className={`text-lg font-black text-grey-900 mb-1 transition-colors text-center`}
                >
                  کاربران
                </div>
                <div
                  className="font-medium text-center leading-tight"
                  style={{ color: "#A6A6A6" }}
                >
                  {/* {data?.all_users_count || ""} */}
                </div>
              </div>
            </div>
            <div className="group bg-white backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden relative">
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-secondary/10 rounded-full -translate-y-2 translate-x-2`}
              ></div>

              <div className="relative text-center">
                <div className="flex justify-center item-center mb-3">
                  <div className="w-10 h-10  rounded-xl flex items-center justify-center shadow-lg bg-secondary transition-all duration-300 ">
                    <div className="w-4 h-4 text-white">
                      <DashChats />
                    </div>
                  </div>
                </div>
                <div
                  className={`text-lg font-black text-grey-900 mb-1 transition-colors text-center`}
                >
                  چت‌بات‌ها
                </div>
                <div className="font-medium text-center leading-tight "></div>
              </div>
            </div>

            <div className="group bg-white  backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105  overflow-hidden relative">
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-brand-purple/10 rounded-full -translate-y-2 translate-x-2`}
              ></div>

              <div className="relative text-center">
                <div className="flex justify-center item-center mb-3">
                  <div className="w-10 h-10  rounded-xl flex items-center justify-center shadow-lg bg-brand-purple transition-all duration-300">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div
                  className={`text-lg font-black text-grey-900 mb-1 transition-colors text-center`}
                >
                  کاربران چت‌بات‌ها
                </div>
                <div className="font-medium text-center leading-tight">
                  {/* {data?.all_chatbots_count || ""} */}
                </div>
              </div>
            </div>
          </div>

          {/* Chatbots List */}
          <div className="bg-white rounded-3xl border border-grey-100 mt-5 shadow-card w-full ">
            <div className="p-6 border-b border-grey-100">
              <h2 className="font-bold text-grey-900 text-xl">کاربران</h2>
            </div>

            <div className=" divide-grey-100 w-full ">
              <table className="w-full table-auto table-cell ">
                <thead>
                  <tr className="border-b border-grey-200 bg-grey-50">
                    <th className="px-3 py-2 text-right text-grey-600">
                      موبایل
                    </th>
                    <th className="px-3 py-2 text-right text-grey-600">
                      ایمیل
                    </th>
                    <th className="px-3 py-2 text-right text-grey-600">نام</th>
                    <th className="px-3 py-2 text-right text-grey-600">شرکت</th>
                    <th className="px-3 py-2 text-right text-grey-600">
                      مجموع کاربران
                    </th>
                    <th className="px-3 py-2 text-right text-grey-600">
                      تاریخ ثبت نام
                    </th>

                    <th className="px-3 py-2 text-center text-grey-600">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user: any, index: number) => (
                    <tr
                      key={index}
                      className="border border-grey-100 hover:bg-grey-100 transition-colors"
                    >
                      <td className="px-3 py-2 text-sm">{user?.id}</td>
                      <td className="px-3 py-2 text-sm">{user?.phone}</td>
                      <td className="px-3 py-2 text-sm">{user?.email}</td>
                      <td className="px-3 py-2">{user?.full_name}</td>
                      <td className="px-3 py-2">{user?.company_name}</td>
                      <td className="px-3 py-2">{user?.company_role}</td>

                      {/* تاریخ */}
                      <td className="px-3 py-2">
                        <time
                          dateTime={user.created_at}
                          className="text-grey-600"
                        >
                          {new Date(user.created_at).toLocaleDateString(
                            "fa-IR"
                          )}
                        </time>
                      </td>

                      <td className="px-3 py-2">
                        {user.id && (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                handleCode(user.code);
                              }}
                              className="inline-flex cursor-pointer items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                              type="button"
                            >
                              <Eye
                                size={20}
                                className="text-primary cursor-pointer"
                              />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ProfileModal
          open={showCodeModal}
          data={profileData}
          onClose={() => {
            setShowCodeModal(false);
            setProfileData(null);
          }}
        />
      </main>
    </div>
  );
}
