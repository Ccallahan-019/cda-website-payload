type Props = {
    height: string;
    width: string;
}

export default function MinusIcon({ height, width }: Props) {
    return (
        <svg style={{ height, width }} className="w-6 h-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
        </svg>
    )
}