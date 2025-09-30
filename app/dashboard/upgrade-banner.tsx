import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { Zap, Crown, ArrowUp } from "lucide-react";

export function UpgradeBanner() {
  return (
    <Card
      className="p-6 border-2"
      // style={{
      //   backgroundColor: "var(--sharp-primary)",
      //   opacity: 0.05,
      //   borderColor: "var(--sharp-primary)",
      // }}
    >
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

        <Button
          // variant="primary"
          // size="small"
          className="w-full hover:shadow-md transition-all"
          // style={{ background: "var(--sharp-accent)" }}
        >
          <ArrowUp className="w-4 h-4 ml-2" />
          تماس با ما
        </Button>
      </div>
    </Card>
  );
}
