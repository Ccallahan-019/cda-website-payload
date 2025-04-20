type Props = {
    color: string;
}

export default function Checkmark({ color }: Props) {
    return (
        <svg className="w-6 h-6 shrink-0" style={{ color }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}