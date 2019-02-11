FROM python:3-alpine

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py ./

COPY static ./static/

ENV FLASK_APP main.py

EXPOSE 5000/tcp

CMD [ "flask", "run", "--host=0.0.0.0" ]
