import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getBoardById(id: number): Promise<BoardEntity[]> {
    const board = await this.boardsRepository.findOne({
      where: {
        id,
      },
    });

    if (!board) {
      return null;
    }

    const [previousBoard, nextBoard] = await Promise.all([
      this.boardsRepository
        .createQueryBuilder('board')
        .where('board.id < :id', { id: board.id })
        .orderBy('board.id', 'DESC')
        .getOne(),
      this.boardsRepository
        .createQueryBuilder('board')
        .where('board.id > :id', { id: board.id })
        .orderBy('board.id', 'ASC')
        .getOne(),
    ]);

    return [previousBoard, board, nextBoard];
  }

  async deleteBoard(id: number): Promise<number> {
    await this.boardsRepository.delete(id);
    return id;
  }

  async updateBoardStatus(
    id: number,
    updatedBoardData: BoardEntity,
  ): Promise<BoardEntity> {
    const existingBoard = await this.boardsRepository.findOne({
      where: { id },
    });

    if (!existingBoard) {
      throw new NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
    }

    // 업데이트된 데이터로 기존 게시글을 업데이트합니다.
    Object.assign(existingBoard, updatedBoardData);

    // 업데이트된 게시글을 저장하고 반환합니다.
    return await this.boardsRepository.save(existingBoard);
  }
}
