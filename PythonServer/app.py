from flask import Flask, request, jsonify
import base64
import requests
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# OpenAI API Key

def encode_image(image_file):
    return base64.b64encode(image_file.read()).decode('utf-8')

@app.route('/')
def index():
    return 'hello world!'

@app.route('/upload', methods=['POST'])
def upload_image():
    print("Received a request on /upload")

    if 'image' not in request.files:
        return jsonify({"error": "이미지가 업로드 되지 않았습니다."}), 400

    image_file = request.files['image']
    base64_image = encode_image(image_file)

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
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
                "content" : "우선 처음 시작은 '안녕하세요'로 시작해. 식물 이미지를 확인하고 해당 식물의 건강 상태를 파악해. 질병에 걸린 것이 의심된다면 어떤 질병인지 설명하고, 해결 방법을 알려줘. 만약 식물이 건강하다면 '현재 식물이 건강한 상태입니다😃' 라는 문구를 띄워주고 식물을 잘 관리하는 방법 3가지를 알려줘. 건강하지 않다면 해당 문구를 띄우지 마. 마지막으로 이미지가 식물 이미지가 아니라면 '이미지를 다시 등록해 주세요.' 라는 문구를 띄워줘. 말은 가능하면 최대한 간략하게 하도록 하고, 원인 혹은 해결 방법과 같은 내용을 설명할 때에는 '**'는 생략해. 그리고 원인이나 해결방법을 설명할 때에는 각 내용과 번호마다 설명하고 들여쓰기를 하도록 해."
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ],
        "max_tokens": 300
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