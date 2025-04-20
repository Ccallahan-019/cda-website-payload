import type { CollectionConfig } from 'payload'

import { Media } from "./Media";
import { NewsPost } from "./NewsPost";
import { Users } from "./Users";
import { Page } from "./Page";
import { Contact } from './Contact';
import { Diocese } from './Diocese';
import { Event } from './Event';
import { Project } from './Project';
import { Charity } from './Charity';
import { Fundraiser } from './Fundraiser';
import { LocalCourt } from './Court';
import { Newsletter } from './Newsletter';

export const collections: CollectionConfig[] = [
    Media,
    NewsPost,
    Users,
    Page,
    Contact,
    Diocese,
    Event,
    Project,
    Charity,
    Fundraiser,
    LocalCourt,
    Newsletter
];