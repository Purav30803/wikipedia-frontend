import { ExternalLink, Mail } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between py-6">
                    <div className="flex items-center mb-4 md:mb-0">
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500 text-transparent bg-clip-text">Wikilytics</span>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        <a 
                            href="https://wikipedia-backend-94sp.onrender.com/docs" 
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                        >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            API Reference
                        </a>
                        <a 
                            href="/contact" 
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                        >
                            <Mail className="h-4 w-4 mr-1" />
                            Contact Us
                        </a>
                    </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} Wikilytics. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;