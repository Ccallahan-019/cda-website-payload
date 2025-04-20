import type { GlobalConfig } from 'payload';
import { ContactForm } from './contact-form/contactFormConfig';
import { Footer } from './footer/footerConfig';
import { Header } from './header/headerConfig';
import { Background } from './background/backgroundConfig';

export const globals: GlobalConfig[] = [ContactForm, Footer, Header, Background]

