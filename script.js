const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

const form = document.getElementById("leadForm");
const result = document.getElementById("result");

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/cr7vibjngws8zj2ik2xwqc94zmxgidns";


form.addEventListener("submit", async function (event) {
  event.preventDefault();

  result.textContent = "Отправляем заявку...";

  const formData = new FormData(form);

  const lead = {
    date: new Date().toLocaleString("ru-RU"),
    page: "builder_landing",

    name: formData.get("name") || "",
    company: formData.get("company") || "",
    phone: formData.get("phone") || "",
    email: formData.get("email") || "",
    interest: formData.get("interest") || "",
    comment: formData.get("comment") || "",

    telegramUsername: tg?.initDataUnsafe?.user?.username || "",
    telegramId: tg?.initDataUnsafe?.user?.id || "",

    source: "telegram_mini_app"
  };

  try {
    await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(lead)
    });

    result.textContent = "Заявка отправлена. Мы скоро свяжемся с вами.";
    form.reset();

    if (tg) {
      tg.HapticFeedback.notificationOccurred("success");
    }

  } catch (error) {
    console.error("Ошибка:", error);
    result.textContent = "Ошибка соединения. Попробуйте позже.";
  }
});