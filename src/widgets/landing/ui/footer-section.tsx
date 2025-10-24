const footerSections = [
    {
        title: 'Продукт',
        links: ['Возможности', 'Тарифы', 'Безопасность', 'Обновления']
    },
    {
        title: 'Ресурсы',
        links: ['Документация', 'Блог', 'Вебинары', 'Поддержка']
    },
    {
        title: 'Компания',
        links: ['О нас', 'Карьера', 'Контакты', 'Партнеры']
    }
];

export const FooterSection = () => {
    return (
        <footer className="bg-secondary-900 text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <span className="text-lg font-bold">MeetPro</span>
                        </div>
                        <p className="text-secondary-300">
                            Профессиональная платформа для видеоконференций нового поколения
                        </p>
                    </div>

                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h4 className="font-semibold mb-4">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-300">
                    <p>&copy; 2024 MeetPro. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};