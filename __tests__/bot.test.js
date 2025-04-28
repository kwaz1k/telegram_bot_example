import { jest } from '@jest/globals';
import { Telegraf } from 'telegraf';
import bot from '../bot.js';

describe('Тестирование чат-бота', () => {
  let mockBot;
  let mockCtx;

  beforeEach(() => {
    mockBot = new Telegraf('%'); // ТОКЕН СКРЫТ
    mockCtx = {
      message: {
        chat: { id: 12345 },
        text: '',
        from: { id: 12345, first_name: 'Test' },
      },
      reply: jest.fn(),
    };
  });

  test('Проверка команды /start', async () => {
    mockCtx.message.text = '/start';
    await bot.handleUpdate(mockCtx);

    expect(mockCtx.reply).toHaveBeenCalledWith(
      'Добро пожаловать! Нажмите кнопку ниже, чтобы увидеть дополнительные опции.',
      expect.any(Object)
    );
  });

  test('Проверка кнопки "Памятка абитуриенту"', async () => {
    mockCtx.message.text = '📋 Памятка абитуриенту';
    await bot.handleUpdate(mockCtx);

    expect(mockCtx.reply).toHaveBeenCalledWith(
      'Выберите интересующий вас пункт:',
      expect.any(Object)
    );
  });

  test('Проверка кнопки "Специальности"', async () => {
    mockCtx.message.text = '📚 Специальности';
    await bot.handleUpdate(mockCtx);

    expect(mockCtx.reply).toHaveBeenCalledWith(
      'Информация о специальностях:\n1. Специальность 1\n2. Специальность 2\n3. Специальность 3'
    );
  });

  test('Проверка кнопки "Назад"', async () => {
    mockCtx.message.text = '🔙 Назад';
    await bot.handleUpdate(mockCtx);

    expect(mockCtx.reply).toHaveBeenCalledWith(
      'Вы вернулись в главное меню.',
      expect.any(Object)
    );
  });
});