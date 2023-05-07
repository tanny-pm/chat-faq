import os
from typing import Optional

import openai
from dotenv import load_dotenv
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def call_chat_gpt(text: str) -> str:
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are an AI language model that generates FAQs based on the given service specifications.",
            },
            {"role": "user", "content": text},
        ],
    )

    return completion.choices[0].message["content"]


class FAQRequest(BaseModel):
    text: str


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/generate-faq")
def generate_faq(request: FAQRequest):
    openai.api_key = os.getenv("OPENAI_API_KEY")
    generated_faq = call_chat_gpt(request.text)

    return {"faq": generated_faq}
