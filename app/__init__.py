from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)

    # 블루프린트 등록
    from .routes.schedule import schedule_bp

    app.register_blueprint(schedule_bp)

    return app
