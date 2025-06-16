# Books API

RESTful API для управления библиотекой книг, построенный на NestJS с использованием TypeScript и PostgreSQL.

## 🚀 Особенности

- **NestJS** - современный Node.js фреймворк для создания масштабируемых API
- **TypeScript** - строгая типизация для надежности кода
- **PostgreSQL** - надежная реляционная база данных
- **TypeORM** - мощный ORM для работы с базой данных
- **Swagger** - автоматическая генерация документации API
- **Docker** - контейнеризация для легкого развертывания
- **Jest** - фреймворк для тестирования

## 📋 Требования

- Node.js >= 18
- npm >= 8
- PostgreSQL >= 13 (или Docker)

## 🛠 Установка и запуск

### Вариант 1: Локальная установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd books-api
```

2. Установите зависимости:
```bash
npm install
```

3. Настройте переменные окружения:
```bash
# Создайте файл .env в корне проекта
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=books_db
```

4. Запустите приложение:
```bash
# Режим разработки
npm run start:dev

# Продакшн режим
npm run start:prod
```

### Вариант 2: Docker

1. Запустите приложение с Docker Compose:
```bash
docker-compose up -d
```

Это автоматически поднимет API сервер и PostgreSQL базу данных.

## 📚 API Документация

После запуска приложения документация Swagger будет доступна по адресу:
- **Local**: http://localhost:3000/api
- **Docker**: http://localhost:3000/api

## 🧪 Тестирование

```bash
# Запуск всех тестов
npm run test

# Запуск тестов в watch режиме
npm run test:watch

# Покрытие тестами
npm run test:cov

# E2E тесты
npm run test:e2e
```

## 📁 Структура проекта

```
src/
├── app.controller.ts    # Главный контроллер
├── app.module.ts        # Корневой модуль приложения
├── app.service.ts       # Основной сервис
└── main.ts             # Точка входа в приложение
```

## 🔧 Доступные скрипты

```bash
npm run start           # Запуск приложения
npm run start:dev       # Запуск в режиме разработки с автоперезагрузкой
npm run start:debug     # Запуск в режиме отладки
npm run build           # Сборка проекта
npm run format          # Форматирование кода
npm run lint            # Проверка кода линтером
```

## 🐳 Docker

Проект включает в себя:
- `Dockerfile` - для создания образа приложения
- `docker-compose.yml` - для запуска приложения с PostgreSQL
- `.dockerignore` - исключения для Docker образа

## 🗄 База данных

Проект использует PostgreSQL с TypeORM. Конфигурация подключения:
- **Host**: localhost (или postgres в Docker)
- **Port**: 5432
- **Database**: books_db
- **User**: postgres
- **Password**: postgres

## 🔐 Переменные окружения

| Переменная | Описание | По умолчанию |
|------------|----------|--------------|
| `PORT` | Порт для запуска сервера | 3000 |
| `DB_HOST` | Хост базы данных | localhost |
| `DB_PORT` | Порт базы данных | 5432 |
| `DB_USER` | Пользователь БД | postgres |
| `DB_PASSWORD` | Пароль БД | postgres |
| `DB_NAME` | Название базы данных | books_db |
| `DB_SYNC` | Автоматическая синхронизация схемы БД | false |

> ⚠️ **Важно**: `DB_SYNC=true` следует использовать только в разработке. В продакшене всегда используйте `DB_SYNC=false` и управляйте схемой БД через миграции.

## 📄 Лицензия

Этот проект не имеет лицензии (UNLICENSED).

## 🤝 Вклад в проект

1. Сделайте форк проекта
2. Создайте feature ветку (`git checkout -b feature/amazing-feature`)
3. Сделайте коммит изменений (`git commit -m 'Add amazing feature'`)
4. Запушьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📞 Поддержка

Если у вас возникли вопросы или проблемы, создайте issue в репозитории проекта.
