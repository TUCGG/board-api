import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardEntity } from './entities/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  async getAllBoard(): Promise<BoardEntity[]> {
    return this.boardsService.getAllBoards();
  }

  @Post()
  async createBoard(@Body() board: BoardEntity): Promise<BoardEntity> {
    return await this.boardsService.createBoard(board);
  }

  @Get('/:id')
  async getBoardById(@Param('id') id: number): Promise<BoardEntity> {
    return this.boardsService.getBoardById(+id);
  }

  @Delete('/:id')
  async deleteBoard(@Param('id') id: number): Promise<number> {
    return this.boardsService.deleteBoard(+id);
  }
}
