export const StatsSection = () => {
    return (
        <section className="bg-primary-500 text-white py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
                        <div className="text-primary-100">Компаний</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-bold mb-2">500K+</div>
                        <div className="text-primary-100">Ежедневных встреч</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-bold mb-2">99.9%</div>
                        <div className="text-primary-100">Доступность</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
                        <div className="text-primary-100">Поддержка</div>
                    </div>
                </div>
            </div>
        </section>
    );
};