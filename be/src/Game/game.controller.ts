import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GameService } from './game.service';

@Controller('Game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('start')
  @HttpCode(HttpStatus.OK)
  generateGame(): { id: string } {
    return this.gameService.startGame();
  }

  @Post('guess')
  @HttpCode(HttpStatus.OK)
  guessNumber(@Body() body: { gameId: string; guess: number }) {
    return this.gameService.checkGuess(body.gameId, body.guess);
  }
}
