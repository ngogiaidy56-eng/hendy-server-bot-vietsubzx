import json, os
from openai import OpenAI

def translate_segments(segments,target_language='vi',source_language='auto'):
    key=os.getenv('OPENAI_API_KEY')
    if not key: raise RuntimeError('OPENAI_API_KEY is not configured')
    client=OpenAI(api_key=key); model=os.getenv('OPENAI_MODEL','gpt-4o')
    prompt='Translate each subtitle text to '+target_language+'. Preserve order and timestamps. Return JSON array of objects with start,end,text.'
    payload=[{'start':s.get('start'),'end':s.get('end'),'text':s.get('text','')} for s in segments]
    r=client.chat.completions.create(model=model,response_format={'type':'json_object'},messages=[{'role':'system','content':prompt},{'role':'user','content':json.dumps(payload,ensure_ascii=False)}])
    content=r.choices[0].message.content or '{}'; data=json.loads(content); return data.get('segments',data if isinstance(data,list) else [])
