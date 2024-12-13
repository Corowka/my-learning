from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from text.translate import translate_text
from text.parts_of_speech import parts_of_speech
from text.abstract import abstract_text

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


class TextProps(BaseModel):
    text: str


@app.post("/text/translate")
def translate(props: TextProps):
    try:
        translation = translate_text(props.text, "ru")
        return {"translation": translation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/text/pos")
def pos(props: TextProps):
    try:
        words = parts_of_speech(props.text)
        return {"words": words}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/text/abstract")
def abstract(props: TextProps):
    try:
        abstract = abstract_text(props.text)
        return {"abstract": abstract}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))