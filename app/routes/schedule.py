import json
from flask import Blueprint, request, jsonify, render_template
import os

schedule_bp = Blueprint("schedule", __name__)
DATA_FOLDER = "data"
JSON_FILE = os.path.join(DATA_FOLDER, "schedule.json")

# data 폴더가 없으면 생성
if not os.path.exists(DATA_FOLDER):
    os.makedirs(DATA_FOLDER)

# JSON 파일 초기화: 없으면 생성
if not os.path.exists(JSON_FILE):
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump({}, f, ensure_ascii=False, indent=2)


def read_schedule():
    with open(JSON_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def write_schedule(data):
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


# 프론트 제공
@schedule_bp.route("/")
def home():
    return render_template("index.html")


# 근무 요일 제출 API
@schedule_bp.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()
    name = data.get("name")
    selected_days = data.get("selectedDays")

    if not name:
        return jsonify({"error": "이름을 입력하세요."}), 400
    if not selected_days.get("work"):
        return jsonify({"error": "근무 요일을 입력하세요."}), 400

    schedule_data = read_schedule()
    schedule_data[name] = selected_days
    write_schedule(schedule_data)

    return jsonify({"message": "반영 완료", "schedule": schedule_data})


# 근무표 조회 API
@schedule_bp.route("/schedule", methods=["GET"])
def get_schedule():
    return jsonify(read_schedule())


# 근무표 초기화 API
@schedule_bp.route("/reset", methods=["POST"])
def reset_schedule():
    write_schedule({})
    return jsonify({"message": "근무표 초기화 완료", "schedule": {}})
