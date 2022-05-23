# from app.model.database import Engine
from sqlalchemy import Column, Integer, String, LargeBinary, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
import uuid
from app.utils.auth import hash_password

Base = declarative_base()

class NewAccount(Base):
  __tablename__ = 'account'
  __table_args__ = {'schema': 'soundklips', 'extend_existing':'True'}

  account_id = Column(String, primary_key=True)
  email = Column(String, nullable = False) 
  password = Column(String(length=100), nullable = False)
  account_name = Column(String(length=50), nullable = True, default = 'New Account')

  def as_json(self):
    json = {c.name: getattr(self, c.name) for c in self.__table__.columns}
    return json


  def test_data(self):
    self.account_id = str(uuid.uuid4())
    self.email = 'test@gmail.com'
    self.password = hash_password('password')
    self.first_name = 'tester'
    self.last_name = 'testington'


class Account(Base):
  __tablename__ = 'account'
  __table_args__ = {'schema': 'soundklips' , 'extend_existing':'True'}
  
  account_id = Column(String, primary_key=True)
  email = Column(String, nullable = False)
  confirm_email = Column(String)
  password = Column(String, nullable = False)
  account_name = Column(String, nullable = True, default = 'New Account')


  def as_json(self):
    json = {c.name: getattr(self, c.name) for c in self.__table__.columns}
    return json


  def test_data(self):
    self.account_id = 1
    self.email = 'test@gmail.com'
    self.password = 'passwordasdf'
    self.first_name = 'tester'
    self.last_name = 'testington'


class AudioData(Base):
  __tablename__ = 'audio_data'
  __table_args__ = {'schema': 'soundklips','extend_existing':'True'}

  audio_data_id = Column(Integer, primary_key=True)
  audio_title = Column(String, nullable = True) # user defined name for audio file
  audio_desc = Column(String, nullable = True) # user defined description for audio file
  account_id = Column(String)
  email = Column(String)
  duration = Column(Integer)
  peaks = Column(String)
  file_name = Column(String, nullable=True) 
  file_size = Column(Integer, nullable = True)
  file_type = Column(String, nullable = True)
  privacy_id = Column(Integer, default = 1)
  category_id = Column(Integer, default = 1)
  sub_category_id = Column(Integer, default = 1)
  sub2_category_id = Column(Integer, default = 1)
  public_url= Column(String)
  image_url= Column(String, nullable=True)
    # self.audio_img = Column(LargeBinary, nullable = True) 
    # self.account_user = relationship('Account', backref='account_id', lazy = True) # needed to reference accounts? Or does FK 'account_id' do this?
  

  def as_json(self):
    json = {c.name: getattr(self, c.name) for c in self.__table__.columns}
    return json

    
  def test_data(self):
    self.audio_title = 'sql test'
    self.audio_desc = 'desc test'
    self.account_id = 'c043aabb-7252-4d50-973b-ae96d2ef3312'
    self.email = 'jifiyel209@hypteo.com'
    self.meta_data = 3
    # self.audio_file_byte = b'byte test'
    # self.duration = 200
    self.file_size = 0.78
    self.file_type = "audio/mpeg"

class VW_AudioData(Base):
  __tablename__ = 'vw_total_file_storage'
  __table_args__ = {'schema': 'soundklips','extend_existing':'True'}

  # audio_data_id = Column(Integer)
  # audio_title = Column(String, nullable = True) # user defined name for audio file
  # audio_desc = Column(String, nullable = True) # user defined description for audio file
  account_id = Column(String, primary_key= True)
  # email = Column(String)
  # audio_file_byte = Column(LargeBinary)
  # duration = Column(Integer)
  # file_name = Column(String, nullable=True) 
  total_file_storage = Column(Integer, nullable = True)
  # file_type = Column(String, nullable = True)
  # privacy_id = Column(Integer, default = 1)
  # category_id = Column(Integer, default = 1)
  # sub_category_id = Column(Integer, default = 1)
  # sub2_category_id = Column(Integer, default = 1)
  # public_url= Column(String) 


class Category(Base):
  __tablename__ = 'audio_data_category'
  __table_args__ = {'schema': 'soundklips'}

  category_id = Column(Integer, primary_key=True, nullable=True)
  category_name = Column(String)


if __name__ == "__main__":
  af = AudioData(
    audio_title = 'test', 
    audio_desc = 'test', 
    account_id = 'test',
    email = 'test',
    file_name = 'test',
    file_size = 'test',
    file_type = 'test',
    category_id = 'test',
    # sub_category_id = 'test',
    # sub2_category_id = 'test',
    # audio_img = 'test',
    public_url = 'test'
  )
  print(af.__dict__)

