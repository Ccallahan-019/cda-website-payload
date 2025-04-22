import { ContactCardsBlock } from "@/blocks/ContactCards/ContactCardsComponent";
import { ContentBlock } from "@/blocks/Content/ContentComponent";
import { CourtListingBlock } from "@/blocks/CourtListing/CourtListingComponent";
import { NewsPostsBlock } from "@/blocks/NewsPosts/NewsPostsComponent";
import { SideBarBlock } from "@/blocks/SideBar/SideBarComponent";
import { StatsBarBlock } from "@/blocks/StatsBar/StatsBarComponent";
import { TabsBlock } from "@/blocks/Tabs/TabsComponent";
import { Page } from "@/payload-types";
import { Fragment } from "react";
import { CalendarBlock } from "@/blocks/Calendar/CalendarComponent";
import { MediaWithTextBlock } from "./MediaWithText/MediaWithTextComponent";
import { SliderBlock } from "./Slider/SliderComponent";
import { NewslettersBlock } from "./Newsletters/NewslettersComponent";
import { DiocesesAccordianBlock } from "./DiocesesAccordian/Component";

const blockComponents = {
  content: ContentBlock,
  statsBar: StatsBarBlock,
  sideBar: SideBarBlock,
  contactCards: ContactCardsBlock,
  tabs: TabsBlock,
  newsPosts: NewsPostsBlock,
  courtListing: CourtListingBlock,
  calendar: CalendarBlock,
  mediaWithText: MediaWithTextBlock,
  slider: SliderBlock,
  newsletters: NewslettersBlock,
  diocesesAccordian: DiocesesAccordianBlock,
}

  
  export const RenderBlocks: React.FC<{blocks: Page['layout']}> = (props) => {
    const { blocks } = props;

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

    if (hasBlocks) {
      return (
        <Fragment>
          {blocks.map((block, index) => {
            const blockType = block.blockType;

            if (blockType && blockType in blockComponents) {
              const Block = blockComponents[blockType];

              if (Block) {
                return (
                  <div className="my-20" key={index}>
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} />
                  </div>
                );
              };
            };
            return null;
          })}
        </Fragment>
      )
      
    };

    return null;
  }