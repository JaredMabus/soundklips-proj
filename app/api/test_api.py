import requests

url = "http://localhost:8000"

class Request:
    def __init__(self, url, data):
        self.url = f"http://localhost:8000{url}"
        self.data = data
        self.response = None
        self.response_status = None
        self.response_data = None
        
    def post(self):
        try: 
            self.response = requests.post(self.url, json=self.data)
            self.response_data = self.response.json()
        except Exception as err:
            print(err)
            

    def log_response_data(self):
        print(self.response_data.__dict__)
        # for i in self.response_data:
        #     print(f'{i.items()}')
   
def test_audio_data_account():
    data = {
        "account_id": '98170907-6574-4169-a80f-effebf5b1b14',
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbl9zdWNjZXNzIjp0cnVlLCJhY2NvdW50X2lkIjoiOTgxNzA5MDctNjU3NC00MTY5LWE4MGYtZWZmZWJmNWIxYjE0IiwiZW1haWwiOiJ0ZXN0QHRlc3QxMjMuY29tIn0.jU84kdhslC9vEtcQOMaoCq1S4Vzmyp_PkBYEC3x3MJc" 
        }

    r = Request('/api/select/audio-data/account/', data )
    r.post()
    print(r.response_data)

    assert(r.response.status_code == 200 )
    assert("audio_dat" and "success" in r.response_data.keys())
    assert("image_url" in r.response_data["audio_data"][0].keys())

    
    

    