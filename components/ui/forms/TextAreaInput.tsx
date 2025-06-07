const TextAreaInput: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ...props }) => {
  return (
    <textarea
      className={`block w-full px-4 py-4 text-base text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ${className}`}
      {...props}
    />
  );
};

export { TextAreaInput };
