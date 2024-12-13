from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

tokenizer = AutoTokenizer.from_pretrained("t5-small")
model = AutoModelForSeq2SeqLM.from_pretrained("t5-small")


def abstract_text(text):
    input_text = "summarize: " + text
    input_ids = tokenizer.encode(input_text, return_tensors='pt', max_length=512, truncation=True)
    output = model.generate(input_ids, max_length=150, num_beams=4, early_stopping=True)
    decoded = tokenizer.decode(output[0], skip_special_tokens=True)
    return decoded