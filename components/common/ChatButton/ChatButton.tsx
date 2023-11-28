import type {
  InkeepChatButtonProps,
  InkeepWidgetBaseSettings,
} from '@inkeep/widgets';
import dynamic from 'next/dynamic';

const InkeepChatButton: any = dynamic(
  () => import('@inkeep/widgets').then((mod) => mod.InkeepChatButton),
  { ssr: false },
);

const baseSettings: InkeepWidgetBaseSettings = {
  apiKey: process.env.NEXT_PUBLIC_INKEEP_API_KEY!,
  integrationId: process.env.NEXT_PUBLIC_INKEEP_INTEGRATION_ID!,
  organizationId: process.env.NEXT_PUBLIC_INKEEP_ORG_ID!,
  organizationDisplayName: 'Drizzle ORM',
  primaryBrandColor: '#FFFFFF',
  theme: {
    colorMode: {
      forcedColorMode: 'dark',
    },
  },
};

const inkeepChatButtonProps: InkeepChatButtonProps = {
  chatButtonType: 'ICON_TEXT',
  baseSettings: {
    ...baseSettings,
  },
  modalSettings: {
    areOpenHotKeysDisabled: true,
  },
};

const ChatButton = () => <InkeepChatButton {...inkeepChatButtonProps} />;

export default ChatButton;
