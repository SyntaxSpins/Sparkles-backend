const telegramToken = process.env.TELEGRAM_TOKEN as string;
const telegramChatId = process.env.TELEGRAM_CHAT as string;

export async function sendTelegramMessage(message: string): Promise<void> {
  const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
        message_thread_id: 29,
        parse_mode: "Markdown",
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Telegram API responded with ${response.status}`);
    }

    console.log("Message sent to Telegram.");
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
  }
}
