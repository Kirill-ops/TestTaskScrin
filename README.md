# Задание: Разработка веб-сайта для списка задач

## Для запуска нужно:
- **Frontend**: Node.js v22.14.0 - убедиться, что ```npm``` установлен в переменные среды (например с помощью ```npm -v```).\
Варианты запуска:
  - С помощью VS Code (или аналогов).
    - Открыть папку ```Frontend```
    - В терминале прописать сначала команду ```npm i```, после  ```npm start```
  - С помощью ```cmd``` или ```PowerShell```.
    - Используя команду ```cd C:\....\Frontend```, перейти к папке
    - Прописать сначала команду ```npm i```, после  ```npm start```
- **Backend**: .Net 9. Перейти в папку ```Backend```, с помощью VS 2022 (или аналогов) открыть файл ```Backend.sln```, выбрать и запустить проект ```WebApplicationForSKRIN```

## Описание задачи:

Необходимо создать простое веб-приложение для управления задачами с использованием React. Приложение должно предоставлять следующие возможности:

- Отображение списка задач:
 - Каждая задача должна отображать свой текст и состояние (выполнена или нет).
 - Задачи могут быть в двух состояниях: выполнена или не выполнена. Отметка выполненности должна отображаться как чекбокс.

- Добавление новой задачи:
  - В верхней части страницы должен быть input, в который можно ввести текст новой задачи.
  - После ввода текста и нажатия кнопки "Добавить", задача должна добавляться в список.

- Редактирование задачи:
  - Каждая задача должна иметь возможность редактировать свой текст. При клике на задачу она должна переключаться в режим редактирования (например, отображаться input для редактирования текста).

- Удаление задачи:
  - Каждая задача должна иметь кнопку "Удалить", при нажатии на которую задача удаляется из списка.\

- Фильтрация задач:
  - Добавьте возможность фильтрации задач по их состоянию (все, выполненные, невыполненные). Для этого должно быть три кнопки: "Все", "Выполненные", "Невыполненные".

- Сохранение данных (локально):
  - Все данные (список задач) должны сохраняться в любой реляционной БД

## Требования к реализации:
- Использовать React.
- Приложение должно быть разделено на компоненты.
- Использование Hooks (useState, useEffect).
- Приложение должно быть стилизовано (например, с использованием CSS или CSS-in-JS).
- При реализации использовать подход "компонентного дерева" и подходящий уровень абстракции для компонентов.

## Ожидаемый результат:
- Рабочее веб-приложение, которое выполняет все перечисленные функции.
- Код должен быть чистым и хорошо структурированным.
- Логика компонентов должна быть разнесена и легко поддерживаемой.
- Приложение должно быть отзывчивым, работать на разных устройствах.

## Критерии оценки:

- Чистота и структурированность кода:
  - Использование функциональных компонентов и хуков.
  - Хорошая организация кода (например, разделение на компоненты и логику).

- Реализация UI:
  - Приложение должно быть визуально понятно и удобно для пользователя.

- Тестируемость и масштабируемость кода:
  - Как легко можно будет расширить приложение или добавить новые функции.

- Реализация хранения данных в любой реляционной БД
