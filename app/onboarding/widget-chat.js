 
    // async callChatbotAPIWithSSE(message) {
    //   const apiUrl = `${CONFIG.apiEndpoint}/${CONFIG.botUUID}/chat`;

    //   const requestData = {
    //     username: this.userId,
    //     display_name: this.userId,
    //     message: message,
    //     session_id: this.sessionId,
    //   };

    //   this.currentResponse = "";

    //   try {
    //     const response = await fetch(apiUrl, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(requestData),
    //     });

    //     if (!response.ok) {
    //       const error = new Error(`HTTP Error: ${response.status}`);
    //       error.status = response.status;
    //       throw error;
    //     }

    //     // Check if response is SSE (text/event-stream)
    //     const contentType = response.headers.get("content-type");
    //     if (contentType && contentType.includes("text/event-stream")) {
    //       await this.handleSSEStream(response);
    //     } else {
    //       // Fallback for non-SSE responses
    //       const data = await response.json();
    //       const botMessage =
    //         data.answer ||
    //         data.response ||
    //         data.message ||
    //         "متأسفانه نتوانستم درخواست شما را پردازش کنم.";
    //       this.hideTyping();
    //       this.addMessage(botMessage, "bot");
    //     }
    //   } catch (error) {
    //     if (!error.status) {
    //       error.status = 500;
    //     }
    //     throw error;
    //   }
    // }

 