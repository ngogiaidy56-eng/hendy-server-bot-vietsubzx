import os
from openai import OpenAI

def transcribe(path:str):
    key=os.getenv('OPENAI_API_KEY')
    if not key: raise RuntimeError('OPENAI_API_KEY is not configured')
    client=OpenAI(api_key=key)
    with open(path,'rb') as f:
        r=client.audio.transcriptions.create(model=os.getenv('WHISPER_MODEL','whisper-1'),file=f,response_format='verbose_json',timestamp_granularities=['word','segment'])
    return [dict(s) if not isinstance(s,dict) else s for s in (getattr(r,'segments',None) or [])]
