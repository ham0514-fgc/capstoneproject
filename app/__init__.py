from flask import Flask
from flask_session import Session
import os

def create_app():
    app = Flask(__name__)
    
    # Configure the Flask application
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev')
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SESSION_PERMANENT'] = False
    
    # Initialize extensions
    Session(app)
    
    # Register blueprints
    from app.routes import game_bp
    app.register_blueprint(game_bp)
    
    return app 