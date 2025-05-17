export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto max-w-5xl text-center">
        <p className="text-gray-600">&copy; {currentYear} Cleitin. All rights reserved.</p>
      </div>
    </footer>
  );
}
