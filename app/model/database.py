import configparser, os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

try: 
  conf = configparser.ConfigParser()
  try:
    conf.read('/etc/app/soundklips_db.ini')
    engine = create_engine(f"""{conf['pg_sqlalchemy']['driver']}://{conf['pg_sqlalchemy']['user']}:{conf['pg_sqlalchemy']['password']}@{conf['pg_sqlalchemy']['host']}/{conf['pg_sqlalchemy']['dbname']}""", echo=False)

  except:
    conf.read(os.path.join(os.path.dirname(__file__), 'soundklips_db.ini'))
    engine = create_engine(f"""{conf['pg_sqlalchemy']['driver']}://{conf['pg_sqlalchemy']['user']}:{conf['pg_sqlalchemy']['password']}@{conf['pg_sqlalchemy']['host']}/{conf['pg_sqlalchemy']['dbname']}""", echo=False)

  SessionLocal = sessionmaker(bind=engine) 

except Exception as err:
  raise err
