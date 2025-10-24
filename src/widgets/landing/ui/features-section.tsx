import { Card, CardBody } from '@heroui/react';

const features = [
    {
        icon: '🛡️',
        title: 'Безопасность',
        description: 'Сквозное шифрование и защита корпоративного уровня для ваших конференций'
    },
    {
        icon: '👥',
        title: 'До 1000 участников',
        description: 'Проводите встречи любого масштаба с поддержкой большого количества участников'
    },
    {
        icon: '💾',
        title: 'Запись и транскрипция',
        description: 'Автоматическая запись встреч и преобразование речи в текст'
    },
    {
        icon: '🖥️',
        title: 'Демонстрация экрана',
        description: 'Делитесь экраном, презентациями и приложениями в HD качестве'
    },
    {
        icon: '🔗',
        title: 'Интеграции',
        description: 'Интеграция с популярными календарями и корпоративными системами'
    },
    {
        icon: '🌍',
        title: 'Глобальная инфраструктура',
        description: 'Серверы по всему миру для стабильного соединения без задержек'
    }
];

export const FeaturesSection = () => {
    return (
        <section id="features" className="bg-white dark:bg-secondary-900 py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">
                        Все необходимое для эффективных встреч
                    </h2>
                    <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
                        Современные инструменты для проведения видеоконференций любого масштаба
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                            <CardBody className="p-6">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-secondary-600 dark:text-secondary-300">
                                    {feature.description}
                                </p>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};