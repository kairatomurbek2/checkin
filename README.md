# checkin.kg

**checkin** - этот сайт предназначен для бронирование записи у специалиста. Специалист может 
создавать и настраивать свое расписание, у него есть две роли фрилансер и сотрудник компании.
Компания может owner может создавать специалиста создавать админа компании

# Для разработчиков
1. Для того чтоб полнять окружение перейдите по ссылке https://gitlab.com/Alybek/checkin/wikis/ProjectEnvironment
2. Доступы от prod, demo находится в https://gitlab.com/Alybek/checkin/wikis/access-from-checkin

## Обязательные правила

 - Строго следуем PEP8 (исключение - длина строки кода, используем 120
   символов)

 - Именование переменных, классов, модулей должно быть на
   латинице, на английском языке.

## Комментарии, аннотация

 1. Комментарии к коду пишутся на русском языке.
 2. Комментарии должны быть написано грамотно. без ошибка и со знаками препинания, чтобы текст не мог быть понят неоднозначно.
 3. Любые комментарии, как призыв к рефакторингу или исправлению бага должны быть написаны, как "TODO"


## Модели и ORM

 1. Каждый класс должен иметь краткое описание его предназначения
 2. Поля модели должны иметь `verbose_name` в виде i18n строки на русском языке
 3. Поля с неочевидным названием или имеющими важные примечания обязательно должны иметь `help_text` i18n строки
 4. Параметры полей стараемся писать в одну строку, если параметров много,
    переносим второй строкой.
 5. Не забываем о наследовании, если есть множество классов имеющих одни и те же поля, выносим их в абстрактный класс и наследуем его в нужных классах.
 6. Если у нас есть некий свой тип поля, или сильно кастомизированное имеющиеся, не стесняемся создать из него отдельное поле, чтобы модели не обрастали полями с кучей параметров.
 7. Если у нас в коде часто встречаются однотипные фильтры,  используем менеджер модели, создав в нем нужный метод.

## Миграции

 1. Перед коммитом, если вы много "игрались" со структурой модели и
    наплодили несколько миграций для одной модели, чистим их и делаем
    одну новую.


## Зависимости (requirements.txt)

 1. Любые зависимости должны иметь указания версий, допустимых к использованию (протестированных)
