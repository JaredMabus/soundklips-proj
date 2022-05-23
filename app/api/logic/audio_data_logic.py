from app.app import db
import app.model.model as model
from app.model.model import AudioData
from google.cloud import storage
import librosa
import os, uuid
from sqlalchemy import and_, or_, not_, update
from sqlalchemy.exc import SQLAlchemyError
from app.utils.google_storage import GoogleStorage as GS
from app.api.error_handling import Error_Resource


def upload_to_bucket(af, **kwargs):
    try:
        # Upload audio file
        gs = GS(kwargs['audio_file'], af.file_name, f'{af.account_id}/audio/{af.file_name}')
        gs.upload(kwargs['audio_file'].content_type, True)

        # Upload audio image file if exist
        if "audio_image" in kwargs.keys():
            gs.file=kwargs['audio_image'] 
            gs.file_name = kwargs['audio_image'].filename
            gs.gcs_path = f"{af.account_id}/audio_image/{af.file_name}-{kwargs['audio_image'].filename}"
            gs.upload(kwargs['audio_image'].content_type)

    except Exception as err:
        raise err
        return err  


def insert_audio_data_db(af):
    try:
        db.add(af)
        db.commit()  
        return True
        
    except Exception as err:
        db.rollback()
        return err


def duplicate_file_name_iterator(af, audio_image):
    ''' Queries GC SQL for file name. If exist,
        updates audio meta file_name and url data
    '''
    try:
        index = af.file_name.rfind('.')
        strip_file_name = af.file_name[0:index]

        results = db.query(AudioData).with_entities(AudioData.file_name).filter(
            and_(AudioData.file_name.like(f'{strip_file_name}-%{af.file_name[index:]}'), 
            AudioData.account_id == af.account_id)).order_by(
            AudioData.file_name.asc()).all() # posible to use count()?
        
        data = [row for row in results]

        af.file_name = strip_file_name + f'-{len(data) + 1}' + af.file_name[index:]
        af.public_url = f'''https://storage.googleapis.com/soundklips-1/{af.account_id}/audio/{af.file_name}'''
        
        if audio_image == None:
            af.image_url == None
        else: 
            af.image_url = f'''https://storage.googleapis.com/soundklips-1/{af.account_id}/audio_image/{af.file_name}-{audio_image.filename}'''.replace(" ", "")
        
        return True   

    except Exception as err:
        raise err
        

def get_audio_meta_data(af, audio_file):
    '''Uses Librosa module to get audio meta data, peaks and duration'''
    # By default, Librosa does not support .mp3 files. 
    # ffmpeg (or other audio converting libraries) must be used to load .mp3s
    # Issues:
    #   After installing ffmpeg, librosa.load() still does not read from werkzueg FileStorage.read()
    #   Current solution is to write to a temp binary file at './temp_asset' and then delete after upload 
    try:
        if af.file_type == 'audio/mpeg':
            file_id = uuid.uuid4()
            temp_file_path = f"{os.path.dirname(__file__)}/temp_asset/{file_id}-{af.file_name}"
            
            with open(temp_file_path, 'wb') as f:
                f.write(audio_file.read())

            y, sr = librosa.load(temp_file_path,sr=None)
            os.remove(temp_file_path)

        else:
            y, sr = librosa.load(audio_file, sr=None )
            
        af.duration = librosa.get_duration(y,sr)
        af.peaks = str(list(librosa.onset.onset_strength(y,sr)))

        return True

    except Exception as err:
        raise err
        return False


def upload_gcs_db(af, audio_file, audio_image):
    """ 1. Runs a function to get audio meta data
        2. Run insert function to upload audio file meta data to SQL database
        3. Runs upload function to GCS and checks if file name already exist and will run duplicate_file_name_iterator() to get new name
    Params:
        af: class object containing audio file's meta data 
        audio_file: FileStorage object containing audio file as byte
        audio_image: FileStorage object for audio file image
    Returns:
        dict object with key "success" and value True if file is successfully uploaded to GCP and SQL database
    To-do:
        refactor conditional statements for handling instance of duplicate file names, and if there is an image or not 
    """
    try:
        get_meta_data = get_audio_meta_data(af, audio_file)
        upload_db_success = insert_audio_data_db(af)

        if get_meta_data and upload_db_success == True and audio_image != None:
            upload_to_bucket(af, audio_file=audio_file, audio_image=audio_image)
            
            return {'success': True} 

        elif get_meta_data and upload_db_success == True and audio_image == None:
            upload_to_bucket(af=af, audio_file=audio_file)
            
            return {'success': True} 

        elif type(upload_db_success).__name__ == 'IntegrityError' and get_meta_data == True and audio_image != None:
            duplicate_file_name_iterator(af, audio_image)
            insert_audio_data_db(af)
            upload_to_bucket(af, audio_file=audio_file, audio_image=audio_image)

            return {'success': True}

        elif type(upload_db_success).__name__ == 'IntegrityError' and get_meta_data == True and audio_image == None:
            duplicate_file_name_iterator(af, audio_image)
            insert_audio_data_db(af)
            upload_to_bucket(af, audio_file=audio_file)

            return {'success': True}

        else:
            return {'success': False, 'message': str(upload_db_success)}

    except Exception as err:
        # raise err
        return {'success': False, 'message': str(err)} 
              
    finally:
        db.remove()


def update_audio_data(ad):
    try:
        data = db.query(AudioData).\
            filter(AudioData.audio_data_id == ad['audio_data_id']).\
            update(ad, synchronize_session=False)
        db.commit()

        if data == 1:
            return data
        else: 
            return Error_Resource('Audio file could not be found').as_json()

    except Exception as err:
        raise err
    
    finally:
        db.remove()


def delete_from_bucket_db(af, public_url, image_url, *args, **kwargs):
    try:
        db.query(AudioData).filter(AudioData.account_id == af.account_id, AudioData.file_name == af.file_name).delete()
        
        try: 
            gs = GS(None, af.file_name, f'{af.account_id}/audio/{af.file_name}' )
            

            db.commit()
        except Exception as err:
            raise err

    except Exception as err:
        raise err

    finally:
        db.remove()    


def select_account_audio_data_logic(ad):
    try:
        audio_data = db.query(AudioData).filter_by(account_id = ad.account_id).all()
        audio_data_obj = {'audio_data': []}
        for row in audio_data:
            json = {c.name: getattr(row, c.name) for c in row.__table__.columns}
            audio_data_obj['audio_data'].append(json)
        
        audio_data_obj['success'] = True
        # print(audio_data_obj)
        return audio_data_obj

    except Exception as err:
        return {'success': False}
        db.rollback()
        raise err

    finally:
        db.remove()





# OLD FUNCS
# def get_single_audio_file(audio_file_id):
#     """ SELECT single audio file by audio_id"""
#     try: 
#         db = DB()
#         db.connect('pg_admin', 'soundklips', 'audio_data')

#         db.get_field_names( query_field_names =True)

#         # print(db.field_names_list )
        
#         db.cur.execute(f'''
#             SELECT *
#                 FROM {db.database_name}.{db.table}
#                 WHERE audio_file_id = {audio_file_id}
#         ''')
#         results = db.cur.fetchall()

#         json_data = [dict(zip(db.field_names, result)) for result in results]
#         json_data = json_data[0]
#         # print(json_data[0]['title'])
#         # base64_audio_file =  json_data['audio_file_byte'].tobytes()
#         base64_audio_file =  base64.b64encode(json_data['audio_file_byte'])

#         json_data['audio_file_byte'] = base64_audio_file

#         return json_data

#     except Exception as e:
#         raise e

#     finally: 
#         db.close_db()

# import os

# if __name__ == "__main__":
#     print(f"{os.path.dirname(__file__)}/temp_asset/")
