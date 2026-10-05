import subprocess

def burn_subtitles(video:str,ass:str,output:str):
    cmd=['ffmpeg','-y','-i',video,'-vf',f"ass={ass.replace(':','\\:')}",'-c:a','copy',output]
    p=subprocess.run(cmd,capture_output=True,text=True)
    if p.returncode: raise RuntimeError(p.stderr[-4000:])
