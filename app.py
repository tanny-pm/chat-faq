import os

import openai
from dotenv import load_dotenv
from flask import Flask, render_template, request

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)


@app.route("/")
def hello_world():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():
    reference = ""
    if "reference" in request.form:
        reference = request.form["reference"]
        sys_setting = """あなたはプロのCS担当者です。この仕様書を読んで、ユーザー向けのFAQを作成してください。"""
        faq, _ = ask_to_chatgpt(reference, sys_setting)

    return render_template("index.html", faq=faq)


def ask_to_chatgpt(prompt: str, sys_setting: str) -> tuple[str, int]:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": sys_setting},
            {"role": "user", "content": prompt},
        ],
    )

    message = response["choices"][0]["message"]["content"]
    token = int(response["usage"]["total_tokens"])
    return (message, token)
