import Link from "next/link";

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
        
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gray-800">
                <h2 className="text-5xl font-bold mb-6 text-white">Effortless API Access for Developers</h2>
                <p className="text-lg max-w-2xl mb-8 text-gray-400">
                    Access a range of pre-existing APIs, create custom endpoints, and integrate seamlessly.
                    Accelerate your development with easy-to-use, reliable API resources.
                </p>
                <Link href="/start/allapi" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                    Get Started for Free
                </Link>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-10 bg-gray-900 text-white">
                <h3 className="text-4xl font-bold text-center mb-10">Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h4 className="text-2xl font-semibold mb-4">Custom API Creation</h4>
                        <p>Create custom APIs with specific fields tailored to your application needs.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h4 className="text-2xl font-semibold mb-4">Multiple Endpoints</h4>
                        <p>Access a variety of endpoints from weather data to geolocation and more.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h4 className="text-2xl font-semibold mb-4">Developer-Friendly</h4>
                        <p>Seamless integration and comprehensive documentation for easy setup.</p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="py-20 px-10 bg-gray-800 text-white">
                <h3 className="text-4xl font-bold text-center mb-10">Why Choose API Hub?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <span className="text-blue-600 text-4xl">✓</span>
                        <p>Save time with pre-built APIs for common functionalities.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-blue-600 text-4xl">✓</span>
                        <p>Access reliable data and resources to support your development needs.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-blue-600 text-4xl">✓</span>
                        <p>Customize APIs to fit the exact requirements of your project.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-blue-600 text-4xl">✓</span>
                        <p>Enhance productivity with easy-to-integrate API solutions.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="flex flex-col items-center text-center py-20 bg-gray-900">
                <h3 className="text-4xl font-bold text-white mb-6">Ready to get started?</h3>
                <p className="text-lg text-gray-400 mb-8">Join API Hub and start building with ease and flexibility.</p>
                <Link href='/signup' className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                    Sign Up Now
                </Link>
            </section>

            {/* Footer */}
            <footer className="py-6 bg-gray-800 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} API Hub. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
