import spacy

nlp = spacy.load("ru_core_news_sm")


def parts_of_speech(sentence: str):
    doc = nlp(sentence)
    result = []

    for token in doc:
        result.append({
            'word': token.text,
            'pos': token.pos_
        })

    return result