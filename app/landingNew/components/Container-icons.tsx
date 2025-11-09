import svgPaths from "../svg/svg-jouv5qb13t";

function Icon() {
  return (
    <div className="absolute h-[381px] left-0 top-0 w-[1431px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1431 381">
        <g clipPath="url(#clip0_0_5665)" id="Icon" opacity="0.08">
          <g id="Vector"></g>
        </g>
        <defs>
          <clipPath id="clip0_0_5665">
            <rect fill="white" height="381" width="1431" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute h-[96px] left-0 top-0 w-[1431px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1431 96">
        <g clipPath="url(#clip0_0_5662)" id="Icon" opacity="0.15">
          <path d={svgPaths.p3812600} id="Vector" stroke="var(--stroke-0, #65BCB6)" strokeWidth="2.13991" />
        </g>
        <defs>
          <clipPath id="clip0_0_5662">
            <rect fill="white" height="96" width="1431" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[1239.91px] size-[48px] top-[256.81px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon" opacity="0.15">
          <path d={svgPaths.p3cda5e80} id="Vector" stroke="var(--stroke-0, #65BCB6)" strokeWidth="0.96" />
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[114.48px] size-[40px] top-[114.3px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon" opacity="0.15">
          <path d={svgPaths.p369f9170} id="Vector" stroke="var(--stroke-0, #FFA18E)" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
}

export default function Container() {
  return (
    <div className="opacity-50 relative size-full" data-name="Container">
      <Icon />
      <Icon1 />
      <Icon2 />
      <Icon3 />
    </div>
  );
}