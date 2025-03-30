import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers';
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <span className="text-xl font-bold text-red-600">Nie rakovine</span>
                </div>
                <div className="hidden sm:flex sm:items-center sm:space-x-8">
                  <a href="/" className="text-gray-700 hover:text-red-600">Home</a>
                  <a href="/about" className="text-gray-700 hover:text-red-600">About</a>
                  <a href="/programs" className="text-gray-700 hover:text-red-600">Programs</a>
                  <a href="/contact" className="text-gray-700 hover:text-red-600">Contact</a>
                </div>
              </div>
            </div>
          </nav>
          {children}
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Nie rakovine</h3>
                  <p className="text-gray-400">
                    Together we can make a difference in the fight against cancer.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                    <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                    <li><a href="/programs" className="text-gray-400 hover:text-white">Programs</a></li>
                    <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>Email: info@nierakovine.org</li>
                    <li>Phone: +1234567890</li>
                    <li>Address: Your Address Here</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Nie rakovine. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
