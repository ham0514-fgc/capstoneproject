# Tic Tac Toe Web Application

A modern Tic Tac Toe game built with Flask that provides an interactive gaming experience.

## Features
- Two-player gameplay
- Real-time game state updates
- Win condition checking
- Game history tracking
- Responsive design
- Modern UI/UX

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python run.py
```

4. Open your browser and navigate to:
```
http://localhost:5000
```

## Project Structure
```
tic-tac-toe/
├── app/
│   ├── __init__.py
│   ├── models/
│   │   └── game.py
│   ├── routes/
│   │   └── game.py
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── game.js
│   └── templates/
│       ├── base.html
│       └── index.html
├── requirements.txt
├── run.py
└── README.md
```

## License
MIT
