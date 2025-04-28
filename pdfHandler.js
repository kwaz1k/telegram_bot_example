import fs from 'fs';
import path from 'path';
import { Telegraf } from 'telegraf';
import axios from 'axios';

const userActivity = new Map();

function checkSpam(userId) {
    const now = Date.now();
    const userData = userActivity.get(userId) || { count: 0, lastTime: 0 };
    
    if (now - userData.lastTime > 60000) {
        userData.count = 0;
    }
    
    userData.count++;
    userData.lastTime = now;
    userActivity.set(userId, userData);
    
    if (userData.count > 5) {
        return { isSpam: true, wait: Math.ceil((60000 - (now - userData.lastTime))/1000) };
    }
    
    return { isSpam: false };
}

export function setupPdfHandler(bot) {
    bot.on('document', async (ctx) => {
        const user = ctx.from;
        const file = ctx.message.document;
        
        const spamCheck = checkSpam(user.id);
        if (spamCheck.isSpam) {
            return ctx.reply(`❌ Слишком много запросов. Попробуйте через ${spamCheck.wait} сек.`);
        }

        if (!file.file_name?.toLowerCase().endsWith('.pdf')) {
            return ctx.reply('❌ Принимаются только PDF-файлы.');
        }

        if (file.file_size > 10 * 1024 * 1024) {
            return ctx.reply('❌ Файл слишком большой. Максимум 10 МБ.');
        }

        try {
            const userDir = path.join(process.cwd(), 'downloads', String(user.id));
            if (!fs.existsSync(userDir)) {
                fs.mkdirSync(userDir, { recursive: true });
            }
            
            const timestamp = Date.now();
            const safeFileName = `${timestamp}_${file.file_name.replace(/[^\w.-]/g, '_')}`;
            const filePath = path.join(userDir, safeFileName);
            
            const fileLink = await ctx.telegram.getFileLink(file.file_id);
            const response = await axios({
                method: 'GET',
                url: fileLink,
                responseType: 'stream'
            });
            
            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);
            
            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
            
            ctx.reply(`✅ Файл "${file.file_name}" сохранен!`);
            
        } catch (err) {
            console.error('Ошибка сохранения:', err);
            ctx.reply('❌ Ошибка при обработке файла. Попробуйте позже.');
        }
    });
}