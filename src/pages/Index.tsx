import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [phraseRatings, setPhraseRatings] = useState<{[key: string]: {likes: number, dislikes: number}}>({});

  const phrases = [
    "Иди нахуй со своими проблемами!",
    "Пошёл нахуй, у меня настроения нет!",
    "Да иди ты нахуй с этими вопросами!",
    "Нахуй тебе это надо вообще?",
    "Отвали нахуй, не видишь - занят!",
    "Да пошёл ты нахуй со своими советами!",
    "Иди нахуй отсюда, достал уже!",
    "Нахуй мне твоё мнение?",
    "Пошёл нахуй, не мешай работать!",
    "Да иди ты нахуй, надоел!"
  ];

  const generatePhrase = () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setCurrentPhrase(randomPhrase);
    
    // Инициализируем рейтинг для новой фразы, если его нет
    if (!phraseRatings[randomPhrase]) {
      setPhraseRatings(prev => ({
        ...prev,
        [randomPhrase]: { likes: 0, dislikes: 0 }
      }));
    }
  };

  const ratePhrase = (phrase: string, isLike: boolean) => {
    setPhraseRatings(prev => ({
      ...prev,
      [phrase]: {
        likes: isLike ? (prev[phrase]?.likes || 0) + 1 : (prev[phrase]?.likes || 0),
        dislikes: !isLike ? (prev[phrase]?.dislikes || 0) + 1 : (prev[phrase]?.dislikes || 0)
      }
    }));
  };

  const topPhrases = Object.entries(phraseRatings)
    .sort(([,a], [,b]) => (b.likes - b.dislikes) - (a.likes - a.dislikes))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-red-200 to-teal-200 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-red-600 mb-4 animate-bounce">
            ГЕНЕРАТОР НАХУЙ! 💥
          </h1>
          <p className="text-2xl text-gray-700 font-medium">
            Лучший способ послать кого-то нахуй! 😤
          </p>
        </div>

        {/* Основной генератор */}
        <Card className="mb-8 shadow-2xl border-4 border-red-500 bg-white">
          <CardHeader className="text-center bg-red-500 text-white">
            <CardTitle className="text-3xl font-bold">
              Генератор Фраз
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {currentPhrase ? (
              <div className="text-center mb-6">
                <div className="bg-yellow-100 border-4 border-yellow-400 rounded-lg p-6 mb-6">
                  <p className="text-2xl font-bold text-gray-800 leading-relaxed">
                    "{currentPhrase}"
                  </p>
                </div>
                
                {/* Кнопки оценки */}
                <div className="flex justify-center gap-4 mb-6">
                  <Button
                    onClick={() => ratePhrase(currentPhrase, true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg font-bold rounded-full transform hover:scale-110 transition-all duration-200"
                  >
                    <Icon name="ThumbsUp" size={24} className="mr-2" />
                    {phraseRatings[currentPhrase]?.likes || 0}
                  </Button>
                  <Button
                    onClick={() => ratePhrase(currentPhrase, false)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-lg font-bold rounded-full transform hover:scale-110 transition-all duration-200"
                  >
                    <Icon name="ThumbsDown" size={24} className="mr-2" />
                    {phraseRatings[currentPhrase]?.dislikes || 0}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center mb-6">
                <p className="text-xl text-gray-600 mb-6">
                  Нажми кнопку и получи свою порцию! 🔥
                </p>
              </div>
            )}
            
            <div className="text-center">
              <Button
                onClick={generatePhrase}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-12 py-4 text-2xl font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 animate-pulse"
              >
                <Icon name="Zap" size={32} className="mr-3" />
                ПОСЛАТЬ НАХУЙ!
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Топ фраз */}
        {topPhrases.length > 0 && (
          <Card className="shadow-2xl border-4 border-teal-500 bg-white">
            <CardHeader className="text-center bg-teal-500 text-white">
              <CardTitle className="text-3xl font-bold flex items-center justify-center">
                <Icon name="Trophy" size={32} className="mr-3" />
                ТОП ФРАЗ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {topPhrases.map(([phrase, rating], index) => (
                  <div key={phrase} className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:bg-yellow-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Badge className={`text-xl px-3 py-1 ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                      } text-white`}>
                        #{index + 1}
                      </Badge>
                      <p className="text-lg font-medium text-gray-800 flex-1">
                        "{phrase}"
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Icon name="ThumbsUp" size={20} className="text-green-600" />
                        <span className="font-bold text-green-600">{rating.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="ThumbsDown" size={20} className="text-red-600" />
                        <span className="font-bold text-red-600">{rating.dislikes}</span>
                      </div>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {rating.likes - rating.dislikes > 0 ? '+' : ''}{rating.likes - rating.dislikes}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Футер */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            Сделано с 💀 для тех, кто умеет ценить искренность!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;