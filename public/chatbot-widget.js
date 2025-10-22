(function () {
  // --- دریافت پارامترها از URL اسکریپت ---
  const script = document.currentScript;
  const params = new URLSearchParams(script.src.split("?")[1]);
  const apiEndpoint = params.get("apiEndpoint");
  const botUUID = params.get("botUUID");
  const botName = params.get("botName") || "چت‌بات";
  const primaryColor = params.get("primaryColor") || "#3b82f6";
  const accentColor = params.get("accentColor") || "#2563eb";
  const logoUrl = params.get("logoUrl") || "";
  const faqs = params.get("faqs") ? JSON.parse(params.get("faqs")) : [];

  // --- بررسی وجود حالت preview ---
  const previewContainer = document.getElementById("chatbot-preview");
  const isPreviewMode = !!previewContainer;

  // --- ساخت HTML اصلی ویجت ---
  let widgetHTML = `
    <div class="chatbot-container h-full" id="chatbotContainer">
      ${
        isPreviewMode
          ? `<button class="chat-toggle" id="chatToggle">
             <img src="${logoUrl}" alt="logo" style="width:34px;object-fit:contain;" />
            </button>`
          : `<button class="chat-toggle" id="chatToggle">💬</button>`
      }
      <div class="chatbot-window !h-10/12 " id="chatbotWindow">
        <div class="chatbot-header" style="background:${primaryColor}">
          ${logoUrl ? `<img src="${logoUrl}" class="chatbot-logo" />` : ""}
          <span>${botName}</span>
        </div>
        <div class="chatbot-body" id="chatbotBody">
          <div class="chatbot-message bot">سلام! من ${botName} هستم 😊</div>
        </div>
        <div class="chatbot-footer">
          <input id="chatInput" type="text" placeholder="پیام خود را بنویسید..." />
          <button id="sendButton">ارسال</button>
        </div>
      </div>
    </div>
  `;

  // --- تعیین محل درج ویجت ---
  const targetElement = isPreviewMode ? previewContainer : document.body;
  targetElement.insertAdjacentHTML("beforeend", widgetHTML);

  // --- انتخاب المان‌های ایجادشده ---
  const chatContainer = targetElement.querySelector("#chatbotContainer");
  const chatWindow = targetElement.querySelector("#chatbotWindow");
  const chatBody = targetElement.querySelector("#chatbotBody");
  const chatInput = targetElement.querySelector("#chatInput");
  const sendButton = targetElement.querySelector("#sendButton");
  const toggleButton = targetElement.querySelector("#chatToggle");

  // --- استایل پایه برای هر دو حالت ---
  const baseStyles = document.createElement("style");
  baseStyles.textContent = `
    .chatbot-container {
      font-family: sans-serif;
      direction: rtl;
      z-index: 9999;
    }
    .chatbot-window {
      background: #fff;
      display: flex;
      flex-direction: column;
      border: 1px solid #ccc;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    }
    .chatbot-header {
      color: #fff;
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: bold;
    }
    .chatbot-logo {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
    .chatbot-body {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      font-size: 14px;
      background: #f9f9f9;
    }
    .chatbot-message {
      margin-bottom: 8px;
      padding: 8px 10px;
      border-radius: 10px;
      max-width: 80%;
    }
    .chatbot-message.bot {
      background: ${accentColor}22;
      align-self: flex-start;
    }
    .chatbot-message.user {
      background: ${primaryColor};
      color: white;
      align-self: flex-end;
    }
    .chatbot-footer {
      display: flex;
      padding: 8px;
      border-top: 1px solid #eee;
      background: white;
    }
    .chatbot-footer input {
      flex: 1;
      padding: 6px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 13px;
    }
    .chatbot-footer button {
      background: ${primaryColor};
      color: white;
      border: none;
      border-radius: 8px;
      padding: 6px 10px;
      margin-right: 6px;
      cursor: pointer;
    }
    .chat-toggle {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 50px;
      align-items: center;   display: flex; 
      justify-content: center;
      height: 50px;
      border-radius: 50%;
      background: ${primaryColor};
      color: #fff;
      font-size: 24px;
      border: none;
      cursor: pointer;
      box-shadow: 0 3px 10px rgba(0,0,0,0.2);
      z-index: 10000;
    }
  `;
  document.head.appendChild(baseStyles);

  // --- تنظیم موقعیت بر اساس حالت ---
  if (isPreviewMode) {
    chatContainer.style.position = "relative";
    chatWindow.style.position = "relative";
    chatWindow.style.width = "100%";
    chatWindow.style.height = "100%";
    chatWindow.style.boxShadow = "none";
  } else {
    chatContainer.style.position = "fixed";
    chatContainer.style.bottom = "20px";
    chatContainer.style.right = "20px";
    chatWindow.style.width = "320px";
    chatWindow.style.height = "420px";
    chatWindow.style.display = "none";
  }

  // --- رویداد دکمه باز/بستن ---
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      chatWindow.style.display =
        chatWindow.style.display === "none" ? "flex" : "none";
    });
  }

  // --- ارسال پیام کاربر ---
  const sendMessage = () => {
    const text = chatInput.value.trim();
    if (!text) return;

    const userMsg = document.createElement("div");
    userMsg.className = "chatbot-message user";
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);

    chatInput.value = "";

    // پاسخ ساده (نمونه آزمایشی)
    const botMsg = document.createElement("div");
    botMsg.className = "chatbot-message bot";
    botMsg.textContent = "در حال دریافت پاسخ...";
    chatBody.appendChild(botMsg);

    fetch(`${apiEndpoint}/chat/${botUUID}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        botMsg.textContent = data?.reply || "پاسخی دریافت نشد.";
        chatBody.scrollTop = chatBody.scrollHeight;
      })
      .catch(() => {
        botMsg.textContent = "خطا در ارتباط با سرور 😕";
      });
  };

  sendButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
})();
