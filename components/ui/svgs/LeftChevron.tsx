type Props = {
    height: string;
    width: string;
}

export default function LeftChevron({ height, width }: Props) {
    return (
        <svg style={{ height, width }} className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
    )
}