# Используем официальный образ Node.js с LTS-версией
FROM node:24-alpine as builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы из текущего контекста в рабочую директорию
COPY . .

# Собираем Vite приложение в режиме production
RUN npm run build

# Создаем контейнер для запуска приложения
FROM node:24-alpine

# Устанавливаем serve для статического сервера
#RUN npm install -g serve

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы из предыдущего контейнера
COPY --from=builder /app/ ./

# Определяем порт, который будет использоваться приложением
EXPOSE 5173

# Запускаем приложение с помощью serve
CMD ["npm", "run", "preview"]
