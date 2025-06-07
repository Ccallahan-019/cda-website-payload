type Props = {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
};

export default function Label({ htmlFor, required, children }: Props) {
  return (
    <div className="mb-2">
      <label htmlFor={htmlFor} className="text-base font-medium text-gray-900">
        {children}
        {required && (
          <span className="text-red-500">
            {` *`}
            <span className="sr-only">(required)</span>
          </span>
        )}
      </label>
    </div>
  );
}
