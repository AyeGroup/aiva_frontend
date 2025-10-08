import { useState } from 'react';
import { NumericInput } from "@/components/numeric-input";
import { Input } from '@/components/input';
import { englishToPersian } from '@/utils/number-utils';

export function NumericInputExample() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('');

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border border-grey-200">
      <h3 className="text-grey-900 mb-4">نمونه‌های ورودی عددی</h3>
      
      {/* Phone Number Input */}
      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">
          شماره تلفن
        </label>
        <Input
          type="tel"
          numeric
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          maxLength={11}
        />
        <p className="text-xs text-grey-500 mt-1">
          مقدار ذخیره شده: {phoneNumber} | نمایش: {englishToPersian(phoneNumber)}
        </p>
      </div>

      {/* Amount Input with Decimal */}
      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">
          مبلغ (با اعشار)
        </label>
        <NumericInput
          allowDecimal
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="۱۲۳.۴۵"
        />
        <p className="text-xs text-grey-500 mt-1">
          مقدار ذخیره شده: {amount} | نمایش: {englishToPersian(amount)}
        </p>
      </div>

      {/* Quantity Input */}
      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">
          تعداد
        </label>
        <NumericInput
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="۱۲۳"
          maxLength={5}
        />
        <p className="text-xs text-grey-500 mt-1">
          مقدار ذخیره شده: {quantity} | نمایش: {englishToPersian(quantity)}
        </p>
      </div>

      {/* Display Values */}
      <div className="bg-grey-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-grey-700 mb-2">مقادیر ذخیره شده (انگلیسی):</h4>
        <ul className="text-sm text-grey-600 space-y-1">
          <li>شماره تلفن: <code>{phoneNumber}</code></li>
          <li>مبلغ: <code>{amount}</code></li>
          <li>تعداد: <code>{quantity}</code></li>
        </ul>
      </div>
    </div>
  );
}