Currency API
Сервер на node.js для  обработки данных о валютах со стороннего API
Работает с PostgreSQL через Prisma и выполняет кеширование дaнных.

GET /api/currencies - возвращает список поддерживаемых валют в формате ISO4217 (3 буквы, например USD, EUR); Кешируется на 1 чаc 
GET /api/rates - возвращает рейты для конкретной валюты; Параметры (в query запроса)
GET /api/user - возвращает настройки текущего пользователя (по куке user_id)
POST /api/user - обновляет настройки пользователя (по куке user_id);

Установка и запуск
npm install
npx prisma migrate dev   
npm run dev  
npm install express axios cookie-parser cors dotenv
npm install -D typescript ts-node-dev @types/node @types/express
npx tsc --init
npm install axios
npm install --save-dev @types/axios
npm install swagger-jsdoc swagger-ui-express
npm i --save-dev @types/swagger-jsdoc
npm install prisma @prisma/client


