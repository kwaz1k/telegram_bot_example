import { Markup } from 'telegraf';

const specialties = [
    {
        code: '38.02.08',
        name: 'Торговое дело',
        forms: ['Очно', 'Дистанционно'],
        price: 'от 90.000 рублей',
        duration: '2 года 10 месяцев'
    },
    {
        code: '38.02.01',
        name: 'Экономика и бухгалтерский учет',
        forms: ['Очно'],
        price: 'от 90.000 рублей',
        duration: '2 года 10 месяцев'
    },
    {
        code: '43.02.17',
        name: 'Технологии индустрии красоты',
        forms: ['Очно'],
        price: 'от 90.000 рублей',
        duration: '3 года 10 месяцев'
    },
    {
        code: '38.02.07',
        name: 'Банковское дело',
        forms: ['Очно'],
        price: 'от 90.000 рублей',
        duration: '2 года 10 месяцев'
    },
    {
        code: '43.02.16',
        name: 'Туризм и гостеприимство',
        forms: ['Очно'],
        price: 'от 90.000 рублей',
        duration: '2 года 10 месяцев'
    },
    {
        code: '38.02.03',
        name: 'Операционная деятельность в логистике',
        forms: ['Очно'],
        price: 'от 90.000 рублей',
        duration: '2 года 10 месяцев'
    },
    {
        code: '40.02.04',
        name: 'Юриспруденция',
        forms: ['Очно'],
        price: 'от 90.000 рублей',
        duration: '2 года 10 месяцев'
    },
    {
        code: '44.02.03',
        name: 'Педагогика дополнительного образования',
        forms: ['Очно'],
        price: 'от 90.000 рублей',
        duration: '2 года 10 месяцев'
    },
    {
        code: '33.02.01',
        name: 'Фармация',
        forms: ['Очно'],
        price: 'от 90.000 рублей',
        duration: '2 года 10 месяцев'
    },
    
];

export const setupSpecialtiesHandlers = (bot) => {
    specialties.forEach(spec => {
        const buttonName = `■ ${spec.code} ${spec.name}`;
        bot.hears(buttonName, (ctx) => {
            ctx.replyWithMarkdown(`
*${spec.code} ${spec.name}*  
🔹 *Форма обучения:* ${spec.forms.join(', ')}  
🔹 *Стоимость в семестр:* ${spec.price}  
🔹 *Срок обучения:* ${spec.duration}
            `);
        });
    });

    bot.hears('■ Назад', (ctx) => {
        return ctx.reply('Главное меню:', mainMenuKeyboard());
    });
};

export const specialtiesKeyboard = Markup.keyboard([
    ['■ 38.02.08 Торговое дело', '■ 38.02.01 Экономика и бухгалтерский учет'],
    ['■ 43.02.17 Технологии индустрии красоты', '■ 38.02.07 Банковское дело'],
    ['■ 43.02.16 Туризм и гостеприимство', '■ 38.02.03 Операционная деятельность в логистике'],
    ['■ 40.02.04 Юриспруденция', '■ 44.02.03 Педагогика дополнительного образования'],
    ['■ 33.02.01 Фармация', '■ Назад']
]).resize();

export function mainMenuKeyboard() {
    return Markup.keyboard([
        ['📋 Памятка абитуриенту'],
    ]).resize();
}