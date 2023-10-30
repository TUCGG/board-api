import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get('/:bid')
  async getBoardById(@Param('bid') bid: string): Promise<BoardEntity> {
    return this.boardsService.getBoardById(bid);
  }

  @Delete('/:bid')
  async deleteBoard(@Param('bid') bid: string): Promise<string> {
    return this.boardsService.deleteBoard(bid);
  }

  @Put('/:bid')
  async updateBoardStatus(
    @Param('bid') bid: string,
    @Body() updatedBoardData: BoardEntity,
  ): Promise<BoardEntity> {
    return this.boardsService.updateBoardStatus(bid, updatedBoardData);
  }
}
