import os, uuid
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, Header, HTTPException
from pydantic import BaseModel
from .services.whisper_stt import transcribe
from .services.gpt_translate import translate_segments
from .services.ffmpeg_burnin import burn_subtitles
app=FastAPI(title='Hendy Vietsub AI Backend',version='1.0.0')
TOKEN=os.getenv('INTERNAL_SERVICE_TOKEN','')
def auth(token:str|None):
    if TOKEN and token!=TOKEN: raise HTTPException(401,'Invalid internal service token')
class TranslateRequest(BaseModel): segments:list[dict]; target_language:str='vi'; source_language:str='auto'
@app.get('/health')
def health(): return {'ok':True,'service':'vietsub-ai-backend'}
@app.post('/v1/stt')
async def stt(file:UploadFile=File(...),x_internal_service_token:str|None=Header(None)):
    auth(x_internal_service_token); data=await file.read(); tmp=Path('/tmp')/f'{uuid.uuid4()}-{file.filename}'; tmp.write_bytes(data)
    try:return {'ok':True,'segments':transcribe(str(tmp))}
    finally: tmp.unlink(missing_ok=True)
@app.post('/v1/translate')
def translate(req:TranslateRequest,x_internal_service_token:str|None=Header(None)):
    auth(x_internal_service_token); return {'ok':True,'segments':translate_segments(req.segments,req.target_language,req.source_language)}
@app.post('/v1/burnin')
async def burnin(video:UploadFile=File(...),ass:UploadFile=File(...),x_internal_service_token:str|None=Header(None)):
    auth(x_internal_service_token); vp=Path('/tmp')/f'{uuid.uuid4()}-{video.filename}'; ap=Path('/tmp')/f'{uuid.uuid4()}-{ass.filename}'; out=vp.with_name(vp.stem+'-burned.mp4'); vp.write_bytes(await video.read()); ap.write_bytes(await ass.read())
    try: burn_subtitles(str(vp),str(ap),str(out)); return {'ok':True,'output':str(out)}
    finally: vp.unlink(missing_ok=True); ap.unlink(missing_ok=True)
