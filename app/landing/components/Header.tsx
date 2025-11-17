"use client";
import Image from "next/image";

const menuItems = [
  { label: "خانه", href: "/", active: true },
  { label: "ویژگی‌ها", href: "/#features", badge: "جدید" },
  { label: "نحوه کار", href: "/#luanch" },
  { label: "نمونه کارها", href: "#section4" },
  { label: "قیمت‌گذاری", href: "/#pricing" },
  { label: "سوالات متداول", href: "/#faq" },
  // { label: "بلاگ", href: "#" },
  { label: "تماس با ما", href: "/contact" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-white">
      {/* ✅ Logo */}
      <div className="flex items-center gap-3 ali">
        <Image src="/logo.png" alt="لوگوی آیوا" width={48} height={48} />
        <div className="text-right leading-tight">
          <p className="text-lg text-gray-900 font-semibold">آیوا</p>
          <p className="text-sm text-gray-600">دستیار هوشمند</p>
        </div>
      </div>

      {/* ✅ Menu */}
      <nav className="flex items-center gap-2">
        {menuItems.map(({ label, href, badge, active }) => (
          <a
            key={href}
            href={href}
            className={`flex items-center p-2 gap-1 rounded-2xl transition-all duration-200
              ${
                active
                  ? "bg-gray-100 text-[#65bcb6]"
                  : "text-gray-700 hover:text-[#65bcb6]"
              }`}
              >
            {label}
            {badge && (
              <span className="bg-[#e67e7e] text-white text-xs px-2 -mt-2 rounded-full">
                {badge}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* ✅ Auth buttons */}
      <div className="flex items-center gap-4">
        <a href="/dashboard" className="text-[#65bcb6] text-base">
          ورود
        </a>
        <a
          href="/onboarding"
          className="flex items-center gap-2 bg-[#65bcb6] text-white px-4 py-2 rounded-sm shadow hover:bg-[#58aaa5] transition"
        >
          شروع رایگان
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M3.75 9H14.25M9 3.75L14.25 9L9 14.25"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </a>
      </div>
    </header>
  );
}

// function Icon() {
//   return (
//     <div className="relative size-[18px]" data-name="Icon">
//       <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
//         <g id="Icon">
//           <path d="M3.75 9H14.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
//           <path d="M9 3.75L14.25 9L9 14.25" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
//         </g>
//       </svg>
//     </div>
//   );
// }

// function Text() {
//   return (
//     <div className="h-[24px] relative shrink-0 w-[76.133px]" data-name="Text">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[76.133px]">
//         <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-0.5px] whitespace-pre" dir="auto">
//           شروع رایگان
//         </p>
//       </div>
//     </div>
//   );
// }

// function Button() {
//   return (
//     <div className="bg-[#65bcb6] box-border content-stretch flex gap-[12px] items-center justify-center overflow-clip p-[12px] relative rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0" data-name="Button">
//       <div className="flex items-center justify-center relative shrink-0">
//         <div className="flex-none rotate-[180deg]">
//           <Icon />
//         </div>
//       </div>
//       <Text />
//     </div>
//   );
// }

// function Text1() {
//   return (
//     <div className="h-[24px] relative shrink-0 w-[27.117px]" data-name="Text">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[27.117px]">
//         <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#65bcb6] text-[16px] text-nowrap top-[-0.5px] whitespace-pre" dir="auto">
//           ورود
//         </p>
//       </div>
//     </div>
//   );
// }

// function Button1() {
//   return (
//     <div className="content-stretch flex h-[48px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-[59.117px]" data-name="Button">
//       <Text1 />
//     </div>
//   );
// }

// function Container() {
//   return (
//     <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] items-center relative w-full">
//         <Button />
//         <Button1 />
//       </div>
//     </div>
//   );
// }

// function Text2() {
//   return (
//     <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
//         <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[20px] left-0 text-[16px] text-gray-700 text-nowrap top-0 whitespace-pre" dir="auto">
//           تماس با ما
//         </p>
//       </div>
//     </div>
//   );
// }

// function Link() {
//   return (
//     <div className="absolute box-border content-stretch flex h-[36px] items-center left-0 px-[12px] py-0 rounded-[24px] top-0 w-[82.969px]" data-name="Link">
//       <Text2 />
//     </div>
//   );
// }

// function ListItem() {
//   return (
//     <div className="h-[36px] relative shrink-0 w-[82.969px]" data-name="List Item">
//       <Link />
//     </div>
//   );
// }

// function Text3() {
//   return (
//     <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
//         <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[20px] left-0 text-[16px] text-gray-700 text-nowrap top-0 whitespace-pre" dir="auto">
//           بلاگ
//         </p>
//       </div>
//     </div>
//   );
// }

// function Link1() {
//   return (
//     <div className="absolute box-border content-stretch flex h-[36px] items-center left-0 px-[12px] py-0 rounded-[24px] top-0 w-[48.828px]" data-name="Link">
//       <Text3 />
//     </div>
//   );
// }

// function ListItem1() {
//   return (
//     <div className="h-[36px] relative shrink-0 w-[48.828px]" data-name="List Item">
//       <Link1 />
//     </div>
//   );
// }

// function Text4() {
//   return (
//     <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
//         <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[20px] left-0 text-[16px] text-gray-700 text-nowrap top-0 whitespace-pre" dir="auto">
//           سوالات متداول
//         </p>
//       </div>
//     </div>
//   );
// }

// function Link2() {
//   return (
//     <div className="absolute box-border content-stretch flex h-[36px] items-center left-0 px-[12px] py-0 rounded-[24px] top-0 w-[106.828px]" data-name="Link">
//       <Text4 />
//     </div>
//   );
// }

// function ListItem2() {
//   return (
//     <div className="h-[36px] relative shrink-0 w-[106.828px]" data-name="List Item">
//       <Link2 />
//     </div>
//   );
// }

// function Text5() {
//   return (
//     <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
//         <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[20px] left-0 text-[16px] text-gray-700 text-nowrap top-0 whitespace-pre" dir="auto">
//           قیمت‌گذاری
//         </p>
//       </div>
//     </div>
//   );
// }

// function Link3() {
//   return (
//     <div className="absolute box-border content-stretch flex h-[36px] items-center left-0 px-[12px] py-0 rounded-[24px] top-0 w-[88.094px]" data-name="Link">
//       <Text5 />
//     </div>
//   );
// }

// function ListItem3() {
//   return (
//     <div className="h-[36px] relative shrink-0 w-[88.094px]" data-name="List Item">
//       <Link3 />
//     </div>
//   );
// }

// function Text6() {
//   return (
//     <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
//         <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[20px] left-0 text-[16px] text-gray-700 text-nowrap top-0 whitespace-pre" dir="auto">
//           نمونه کارها
//         </p>
//       </div>
//     </div>
//   );
// }

// function Link4() {
//   return (
//     <div className="absolute box-border content-stretch flex h-[36px] items-center left-0 px-[12px] py-0 rounded-[24px] top-0 w-[84.227px]" data-name="Link">
//       <Text6 />
//     </div>
//   );
// }

// function ListItem4() {
//   return (
//     <div className="h-[36px] relative shrink-0 w-[84.227px]" data-name="List Item">
//       <Link4 />
//     </div>
//   );
// }

// function Text7() {
//   return (
//     <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
//         <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[20px] left-0 text-[16px] text-gray-700 text-nowrap top-0 whitespace-pre" dir="auto">
//           نحوه کار
//         </p>
//       </div>
//     </div>
//   );
// }

// function Link5() {
//   return (
//     <div className="absolute box-border content-stretch flex h-[36px] items-center left-0 px-[12px] py-0 rounded-[24px] top-0 w-[68.719px]" data-name="Link">
//       <Text7 />
//     </div>
//   );
// }

// function ListItem5() {
//   return (
//     <div className="h-[36px] relative shrink-0 w-[68.719px]" data-name="List Item">
//       <Link5 />
//     </div>
//   );
// }

// function Text8() {
//   return (
//     <div className="bg-[#e67e7e] h-[14px] relative rounded-[16px] shrink-0 w-[32.453px]" data-name="Text">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[32.453px]">
//         <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[10px] left-[6px] text-[10px] text-nowrap text-white top-[2px] whitespace-pre" dir="auto">
//           جدید
//         </p>
//       </div>
//     </div>
//   );
// }

// function Text9() {
//   return (
//     <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
//         <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[20px] left-0 text-[16px] text-gray-700 text-nowrap top-0 whitespace-pre" dir="auto">
//           ویژگی‌ها
//         </p>
//       </div>
//     </div>
//   );
// }

// function Link6() {
//   return (
//     <div className="absolute box-border content-stretch flex gap-[8px] h-[36px] items-center left-0 px-[12px] py-0 rounded-[24px] top-0 w-[108.586px]" data-name="Link">
//       <Text8 />
//       <Text9 />
//     </div>
//   );
// }

// function ListItem6() {
//   return (
//     <div className="h-[36px] relative shrink-0 w-[108.586px]" data-name="List Item">
//       <Link6 />
//     </div>
//   );
// }

// function Text10() {
//   return (
//     <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
//         <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#65bcb6] text-[16px] text-nowrap top-0 whitespace-pre" dir="auto">
//           خانه
//         </p>
//       </div>
//     </div>
//   );
// }

// function Link7() {
//   return (
//     <div className="absolute bg-[rgba(255,255,255,0.5)] box-border content-stretch flex h-[36px] items-center left-0 px-[12px] py-0 rounded-[24px] top-0 w-[48.297px]" data-name="Link">
//       <Text10 />
//     </div>
//   );
// }

// function ListItem7() {
//   return (
//     <div className="h-[36px] relative shrink-0 w-[48.297px]" data-name="List Item">
//       <Link7 />
//     </div>
//   );
// }

// function List() {
//   return (
//     <div className="h-full relative shrink-0" data-name="List">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-full items-center relative">
//         <ListItem />
//         <ListItem1 />
//         <ListItem2 />
//         <ListItem3 />
//         <ListItem4 />
//         <ListItem5 />
//         <ListItem6 />
//         <ListItem7 />
//       </div>
//     </div>
//   );
// }

// function Text11() {
//   return (
//     <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Text">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[10px] items-end justify-center relative size-full">
//         <p className="font-['Vazirmatn:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[16px] text-gray-900 text-nowrap text-right whitespace-pre" dir="auto">
//           آیوا
//         </p>
//       </div>
//     </div>
//   );
// }

// function Text12() {
//   return (
//     <div className="h-[12px] relative shrink-0 w-[74.773px]" data-name="Text">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[12px] relative w-[74.773px]">
//         <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[12px] left-0 text-[12px] text-gray-600 text-nowrap top-[-0.5px] whitespace-pre" dir="auto">
//           دستیار هوشمند
//         </p>
//       </div>
//     </div>
//   );
// }

// function Container1() {
//   return (
//     <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] items-end justify-center relative size-full">
//         <Text11 />
//         <Text12 />
//       </div>
//     </div>
//   );
// }

// function Image() {
//   return (
//     <div className="relative shrink-0 size-[48px]" data-name="Image (لوگوی آیوا - دستیار هوشمند وب‌سایت)">
//       <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src="./logo.png" />
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[48px]" />
//     </div>
//   );
// }

// function Button2() {
//   return (
//     <div className="h-[48px] relative shrink-0 w-[134.773px]" data-name="Button">
//       <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[48px] items-center relative w-[134.773px]">
//         <Container1 />
//         <Image />
//       </div>
//     </div>
//   );
// }

// export default function Header() {
//   return (
//     <div className="relative size-full" data-name="Header">
//       <div className="flex flex-row items-center justify-end size-full">
//         <div className="box-border content-stretch flex gap-[40.781px] items-center justify-end p-[32px] relative size-full">
//           <Container />
//           <div className="flex flex-row items-center self-stretch">
//             <List />
//           </div>
//           <Button2 />
//         </div>
//       </div>
//     </div>
//   );
// }
