### Маршруты API

#### Рецепты
| Маршрут                | Метод | Описание                          | Параметры (body)                            | Заголовки                     | Коды ответа                          |
|------------------------|-------|-----------------------------------|---------------------------------------------|-------------------------------|--------------------------------------|
| `/recipes`             | GET   | Получить все рецепты              | -                                           | `Content-Type: application/json` | 200: Успех<br>500: Ошибка сервера    |
| `/recipes`             | POST  | Создать новый рецепт              | `{title, cooking_time, difficulty, chef_id}` | `Content-Type: application/json` | 201: Создано<br>400: Неверные данные<br>500: Ошибка сервера |
| `/recipes/:id`         | GET   | Получить рецепт по ID             | -                                           | `Content-Type: application/json` | 200: Успех<br>404: Не найдено<br>500: Ошибка сервера |
| `/recipes/:id`         | PUT   | Обновить рецепт                   | `{title, cooking_time, difficulty, chef_id}` | `Content-Type: application/json` | 200: Успех<br>404: Не найдено<br>500: Ошибка сервера |
| `/recipes/:id`         | DELETE| Удалить рецепт                    | -                                           | `Content-Type: application/json` | 200: Успех<br>404: Не найдено<br>500: Ошибка сервера |
| `/recipes/:id/grocery-list` | GET | Получить список покупок для рецепта | -                                       | `Content-Type: application/json` | 200: Успех<br>404: Не найдено<br>500: Ошибка сервера |

#### Мастер-классы
| Маршрут                | Метод | Описание                          | Параметры (body)                            | Заголовки                     | Коды ответа                          |
|------------------------|-------|-----------------------------------|---------------------------------------------|-------------------------------|--------------------------------------|
| `/masterclasses`       | GET   | Получить все мастер-классы        | -                                           | `Content-Type: application/json` | 200: Успех<br>500: Ошибка сервера    |
| `/masterclasses`       | POST  | Создать мастер-класс              | `{chef_id, recipe_id, schedule, price, max_participants}` | `Content-Type: application/json` | 201: Создано<br>400: Неверные данные<br>500: Ошибка сервера |
| `/masterclasses/:id`   | PUT   | Обновить мастер-класс             | `{chef_id, recipe_id, schedule, price, max_participants}` | `Content-Type: application/json` | 200: Успех<br>404: Не найдено<br>500: Ошибка сервера |
| `/masterclasses/:id`   | DELETE| Удалить мастер-класс              | -                                           | `Content-Type: application/json` | 200: Успех<br>404: Не найдено<br>500: Ошибка сервера |
| `/masterclasses/chef/:chef_id` | GET | Получить мастер-классы шефа    | -                                       | `Content-Type: application/json` | 200: Успех<br>500: Ошибка сервера    |

#### Повара
| Маршрут       | Метод | Описание               | Параметры (body) | Заголовки                     | Коды ответа                       |
|---------------|-------|------------------------|------------------|-------------------------------|-----------------------------------|
| `/chefs`      | GET   | Получить всех поваров  | -                | `Content-Type: application/json` | 200: Успех<br>500: Ошибка сервера |

### Примеры запросов

**Создание рецепта:**
```http
POST /api/recipes
Content-Type: application/json

{
  "title": "Паста Карбонара",
  "cooking_time": 30,
  "difficulty": "средне",
  "chef_id": 1
}
```

**Получение мастер-классов шефа:**
```http
GET /api/masterclasses/chef/1
Accept: application/json
```

### Форматы данных

**Рецепт:**
```json
{
  "recipe_id": 1,
  "title": "Салат Цезарь",
  "cooking_time": 20,
  "difficulty": "легко",
  "chef_id": 1,
  "created_at": "2023-01-01T00:00:00.000Z"
}
```

**Мастер-класс:**
```json
{
  "class_id": 1,
  "chef_id": 1,
  "recipe_id": 1,
  "schedule": "2023-12-31T18:00:00.000Z",
  "price": 2500,
  "max_participants": 10,
  "created_at": "2023-01-01T00:00:00.000Z"
}
```
