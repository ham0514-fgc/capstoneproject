from flask import Blueprint, render_template, request, jsonify, session
from app.models.game import Game

game_bp = Blueprint('game', __name__)

@game_bp.route('/')
def index():
    if 'game' not in session:
        session['game'] = Game()
    return render_template('index.html')

@game_bp.route('/move', methods=['POST'])
def make_move():
    if 'game' not in session:
        session['game'] = Game()
    
    game = session['game']
    data = request.get_json()
    row = int(data.get('row'))
    col = int(data.get('col'))
    
    if game.make_move(row, col):
        session['game'] = game
        return jsonify({
            'success': True,
            'board': game.board,
            'current_player': game.current_player,
            'game_over': game.game_over,
            'winner': game.winner
        })
    
    return jsonify({'success': False})

@game_bp.route('/reset', methods=['POST'])
def reset_game():
    session['game'] = Game()
    return jsonify({'success': True}) 