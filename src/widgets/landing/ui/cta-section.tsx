import { Button } from '@heroui/react';

export const CtaSection = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-secondary-900 dark:text-white mb-6">
                    Готовы начать работу?
                </h2>
                <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8 max-w-2xl mx-auto">
                    Присоединяйтесь к тысячам компаний, которые уже используют нашу платформу для эффективного общения
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" color="primary" className="bg-primary-500 text-white px-8 py-6 text-lg">
                        🚀 Начать бесплатно
                    </Button>
                    <Button size="lg" variant="flat" className="px-8 py-6 text-lg">
                        📞 Запросить демо
                    </Button>
                </div>
            </div>
        </section>
    );
};