import { Media } from "@/components/Media/Media";
import type { Media as MediaProps } from "@/payload-types";

type Props = {
    logo: MediaProps;
}

export default function Logo({ logo }: Props) {
    return (
        <Media
            className="shrink-0"
            imgClassName="w-auto h-14"
            resource={logo}
        />
    )
}