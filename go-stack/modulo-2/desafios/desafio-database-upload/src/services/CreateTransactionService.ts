import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute(data: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const categoryRepository = getRepository(Category);

    let transactionCategory = await categoryRepository.findOne({
      where: { title: data.category },
    });

    if (!transactionCategory) {
      transactionCategory = categoryRepository.create({
        title: data.category,
      });

      await categoryRepository.save(transactionCategory);
    }

    const balance = await transactionRepository.getBalance();

    if (balance.total < data.value && data.type === 'outcome') {
      throw new AppError(
        'You cant create a outcome transaction without a valid balance',
      );
    }

    const transaction = transactionRepository.create({
      title: data.title,
      value: data.value,
      type: data.type,
      category: transactionCategory,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
