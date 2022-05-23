from google.cloud import storage
import os



# Load GCS credentials
try:
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/etc/app/GCP.json'

except:
    gcs_credential_json = os.path.join(os.path.dirname(__file__),'../config/GCP.json')
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = gcs_credential_json 
        

class GoogleStorage:
    def __init__(self, file=None, file_name=None, gcs_path=None, *args, **kwargs):
        self.bucket_name = "soundklips-1"
        self.file = file
        self.file_name = file_name
        self.gcs_path = gcs_path 
        self.storage_client = storage.Client()
        self.bucket = self.storage_client.bucket(self.bucket_name)
        self.blob = self.bucket.blob(self.gcs_path)


    def remove_path_spaces(self):
        try: 
            if isinstance(self.file_name, str):
                self.file_name = self.file_name.replace(" ", "")

            self.gcs_path = self.gcs_path.replace(" ", "")

        except Exception as err:
            raise err

            
    def upload(self, content_type="application/octet-stream", rewind=False,**kwargs):
        try:
            self.remove_path_spaces()
            self.blob = self.bucket.blob(self.gcs_path) #reset bucket path
            self.blob.upload_from_file(self.file, rewind=rewind, content_type=content_type)
            return True

        except Exception as err:
            # return False
            raise err


    def remove(self):
        try:
            self.blob.delete()
            return True
        
        except Exception as err:
            # return False
            raise err


    def if_exist(self):
        try :
            file_exist = storage.Blob(bucket=self.bucket, name=self.gcs_path).exists(self.storage_client)
            if file_exist == True:
                return True

            else: 
                return False
    
        except Exception as err:
            raise err

    def io_file(self, file_path, *args, **kwargs ):
        try:
            self.file = open(file_path, "rb")

        except Exception as err:
            raise err


    def upload_from_io(self, rewind=False):
        try:
            self.blob.upload_from_file(self.file_name, rewind=rewind)
            return True

        except Exception as err:
            # return False
            raise err

        finally: 
            self.file.close()


if __name__ == "__main__":
    try:
        gs = GoogleStorage(None, "shaker.mp3", "test-path")    
        # gs.io_file()
        # gs.upload_from_io()

        # time.sleep(10)
        # gs.remove()

        exist = gs.if_exist()

        if exist:
            print("file exist")
        else: 
            print("file doesn't exist")

    except Exception as err:
        raise err


