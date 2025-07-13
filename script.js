document.addEventListener('DOMContentLoaded', () => {
  const formRegister = document.getElementById('registerForm');
  const formPaste = document.getElementById('pasteForm');
  const emailInput = document.getElementById('email');
  const pasteInput = document.getElementById('pasteInput');
  const pasteLinkBox = document.getElementById('pasteLinkBox');
  const pasteLink = document.getElementById('pasteLink');

  // Проверяем, есть ли email в localStorage — если да, сразу показываем пасту
  const savedEmail = localStorage.getItem('userEmail');
  if (savedEmail) {
    formRegister.style.display = 'none';
    formPaste.style.display = 'block';
    emailInput.value = savedEmail;
  } else {
    formRegister.style.display = 'block';
    formPaste.style.display = 'none';
  }

  // Обработка регистрации (минимально — просто сохраняем email)
  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email || !validateEmail(email)) {
      alert('Пожалуйста, введите корректный email');
      return;
    }
    localStorage.setItem('userEmail', email);
    formRegister.style.display = 'none';
    formPaste.style.display = 'block';
  });

  // Создание пасты и генерация ссылки с текстом в hash
  formPaste.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = pasteInput.value.trim();
    if (!text) {
      alert('Введите текст пасты');
      return;
    }
    const encoded = encodeURIComponent(text);
    const url = `${location.origin}${location.pathname}#${encoded}`;
    pasteLink.value = url;
    pasteLinkBox.style.display = 'block';
  });

  // Вспомогательная функция для проверки email
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

<script>
  const content = document.getElementById('content');
  const preview = document.getElementById('preview');

  content.addEventListener('input', () => {
    preview.textContent = content.value;
  });
</script>
