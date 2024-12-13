from googletrans import Translator


def translate_text(text, dest='ru'):
  translator = Translator()
  translation = translator.translate(text, dest=dest)
  return translation.text
