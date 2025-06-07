const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  type,
  className,
  ...props
}) => {
  return (
    <input
      className={`block w-full px-4 py-3 text-base text-gray-900 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ${className}`}
      type={type}
      {...props}
    />
  );
};

export { Input };
