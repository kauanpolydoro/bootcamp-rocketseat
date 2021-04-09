import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    
    const games = this.repository.createQueryBuilder()
      .where('title ilike :title', {title: `%${param}%`})
      .getMany()
    
    return games
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`select count(1) from games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {

    // return this.repository
    const games = await this.repository.createQueryBuilder("game")
      .innerJoinAndSelect("game.users", "user")
      .where("game.id = :id", { id })
      .getOneOrFail();

    return games.users;
  }
}
