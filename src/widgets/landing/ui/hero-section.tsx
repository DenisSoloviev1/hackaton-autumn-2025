import { Button, Chip } from '@heroui/react';

export const HeroSection = () => {
    return (
        <section className="container mx-auto px-6 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <Chip color="primary" variant="flat" className="mb-4">
                        🚀 Новая версия 2.0
                    </Chip>
                    <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 dark:text-white mb-6">
                        Профессиональные видеовстречи для вашей команды
                    </h1>
                    <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8">
                        Высококачественные видеоконференции с защитой корпоративного уровня.
                        Объединяйте команды, проводите презентации и работайте эффективно.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" color="primary" className="bg-primary-500 text-white text-lg px-8 py-6">
                            🎥 Начать конференцию
                        </Button>
                        <Button size="lg" variant="flat" className="text-lg px-8 py-6">
                            📞 Демо-тур
                        </Button>
                    </div>
                    <div className="mt-8 flex items-center space-x-6 text-sm text-secondary-500 dark:text-secondary-400">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Без ограничений по времени</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                            <span>HD качество</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span>Шифрование</span>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="bg-white dark:bg-secondary-800 rounded-2xl p-4 shadow-2xl">
                        <div className="bg-secondary-900 rounded-lg aspect-video flex items-center justify-center">
                            <div className="text-center text-white">
                                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🎥</span>
                                </div>
                                <p className="text-lg">Конференция запущена</p>
                                <p className="text-secondary-300 text-sm mt-2">Присоединяйтесь к встрече</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="bg-secondary-100 dark:bg-secondary-700 rounded-lg aspect-video flex items-center justify-center">
                                    <div className="w-8 h-8 bg-primary-300 rounded-full flex items-center justify-center">
                                        <span className="text-sm">👤</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 bg-success-500 text-white px-4 py-2 rounded-full shadow-lg">
                        🔒 Защищено
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-primary-500 text-white px-4 py-2 rounded-full shadow-lg">
                        🎤 Говорит
                    </div>
                </div>
            </div>
        </section>
    );
};