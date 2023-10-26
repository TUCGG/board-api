import { Injectable } from '@nestjs/common';
import { BoardEntity } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>,
  ) {}

  async createBoard(board: BoardEntity): Promise<BoardEntity> {
    const newBoard = this.boardsRepository.create(board);
    return await this.boardsRepository.save(newBoard);
  }

  async getAllBoards(): Promise<BoardEntity[]> {
    return this.boardsRepository.find();
  }

  async getBoardById(id: number): Promise<BoardEntity> {
    return this.boardsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async deleteBoard(id: number): Promise<number> {
    await this.boardsRepository.delete(id);
    return id;
  }

  async updateBoardStatus(id: number, board: BoardEntity): Promise<number> {
    await this.boardsRepository.update(id, board);
    return id;
  }
}

// @Injectable()
// export class BoardsService {
//   private boards: Board[] = [];

//   getAllBoards(): Board[] {
//     return this.boards;
//   }

//   createBoard(createBoardDto: CreateBoardDto): Board {
//     const { title, description } = createBoardDto;

//     const board: Board = {
//       id: uuid(),
//       title,
//       description,
//       contents: '',
//       createAt: new Date().toISOString(),
//       status: BoardStatus.PUBLIC,
//       count: 0,
//     };

//     this.boards.push(board);
//     return board;
//   }

//   getBoardById(id: string): Board {
//     return this.boards.find((board) => board.id === id);
//   }

//   deleteBoard(id: string): void {
//     this.boards = this.boards.filter((board) => board.id !== id);
//   }

//   updateBoardStatus(id: string, status: BoardStatus): Board {
//     const board = this.getBoardById(id);
//     board.status = status;
//     return board;
//   }
// }
