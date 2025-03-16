import { Github, Mail, ExternalLink } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between py-6">
                    <div className="flex items-center mb-4 md:mb-0">
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text">Wikilytics</span>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        <a 
                            href="https://wikipedia-backend-94sp.onrender.com/docs" 
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                        >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            API Reference
                        </a>
                        <a 
                            href="/reach-us" 
                            className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                        >
                            <Mail className="h-4 w-4 mr-1" />
                            Contact Us
                        </a>
                       
                    </div>
                </div>
                
                <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Wikilytics. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;