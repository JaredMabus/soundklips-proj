from flask import Blueprint, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
import json
from app.model.model import AudioData
# API LOGIC
from app.utils.auth import check_token
import app.api.logic.audio_data_logic as api_logic
from app.api.logic.audio_data_logic import upload_gcs_db, select_account_audio_data_logic, delete_from_bucket_db
# Error Handling Classes
from app.api.error_handling import Error_Resource, error_type


audio_data_bp = Blueprint('audio_file_bp', __name__)
cors = CORS(audio_data_bp, resources={r"/api/*":{"origins":r"*"}})


@audio_data_bp.route("/api/audio-data/upload", methods=['POST'])
@check_token
def upload_audio_data(*args, **kwargs):
    '''Upload Audio File'''
    try:
        audio_file = request.files['audio_file']
        data = json.loads(request.form.get('data'))

        if len(data) != 0:
            af = AudioData(
                audio_title = data['audio_title'], 
                audio_desc = data['audio_desc'], 
                account_id = data['account_id'],
                email = data['email'],
                category_id = data['category_id'],
                sub_category_id = data['sub_category_id'],
                sub2_category_id = data['sub2_category_id'],
                file_name = data['file_name'],
                file_type = data['file_type'],
                file_size = float(data['file_size']
                )
            )
            
            af.public_url = f'''https://storage.googleapis.com/soundklips-1/{af.account_id}/audio/{af.file_name}'''.replace(" ", "")
            
            try: 
                audio_image = request.files['audio_img']
                af.image_url = f'''https://storage.googleapis.com/soundklips-1/{af.account_id}/audio_image/{af.file_name}-{audio_image.filename}'''.replace(" ", "")

            except:
                audio_image = None
                af.image_url = None


            response = upload_gcs_db(af, audio_file, audio_image)

            if response['success'] == True:
                return response, 200

            else: 
                return response, 500
                
        else:
            return {'json_object error': 'json audio_data object was empty'}, 400
            
    except Exception as err:
        # raise err
        return Error_Resource(err).as_json(), 500



@audio_data_bp.route("/api/edit/audio-data", methods=['POST'])
@check_token
def update_audio_data(*args, **kwargs):
    '''Edit Audio File'''
    try:
        data = request.get_json()
        data = data['data']
        if len(data) != 0:
            response_data = api_logic.update_audio_data(data)
            if response_data == 1:
                return {'message': 'success'}

            else: 
                return response_data, 500

        else:
            return Error_Resource('No data submitted').as_json(), 404
            
    except Exception as err:
        # raise err
        return Error_Resource(err).as_json(), 500


@audio_data_bp.route('/api/select/audio-data/account', methods=['POST'])
@check_token
def select_account_audio_data(*args, **kwargs):
    '''Selects all of user's audio data '''
    try:
        af = AudioData(
            account_id = kwargs['payload']['account_id']
        )

        audio_data = select_account_audio_data_logic(af)

        if audio_data['success'] == True:
            return audio_data, 200

        else:
            return {"message": "error retrieving data"}, 500

    except Exception as err:
        # raise err
        return Error_Resource(err).as_json(), 500


@audio_data_bp.route('/api/delete/audio-data', methods=['POST'])
@check_token
def delete_audio_data(*args, **kwargs):
    '''Delete audio data and image from Postgre and GCS'''
    try:
        af = AudioData(
            account_id = kwargs['payload']['account_id']
        )
        data = request.get_json()
        
        public_url = data["meta_data"]['public_url']
        image_url = data["meta_data"]['image_url']

        response = api_logic.delete_from_bucket_db(af, public_url, image_url)

        if response == True:
            return {"message": "success"}

        else:
            return {"message": "error retrieving data"}, 500

    except Exception as err:
        # raise err
        return Error_Resource(err).as_json(), 500
