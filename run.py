import subprocess
import sys
import os
from threading import Thread
import time

def run_frontend():
    os.chdir('frontend')
    if sys.platform == 'win32':
        subprocess.run('npm start', shell=True)
    else:
        subprocess.run(['npm', 'start'])

def run_backend():
    os.chdir('backend')
    if sys.platform == 'win32':
        subprocess.run('python -m uvicorn main:app --reload', shell=True)
    else:
        subprocess.run(['python', '-m', 'uvicorn', 'main:app', '--reload'])

if __name__ == '__main__':
    print("Starting Gene Expression Explorer...")
    
    # Start frontend and backend in separate threads
    frontend_thread = Thread(target=run_frontend)
    backend_thread = Thread(target=run_backend)
    
    backend_thread.start()
    time.sleep(2)  # Give the backend some time to start
    frontend_thread.start()
    
    try:
        frontend_thread.join()
        backend_thread.join()
    except KeyboardInterrupt:
        print("\nShutting down services...") 