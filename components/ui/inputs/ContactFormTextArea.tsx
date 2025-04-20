type Props = {
    label: string;
    name: string;
    placeholder: string;
    value: string;
    required: boolean;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    errors: string;
}

export default function ContactFormTextArea({ label, name, placeholder, value, required, onChange, errors }: Props) {
    return (
        <div>
            {required ? (
                <label className="text-base font-medium text-gray-900"><span className="text-red-500">* </span>{label}</label>
            ) : (
                <label className="text-base font-medium text-gray-900">{label}</label>
            )}
            <div className="mt-2">
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="block w-full px-4 py-4 text-base text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    required={required}
                ></textarea>
                {errors && <p className="text-red-500 text-sm">{errors}</p>}
            </div>
        </div>
    )
}