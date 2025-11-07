export type NavigationLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  body: string;
  highlights: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  heroImage: string;
};

export type FeatureHighlight = {
  id: string;
  title: string;
  description: string;
  image: string;
  accent: string;
};

export type StoryFeature = {
  id: string;
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
  image: string;
  accent: string;
};

export type FeatureChip = {
  label: string;
};

export type DeepFeature = {
  title: string;
  description: string;
};

export type FAQEntry = {
  question: string;
  answer: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  supportingMetric: string;
};

export const navigationLinks: NavigationLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Security', href: '#security' },
  { label: 'Stories', href: '#stories' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Download', href: '#download' },
];

export const heroContent: HeroContent = {
  eyebrow: 'Simple, reliable, private messages and calls for free.',
  title: 'Simple, reliable, private messages and calls for free.',
  body:
    'With private messaging and calling, you can be yourself. Speak freely and feel close to the most important people in your life — no matter where they are.',
  highlights: [
    'Meet Sticky',
    'Privacy first',
    'Share freely',
  ],
  primaryCta: { label: 'Get the app', href: '#download' },
  secondaryCta: { label: 'View features', href: '#features' },
  heroImage: '/assets/images/asset_024.avif',
};

export const featureHighlights: FeatureHighlight[] = [
  {
    id: 'channels',
    title: 'Channels',
    description: 'Share announcements or go live with rich, multimedia updates that stay secure.',
    image: '/assets/images/asset_026.avif',
    accent: 'linear-gradient(135deg, #6a5cff, #00c6ff)',
  },
  {
    id: 'stories',
    title: 'Stories',
    description: 'Post stories in seconds and understand who is tuning in with granular insights.',
    image: '/assets/images/asset_025.avif',
    accent: 'linear-gradient(135deg, #ff7a18, #af002d 71%)',
  },
  {
    id: 'assistant',
    title: 'AI Assistant',
    description: 'Handle routine replies, automate reminders, and keep every conversation moving.',
    image: '/assets/images/asset_023.avif',
    accent: 'linear-gradient(135deg, #00c6ff, #0072ff)',
  },
  {
    id: 'payments',
    title: 'Payments',
    description: 'Send and receive secure payments without leaving the chat you are already in.',
    image: '/assets/images/asset_027.avif',
    accent: 'linear-gradient(135deg, #ff4d4d, #f9cb28)',
  },
];

export const storyFeatures: StoryFeature[] = [
  {
    id: 'dual-camera',
    eyebrow: 'Dual Camera',
    title: 'Multi Camera Mode',
    emphasis: 'Show everything with dual camera chat.',
    description:
      'Stream with both the front and back camera at the same time. Capture any conversation while keeping the world in view.',
    image: '/assets/images/asset_020.avif',
    accent: '#6a5cff',
  },
  {
    id: 'privacy',
    eyebrow: 'Privacy',
    title: 'Keep your chats extra secure.',
    emphasis: 'End-to-end encryption keeps conversations just between you and the people you choose.',
    description:
      'We use modern encryption across messaging, calls, and shared media so what you send stays protected at every turn.',
    image: '/assets/images/asset_021.avif',
    accent: '#00c6ff',
  },
  {
    id: 'calls',
    eyebrow: 'Voice & Video',
    title: 'Never miss a moment.',
    emphasis: 'Feel like you are in the same room with crisp voice and video calls.',
    description:
      'Host group calls, drop into a quick chat, and switch devices without losing the thread — Sticky keeps the connection alive.',
    image: '/assets/images/asset_022.avif',
    accent: '#ff7a18',
  },
  {
    id: 'expression',
    eyebrow: 'Expression',
    title: 'More ways to say more than ever.',
    emphasis: 'Share high-resolution media, react in real-time, and keep conversations flowing everywhere.',
    description:
      'Bring chats to life with immersive media, status cues, and seamless handoff between phone and desktop experiences.',
    image: '/assets/images/asset_019.avif',
    accent: '#a4e600',
  },
];

export const featureChips: FeatureChip[] = [
  { label: 'Lol GIFs' },
  { label: 'Share location' },
  { label: 'Sushi restaurants' },
  { label: 'Add to calendar' },
  { label: 'Copy OTP' },
  { label: 'Add Voice Message' },
  { label: 'Stephanie' },
  { label: 'Schedule Send' },
  { label: 'Attach recent photo' },
];

export const heroTestimonial: Testimonial = {
  quote: '“The best way to build an App Showcase.”',
  name: 'Yegor Trukhin',
  role: 'Template Creator',
  supportingMetric: '2.8K Reviews',
};

export const deepFeatures: DeepFeature[] = [
  {
    title: 'Live Voicemail',
    description:
      'Send a call to voicemail and view a real-time transcription of the message so you can decide when to join the conversation.',
  },
  {
    title: 'Read an audio message transcription',
    description:
      'Audio messages are transcribed automatically so you can read the highlights now and listen later.',
  },
  {
    title: 'Voice-to-Text',
    description:
      'Convert voice messages into text and rate the transcript quality to keep the assistant improving.',
  },
  {
    title: 'Detailed view statistics',
    description:
      'Understand how people respond to stories with filters, search, and breakouts for every reaction.',
  },
  {
    title: 'A new way to share and view locations',
    description:
      'Request or share a live location without leaving the conversation — perfect for coordinating meetups.',
  },
  {
    title: 'Calendar view for shared media',
    description:
      'Jump to photos and clips from any day with a timeline built right into your media gallery.',
  },
];

export const faqEntries: FAQEntry[] = [
  {
    question: 'How to use the Sticky template?',
    answer:
      'Duplicate the project, customise the copy and imagery, then publish — the layout is built for fast iteration without touching code.',
  },
  {
    question: 'What is Framer?',
    answer:
      'Framer is a visual web builder that lets you design, prototype, and publish marketing sites without sacrificing creative control.',
  },
  {
    question: 'What if I need help with the Sticky template?',
    answer:
      'Reach out through our support channels and we will help you tailor the experience, whether it is a small tweak or a new launch.',
  },
  {
    question: 'Is it easy to use?',
    answer:
      'Absolutely. Sections are modular and well-documented, so you can remix them or slot in new content with minimal effort.',
  },
  {
    question: 'How do templates work?',
    answer:
      'Once you purchase Sticky you get lifetime access, free updates, and the ability to duplicate into any new project.',
  },
];

export const socialLinks = [
  { label: 'X.com', href: 'https://x.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
];

export const legalLinks = [
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Privacy Policy', href: '#privacy' },
];

export const downloadLinks = [
  { label: 'Get iOS app', href: '#download' },
  { label: 'Join beta', href: '#beta' },
];
