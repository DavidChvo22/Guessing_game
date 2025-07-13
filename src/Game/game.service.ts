import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GameService {
  private secretNumber: number;
  private gameId: string;

  constructor() {
    this.resetGame();
  }
  startGame(): { id: string } {
    this.resetGame();
    this.gameId = uuidv4();
    this.secretNumber = randomInt(1, 101);
    console.log(
      `New game started. Secret number is: ${this.secretNumber} (for gameId : ${this.gameId}) `,
    );
    return { id: this.gameId };
  }

  checkGuess(
    gameId: string,
    guess: number,
  ): {
    feedback: string;
    isCorrect: boolean;
    isOver: boolean;
    distance: number;
  } {
    if (gameId !== this.gameId) {
      return {
        feedback: 'Invalid game session, please start a new one',
        isCorrect: false,
        isOver: true,
        distance: 0,
      };
    }
    let feedback: string;
    let isCorrect: boolean = false;
    let isOver: boolean = true;

    if (guess < this.secretNumber) {
      feedback = 'The secret number is higher';
      isOver = false;
    } else if (guess === this.secretNumber) {
      feedback = 'You guessed right';
      isCorrect = true;
      isOver = true;
    } else {
      feedback = 'The secret number is lower';
      isOver = false;
    }

    let distance: number = 0;
    if (!isCorrect && !isOver) {
      distance = Math.abs(this.secretNumber - guess);
    }
    return { feedback, isCorrect, isOver, distance };
  }

  private resetGame(): void {
    this.secretNumber = 0;
    this.gameId = '';
  }
}
