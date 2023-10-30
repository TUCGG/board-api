import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardEntity } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>,
  ) {}

  async createBoard(board: BoardEntity): Promise<BoardEntity> {
    const bid = uuid();
    const newBoard: BoardEntity = {
      ...board,
      bid: bid,
    };

    return await this.boardsRepository.save(newBoard);
  }

  async getAllBoards(): Promise<BoardEntity[]> {
    return this.boardsRepository.find();
  }

  async getBoardById(bid: string): Promise<BoardEntity> {
    return this.boardsRepository.findOne({
      where: {
        bid,
      },
    });
  }

  async deleteBoard(bid: string): Promise<string> {
    await this.boardsRepository.delete(bid);
    return bid;
  }

  async updateBoardStatus(
    bid: string,
    updatedBoardData: BoardEntity,
  ): Promise<BoardEntity> {
    const existingBoard = await this.boardsRepository.findOne({
      where: { bid },
    });

    if (!existingBoard) {
      throw new NotFoundException(`게시글 ID ${bid}를 찾을 수 없습니다.`);
    }

    // 업데이트된 데이터로 기존 게시글을 업데이트합니다.
    Object.assign(existingBoard, updatedBoardData);

    // 업데이트된 게시글을 저장하고 반환합니다.
    return await this.boardsRepository.save(existingBoard);
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
