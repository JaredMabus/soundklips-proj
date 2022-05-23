# Soundklips

Soundklips is a web project that allows users to uplaod, share, and find other user's audio samples.

### Features:

- Login and email verification
- Audio sample file management with GCS
- Dark and light mode
- Audio wavefor display for peak amplitude levels of audio files

### Tech Stack:

- **Back-End:** Flask, SQLAlchemy, PostGreSQL
- **Front-End:** React, styled-componets, MUI
- **Docker**
- **NGINX**
- **Cloud:** GC Run, GC Build, GC Registry, GC SQL, and GC Compute

# Python Poetry Environment

If poetry isn't installed on machine  
`curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -`

Could also install with pip instead  
`pip install poetry==1.1.7 `

Install python dependencies  
`poetry install `

Activate poetry virual environment  
`poetry shell`

# Flask Dev Server

Starts server at port 8000 by default  
`python3 main.py`

Start using Gunicorn  
`gunicorn --bind localhost:8000 main:app`

# Docker

Create docker image:
(-t allows you to name the image)  
`docker build -t soundklips-image .`

Create and run container from new image:  
`docker run -p 8000:8000 --name soundklips-container soundklips-image1`

Run flask dev server  
`docker run -it -p 8000:8000 -v $(pwd)/app:/usr/src/app/app:ro --name soudnklips-container soundklips-image flask run -h 0.0.0.0 -p 8000`

`docker run -it -p 8000:8000 -v $(pwd):/usr/src/app --name soudnklips-container soundklips flask run -h 0.0.0.0 -p 8000`

SSH into a docker container:  
`docker exec -it {container-name} /bin/sh`
