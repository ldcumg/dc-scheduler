import argparse
from app import create_app

# CLI 인자 파서 설정
parser = argparse.ArgumentParser(description="Run Flask app with optional debug mode")
parser.add_argument("--debug", action="store_true", help="Enable debug mode")
args = parser.parse_args()

# Flask 앱 생성
app = create_app()

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=3000,
        debug=args.debug  # --debug 옵션으로 제어
    )