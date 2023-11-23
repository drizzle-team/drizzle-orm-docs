import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { InkeepChatButtonProps } from '@inkeep/widgets';

const InkeepChatButton: any = dynamic(
  () => import('@inkeep/widgets').then(
    (mod) => mod.InkeepChatButton,
  ),
  {
    ssr: false,
  },
);

function ChatButton() {
  const { theme } = useTheme();
  const inkeepChatButtonProps: InkeepChatButtonProps = {
    baseSettings: {
      apiKey: process.env.NEXT_PUBLIC_INKEEP_API_KEY || '',
      organizationId: process.env.NEXT_PUBLIC_INKEEP_ORGANIZATION_ID || '',
      integrationId: process.env.NEXT_PUBLIC_INKEEP_INTEGRATION_ID || '',
      primaryBrandColor: '#4bb74a',
      theme: {
        primaryColors: {
          textColorOnPrimary: 'white',
        },
        colorMode: {
          forcedColorMode: theme,
        },
      },
    },
    aiChatSettings: {
      botAvatarSrcUrl: '/svg/drizzle-light.svg',
      botAvatarDarkSrcUrl: '/svg/drizzle-dark.svg',
      quickQuestions: [
        'What Databases does Drizzle work with?',
        'How do I test and perform migrations?',
        'Can I query a JSONB column and get a typed response?',
      ],
      getHelpCallToActions: [
        {
          icon: { builtIn: 'FaGithub' },
          name: 'GitHub',
          url: 'https://github.com/drizzle-team/drizzle-orm/discussions',
        },
        {
          icon: { builtIn: 'FaDiscord' },
          name: 'Discord',
          url: 'https://discord.gg/tCe773yFeZ',
        },
      ],
    },
    modalSettings: {
      isModeSwitchingEnabled: true,
      defaultView: 'AI_CHAT',
      closeOnBlur: true,
      isAlignedToTop: true,
      isAlignedToRight: false,
      areOpenHotKeysDisabled: true,
    },
    chatButtonType: 'ICON_TEXT',
  };

  return (
    <InkeepChatButton {...inkeepChatButtonProps} />
  );
}

export default ChatButton;
