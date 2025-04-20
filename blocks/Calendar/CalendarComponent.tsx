import { CalendarBlock as CalendarBlockProps } from "@/payload-types";
import CalendarItem from "@/components/calendar/CalendarItem";
import RichText from "@/lexical-components/RichText";

export const CalendarBlock: React.FC<CalendarBlockProps> = (props) => {
    const { intro, months } = props

    return (
        <div className="container my-16 sm:my-20">
            <div className="py-10 px-4 sm:px-6 rounded-xl bg-background/60 backdrop-blur-sm shadow-xl">
                {intro && <RichText data={intro} />}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.isArray(months) && months.length > 0 && (
                        months.map((month, index) => (
                            <div key={month.id || index}>
                                {month.title && (
                                    <h3 className="text-lg font-bold text-gray-900">{month.title}</h3>
                                )}

                                <hr className="mt-4 border-t-2 border-gray-900" />

                                {Array.isArray(month.monthItems) && month.monthItems.length > 0 && (
                                    <ul className="pt-6">
                                        {month.monthItems.map((monthItem, index) => {
                                            if (monthItem.item) {
                                                return (
                                                    <CalendarItem key={monthItem.id || index}>
                                                        {monthItem.item}
                                                    </CalendarItem>
                                                )
                                            }
                                            return null
                                        })}
                                    </ul>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}