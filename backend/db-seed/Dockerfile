FROM mongo

COPY questions.json /questions.json

CMD mongoimport --host millioner-db --db Quiz --collection questions --type json --file /questions.json --jsonArray