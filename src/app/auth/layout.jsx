export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center h-[92vh] bg-gray-50">
      { children }
    </div>
  );
}