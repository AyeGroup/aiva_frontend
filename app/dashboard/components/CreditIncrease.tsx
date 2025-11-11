import React, { useState } from "react";
// import { Modal } from "@/components/ui/modal"; // مسیر مودال خودت
// import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Modal } from "../modal";
import { Button } from "@/components/button";

interface CreditIncreaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedChatbotName: string;
  calculateMessagePrice: (count: number) => {
    pricePerMessage: number;
    discountPercent: number;
  };
  handleCreditIncrease: (count: number) => void;
}

export const CreditIncreaseModal: React.FC<CreditIncreaseModalProps> = ({
  isOpen,
  onClose,
  selectedChatbotName,
  calculateMessagePrice,
  handleCreditIncrease,
}) => {
  const [messageCount, setMessageCount] = useState<string>("");

  const count = parseInt(messageCount) || 0;
  const { pricePerMessage, discountPercent } =
    count >= 100
      ? calculateMessagePrice(count)
      : { pricePerMessage: 0, discountPercent: 0 };
  const basePrice = count * pricePerMessage;
  const tax = Math.round(basePrice * 0.09);
  const totalPrice = basePrice + tax;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`افزایش اعتبار - ${selectedChatbotName}`}
      size="sm"
    >
      <div className="space-y-4">
        {/* ورودی تعداد پیام */}
        <div>
          <label
            htmlFor="message-count"
            className="block text-grey-900 mb-2 text-right"
          >
            تعداد پیام مورد نیاز
          </label>
          <input
            id="message-count"
            type="number"
            min={100}
            step={100}
            value={messageCount}
            onChange={(e) => setMessageCount(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-grey-200 focus:border-[#65bcb6] focus:outline-none transition-colors"
            placeholder="مثال: 1000"
          />
          <p className="text-grey-500 mt-1.5" style={{ fontSize: "0.875rem" }}>
            حداقل ۱۰۰ پیام
          </p>
        </div>

        {/* قیمت‌گذاری کامپکت */}
        <div className="p-3 rounded-xl bg-grey-50">
          <p className="text-grey-700 mb-2" style={{ fontSize: "0.875rem" }}>
            قیمت‌گذاری پله‌ای:
          </p>
          <div
            className="grid grid-cols-2 gap-2"
            style={{ fontSize: "0.8125rem" }}
          >
            <div className="text-grey-600">تا ۵ هزار</div>
            <div className="text-left text-grey-900">۵۰ ت</div>

            <div className="text-grey-600">۵-۱۰ هزار</div>
            <div className="text-left text-grey-900">۴۰ ت</div>

            <div className="text-grey-600">۱۰-۲۰ هزار</div>
            <div className="text-left text-green-600">۳۵ ت (۵٪ 🎁)</div>

            <div className="text-grey-600">۲۰-۵۰ هزار</div>
            <div className="text-left text-green-600">۳۰ ت (۱۰٪ 🎁)</div>

            <div className="text-grey-600">بیش از ۵۰ هزار</div>
            <div className="text-left text-green-600">۲۵ ت (۱۵٪ 🎁)</div>
          </div>
        </div>

        {/* فاکتور */}
        {count >= 100 && (
          <div className="p-4 rounded-xl border-2 border-[#65bcb6] bg-gradient-to-br from-[#65bcb6]/5 to-[#65bcb6]/10">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle
                style={{ width: "18px", height: "18px", color: "#65bcb6" }}
              />
              <span className="text-grey-900">فاکتور</span>
            </div>

            <div className="space-y-2" style={{ fontSize: "0.875rem" }}>
              <div className="flex items-center justify-between">
                <span className="text-grey-600">
                  {new Intl.NumberFormat("fa-IR").format(count)} پیام ×{" "}
                  {new Intl.NumberFormat("fa-IR").format(pricePerMessage)} تومان
                </span>
                <span className="text-grey-900">
                  {new Intl.NumberFormat("fa-IR").format(basePrice)} ت
                </span>
              </div>

              {discountPercent > 0 && (
                <div className="flex items-center justify-between text-green-600">
                  <span>تخفیف {discountPercent}٪ 🎁</span>
                  <span>-</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-grey-600">مالیات ۹٪</span>
                <span className="text-grey-900">
                  {new Intl.NumberFormat("fa-IR").format(tax)} ت
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t-2 border-[#65bcb6]">
                <span className="text-grey-900">قابل پرداخت</span>
                <span
                  className="text-[#65bcb6]"
                  style={{ fontSize: "1.125rem", fontWeight: 600 }}
                >
                  {new Intl.NumberFormat("fa-IR").format(totalPrice)} تومان
                </span>
              </div>
            </div>
          </div>
        )}

        {/* دکمه‌ها */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            onClick={() => handleCreditIncrease(count)}
            disabled={count < 100}
            className="flex-1 px-5 py-2.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-white bg-primary"
            // style={{ backgroundColor: "#65bcb6", color: "white" }}
          >
            پرداخت
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl"
          >
            انصراف
          </Button>
        </div>
      </div>
    </Modal>
  );
};
