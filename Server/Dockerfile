FROM python

WORKDIR /app

ENV FLASK_APP = main.py

ENV FLASK_ENV=development

COPY ./requirements.txt . 

RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python","main.py" ]