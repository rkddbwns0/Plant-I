from flask import Flask, request, jsonify
import base64
import requests
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def encode_image(image_file):
    return base64.b64encode(image_file.read()).decode('utf-8')

@app.route('/')
def index():
    return 'hello world!'

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "이미지가 업로드 되지 않았습니다."}), 400

    text = request.form.get('text')

    image_file = request.files['image']
    base64_image = encode_image(image_file)

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer "
    }

    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "system",
                "content" : "너는 식물의 건강 상태를 파악해 주는 식물 건강 관리사야. 조건에 맞게 문자를 최대한 길게 작성해줘."
            },
            {
                "role": "system",
                "content" : (
                            "사용자가 식물 이미지와 증상에 대해 말해주면 이를 파악하여 식물 건강 상태를 파악해줘. 조건을 알려줄게."
                            "1. 사용자의 식물 상태가 건강한 것 같다면 '현재 식물이 건강한 상태입니다😃' 라는 문구를 띄워주고 식물을 잘 관리하는 방법 3가지를 알려줘. " 
                            "2. 사용자의 식물 상태에 문제가 있다면 증상을 하나씩 설명해 주고 이를 해결하기 위한 방법을 3가지 이상 알려줘."
                            "3. 각 내용을 설명할 때에는 '*'를 사용하지 말고, 첫 시작을 띄어쓰기 하지 마."
                            "4. 각 방법을 알려줄 때 들여쓰기로 구분이 잘 되도록 해줘."
                            "5. 만약 식물 이미지가 아닌 다른 이미지를 업로드했다면 '이미지를 다시 업로드 해주세요' 라는 문구가 나오도록 해줘."
                            )
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    },
                    {
                        "type": "text",
                        "text": text
                    }
                ]
            }
        ],
        "max_tokens": 500
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    
    response_json = response.json()

    try:
        message_content = response_json['choices'][0]['message']['content']
        print(message_content)
    except (KeyError, IndexError) as e:
        return jsonify(e), 500
    return jsonify({'message' : message_content})



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)