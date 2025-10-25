export const LoginTopLeft = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 128 128" fill="none">
      <circle cx="20" cy="20" r="8" fill="#65BCB6" />
      <circle cx="60" cy="20" r="6" fill="#FFA18E" />
      <circle cx="100" cy="20" r="4" fill="#65BCB6" />
      <circle cx="40" cy="60" r="8" fill="#FFA18E" />
      <circle cx="80" cy="60" r="6" fill="#65BCB6" />
      <circle cx="20" cy="100" r="6" fill="#65BCB6" />
      <circle cx="100" cy="100" r="8" fill="#FFA18E" />
    </svg>
  );
};

export const LoginTopLef2 = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 160 160" fill="none">
      <path
        d="M20 140 Q80 20 140 80 Q100 120 60 100 Q40 140 20 140Z"
        fill="#65BCB6"
      />
      <path
        d="M40 120 Q100 40 120 100 Q80 140 40 120Z"
        fill="#FFA18E"
        opacity="0.7"
      />
    </svg>
  );
};

export const LoginTopLeft3 = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 96 128" fill="none">
      {/* Chat bubbles */}
      <rect x="10" y="10" width="60" height="20" rx="10" fill="#65BCB6" />
      <rect x="20" y="40" width="50" height="16" rx="8" fill="#FFA18E" />
      <rect x="15" y="70" width="55" height="18" rx="9" fill="#65BCB6" />

      {/* Connection lines */}
      <line
        x1="40"
        y1="30"
        x2="45"
        y2="40"
        stroke="#65BCB6"
        strokeWidth="2"
        opacity="0.6"
      />
      <line
        x1="45"
        y1="56"
        x2="42"
        y2="70"
        stroke="#FFA18E"
        strokeWidth="2"
        opacity="0.6"
      />
    </svg>
  );
};

export const LoginTopRight = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 288 288" fill="none">
      {/* AI Brain/Network */}
      <circle cx="144" cy="120" r="40" fill="#65BCB6" opacity="0.3" />
      <circle cx="144" cy="120" r="25" fill="#65BCB6" opacity="0.5" />
      <circle cx="144" cy="120" r="12" fill="#65BCB6" />

      {/* Network connections */}
      <circle cx="100" cy="80" r="8" fill="#FFA18E" />
      <circle cx="188" cy="80" r="8" fill="#FFA18E" />
      <circle cx="120" cy="180" r="8" fill="#FFA18E" />
      <circle cx="168" cy="180" r="8" fill="#FFA18E" />

      <line
        x1="144"
        y1="108"
        x2="100"
        y2="88"
        stroke="#65BCB6"
        strokeWidth="2"
        opacity="0.6"
      />
      <line
        x1="144"
        y1="108"
        x2="188"
        y2="88"
        stroke="#65BCB6"
        strokeWidth="2"
        opacity="0.6"
      />
      <line
        x1="144"
        y1="132"
        x2="120"
        y2="172"
        stroke="#65BCB6"
        strokeWidth="2"
        opacity="0.6"
      />
      <line
        x1="144"
        y1="132"
        x2="168"
        y2="172"
        stroke="#65BCB6"
        strokeWidth="2"
        opacity="0.6"
      />

      {/* Data flow particles */}
      <circle cx="122" cy="94" r="3" fill="#FFA18E" opacity="0.8" />
      <circle cx="166" cy="94" r="3" fill="#FFA18E" opacity="0.8" />
      <circle cx="132" cy="156" r="3" fill="#FFA18E" opacity="0.8" />
      <circle cx="156" cy="156" r="3" fill="#FFA18E" opacity="0.8" />
    </svg>
  );
};

export const StepUser = () => {
  return (
    <svg
      className="w-5 h-5 text-brand-primary"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
};

export const StepColor = () => {
  return (
    <svg
      className="w-4 h-4 text-brand-primary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
      />
    </svg>
  );
};

export const StepCheck = () => {
  return (
    <svg
      className="w-4 h-4 text-grey-900"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
};

export const StepChatButton = () => {
  return (
    <svg
      className="w-5 h-5 text-brand-purple"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
    </svg>
  );
};

export const StepSize = () => {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>
  );
};

export const StepLogin = () => {
  return (
    <svg
      className="w-5 h-5 text-brand-emerald"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </svg>
  );
};

export const StepUpload = () => {
  return (
    <svg
      className="w-6 h-6 text-grey-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
};

export const StepStar = () => {
  return (
    <svg
      className="w-4 h-4 text-brand-secondary mt-0.5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
};

export const StepMessage = () => {
  return (
    <svg
      className="w-5 h-5 text-brand-coral"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
    </svg>
  );
};

export const StepBigStar = () => {
  return (
    <svg
      className="w-8 h-8 text-brand-primary"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
};

export const Info = () => {
  return (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 15c-.553 0-1-.448-1-1s.447-1 1-1 1 .448 1 1-.447 1-1 1zm1-3h-2V7h2v7z" />
    </svg>
  );
};

export const Tick = () => {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

export const RegisterTopLeft = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 160 160" fill="none">
      <path
        d="M20 140 Q80 20 140 80 Q100 120 60 100 Q40 140 20 140Z"
        fill="#65BCB6"
      />
      <path
        d="M40 120 Q100 40 120 100 Q80 140 40 120Z"
        fill="#FFA18E"
        opacity="0.7"
      />
    </svg>
  );
};

export const AivaWhite = () => {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.36L2 22l5.64-1.05C9.96 21.64 11.46 22 13 22h6c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z" />
    </svg>
  );
};

export const Install = () => {
  return (
    <svg viewBox="0 0 20 20" fill="none">
      <g>
        <path
          d="M13.3335 15L18.3335 10L13.3335 5"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.6665 5L1.6665 10L6.6665 15"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_11_9797">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Refresh = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M19.9381 13C19.979 12.6724 20 12.3387 20 12C20 7.58172 16.4183 4 12 4C9.49942 4 7.26681 5.14727 5.7998 6.94416M4.06189 11C4.02104 11.3276 4 11.6613 4 12C4 16.4183 7.58172 20 12 20C14.3894 20 16.5341 18.9525 18 17.2916M15 17H18V17.2916M5.7998 4V6.94416M5.7998 6.94416V6.99993L8.7998 7M18 20V17.2916"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Appearance = () => {
  return (
    <svg viewBox="0 0 16 16">
      <path
        fill="currentColor"
        d="M8,0 C12.4183,0 16,3.58172 16,8 C16,8.15958 15.9953,8.31807 15.9861,8.47533 C15.9328,9.38596 15.1095,10.0039 14.1974,10.0039 L11.0106,10.0039 C9.22875,10.0039 8.33642,12.1582 9.59635,13.4181 C10.4823,14.304 10.198,15.7959 8.95388,15.9437 C8.6411,15.9809 8.32278,16 8,16 C3.58172,16 0,12.4183 0,8 C0,3.58172 3.58172,0 8,0 Z M8,2 C4.68629,2 2,4.68629 2,8 C2,11.1538 4.4333,13.7393 7.52492,13.9815 C6.059,11.4506 7.82321,8.00391 11.0106,8.00391 L14,8.00391 C14,4.68629 11.3137,2 8,2 Z M5,8 C5.55228,8 6,8.44771 6,9 C6,9.55228 5.55228,10 5,10 C4.44772,10 4,9.55228 4,9 C4,8.44771 4.44772,8 5,8 Z M6,5 C6.55228,5 7,5.44772 7,6 C7,6.55228 6.55228,7 6,7 C5.44772,7 5,6.55228 5,6 C5,5.44772 5.44772,5 6,5 Z M9,4 C9.55228,4 10,4.44772 10,5 C10,5.55228 9.55228,6 9,6 C8.44771,6 8,5.55228 8,5 C8,4.44772 8.44771,4 9,4 Z"
      />
    </svg>
  );
};

export const SendMessage = () => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1668 8.33325L15.8335 0.833252L0.833496 8.33325L15.8335 15.8333L14.1668 8.33325ZM14.1668 8.33325H7.50016"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Delete = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const User = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Plus = () => {
  return (
    <svg viewBox="0 0 18 18" fill="none">
      <path
        d="M3.75 9H14.25"
        stroke="currentColot"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 3.75V14.25"
        stroke="currentColot"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DashUser = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

export const DashChats = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
};

export const DashMints = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );
};

export const DashTime = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
};

export const DashRate = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
};

export const DashMsg = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 12h8" />
      <path d="M12 8v8" />
      <rect x="3" y="4" width="18" height="16" rx="2" />
    </svg>
  );
};

// export const Plus = () => {
//   return (

//   );
// };
