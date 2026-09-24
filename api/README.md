# 🚀 Развертывание CNC Generator Backend

## Быстрый старт (5 минут)

### Шаг 1: Подготовь Vercel
1. Перейди на https://vercel.com
2. Зарегистрируйся (или залогинься) через GitHub
3. Нажми "New Project"

### Шаг 2: Создай репозиторий на GitHub

```bash
# 1. Создай папку проекта
mkdir cnc-generator-backend
cd cnc-generator-backend

# 2. Инициализируй Git
git init
git add .
git commit -m "Initial commit"

# 3. Создай репозиторий на GitHub (через веб):
# - Перейди на https://github.com/new
# - Создай репозиторий "cnc-generator-backend"
# - Загрузи файлы:
git remote add origin https://github.com/YOUR_USERNAME/cnc-generator-backend.git
git branch -M main
git push -u origin main
```

### Шаг 3: Структура проекта
Создай такую структуру:

```
cnc-generator-backend/
├── api/
│   └── generate-gcode.js    (код выше)
├── vercel.json
└── package.json
```

### Шаг 4: Файлы конфигурации

**vercel.json:**
```json
{
  "version": 2,
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs20.x"
    }
  },
  "env": {
    "ANTHROPIC_API_KEY": "@anthropic_api_key"
  }
}
```

**package.json:**
```json
{
  "name": "cnc-generator-backend",
  "version": "1.0.0",
  "description": "CNC G-Code Generator Backend",
  "main": "api/generate-gcode.js"
}
```

### Шаг 5: Развертывание на Vercel

1. Перейди на https://vercel.com/import
2. Выбери "GitHub" и подключи свой репозиторий
3. Выбери проект "cnc-generator-backend"
4. **В Environment Variables** добавь:
   - Имя: `ANTHROPIC_API_KEY`
   - Значение: твой Claude API ключ (с https://console.anthropic.com/)
5. Жми "Deploy"

Ждёшь ~30 секунд... и готово! 🎉

### Шаг 6: Получи URL своего API

После развертывания Vercel даст тебе URL типа:
```
https://cnc-generator-backend.vercel.app/
```

Твой API будет на:
```
https://cnc-generator-backend.vercel.app/api/generate-gcode
```

### Шаг 7: Обнови HTML артефакт

В файле `cnc-generator-final.html` измени эту строку:

Было:
```javascript
const API_URL = 'https://your-api-url.vercel.app/api/generate-gcode';
```

На:
```javascript
const API_URL = 'https://cnc-generator-backend.vercel.app/api/generate-gcode';
```

(Или ту URL, которую дала Vercel)

---

## Если нет GitHub

Можешь использовать CLI Vercel:

```bash
npm install -g vercel

# В папке проекта:
vercel

# Следуй инструкциям, указывай API ключ в environment variables
```

---

## Проверка работы

```bash
curl -X POST https://your-api-url.vercel.app/api/generate-gcode \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Привет"}'
```

Должен вернуться JSON с ответом Claude.

---

## Готово! ✅

Теперь артефакт может звонить в Claude API без CORS ошибок 🚀
