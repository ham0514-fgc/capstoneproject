class Game:
    def __init__(self):
        self.board = [['' for _ in range(3)] for _ in range(3)]
        self.current_player = 'X'
        self.winner = None
        self.game_over = False
        self.moves = []

    def make_move(self, row, col):
        if self.game_over or self.board[row][col] != '':
            return False
        
        self.board[row][col] = self.current_player
        self.moves.append((row, col, self.current_player))
        
        if self.check_winner():
            self.winner = self.current_player
            self.game_over = True
        elif self.check_draw():
            self.game_over = True
        else:
            self.current_player = 'O' if self.current_player == 'X' else 'X'
        
        return True

    def check_winner(self):
        # Check rows
        for row in self.board:
            if row[0] != '' and row[0] == row[1] == row[2]:
                return True

        # Check columns
        for col in range(3):
            if self.board[0][col] != '' and self.board[0][col] == self.board[1][col] == self.board[2][col]:
                return True

        # Check diagonals
        if self.board[0][0] != '' and self.board[0][0] == self.board[1][1] == self.board[2][2]:
            return True
        if self.board[0][2] != '' and self.board[0][2] == self.board[1][1] == self.board[2][0]:
            return True

        return False

    def check_draw(self):
        return all(cell != '' for row in self.board for cell in row)

    def reset(self):
        self.board = [['' for _ in range(3)] for _ in range(3)]
        self.current_player = 'X'
        self.winner = None
        self.game_over = False
        self.moves = [] 