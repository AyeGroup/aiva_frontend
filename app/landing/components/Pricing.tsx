import svgPaths from "../svg/svg-f338pva7p3";

function Text() {
  return (
    <div
      className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0"
      data-name="Text"
    >
      <p
        className="f] font-medium leading-[20px] relative shrink-0 text-[#65bcb6] text-[14px] text-center text-nowrap whitespace-pre"
        dir="auto"
      >{`پلن های خرید `}</p>
    </div>
  );
}

function Container() {
  return (
    <div
      className="bg-[#65bcb6] rounded-[1.67772e+07px] shrink-0 size-[8px]"
      data-name="Container"
    />
  );
}

function Container1() {
  return (
    <div
      className="bg-[#65bcb6] content-stretch flex gap-[10px] items-center relative rounded-[1.67772e+07px] shrink-0"
      data-name="Container"
    >
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div
      className="bg-white box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative rounded-[1.67772e+07px] shrink-0"
      data-name="Container"
    >
      <Text />
      <Container1 />
    </div>
  );
}

function Heading2() {
  return (
    <div
      className="h-[57.594px] relative shrink-0 w-[1232px]"
      data-name="Heading 2"
    >
      <p
        className="absolute f] font-extrabold leading-[57.6px] left-[616.05px] text-[48px] text-center text-gray-900 text-nowrap top-[-1px] tracking-[-0.96px] translate-x-[-50%] whitespace-pre"
        dir="auto"
      >
        پلنی که با کسب‌وکارت همساز باشه انتخاب کن
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div
      className="content-stretch flex h-[28.797px] items-start relative shrink-0 w-[672px]"
      data-name="Paragraph"
    >
      <p
        className="basis-0 f] font-normal grow leading-[28.8px] min-h-px min-w-px relative shrink-0 text-[18px] text-center text-gray-600"
        dir="auto"
      >
        از رایگان شروع کن یا با پلن‌های حرفه‌ای، کسب‌وکارت رو به سطح جدیدی ببر
      </p>
    </div>
  );
}

function Header() {
  return (
    <div
      className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-full"
      data-name="Header"
    >
      <Container2 />
      <Heading2 />
      <Paragraph />
    </div>
  );
}

function Pricing() {
  return (
    <div
      className="absolute left-[264.66px] opacity-20 size-[128px] top-[2px]"
      data-name="Pricing"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 128 128\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -18.102 -18.102 0 128 0)\\'><stop stop-color=\\'rgba(101,188,182,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(76,141,137,0.75)\\' offset=\\'0.175\\'/><stop stop-color=\\'rgba(51,94,91,0.5)\\' offset=\\'0.35\\'/><stop stop-color=\\'rgba(25,47,46,0.25)\\' offset=\\'0.525\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.7\\'/></radialGradient></defs></svg>')",
      }}
    />
  );
}

function Text1() {
  return (
    <div
      className="content-stretch flex h-[19px] items-start relative shrink-0 w-full"
      data-name="Text"
    >
      <p
        className="f] font-medium leading-[18px] relative shrink-0 text-[12px] text-nowrap text-right text-white whitespace-pre"
        dir="auto"
      >
        ⭐ محبوب‌ترین
      </p>
    </div>
  );
}

function Container3() {
  return (
    <div
      className="bg-[#65bcb6] h-[36px] relative rounded-[1.67772e+07px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-[103.312px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[36px] items-start pb-0 pt-[9.5px] px-[16px] relative w-[103.312px]">
        <Text1 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="Icon">
          <path
            d={svgPaths.p32bcd800}
            id="Vector"
            stroke="var(--stroke-0, #65BCB6)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
          <path
            d={svgPaths.p2d2999a0}
            id="Vector_2"
            stroke="var(--stroke-0, #65BCB6)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
          <path
            d={svgPaths.p24efafe0}
            id="Vector_3"
            stroke="var(--stroke-0, #65BCB6)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
          <path
            d={svgPaths.p86b7780}
            id="Vector_4"
            stroke="var(--stroke-0, #65BCB6)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div
      className="bg-[#e3f3f0] relative rounded-[16px] shrink-0 size-[56px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[56px]">
        <Icon />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[88px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[88px] items-center justify-between px-[32px] py-0 relative w-full">
          <Container3 />
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p
        className="absolute f] font-medium leading-[30px] left-[358.67px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        متوسط
      </p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute f] font-medium leading-[26px] left-[359.48px] text-[14px] text-gray-500 text-nowrap text-right top-0 translate-x-[-100%] whitespace-pre">
        Medium
      </p>
    </div>
  );
}

function Header1() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[16px] h-[164px] items-start left-0 top-0 w-[390.664px]"
      data-name="Header"
    >
      <Container5 />
      <Heading3 />
      <Paragraph1 />
    </div>
  );
}

function Text2() {
  return (
    <div
      className="absolute h-[42px] left-[108.78px] top-0 w-[217.883px]"
      data-name="Text"
    >
      <p className="absolute f] font-semibold leading-[42px] left-[218px] text-[#65bcb6] text-[42px] text-nowrap text-right top-0 translate-x-[-100%] whitespace-pre">
        ۱,۸۵۰,۰۰۰
      </p>
    </div>
  );
}

function Text3() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[31.125px]"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[31.125px]">
        <p
          className="absolute f] font-normal leading-[21px] left-[32px] text-[14px] text-gray-500 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
          dir="auto"
        >
          تومان
        </p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[18px] relative shrink-0 w-[31.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[31.125px]">
        <p
          className="absolute f] font-normal leading-[18px] left-[31.82px] text-[12px] text-gray-400 text-right top-[-0.5px] translate-x-[-100%] w-[24px]"
          dir="auto"
        >
          / ماه
        </p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div
      className="absolute content-stretch flex flex-col h-[39px] items-start left-[69.66px] top-[17px] w-[31.125px]"
      data-name="Container"
    >
      <Text3 />
      <Text4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col h-[81px] items-start left-0 pb-px pt-0 px-[32px] top-[188px] w-[390.664px]"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none"
      />
      <Container7 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #65BCB6)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div
      className="absolute bg-[#e3f3f0] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon1 />
    </div>
  );
}

function Text5() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.36px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[106px]"
        dir="auto"
      >
        ۳۰۰۰ پیام ماهانه
      </p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container9 />
      <Text5 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #65BCB6)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div
      className="absolute bg-[#e3f3f0] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon2 />
    </div>
  );
}

function Text6() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[294.8px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        تعیین رفتار چت‌بات
      </p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container10 />
      <Text6 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #65BCB6)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div
      className="absolute bg-[#e3f3f0] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon3 />
    </div>
  );
}

function Text7() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.21px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        کدنگاری عمومی
      </p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container11 />
      <Text7 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #65BCB6)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div
      className="absolute bg-[#e3f3f0] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon4 />
    </div>
  );
}

function Text8() {
  return (
    <div
      className="absolute h-[48px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.02px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[238px]"
        dir="auto"
      >
        اتصال به پیام‌رسان‌ها (واتساپ، تلگرام، اینستاگرام)
      </p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="List Item">
      <Container12 />
      <Text8 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #65BCB6)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div
      className="absolute bg-[#e3f3f0] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon5 />
    </div>
  );
}

function Text9() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[294.8px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[95px]"
        dir="auto"
      >
        آپلود تا ۵۰ فایل
      </p>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container13 />
      <Text9 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #65BCB6)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div
      className="absolute bg-[#e3f3f0] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon6 />
    </div>
  );
}

function Text10() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.33px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        آنالیتیکس پیشرفته
      </p>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container14 />
      <Text10 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #65BCB6)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div
      className="absolute bg-[#e3f3f0] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon7 />
    </div>
  );
}

function Text11() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[294.9px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        یکپار همگی
      </p>
    </div>
  );
}

function ListItem6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container15 />
      <Text11 />
    </div>
  );
}

function List() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-[14px] h-[276px] items-start left-0 px-[32px] py-0 top-[301px] w-[390.664px]"
      data-name="List"
    >
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
    </div>
  );
}

function Text12() {
  return (
    <div
      className="absolute content-stretch flex h-[28px] items-start left-[79.13px] top-[16px] w-[168.422px]"
      data-name="Text"
    >
      <p
        className="f] font-normal leading-[28px] relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre"
        dir="auto"
      >
        پلن محبوب کسب‌وکارها
      </p>
    </div>
  );
}

function Button() {
  return (
    <div
      className="absolute bg-[#65bcb6] h-[60px] left-[32px] overflow-clip rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[609px] w-[326.664px]"
      data-name="Button"
    >
      <Text12 />
    </div>
  );
}

function Pricing1() {
  return (
    <div
      className="absolute h-[709px] left-[2px] top-[2px] w-[390.664px]"
      data-name="Pricing"
    >
      <Header1 />
      <Container8 />
      <List />
      <Button />
    </div>
  );
}

function Card() {
  return (
    <div
      className="bg-white h-[713px] relative rounded-[24px] shrink-0 w-[394.664px]"
      data-name="Card"
    >
      <div className="h-[713px] overflow-clip relative rounded-[inherit] w-[394.664px]">
        <Pricing />
        <Pricing1 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-gray-300 border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]"
      />
    </div>
  );
}

function Pricing2() {
  return (
    <div
      className="absolute left-[264.66px] opacity-20 size-[128px] top-[2px]"
      data-name="Pricing"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 128 128\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -18.102 -18.102 0 128 0)\\'><stop stop-color=\\'rgba(82,212,160,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(62,159,120,0.75)\\' offset=\\'0.175\\'/><stop stop-color=\\'rgba(41,106,80,0.5)\\' offset=\\'0.35\\'/><stop stop-color=\\'rgba(21,53,40,0.25)\\' offset=\\'0.525\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.7\\'/></radialGradient></defs></svg>')",
      }}
    />
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="Icon">
          <path
            d={svgPaths.p149ce000}
            id="Vector"
            stroke="var(--stroke-0, #52D4A0)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div
      className="absolute bg-[#e9faf2] content-stretch flex items-center justify-center left-[302.66px] rounded-[16px] size-[56px] top-[32px]"
      data-name="Container"
    >
      <Icon8 />
    </div>
  );
}

function Heading4() {
  return (
    <div
      className="absolute h-[30px] left-0 top-[104px] w-[390.664px]"
      data-name="Heading 3"
    >
      <p
        className="absolute f] font-medium leading-[30px] left-[359.23px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        پایه
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div
      className="absolute h-[26px] left-0 top-[138px] w-[390.664px]"
      data-name="Paragraph"
    >
      <p className="absolute f] font-medium leading-[26px] left-[359.19px] text-[14px] text-gray-500 text-nowrap text-right top-0 translate-x-[-100%] whitespace-pre">
        Basic
      </p>
    </div>
  );
}

function Header2() {
  return (
    <div
      className="absolute h-[164px] left-0 top-0 w-[390.664px]"
      data-name="Header"
    >
      <Container16 />
      <Heading4 />
      <Paragraph2 />
    </div>
  );
}

function Text13() {
  return (
    <div
      className="absolute h-[38px] left-[164.07px] top-0 w-[162.594px]"
      data-name="Text"
    >
      <p className="absolute f] font-semibold leading-[38px] left-[163px] text-[38px] text-gray-900 text-nowrap text-right top-0 translate-x-[-100%] whitespace-pre">
        ۷۵۰,۰۰۰
      </p>
    </div>
  );
}

function Text14() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[31.125px]"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[31.125px]">
        <p
          className="absolute f] font-normal leading-[21px] left-[32px] text-[14px] text-gray-500 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
          dir="auto"
        >
          تومان
        </p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[18px] relative shrink-0 w-[31.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[31.125px]">
        <p
          className="absolute f] font-normal leading-[18px] left-[31.82px] text-[12px] text-gray-400 text-right top-[-0.5px] translate-x-[-100%] w-[24px]"
          dir="auto"
        >
          / ماه
        </p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div
      className="absolute content-stretch flex flex-col h-[39px] items-start left-[124.94px] top-[14px] w-[31.125px]"
      data-name="Container"
    >
      <Text14 />
      <Text15 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[53px] relative shrink-0 w-full" data-name="Container">
      <Text13 />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col h-[78px] items-start left-0 pb-px pt-0 px-[32px] top-[188px] w-[390.664px]"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none"
      />
      <Container18 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #52D4A0)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div
      className="absolute bg-[#e9faf2] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon9 />
    </div>
  );
}

function Text16() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.28px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[100px]"
        dir="auto"
      >
        ۱۰۰۰ پیام ماهانه
      </p>
    </div>
  );
}

function ListItem7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container20 />
      <Text16 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #52D4A0)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div
      className="absolute bg-[#e9faf2] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon10 />
    </div>
  );
}

function Text17() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[294.72px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        ابزاری اختصاصی چت‌بات
      </p>
    </div>
  );
}

function ListItem8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container21 />
      <Text17 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #52D4A0)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div
      className="absolute bg-[#e9faf2] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon11 />
    </div>
  );
}

function Text18() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.11px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[260px]"
        dir="auto"
      >
        آپلود تا ۱۰ فایل / PDF/Word/Excel/CSV
      </p>
    </div>
  );
}

function ListItem9() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container22 />
      <Text18 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #52D4A0)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div
      className="absolute bg-[#e9faf2] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon12 />
    </div>
  );
}

function Text19() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[294.78px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        داشبورد مدیریت چندمنبعتر
      </p>
    </div>
  );
}

function ListItem10() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container23 />
      <Text19 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #52D4A0)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div
      className="absolute bg-[#e9faf2] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon13 />
    </div>
  );
}

function Text20() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.01px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        آمار پایه
      </p>
    </div>
  );
}

function ListItem11() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container24 />
      <Text20 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #52D4A0)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div
      className="absolute bg-[#e9faf2] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon14 />
    </div>
  );
}

function Text21() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[294.71px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[213px]"
        dir="auto"
      >
        گزارش مصرف Credit/دینار/ماهانه
      </p>
    </div>
  );
}

function ListItem12() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container25 />
      <Text21 />
    </div>
  );
}

function List1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-[14px] h-[214px] items-start left-0 px-[32px] py-0 top-[298px] w-[390.664px]"
      data-name="List"
    >
      <ListItem7 />
      <ListItem8 />
      <ListItem9 />
      <ListItem10 />
      <ListItem11 />
      <ListItem12 />
    </div>
  );
}

function Text22() {
  return (
    <div
      className="absolute content-stretch flex h-[28px] items-start left-[120.54px] top-[18px] w-[85.594px]"
      data-name="Text"
    >
      <p
        className="f] font-normal leading-[28px] relative shrink-0 text-[#65bcb6] text-[18px] text-nowrap whitespace-pre"
        dir="auto"
      >
        ارتقاء به پایه
      </p>
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute bg-white h-[64px] left-[32px] rounded-[12px] top-[605px] w-[326.664px]"
      data-name="Button"
    >
      <div className="h-[64px] overflow-clip relative rounded-[inherit] w-[326.664px]">
        <Text22 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#65bcb6] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
    </div>
  );
}

function Pricing3() {
  return (
    <div
      className="absolute h-[709px] left-[2px] top-[2px] w-[390.664px]"
      data-name="Pricing"
    >
      <Header2 />
      <Container19 />
      <List1 />
      <Button1 />
    </div>
  );
}

function Card1() {
  return (
    <div
      className="bg-white h-[713px] relative rounded-[24px] shrink-0 w-[394.664px]"
      data-name="Card"
    >
      <div className="h-[713px] overflow-clip relative rounded-[inherit] w-[394.664px]">
        <Pricing2 />
        <Pricing3 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-gray-300 border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]"
      />
    </div>
  );
}

function Pricing4() {
  return (
    <div
      className="absolute left-[264.66px] opacity-20 size-[128px] top-[2px]"
      data-name="Pricing"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 128 128\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -18.102 -18.102 0 128 0)\\'><stop stop-color=\\'rgba(8,145,178,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(6,109,134,0.75)\\' offset=\\'0.175\\'/><stop stop-color=\\'rgba(4,73,89,0.5)\\' offset=\\'0.35\\'/><stop stop-color=\\'rgba(2,36,45,0.25)\\' offset=\\'0.525\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.7\\'/></radialGradient></defs></svg>')",
      }}
    />
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="Icon">
          <path
            d={svgPaths.p126a1a00}
            id="Vector"
            stroke="var(--stroke-0, #0891B2)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
          <path
            d="M23.3333 2.33333V7"
            id="Vector_2"
            stroke="var(--stroke-0, #0891B2)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
          <path
            d="M25.6667 4.66667H21"
            id="Vector_3"
            stroke="var(--stroke-0, #0891B2)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
          <path
            d={svgPaths.p1076900}
            id="Vector_4"
            stroke="var(--stroke-0, #0891B2)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
        </g>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div
      className="absolute bg-[#e7f5f3] content-stretch flex items-center justify-center left-[302.66px] rounded-[16px] size-[56px] top-[32px]"
      data-name="Container"
    >
      <Icon15 />
    </div>
  );
}

function Heading5() {
  return (
    <div
      className="absolute h-[30px] left-0 top-[104px] w-[390.664px]"
      data-name="Heading 3"
    >
      <p
        className="absolute f] font-medium leading-[30px] left-[358.73px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        آغازین
      </p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div
      className="absolute h-[26px] left-0 top-[138px] w-[390.664px]"
      data-name="Paragraph"
    >
      <p
        className="absolute f] font-medium leading-[26px] left-[359.31px] text-[14px] text-gray-500 text-nowrap text-right top-0 translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        رایگان
      </p>
    </div>
  );
}

function Header3() {
  return (
    <div
      className="absolute h-[164px] left-0 top-0 w-[390.664px]"
      data-name="Header"
    >
      <Container26 />
      <Heading5 />
      <Paragraph3 />
    </div>
  );
}

function Text23() {
  return (
    <div
      className="absolute h-[38px] left-[164.07px] top-0 w-[162.594px]"
      data-name="Text"
    >
      <p className="absolute f] font-semibold leading-[38px] left-[163px] text-[38px] text-gray-900 text-nowrap text-right top-0 translate-x-[-100%] whitespace-pre">
        ۱۵۰,۰۰۰
      </p>
    </div>
  );
}

function Text24() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[31.125px]"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[31.125px]">
        <p
          className="absolute f] font-normal leading-[21px] left-[32px] text-[14px] text-gray-500 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
          dir="auto"
        >
          تومان
        </p>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[18px] relative shrink-0 w-[31.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[31.125px]">
        <p
          className="absolute f] font-normal leading-[18px] left-[31.82px] text-[12px] text-gray-400 text-right top-[-0.5px] translate-x-[-100%] w-[24px]"
          dir="auto"
        >
          / ماه
        </p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div
      className="absolute content-stretch flex flex-col h-[39px] items-start left-[124.94px] top-[14px] w-[31.125px]"
      data-name="Container"
    >
      <Text24 />
      <Text25 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[53px] relative shrink-0 w-full" data-name="Container">
      <Text23 />
      <Container27 />
    </div>
  );
}

function Container29() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col h-[78px] items-start left-0 pb-px pt-0 px-[32px] top-[188px] w-[390.664px]"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none"
      />
      <Container28 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #0891B2)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div
      className="absolute bg-[#e7f5f3] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon16 />
    </div>
  );
}

function Text26() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[294.96px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[91px]"
        dir="auto"
      >
        ۵۰ پیام ماهانه
      </p>
    </div>
  );
}

function ListItem13() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container30 />
      <Text26 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #0891B2)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div
      className="absolute bg-[#e7f5f3] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon17 />
    </div>
  );
}

function Text27() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.55px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        اتصال وب‌سایت به سایت
      </p>
    </div>
  );
}

function ListItem14() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container31 />
      <Text27 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #0891B2)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div
      className="absolute bg-[#e7f5f3] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon18 />
    </div>
  );
}

function Text28() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[294.91px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[128px]"
        dir="auto"
      >
        ورود با ایمیل یا OTP
      </p>
    </div>
  );
}

function ListItem15() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container32 />
      <Text28 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #0891B2)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div
      className="absolute bg-[#e7f5f3] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon19 />
    </div>
  );
}

function Text29() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.25px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        منابع دانش پیشرفته
      </p>
    </div>
  );
}

function ListItem16() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container33 />
      <Text29 />
    </div>
  );
}

function List2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-[14px] h-[138px] items-start left-0 px-[32px] py-0 top-[298px] w-[390.664px]"
      data-name="List"
    >
      <ListItem13 />
      <ListItem14 />
      <ListItem15 />
      <ListItem16 />
    </div>
  );
}

function Text30() {
  return (
    <div
      className="absolute content-stretch flex h-[28px] items-start left-[120.51px] top-[18px] w-[85.656px]"
      data-name="Text"
    >
      <p
        className="f] font-normal leading-[28px] relative shrink-0 text-[#65bcb6] text-[18px] text-nowrap whitespace-pre"
        dir="auto"
      >
        شروع رایگان
      </p>
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute bg-white h-[64px] left-[32px] rounded-[12px] top-[605px] w-[326.664px]"
      data-name="Button"
    >
      <div className="h-[64px] overflow-clip relative rounded-[inherit] w-[326.664px]">
        <Text30 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#65bcb6] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
    </div>
  );
}

function Pricing5() {
  return (
    <div
      className="absolute h-[709px] left-[2px] top-[2px] w-[390.664px]"
      data-name="Pricing"
    >
      <Header3 />
      <Container29 />
      <List2 />
      <Button2 />
    </div>
  );
}

function Card2() {
  return (
    <div
      className="bg-white h-[713px] relative rounded-[24px] shrink-0 w-[394.664px]"
      data-name="Card"
    >
      <div className="h-[713px] overflow-clip relative rounded-[inherit] w-[394.664px]">
        <Pricing4 />
        <Pricing5 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-gray-300 border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]"
      />
    </div>
  );
}

function Pricing6() {
  return (
    <div
      className="absolute left-[264.66px] opacity-20 size-[128px] top-[2px]"
      data-name="Pricing"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 128 128\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -18.102 -18.102 0 128 0)\\'><stop stop-color=\\'rgba(99,102,241,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(74,77,181,0.75)\\' offset=\\'0.175\\'/><stop stop-color=\\'rgba(50,51,121,0.5)\\' offset=\\'0.35\\'/><stop stop-color=\\'rgba(25,26,60,0.25)\\' offset=\\'0.525\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.7\\'/></radialGradient></defs></svg>')",
      }}
    />
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="Icon">
          <path
            d={svgPaths.pa75a70}
            id="Vector"
            stroke="var(--stroke-0, #6366F1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
          <path
            d={svgPaths.p1082cc0}
            id="Vector_2"
            stroke="var(--stroke-0, #6366F1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
          <path
            d={svgPaths.pcc42cc0}
            id="Vector_3"
            stroke="var(--stroke-0, #6366F1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
          <path
            d="M11.6667 7H16.3333"
            id="Vector_4"
            stroke="var(--stroke-0, #6366F1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
          <path
            d="M11.6667 11.6667H16.3333"
            id="Vector_5"
            stroke="var(--stroke-0, #6366F1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
          <path
            d="M11.6667 16.3333H16.3333"
            id="Vector_6"
            stroke="var(--stroke-0, #6366F1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
          <path
            d="M11.6667 21H16.3333"
            id="Vector_7"
            stroke="var(--stroke-0, #6366F1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
        </g>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div
      className="absolute bg-[#ebeffc] content-stretch flex items-center justify-center left-[302.66px] rounded-[16px] size-[56px] top-[32px]"
      data-name="Container"
    >
      <Icon20 />
    </div>
  );
}

function Heading6() {
  return (
    <div
      className="absolute h-[30px] left-0 top-[104px] w-[390.664px]"
      data-name="Heading 3"
    >
      <p
        className="absolute f] font-medium leading-[30px] left-[358.98px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        شخصی سازی
      </p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div
      className="absolute h-[26px] left-0 top-[138px] w-[390.664px]"
      data-name="Paragraph"
    >
      <p className="absolute f] font-medium leading-[26px] left-[358.74px] text-[14px] text-gray-500 text-nowrap text-right top-0 translate-x-[-100%] whitespace-pre">
        Enterprise
      </p>
    </div>
  );
}

function Header4() {
  return (
    <div
      className="absolute h-[164px] left-0 top-0 w-[390.664px]"
      data-name="Header"
    >
      <Container34 />
      <Heading6 />
      <Paragraph4 />
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Text">
      <p
        className="absolute f] font-semibold leading-[36px] left-[95px] text-[36px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        توافقی
      </p>
    </div>
  );
}

function Container35() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col h-[61px] items-start left-0 pb-px pl-[263.758px] pr-[32px] pt-0 top-[188px] w-[390.664px]"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none"
      />
      <Text31 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #6366F1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div
      className="absolute bg-[#ebeffc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon21 />
    </div>
  );
}

function Text32() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[294.95px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        پیام نامحدود و منابع دانش نامحدود
      </p>
    </div>
  );
}

function ListItem17() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container36 />
      <Text32 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #6366F1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container37() {
  return (
    <div
      className="absolute bg-[#ebeffc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon22 />
    </div>
  );
}

function Text33() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.16px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[281px]"
        dir="auto"
      >
        API اختصاصی و اتوماسیون (Zapier، Make)
      </p>
    </div>
  );
}

function ListItem18() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container37 />
      <Text33 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #6366F1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container38() {
  return (
    <div
      className="absolute bg-[#ebeffc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon23 />
    </div>
  );
}

function Text34() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.17px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        امنیت پیشرفته و رمزنگاری سازمانی
      </p>
    </div>
  );
}

function ListItem19() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container38 />
      <Text34 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #6366F1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div
      className="absolute bg-[#ebeffc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon24 />
    </div>
  );
}

function Text35() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.63px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[208px]"
        dir="auto"
      >
        آموزش و Onboarding اختصاصی
      </p>
    </div>
  );
}

function ListItem20() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container39 />
      <Text35 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #6366F1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div
      className="absolute bg-[#ebeffc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon25 />
    </div>
  );
}

function Text36() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p className="absolute f] font-normal leading-[24px] left-[295.63px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre">
        SLA 99.95%
      </p>
    </div>
  );
}

function ListItem21() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container40 />
      <Text36 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #6366F1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container41() {
  return (
    <div
      className="absolute bg-[#ebeffc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon26 />
    </div>
  );
}

function Text37() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.27px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        مشاوره پیاده‌سازی و مدیر موفقیت مشتری
      </p>
    </div>
  );
}

function ListItem22() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container41 />
      <Text37 />
    </div>
  );
}

function List3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-[14px] h-[214px] items-start left-0 px-[32px] py-0 top-[281px] w-[390.664px]"
      data-name="List"
    >
      <ListItem17 />
      <ListItem18 />
      <ListItem19 />
      <ListItem20 />
      <ListItem21 />
      <ListItem22 />
    </div>
  );
}

function Text38() {
  return (
    <div
      className="absolute content-stretch flex h-[28px] items-start left-[110.75px] top-[18px] w-[105.172px]"
      data-name="Text"
    >
      <p
        className="f] font-normal leading-[28px] relative shrink-0 text-[#65bcb6] text-[18px] text-nowrap whitespace-pre"
        dir="auto"
      >
        تماس با مشاور
      </p>
    </div>
  );
}

function Button3() {
  return (
    <div
      className="absolute bg-white h-[64px] left-[32px] rounded-[12px] top-[620px] w-[326.664px]"
      data-name="Button"
    >
      <div className="h-[64px] overflow-clip relative rounded-[inherit] w-[326.664px]">
        <Text38 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#65bcb6] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
    </div>
  );
}

function Pricing7() {
  return (
    <div
      className="absolute h-[724px] left-[2px] top-[2px] w-[390.664px]"
      data-name="Pricing"
    >
      <Header4 />
      <Container35 />
      <List3 />
      <Button3 />
    </div>
  );
}

function Card3() {
  return (
    <div
      className="bg-white h-[728px] relative rounded-[24px] shrink-0 w-[394.664px]"
      data-name="Card"
    >
      <div className="h-[728px] overflow-clip relative rounded-[inherit] w-[394.664px]">
        <Pricing6 />
        <Pricing7 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-gray-300 border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]"
      />
    </div>
  );
}

function Pricing8() {
  return (
    <div
      className="absolute left-[264.66px] opacity-20 size-[128px] top-[2px]"
      data-name="Pricing"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 128 128\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -18.102 -18.102 0 128 0)\\'><stop stop-color=\\'rgba(124,58,237,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(93,44,178,0.75)\\' offset=\\'0.175\\'/><stop stop-color=\\'rgba(62,29,119,0.5)\\' offset=\\'0.35\\'/><stop stop-color=\\'rgba(31,15,59,0.25)\\' offset=\\'0.525\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.7\\'/></radialGradient></defs></svg>')",
      }}
    />
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="Icon">
          <path
            d={svgPaths.p7663370}
            id="Vector"
            stroke="var(--stroke-0, #7C3AED)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
          <path
            d="M5.83333 24.5H22.1667"
            id="Vector_2"
            stroke="var(--stroke-0, #7C3AED)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.33333"
          />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div
      className="absolute bg-[#f0edfc] content-stretch flex items-center justify-center left-[302.66px] rounded-[16px] size-[56px] top-[32px]"
      data-name="Container"
    >
      <Icon27 />
    </div>
  );
}

function Heading7() {
  return (
    <div
      className="absolute h-[30px] left-0 top-[104px] w-[390.664px]"
      data-name="Heading 3"
    >
      <p
        className="absolute f] font-medium leading-[30px] left-[359.1px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        پیشرفته
      </p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div
      className="absolute h-[26px] left-0 top-[138px] w-[390.664px]"
      data-name="Paragraph"
    >
      <p className="absolute f] font-medium leading-[26px] left-[359.49px] text-[14px] text-gray-500 text-nowrap text-right top-0 translate-x-[-100%] whitespace-pre">
        Advance
      </p>
    </div>
  );
}

function Header5() {
  return (
    <div
      className="absolute h-[164px] left-0 top-0 w-[390.664px]"
      data-name="Header"
    >
      <Container42 />
      <Heading7 />
      <Paragraph5 />
    </div>
  );
}

function Text39() {
  return (
    <div
      className="absolute h-[38px] left-[129.53px] top-0 w-[197.133px]"
      data-name="Text"
    >
      <p className="absolute f] font-semibold leading-[38px] left-[198px] text-[38px] text-gray-900 text-nowrap text-right top-0 translate-x-[-100%] whitespace-pre">
        ۶,۵۵۵,۰۰۰
      </p>
    </div>
  );
}

function Text40() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[31.125px]"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[31.125px]">
        <p
          className="absolute f] font-normal leading-[21px] left-[32px] text-[14px] text-gray-500 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
          dir="auto"
        >
          تومان
        </p>
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[18px] relative shrink-0 w-[31.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[31.125px]">
        <p
          className="absolute f] font-normal leading-[18px] left-[31.82px] text-[12px] text-gray-400 text-right top-[-0.5px] translate-x-[-100%] w-[24px]"
          dir="auto"
        >
          / ماه
        </p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div
      className="absolute content-stretch flex flex-col h-[39px] items-start left-[90.41px] top-[14px] w-[31.125px]"
      data-name="Container"
    >
      <Text40 />
      <Text41 />
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[53px] relative shrink-0 w-full" data-name="Container">
      <Text39 />
      <Container43 />
    </div>
  );
}

function Container45() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col h-[78px] items-start left-0 pb-px pt-0 px-[32px] top-[188px] w-[390.664px]"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none"
      />
      <Container44 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #7C3AED)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container46() {
  return (
    <div
      className="absolute bg-[#f0edfc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon28 />
    </div>
  );
}

function Text42() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.53px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[107px]"
        dir="auto"
      >
        ۱۰۰۰۰ پیام ماهانه
      </p>
    </div>
  );
}

function ListItem23() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container46 />
      <Text42 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #7C3AED)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div
      className="absolute bg-[#f0edfc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon29 />
    </div>
  );
}

function Text43() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.26px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[206px]"
        dir="auto"
      >
        انتخاب مدل GPT 4o (سانتاکس)
      </p>
    </div>
  );
}

function ListItem24() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container47 />
      <Text43 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #7C3AED)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container48() {
  return (
    <div
      className="absolute bg-[#f0edfc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon30 />
    </div>
  );
}

function Text44() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.45px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[232px]"
        dir="auto"
      >
        اتصال به Google Drive/ و Dropbox
      </p>
    </div>
  );
}

function ListItem25() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container48 />
      <Text44 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #7C3AED)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div
      className="absolute bg-[#f0edfc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon31 />
    </div>
  );
}

function Text45() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.02px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[93px]"
        dir="auto"
      >
        اتصال به CRM
      </p>
    </div>
  );
}

function ListItem26() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container49 />
      <Text45 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #7C3AED)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container50() {
  return (
    <div
      className="absolute bg-[#f0edfc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon32 />
    </div>
  );
}

function Text46() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.27px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        امکان خرید اشتراک برای کاربران
      </p>
    </div>
  );
}

function ListItem27() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container50 />
      <Text46 />
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #7C3AED)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container51() {
  return (
    <div
      className="absolute bg-[#f0edfc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon33 />
    </div>
  );
}

function Text47() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[294.71px] text-[16px] text-gray-700 text-right top-[-0.5px] translate-x-[-100%] w-[213px]"
        dir="auto"
      >
        گزارش مصرف Credit/دینار/ماهانه
      </p>
    </div>
  );
}

function ListItem28() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container51 />
      <Text47 />
    </div>
  );
}

function Icon34() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #7C3AED)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container52() {
  return (
    <div
      className="absolute bg-[#f0edfc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon34 />
    </div>
  );
}

function Text48() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[294.87px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        کنترل نقش کاربران
      </p>
    </div>
  );
}

function ListItem29() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container52 />
      <Text48 />
    </div>
  );
}

function Icon35() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3de7e600}
            id="Vector"
            stroke="var(--stroke-0, #7C3AED)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </g>
      </svg>
    </div>
  );
}

function Container53() {
  return (
    <div
      className="absolute bg-[#f0edfc] content-stretch flex items-center justify-center left-[306.66px] rounded-[1.67772e+07px] size-[20px] top-[2px]"
      data-name="Container"
    >
      <Icon35 />
    </div>
  );
}

function Text49() {
  return (
    <div
      className="absolute h-[24px] left-0 top-0 w-[294.664px]"
      data-name="Text"
    >
      <p
        className="absolute f] font-normal leading-[24px] left-[295.37px] text-[16px] text-gray-700 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre"
        dir="auto"
      >
        پشتیبانی تلفنی اختصاصی
      </p>
    </div>
  );
}

function ListItem30() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Container53 />
      <Text49 />
    </div>
  );
}

function List4() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-[14px] h-[290px] items-start left-0 px-[32px] py-0 top-[298px] w-[390.664px]"
      data-name="List"
    >
      <ListItem23 />
      <ListItem24 />
      <ListItem25 />
      <ListItem26 />
      <ListItem27 />
      <ListItem28 />
      <ListItem29 />
      <ListItem30 />
    </div>
  );
}

function Text50() {
  return (
    <div
      className="absolute content-stretch flex h-[28px] items-start left-[87.26px] top-[18px] w-[152.156px]"
      data-name="Text"
    >
      <p
        className="f] font-normal leading-[28px] relative shrink-0 text-[#65bcb6] text-[18px] text-nowrap whitespace-pre"
        dir="auto"
      >
        شروع با امکانات کامل
      </p>
    </div>
  );
}

function Button4() {
  return (
    <div
      className="absolute bg-white h-[64px] left-[32px] rounded-[12px] top-[620px] w-[326.664px]"
      data-name="Button"
    >
      <div className="h-[64px] overflow-clip relative rounded-[inherit] w-[326.664px]">
        <Text50 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#65bcb6] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
    </div>
  );
}

function Pricing9() {
  return (
    <div
      className="absolute h-[724px] left-[2px] top-[2px] w-[390.664px]"
      data-name="Pricing"
    >
      <Header5 />
      <Container45 />
      <List4 />
      <Button4 />
    </div>
  );
}

function Card4() {
  return (
    <div
      className="bg-white h-[728px] relative rounded-[24px] shrink-0 w-[394.664px]"
      data-name="Card"
    >
      <div className="h-[728px] overflow-clip relative rounded-[inherit] w-[394.664px]">
        <Pricing8 />
        <Pricing9 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-gray-300 border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]"
      />
    </div>
  );
}

function Component33331() {
  return (
    <div
      className="absolute h-[524px] left-[-79.5px] top-[785.21px] w-[472px]"
      data-name="3333 1"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 472 524"
      >
        <g id="3333 1">
          <path
            d={svgPaths.pa006f00}
            fill="var(--fill-0, #FFE2B9)"
            id="Vector"
          />
          <path
            d={svgPaths.p26d43e00}
            fill="var(--fill-0, #FEDBAA)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p2a022980}
            fill="var(--fill-0, #FEDBAA)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p1d1d89f0}
            fill="var(--fill-0, #3E9896)"
            id="Vector_4"
          />
          <path
            d={svgPaths.p5695e00}
            fill="var(--fill-0, #80C4A4)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p20268e00}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p1a4e8580}
            fill="var(--fill-0, #ED7163)"
            id="Vector_7"
          />
          <path
            d={svgPaths.p1cd73ac0}
            fill="var(--fill-0, #D0F6FC)"
            id="Vector_8"
          />
          <path
            d={svgPaths.p3cd3eb80}
            fill="var(--fill-0, #0D93B2)"
            id="Vector_9"
          />
          <path
            d={svgPaths.pbd84f00}
            fill="var(--fill-0, #86C9D9)"
            id="Vector_10"
          />
          <path
            d={svgPaths.p16f00400}
            fill="var(--fill-0, #86C9D9)"
            id="Vector_11"
          />
          <path
            d={svgPaths.p2fb1f5f0}
            fill="var(--fill-0, #86C9D9)"
            id="Vector_12"
          />
          <path
            d={svgPaths.p18ed1300}
            fill="var(--fill-0, #20111D)"
            id="Vector_13"
          />
          <path
            d={svgPaths.p36be7d00}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_14"
          />
          <path
            d={svgPaths.p10f1d900}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_15"
          />
          <path
            d={svgPaths.p3745a300}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_16"
          />
          <path
            d={svgPaths.p1027b500}
            fill="var(--fill-0, black)"
            id="Vector_17"
          />
          <path
            d={svgPaths.p1b0e5200}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_18"
          />
          <path
            d={svgPaths.p116ac900}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_19"
          />
          <path
            d={svgPaths.p3c61ea00}
            fill="var(--fill-0, black)"
            id="Vector_20"
          />
          <path
            d={svgPaths.p171ec320}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_21"
          />
          <path
            d={svgPaths.p2c702300}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_22"
          />
          <path
            d={svgPaths.p3e565500}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_23"
          />
          <path
            d={svgPaths.p583e2b0}
            fill="var(--fill-0, black)"
            id="Vector_24"
          />
          <path
            d={svgPaths.pb1ba680}
            fill="var(--fill-0, black)"
            id="Vector_25"
          />
          <path
            d={svgPaths.p1c79fe80}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_26"
          />
          <path
            d={svgPaths.p1c9d6e00}
            fill="var(--fill-0, black)"
            id="Vector_27"
          />
          <path
            d={svgPaths.p8b8ea00}
            fill="var(--fill-0, black)"
            id="Vector_28"
          />
          <path
            d={svgPaths.p6cabbb0}
            fill="var(--fill-0, black)"
            id="Vector_29"
          />
          <path
            d={svgPaths.p2a9c6a00}
            fill="var(--fill-0, #000100)"
            id="Vector_30"
          />
          <path
            d={svgPaths.p35a43780}
            fill="var(--fill-0, #000100)"
            id="Vector_31"
          />
          <path
            d={svgPaths.p1c6ba00}
            fill="var(--fill-0, black)"
            id="Vector_32"
          />
          <path
            d={svgPaths.p14e3e500}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_33"
          />
          <path
            d={svgPaths.p188f2600}
            fill="var(--fill-0, #ED7163)"
            id="Vector_34"
          />
          <path
            d={svgPaths.p49d9340}
            fill="var(--fill-0, #D0F6FC)"
            id="Vector_35"
          />
          <path
            d={svgPaths.p1ff38f00}
            fill="var(--fill-0, #0D93B2)"
            id="Vector_36"
          />
          <path
            d={svgPaths.p3e617800}
            fill="var(--fill-0, #86C9D9)"
            id="Vector_37"
          />
          <path
            d={svgPaths.p239c0600}
            fill="var(--fill-0, #86C9D9)"
            id="Vector_38"
          />
          <path
            d={svgPaths.p28d1be00}
            fill="var(--fill-0, #86C9D9)"
            id="Vector_39"
          />
          <path
            d={svgPaths.p3fae9700}
            fill="var(--fill-0, #20111D)"
            id="Vector_40"
          />
          <path
            d={svgPaths.p187fa180}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_41"
          />
          <path
            d={svgPaths.p31237c80}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_42"
          />
          <path
            d={svgPaths.p876e200}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_43"
          />
          <path
            d={svgPaths.p1cb1ab70}
            fill="var(--fill-0, black)"
            id="Vector_44"
          />
          <path
            d={svgPaths.p22527480}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_45"
          />
          <path
            d={svgPaths.p166f5080}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_46"
          />
          <path
            d={svgPaths.p279da129}
            fill="var(--fill-0, black)"
            id="Vector_47"
          />
          <path
            d={svgPaths.p1cc71200}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_48"
          />
          <path
            d={svgPaths.p20cae1f0}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_49"
          />
          <path
            d={svgPaths.p174dfb00}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_50"
          />
          <path
            d={svgPaths.p2c855580}
            fill="var(--fill-0, black)"
            id="Vector_51"
          />
          <path
            d={svgPaths.p3bc2e330}
            fill="var(--fill-0, black)"
            id="Vector_52"
          />
          <path
            d={svgPaths.p3a5ad750}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_53"
          />
          <path
            d={svgPaths.p362d970}
            fill="var(--fill-0, black)"
            id="Vector_54"
          />
          <path
            d={svgPaths.p3428c3c0}
            fill="var(--fill-0, black)"
            id="Vector_55"
          />
          <path
            d={svgPaths.p1df51e80}
            fill="var(--fill-0, black)"
            id="Vector_56"
          />
          <path
            d={svgPaths.p401c570}
            fill="var(--fill-0, #000100)"
            id="Vector_57"
          />
          <path
            d={svgPaths.p3f4c1ef0}
            fill="var(--fill-0, #000100)"
            id="Vector_58"
          />
          <path
            d={svgPaths.p1d1b0d80}
            fill="var(--fill-0, black)"
            id="Vector_59"
          />
          <path
            d={svgPaths.p1c7cff00}
            fill="var(--fill-0, #F7597F)"
            id="Vector_60"
          />
          <path
            d={svgPaths.p11f12e00}
            fill="var(--fill-0, #F86A8C)"
            id="Vector_61"
          />
          <path
            d={svgPaths.p6e6dac0}
            fill="var(--fill-0, white)"
            id="Vector_62"
          />
          <path
            d={svgPaths.p1562e600}
            fill="var(--fill-0, white)"
            id="Vector_63"
          />
          <path
            d={svgPaths.p34379800}
            fill="var(--fill-0, white)"
            id="Vector_64"
          />
          <path
            d={svgPaths.p1bdcc000}
            fill="var(--fill-0, white)"
            id="Vector_65"
          />
          <path
            d={svgPaths.p19dbd900}
            fill="var(--fill-0, white)"
            id="Vector_66"
          />
          <path
            d={svgPaths.p2531c800}
            fill="var(--fill-0, white)"
            id="Vector_67"
          />
          <path
            d={svgPaths.p1b452a80}
            fill="var(--fill-0, white)"
            id="Vector_68"
          />
          <path
            d={svgPaths.p3ace1f00}
            fill="var(--fill-0, white)"
            id="Vector_69"
          />
          <path
            d={svgPaths.p3d268480}
            fill="var(--fill-0, white)"
            id="Vector_70"
          />
          <path
            d={svgPaths.p4031f40}
            fill="var(--fill-0, white)"
            id="Vector_71"
          />
          <path
            d={svgPaths.p1e363780}
            fill="var(--fill-0, white)"
            id="Vector_72"
          />
          <path
            d={svgPaths.p6eb5800}
            fill="var(--fill-0, white)"
            id="Vector_73"
          />
          <path
            d={svgPaths.p263f400}
            fill="var(--fill-0, white)"
            id="Vector_74"
          />
          <path
            d={svgPaths.p33313a80}
            fill="var(--fill-0, white)"
            id="Vector_75"
          />
          <path
            d={svgPaths.p2671fc00}
            fill="var(--fill-0, white)"
            id="Vector_76"
          />
          <path
            d={svgPaths.p39153540}
            fill="var(--fill-0, white)"
            id="Vector_77"
          />
          <path
            d={svgPaths.p25c56900}
            fill="var(--fill-0, white)"
            id="Vector_78"
          />
          <path
            d={svgPaths.p35830e00}
            fill="var(--fill-0, white)"
            id="Vector_79"
          />
          <path
            d={svgPaths.p44091c0}
            fill="var(--fill-0, white)"
            id="Vector_80"
          />
          <path
            d={svgPaths.p397c3780}
            fill="var(--fill-0, white)"
            id="Vector_81"
          />
          <path
            d={svgPaths.p2883a4f0}
            fill="var(--fill-0, white)"
            id="Vector_82"
          />
          <path
            d={svgPaths.p2b065400}
            fill="var(--fill-0, white)"
            id="Vector_83"
          />
          <path
            d={svgPaths.p16d6ca00}
            fill="var(--fill-0, #FECC86)"
            id="Vector_84"
          />
          <path
            d={svgPaths.p163a3800}
            fill="var(--fill-0, #EFA348)"
            id="Vector_85"
          />
          <path
            d={svgPaths.pfd1800}
            fill="var(--fill-0, #EFA348)"
            id="Vector_86"
          />
          <path
            d={svgPaths.p1e6e1e00}
            fill="var(--fill-0, #EFA348)"
            id="Vector_87"
          />
          <path
            d={svgPaths.p38483b00}
            fill="var(--fill-0, #EFA348)"
            id="Vector_88"
          />
          <path
            d={svgPaths.p67aef80}
            fill="var(--fill-0, #EFA348)"
            id="Vector_89"
          />
          <path
            d={svgPaths.p1d109180}
            fill="var(--fill-0, #1D1D1B)"
            id="Vector_90"
          />
          <path
            d={svgPaths.p12186680}
            fill="var(--fill-0, white)"
            id="Vector_91"
          />
          <path
            d={svgPaths.p189637a0}
            fill="var(--fill-0, #5AB3BF)"
            id="Vector_92"
          />
          <path
            d={svgPaths.p34031900}
            fill="var(--fill-0, white)"
            id="Vector_93"
          />
          <path
            d={svgPaths.p343bcc80}
            fill="var(--fill-0, white)"
            id="Vector_94"
          />
          <path
            d={svgPaths.p215dce80}
            fill="var(--fill-0, white)"
            id="Vector_95"
          />
          <path
            d={svgPaths.p429e00}
            fill="var(--fill-0, #6095AB)"
            id="Vector_96"
          />
          <path
            d={svgPaths.p316475d2}
            fill="var(--fill-0, #6095AB)"
            id="Vector_97"
          />
          <path
            d={svgPaths.p34abe780}
            fill="var(--fill-0, #CC154A)"
            id="Vector_98"
          />
          <path
            d={svgPaths.p25994fc0}
            fill="var(--fill-0, #F7597F)"
            id="Vector_99"
          />
          <path
            d={svgPaths.p6158980}
            fill="var(--fill-0, #F7597F)"
            id="Vector_100"
          />
        </g>
      </svg>
    </div>
  );
}

function Container54() {
  return (
    <div
      className="content-center flex flex-wrap gap-[24px] items-center justify-end relative shrink-0 w-full"
      data-name="Container"
    >
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
      <Card4 />
      <Component33331 />
    </div>
  );
}

function Container55() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[64px] items-start px-[24px] py-0 relative size-full">
          <Header />
          <Container54 />
        </div>
      </div>
    </div>
  );
}

export default function Pricing10() {
  return (
    <div className="relative size-full" data-name="Pricing">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[64px] relative size-full">
          <Container55 />
        </div>
      </div>
    </div>
  );
}
