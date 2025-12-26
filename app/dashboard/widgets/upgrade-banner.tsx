import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { Zap, Crown, ArrowUp } from "lucide-react";
import Link from "next/link";

export function UpgradeBanner() {
  return (
    <Card className="p-6 border-2">
      <div className="text-center">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "var(--sharp-primary)" }}
        >
          <Crown className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-grey-900 mb-2 flex items-center justify-center gap-2">
          <Zap className="w-5 h-5 text-brand-tertiary" />
          پلن سفارشی
        </h3>

        <p className="text-grey-600 text-body-small mb-4">
          امکانات پیشرفته‌تر برای کسب‌وکار شما
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-body-small">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-grey-700">امکان خرید یا رزرو محصول</span>
          </div>
          <div className="flex items-center gap-2 text-body-small">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-grey-700">امکان دریافت تحلیل های سفارشی</span>
          </div>
        </div>

        <a
          href="tel:09903202903"
          className="md:hidden p-3 text-sm flex justify-center items-center mx-auto w-full bg-primary rounded-sm text-white text-center hover:shadow-md transition-all"
        >
          <ArrowUp className="w-4 h-4 ml-2" />
          تماس با ما
        </a>

        <a
          href="/contact"
          className="hidden md:flex p-3 text-sm justify-center items-center mx-auto w-full bg-primary rounded-sm text-white text-center hover:shadow-md transition-all"
        >
          <div className="flex">
            <ArrowUp className="w-4 h-4 ml-2" />
            تماس با ما
          </div>
        </a>
      </div>
    </Card>
  );
}
