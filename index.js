const T_API = require('node-telegram-bot-api')
const TOKEN = '1715120550:AAHtohOd7pAwpiWj7cwmHEMR9Po3Z-bjTgM'
const bot = new T_API(TOKEN, {polling: true})

const {gameOptions, againOptions} = require('./module')

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Я загадаю тебе число от 0 до 9, угадай!`)
    const randomN = Math.floor(Math.random()*10)
    chats[chatId] = randomN
    console.log(chats[chatId])
    await bot.sendMessage(chatId, 'Отгадай', gameOptions)
}



const start = () => {
    bot.setMyCommands([
        {command: '/game', description: 'Начать игру'}
    ])
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
        if(text === '/game') {
            return startGame(chatId)
        }

    })
    bot.on('callback_query', msg => {
        const data = msg.data
        const chatId = msg.message.chat.id

        if(data === '/again') {
            return startGame(chatId)
        }

        if(data == chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю! Ты отгадал цифру ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `Ты не угадал цифру ${chats[chatId]}`, againOptions)
        }

        return bot.sendMessage(chatId, `Ты нажал ${data}`)


    })
}

start()
